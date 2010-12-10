# Django settings for basicproject project.

import os.path
import posixpath

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))

DEBUG = True
TEMPLATE_DEBUG = DEBUG
SERVE_MEDIA = DEBUG

ADMINS = (
    # ("Your Name", "your_email@domain.com"),
)

MANAGERS = ADMINS

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",         # Add "postgresql_psycopg2", "postgresql", "mysql", "sqlite3" or "oracle".
        "NAME": os.path.join(PROJECT_ROOT, "dev.db"),   # Or path to database file if using sqlite3.
        "USER": "",                      # Not used with sqlite3.
        "PASSWORD": "",                  # Not used with sqlite3.
        "HOST": "",                      # Set to empty string for localhost. Not used with sqlite3.
        "PORT": "",                      # Set to empty string for default. Not used with sqlite3.
    }
}

TIME_ZONE = "US/Eastern"
LANGUAGE_CODE = "en-us"

SITE_ID = 1

USE_I18N = True
USE_L10N = True

MEDIA_ROOT = os.path.join(PROJECT_ROOT, "site_media", "media")
MEDIA_URL = "/site_media/media/"

STATIC_ROOT = os.path.join(PROJECT_ROOT, "site_media", "static")
STATIC_URL = "/site_media/static/"

STATICFILES_DIRS = (
    os.path.join(PROJECT_ROOT, "static_media"),
)

ADMIN_MEDIA_PREFIX = posixpath.join(STATIC_URL, "admin/")

SECRET_KEY = "Keep it secret, keep it safe."

TEMPLATE_LOADERS = (
    "django.template.loaders.filesystem.Loader",
    "django.template.loaders.app_directories.Loader",
)

MIDDLEWARE_CLASSES = (
    "django.middleware.common.CommonMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
)

ROOT_URLCONF = "basicproject.urls"

TEMPLATE_DIRS = (
    os.path.join(PROJECT_ROOT, "templates"),
)

TEMPLATE_CONTEXT_PROCESSORS = (
    "django.core.context_processors.auth",
    "staticfiles.context_processors.static_url",
)

INSTALLED_APPS = (
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.sites",
    "django.contrib.messages",
    
    "debug_toolbar",
    "django_extensions",
    "staticfiles",
)

INTERNAL_IPS = (
    #"127.0.0.1",
)

DEBUG_TOOLBAR_CONFIG = {
    "INTERCEPT_REDIRECTS": False,
    "SHOW_TOOLBAR_CALLBACK": False,
}

# local_settings.py can be used to override environment-specific settings
# like database and email that differ between development and production.
try:
    from local_settings import *
except ImportError:
    pass
