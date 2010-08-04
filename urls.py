from django.conf.urls.defaults import *
from django.contrib import admin


admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'basicproject.views.index', name="home"),
    url(r'^admin/', include(admin.site.urls)),
)

if settings.SERVE_MEDIA:
    urlpatterns += patterns('',
        (r'^site_media/', include('staticfiles.urls')),
    )
