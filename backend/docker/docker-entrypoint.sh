#!/bin/sh
set -e

# Run migrations then start the app
echo "Running migrations..."
node ./scripts/runMigrations.cjs || true

echo "Starting backend..."
exec node src/index.js
