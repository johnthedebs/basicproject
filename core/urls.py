from django.conf.urls                import include, url
from django.contrib                  import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from rest_framework import routers

from .views import app, UserViewSet


router = routers.DefaultRouter()
router.register("users", UserViewSet)


urlpatterns = [
    url(r"^$", app, name="app"),

    url(r"^admin/", include(admin.site.urls)),
    url(r"^api/", include(router.urls)),
    url(r"^django-rq/", include("django_rq.urls")),

    # This needs to go at the end since it captures anything
    url(r"^(?P<path>.*)/$", app),
]

urlpatterns += staticfiles_urlpatterns()
