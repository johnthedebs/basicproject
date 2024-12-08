FROM postgres:17

# Add any custom configurations
COPY postgresql.conf /etc/postgresql/postgresql.conf

# Add any initialization scripts
COPY init.sql /docker-entrypoint-initdb.d/

# Install PostGIS packages along with other extensions
RUN apt-get update \
    && apt-get install -y \
        postgresql-contrib \
        postgresql-17-postgis-3 \
        postgresql-17-postgis-3-scripts \
    && rm -rf /var/lib/apt/lists/* 