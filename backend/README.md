# Backend — Quickstart (for judges)

This repo contains a Node/TypeScript Express backend that uses MySQL (local or Docker). The steps below get you from zero → running tests in under a minute.

TL;DR — fastest path

1. Start MySQL (Docker):

```bash
# from repo root (where compose.yaml lives)
docker compose up -d mysql
```

2. Run migrations and start server (optional):

```bash
cd backend
# apply DB schema + seed data
npm run migrate

# start the backend (optional)
node src/index.js
```

3. Run tests (unit + integration):

```bash
# unit tests
cd backend
npm test

# integration tests (runs migrations and checks DB) — requires MySQL reachable
INTEGRATION=1 npm run test:integration
```

What the integration test does

- Probes `DB_HOST:DB_PORT` quickly. If unreachable it tries `127.0.0.1` and will skip the test if still unreachable.
- Runs the migration script to ensure schema and seed data exist.
- Verifies `users` and `orgs` tables contain seed rows.

Useful commands

- Run migrations only:

```bash
cd backend
npm run migrate
```

- Run backend server locally (reads `backend/.env`):

```bash
cd backend
node src/index.js
```

Sample API (after starting server on port 80)

- Sign up (returns created user):

POST http://localhost/users
Content-Type: application/json

Body:
{
  "email": "judge@example.com",
  "password": "password123",
  "name": "Judge",
  "username": "judge1",
  "giving_location_pref": "online"
}

- Login (returns token and user):

POST http://localhost/auth/login
Content-Type: application/json

Body:
{
  "email": "judge@example.com",
  "password": "password123"
}

Response:
{
  "token": "...",
  "user": { "id": 1, "email": "judge@example.com", "name": "Judge", ... }
}

Notes for judges

- The backend currently uses plaintext passwords for local/dev convenience. Do not use these credentials for real accounts.
- If you need the server logs, run the server with `node src/index.js` and check the terminal output.
- If you prefer not to use Docker, set `DB_HOST=127.0.0.1` in `backend/.env` and point it to a local MySQL instance.

Contact

If you run into issues, open an issue in the repo or contact the team lead in the repo metadata.
# Backend — local development & integration tests

This file documents quick steps to run the local MySQL, apply migrations, and run the integration tests that exercise the real database.

## Prerequisites

- Docker & Docker Compose (if running MySQL in a container)
- Node 18+ and npm
- A copy of `backend/.env` (there is a `.env.example` in the repo)

## Start a local MySQL (recommended)

From the repository root (where `compose.yaml` lives) you can start the MySQL service defined in the compose file:

```bash
docker compose up -d mysql
```

Give MySQL a few seconds to initialize the data directory and create the seed rows.

By default `backend/.env` sets `DB_HOST=mysql` which is correct when you run via the compose network. If you run the DB on your host machine use `DB_HOST=127.0.0.1` instead.

## Run migrations

The repository includes a small migration runner which executes `backend/create_tables.sql` against the configured MySQL instance.

From the `backend/` folder:

```bash
# run migrations using the .env file in backend/
npm run migrate
```

This calls `node ./scripts/runMigrations.cjs` which reads `backend/.env` and executes the SQL (it uses `multipleStatements=true`).

## Integration tests (fast, safe)

Integration tests are intentionally gated so they won't run in normal unit-test runs. They only run when `INTEGRATION=1` is set.

- Run the integration tests (recommended to run after starting MySQL with the compose command above):

```bash
npm run test:integration
```

What the integration test does
- Probes `DB_HOST:DB_PORT` quickly; if unreachable it will try `127.0.0.1`.
- Runs the migration script (with a timeout) to ensure the schema and seed data are present.
- Dynamically creates the DB pool (so the test's chosen `DB_HOST` is used) and asserts that `users` and `orgs` have seed rows.

Notes & troubleshooting
- If you see `Integration DB not reachable` the test will skip quickly — ensure MySQL is started and reachable from the environment where tests run.
- If your Compose service is named differently or you don't use Docker, make sure `backend/.env` points to the right host. When running via compose the host should be `mysql` (the container name); when running against a local MySQL use `127.0.0.1`.
- If migrations are slow or the container is initializing, the test will skip instead of hanging (this is intentional to keep CI stable). You can run `npm run migrate` manually and then run the integration test.

CI recommendation
- In CI, run the MySQL service, wait until it is healthy, then run `npm run test:integration`. Ensure `DB_HOST` resolves from the CI environment (often `127.0.0.1` is easiest).
Backend - Local development and migrations

This README explains how to run the local MySQL container, create the database schema, and start the backend for development.

Prerequisites
- Docker & Docker Compose
- Node.js 18+ and npm (if you want to run migrations or the app on the host)

Files added/edited for local development
- `compose.yaml` - docker compose configuration including a `mysql` service and the `backend` service environment.
- `backend/create_tables.sql` - SQL script that creates the `raydb` database and `users` table (and inserts a sample user for quick testing).
- `backend/scripts/runMigrations.cjs` - migration script that runs the SQL file against a MySQL server.
- `backend/.env.example` - example env file you can copy to `backend/.env`.

Quick start (recommended)
1) Bring up the services (from repository root):

```bash
docker compose up -d
```

This starts the `mysql` container (and will also attempt to start `backend` if configured by Compose). The MySQL server will initialize and create the `raydb` database.

2) Export env vars (if running migrations from host) or copy `.env.example` to `.env` inside `backend`:

```bash
cd backend
cp .env.example .env
# edit .env if you want to change passwords or host values
```

3) Run migrations to create tables

- Run from the host (uses DB_HOST=127.0.0.1 to point to the container mapped port):

```bash
export DB_HOST=127.0.0.1 DB_PORT=3306 DB_USER=root DB_PASSWORD=rootpw DB_NAME=raydb
cd backend
npm install
npm run migrate
```

- Or run inside the backend container (recommended to use Compose networking):

```bash
# when the backend container is running via `docker compose up -d`
docker compose exec backend npm run migrate
```

You should see `All statements executed.` when the SQL runs successfully.

Sample test user
- Email: `test@example.com`
- Password (local/dev only): `password123`

This sample user is inserted by `backend/create_tables.sql` for local convenience. In production, store bcrypt/argon2 password hashes instead of plain text.

Running the backend
- The project currently starts the server using `node src/index.js`. If running locally:

```bash
cd backend
node src/index.js
```

- Or use `docker compose up backend` which will build the image and run the container (useful during development because it mounts the code directory).

Notes
- The migration script enables `multipleStatements` to allow the SQL file to include `CREATE DATABASE`, `USE`, and multiple DDL statements.
- The `db.service.ts` file has been updated to use `mysql2/promise` and connects using the `DB_*` env vars.
- For security, replace the sample `rootpw` password with a stronger secret and do not commit secrets into source control.

Troubleshooting
- "ECONNREFUSED 127.0.0.1:3306": MySQL not running on host. Ensure `docker compose up -d` is running and that port 3306 is forwarded (or set `DB_HOST=mysql` and run migrations inside the Compose network).
- "Access denied for user 'root'@'...'": Check `DB_PASSWORD` and that you're connecting from the right host. When running from host, the effective client IP differs; easier to run migrations in-container.
- If the backend container exits immediately, inspect logs:

```bash
docker compose logs backend --no-color
```

If you want, I can now:
- Convert the sample password to a bcrypt hash and update `auth.service` to validate bcrypt.
- Wire `user.service.createUser` to insert into the DB.
- Add a `.env` loader (dotenv) and update npm scripts.

Which of these do you want next?
