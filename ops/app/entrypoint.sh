#!/bin/bash

set -e

echo "Waiting for database..."
echo DB_HOST: ${POSTGRES_HOST}
echo DB_PORT: ${POSTGRES_PORT}
while ! nc -z ${POSTGRES_HOST} ${POSTGRES_PORT}; do sleep 1; done
echo "Connected to database."

echo "Applying database migrations..."
python manage.py migrate

echo "App container ready!"
exec "$@" 