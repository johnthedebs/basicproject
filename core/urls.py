from django.conf                     import settings
from django.contrib                  import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls                     import include, path, re_path

from rest_framework import routers

from .views import app, UserViewSet


router = routers.DefaultRouter()
router.register("users", UserViewSet)


urlpatterns = [
    path("", app, name="app"),

    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("django-rq/", include("django_rq.urls")),

    # This needs to go at the end since it matches anything
    re_path(r"^(?P<path>.*)$", app),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path("__debug__/", include(debug_toolbar.urls)),
    ] + urlpatterns

urlpatterns += staticfiles_urlpatterns()
