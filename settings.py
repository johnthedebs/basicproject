import os

# https://docs.djangoproject.com/en/3.1/ref/settings/

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DEBUG = True

ADMINS = MANAGERS = [
    # ("Your Name", "your_email@domain.com"),
]

ALLOWED_HOSTS = [
    #".example.com",
]

SECRET_KEY = "{{ secret_key }}"

INSTALLED_APPS = [
    # Django contrib apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.gis",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.sites",
    "django.contrib.staticfiles",

    # 3rd-party apps
    # "debug_toolbar",
    "django_extensions",
    "django_rq",

    # Internal apps
    "accounts",
    "core",
]

MIDDLEWARE = [
    # "debug_toolbar.middleware.DebugToolbarMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, "templates"),
        ],
        "OPTIONS": {
            "debug": DEBUG,
            "context_processors": [
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.template.context_processors.static",
            ],
            "loaders": [
                "django.template.loaders.filesystem.Loader",
                "django.template.loaders.app_directories.Loader",
            ],
        },
    },
]

WSGI_APPLICATION = "wsgi.application"


CACHES = {
    "default": {
        "BACKEND"  : "django_redis.cache.RedisCache",
        "LOCATION" : "redis://redis:6379/1",
        "OPTIONS"  : {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    },
    "sessions": {
        "BACKEND"  : "django_redis.cache.RedisCache",
        "LOCATION" : "redis://redis:6379/2",
        "OPTIONS"  : {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    },
    "jobs": {
        "BACKEND"  : "django_redis.cache.RedisCache",
        "LOCATION" : "redis://redis:6379/3",
        "OPTIONS"  : {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    },
}

DATABASES = {
    "default": {
        "ENGINE"   : "django.contrib.gis.db.backends.postgis",
        "NAME"     : "postgres",
        "USER"     : "postgres",
        "PASSWORD" : "postgres",
        "HOST"     : "postgres",
        "PORT"     : "5432",
    }
}

# https://docs.djangoproject.com/en/3.1/topics/logging/
LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "rq_console": {
            "datefmt" : "%H:%M:%S",
            "format"  : "%(asctime)s %(message)s",
        },
        "verbose": {
            "datefmt" : "%Y-%m-%d %H:%M:%S",
            "format"  : "[%(asctime)s] [%(name)s] [%(levelname)s] [%(module)s] %(message)s",
        },
    },
    "handlers": {
        "console": {
            "level"     : "DEBUG",
            "class"     : "logging.StreamHandler",
            "formatter" : "verbose",
        },
        "rq_console": {
            "level"     : "DEBUG",
            "class"     : "logging.StreamHandler",
            "formatter" : "rq_console",
        },
    },
    "loggers": {
        "": {
            "level"    : "INFO",
            "handlers" : ["console"],
        },
        "django": {
            "level"     : "INFO",
            "handlers"  : ["console"],
            "propagate" : False,
        },
        "rq.worker": {
            "level"    : "DEBUG",
            "handlers" : ["console", "rq_console"],
            "propagate" : False,
        },
    },
}


#
# Misc Django config
#
AUTH_USER_MODEL = "accounts.User"
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
]

CSRF_FAILURE_VIEW = "core.views.error_403"

DEFAULT_AUTO_FIELD = "django.db.models.AutoField"

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
# DEFAULT_FROM_EMAIL = "Example <noreply@example.com>"
# SERVER_EMAIL = ""

POSTGIS_VERSION = (3, 0, 2)

SESSION_ENGINE = "django.contrib.sessions.backends.cache"
SESSION_CACHE_ALIAS = "sessions"

SITE_ID = 1

LANGUAGE_CODE = "en-us"
USE_I18N = False
USE_L10N = False

# TODO: https://docs.djangoproject.com/en/3.1/topics/i18n/timezones/#selecting-the-current-time-zone
USE_TZ = True
TIME_ZONE = "America/New_York"

MEDIA_URL   = "/media/"
STATIC_URL  = "/static/"
MEDIA_ROOT  = os.path.join(BASE_DIR, os.pardir, "site_media", "media")
STATIC_ROOT = os.path.join(BASE_DIR, os.pardir, "site_media", "static")

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "dist"),
]

STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"


#
# 3rd-party config
#
INTERNAL_IPS = (
    "127.0.0.1",  # Localhost
    "172.19.0.1", # Docker container
)

IPYTHON_ARGUMENTS = [
    "--ext", "django_extensions.management.notebook_extension",
    "--ip", "0.0.0.0",
]

SHELL_PLUS = "bpython"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
    )
}

RQ_SHOW_ADMIN_LINK = True
RQ_QUEUES = {
    "default" : { "USE_REDIS_CACHE" : "jobs" },
    "high"    : { "USE_REDIS_CACHE" : "jobs" },
    "low"     : { "USE_REDIS_CACHE" : "jobs" },
}


try:
    from local_settings import *
except ImportError:
    pass

if DEBUG:
    for queueConfig in RQ_QUEUES.values():
        queueConfig["ASYNC"] = False
