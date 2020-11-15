import os
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.redis import RedisIntegration
from sentry_sdk.integrations.rq import RqIntegration


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DEBUG = False

CSRF_COOKIE_HTTPONLY        = False # False for AJAX CSRF to work
CSRF_COOKIE_SECURE          = True
SESSION_COOKIE_HTTPONLY     = True
SESSION_COOKIE_SECURE       = True
SECURE_BROWSER_XSS_FILTER   = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS             = "DENY"

IPYTHON_ARGUMENTS = [
    "--ext", "django_extensions.management.notebook_extension",
]

SENTRY_DSN = ""

sentry_sdk.init(
    dsn=SENTRY_DSN,
    integrations=[
        DjangoIntegration(),
        RedisIntegration(),
        RqIntegration(),
    ],
    environment="production",
    send_default_pii=True,
)

ALLOWED_HOSTS = [
    #".example.com",
]

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
            "class"     : "rq.utils.ColorizingStreamHandler",
            "formatter" : "rq_console",
            "exclude"   : ["%(asctime)s"],
        },
    },
    "loggers": {
        "": {
            "level"    : "WARNING",
            "handlers" : ["console"],
        },
        "django": {
            "level"     : "WARNING",
            "handlers"  : ["console"],
            "propagate" : False,
        },
        "rq.worker": {
            "level"    : "WARNING",
            "handlers" : ["console", "rq_console"],
        },
    },
}

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "dist"),
]

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
                ("django.template.loaders.cached.Loader", [
                    "django.template.loaders.filesystem.Loader",
                    "django.template.loaders.app_directories.Loader",
                ]),
            ],
        },
    },
]
