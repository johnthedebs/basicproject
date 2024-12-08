FROM python:3.13-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-psycopg \
    bash-completion \
    htop \
    vim \
    wget \
    netcat-openbsd \
    # For postgres geospatioal functionality
    gdal-bin \
    libproj-dev \
    libpq-dev \
    libgeoip1 \
    && rm -rf /var/lib/apt/lists/*

# Install Python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create static + media dirs
RUN mkdir -p /site_media/media
RUN mkdir -p /site_media/static

# Create directory for bash completion scripts
RUN mkdir -p /etc/bash_completion.d/

# Copy custom config files
COPY ops/app/bashrc /root/.bashrc
COPY ops/app/vimrc /root/.vimrc
COPY ops/app/django_bash_completion /etc/bash_completion.d/django
COPY ops/app/pdbrc.py /root/.pdbrc.py

WORKDIR /app

# Copy entrypoint script
COPY ops/app/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
CMD ["tail", "-f", "/dev/null"]