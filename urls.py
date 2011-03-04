from django.conf import settings
from django.conf.urls.defaults import *
from django.contrib import admin
from staticfiles.urls import staticfiles_urlpatterns


admin.autodiscover()

urlpatterns = patterns("%s.views" % settings.PROJECT_NAME,
    url(r"^$", "index", name="home"),
    url(r"^admin/", include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
