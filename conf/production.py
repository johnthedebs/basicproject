import os
import raven


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

RAVEN_CONFIG = {
    "dsn": "",
    # If you are using git, you can also automatically configure the
    # release based on the git info.
    "release": raven.fetch_git_sha(os.path.dirname(__file__)),
}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "verbose": {
            "datefmt" : "%Y-%m-%d %H:%M:%S",
            "format"  : "[%(asctime)s] [%(levelname)s] [%(module)s] %(message)s",
        },
    },
    "handlers": {
        "sentry": {
            "level" : "WARNING",
            "class" : "raven.contrib.django.handlers.SentryHandler",
        },
        "console": {
            "level"     : "DEBUG",
            "class"     : "logging.StreamHandler",
            "formatter" : "verbose",
        },
    },
    "root": {
        "level"    : "WARNING",
        "handlers" : ["sentry"],
    },
    "loggers": {
        "django": {
            "level"     : "WARNING",
            "handlers"  : ["sentry"],
        },
        "raven": {
            "level"     : "INFO",
            "handlers"  : ["console"],
            "propagate" : False,
        },
        "rq.worker": {
            "level"    : "WARNING",
            "handlers" : ["sentry"],
        },
        "sentry.errors": {
            "level"     : "INFO",
            "handlers"  : ["console"],
            "propagate" : False,
        },
    },
}
