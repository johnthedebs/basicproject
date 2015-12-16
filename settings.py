import os.path


BASE_DIR = os.path.abspath(os.path.dirname(__file__))

DEBUG = True

ADMINS = (
    # ("Your Name", "your_email@domain.com"),
)

MANAGERS = ADMINS

CACHES = {
    "default": {
        "BACKEND"  : "django_redis.cache.RedisCache",
        "LOCATION" : "127.0.0.1:6379:1",
        "OPTIONS"  : {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    },
    "sessions": {
        "BACKEND"  : "django_redis.cache.RedisCache",
        "LOCATION" : "127.0.0.1:6379:2",
        "OPTIONS"  : {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    },
    "jobs": {
        "BACKEND"  : "django_redis.cache.RedisCache",
        "LOCATION" : "127.0.0.1:6379:3",
        "OPTIONS"  : {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    },
}

DATABASES = {
    "default": {
        "ENGINE"   : "django.contrib.gis.db.backends.postgis",
        "NAME"     : "basicproject",
        "USER"     : "basicproject",
        "PASSWORD" : "basicproject",
        "HOST"     : "",
        "PORT"     : "",
    }
}

RQ_QUEUES = {
    "default" : { "USE_REDIS_CACHE" : "jobs" },
    "high"    : { "USE_REDIS_CACHE" : "jobs" },
    "low"     : { "USE_REDIS_CACHE" : "jobs" }
}


SESSION_ENGINE = "django.contrib.sessions.backends.cache"
SESSION_CACHE_ALIAS = "sessions"

POSTGIS_VERSION = (2, 1, 2)

AUTH_USER_MODEL = "core.User"

SILENCED_SYSTEM_CHECKS = [
]

SITE_ID = 1

TIME_ZONE = "UTC"
USE_TZ    = True

LANGUAGE_CODE = "en-us"
USE_I18N = False
USE_L10N = False

MEDIA_URL    = "/media/"
STATIC_URL   = "/static/"
COMPRESS_URL = STATIC_URL

MEDIA_ROOT   = os.path.join(BASE_DIR, os.pardir, "site_media", "media")
STATIC_ROOT  = os.path.join(BASE_DIR, os.pardir, "site_media", "static")

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static_files"),
)

STATICFILES_FINDERS = (
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
)

STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"

SECRET_KEY = "{{ secret_key }}"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
          os.path.join(BASE_DIR, "templates"),
        ],
        "APP_DIRS": False,
        "OPTIONS": {
            "debug": DEBUG,
            "context_processors": [
                "django.contrib.auth.context_processors.auth",
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

MIDDLEWARE_CLASSES = (
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.auth.middleware.SessionAuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "django.middleware.security.SecurityMiddleware",
)

ROOT_URLCONF = "core.urls"

WSGI_APPLICATION = "wsgi.application"

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
    "authtools",
    #"debug_toolbar",
    "django_extensions",
    "django_rq",
    "raven.contrib.django.raven_compat",
    "rest_framework",

    # Internal apps
    "core",
)

INTERNAL_IPS = ("127.0.0.1",)

DEBUG_TOOLBAR_CONFIG = { "INTERCEPT_REDIRECTS" : False }

IPYTHON_ARGUMENTS = [
    "--ext", "django_extensions.management.notebook_extension",
    "--ip", "0.0.0.0",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
    )
}

RQ_SHOW_ADMIN_LINK = True

LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "rq_console": {
            "format"  : "%(asctime)s %(message)s",
            "datefmt" : "%H:%M:%S",
        },
        "verbose": {
            "datefmt" : "%Y-%m-%d %H:%M:%S",
            "format"  : "[%(asctime)s] [%(levelname)s] [%(module)s] %(message)s",
        },
    },
    "handlers": {
        "console": {
            "level"     : "DEBUG",
            "class"     : "logging.StreamHandler",
            "formatter" : "verbose",
        },
        "sentry": {
            "level" : "INFO",
            "class" : "raven.contrib.django.handlers.SentryHandler",
        },
        "rq_console": {
            "level"     : "DEBUG",
            "class"     : "rq.utils.ColorizingStreamHandler",
            "formatter" : "rq_console",
            "exclude"   : ["%(asctime)s"],
        },
    },
    "root": {
        "level"    : "INFO",
        "handlers" : ["sentry"],
    },
    "loggers": {
        "django": {
            "level"    : "INFO",
            "handlers" : ["sentry"],
        },
        "raven": {
            "level"     : "WARNING",
            "handlers"  : ["console"],
            "propagate" : False,
        },
        "rq.worker": {
            "handlers" : ["rq_console", "sentry"],
            "level"    : "DEBUG"
        },
        "sentry.errors": {
            "level"     : "DEBUG",
            "handlers"  : ["console"],
            "propagate" : False,
        },
    },
}

try:
    from local_settings import *
except ImportError:
    pass
