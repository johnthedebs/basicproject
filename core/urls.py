import settings
from django.contrib                  import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls                     import include, path, re_path

from rest_framework import routers

from core import views


router = routers.DefaultRouter()
router.register("users", views.UserViewSet)


urlpatterns = [
    path("", views.app, name="app"),

    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("django-rq/", include("django_rq.urls")),

    path("404/", views.error_404),
    path("500/", views.error_500),

    # This needs to go at the end since it matches anything
    re_path(r"^(?P<path>.*)$", views.app),
]

handler403 = "core.views.error_403"
handler404 = "core.views.error_404"
handler500 = "core.views.error_500"

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path("__debug__/", include(debug_toolbar.urls)),
    ] + urlpatterns

urlpatterns += staticfiles_urlpatterns()
