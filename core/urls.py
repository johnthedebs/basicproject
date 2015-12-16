from django.conf.urls                import patterns, include, url
from django.contrib                  import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from .views import app


urlpatterns = patterns("",
    url(r"^$", app, name="app"),

    url(r"^admin/", include(admin.site.urls)),
    url(r"^django-rq/", include("django_rq.urls")),

    # This needs to go at the end since it captures anything
    url(r"^(?P<path>.*)/$", app),
)

urlpatterns += staticfiles_urlpatterns()
