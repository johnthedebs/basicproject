from django.conf import settings
from django.conf.urls.defaults import *
from django.contrib import admin
from staticfiles.urls import staticfiles_urlpatterns


admin.autodiscover()

urlpatterns = patterns("",
    url(r"^$", "basicproject.views.index", name="home"),
    url(r"^admin/", include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
