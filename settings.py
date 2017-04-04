import os


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
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    #"django.contrib.gis",
    "django.contrib.sessions",
    "django.contrib.messages",
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
]

MIDDLEWARE = [
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
        "APP_DIRS": True,
        "OPTIONS": {
            "debug": DEBUG,
            "context_processors": [
                "django.contrib.auth.context_processors.auth",
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.template.context_processors.static",
            ],
        },
    },
]

WSGI_APPLICATION = "wsgi.application"


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

# https://docs.djangoproject.com/en/1.11/topics/logging/
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
        "rq_console": {
            "level"     : "DEBUG",
            "class"     : "rq.utils.ColorizingStreamHandler",
            "formatter" : "rq_console",
            "exclude"   : ["%(asctime)s"],
        },
    },
    "root": {
        "level"    : "INFO",
        "handlers" : ["console"],
    },
    "loggers": {
        "django": {
            "level"    : "INFO",
            "handlers" : ["console"],
        },
        "rq.worker": {
            "level"    : "DEBUG",
            "handlers" : ["rq_console", "console"],
        },
    },
}


#
# Misc Django config
#
AUTH_USER_MODEL = "core.User"
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

POSTGIS_VERSION = (2, 3, 2)

SESSION_ENGINE = "django.contrib.sessions.backends.cache"
SESSION_CACHE_ALIAS = "sessions"

SITE_ID = 1

LANGUAGE_CODE = "en-us"
USE_I18N = False
USE_L10N = False

# TODO: https://docs.djangoproject.com/en/1.11/topics/i18n/timezones/#selecting-the-current-time-zone
USE_TZ = True

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

RQ_QUEUES = {
    "default" : { "USE_REDIS_CACHE" : "jobs" },
    "high"    : { "USE_REDIS_CACHE" : "jobs" },
    "low"     : { "USE_REDIS_CACHE" : "jobs" },
}


try:
    from local_settings import *
except ImportError:
    pass
