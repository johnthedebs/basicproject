import os.path
import posixpath

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))

DEBUG = True

COMPRESS = not DEBUG
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    # ("Your Name", "your_email@domain.com"),
)

MANAGERS = ADMINS

CACHES = {
    "default": {
        "BACKEND"  : "django.core.cache.backends.dummy.DummyCache",
        "LOCATION" : "",
    }
}

DATABASES = {
    "default": {
        "ENGINE"   : "django.db.backends.sqlite3",         # Add "postgresql_psycopg2", "postgresql", "mysql", "sqlite3" or "oracle".
        "NAME"     : os.path.join(PROJECT_ROOT, "dev.db"), # Or path to database file if using sqlite3.
        "USER"     : "",                      # Not used with sqlite3.
        "PASSWORD" : "",                      # Not used with sqlite3.
        "HOST"     : "",                      # Set to empty string for localhost. Not used with sqlite3.
        "PORT"     : "",                      # Set to empty string for default. Not used with sqlite3.
    }
}

SITE_ID = 1

TIME_ZONE = "UTC"
USE_TZ    = True

LANGUAGE_CODE = "en-us"
USE_I18N = False
USE_L10N = False

MEDIA_URL    = "/media/"
STATIC_URL   = "/static/"
COMPRESS_URL = STATIC_URL

MEDIA_ROOT   = os.path.join(PROJECT_ROOT, "..", "site_media", "media")
STATIC_ROOT  = os.path.join(PROJECT_ROOT, "..", "site_media", "static")

STATICFILES_DIRS = (
    os.path.join(PROJECT_ROOT, "static"),
)

STATICFILES_FINDERS = (
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
    "compressor.finders.CompressorFinder",
)

SECRET_KEY = "{{ secret_key }}"

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
    #"debug_toolbar.middleware.DebugToolbarMiddleware",
)

ROOT_URLCONF = "core.urls"

TEMPLATE_DIRS = (
    os.path.join(PROJECT_ROOT, "templates"),
)

TEMPLATE_CONTEXT_PROCESSORS = (
    "django.contrib.auth.context_processors.auth",
    "django.core.context_processors.static",
)

INSTALLED_APPS = (
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    #"django.contrib.gis",
    "django.contrib.messages",
    "django.contrib.sessions",
    "django.contrib.sites",
    "django.contrib.staticfiles",

    # External apps
    "compressor",
    "debug_toolbar",
    "django_extensions",
    #"south",
    "uni_form",

    # Internal apps
    "core",
)

INTERNAL_IPS = (
    "127.0.0.1",
)

DEBUG_TOOLBAR_CONFIG = {
    "INTERCEPT_REDIRECTS"   : False,
    "SHOW_TOOLBAR_CALLBACK" : False,
}

try:
    from local_settings import *
except ImportError:
    pass
