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
