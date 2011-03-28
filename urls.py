from django.conf import settings
from django.conf.urls.defaults import *
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


admin.autodiscover()

urlpatterns = patterns("%s.views" % settings.PROJECT_NAME,
    url(r"^$", "index", name="home"),
)

urlpatterns += patterns("",
    url(r"^admin/", include(admin.site.urls)),
)

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
