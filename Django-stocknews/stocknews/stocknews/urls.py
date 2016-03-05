from django.conf.urls import patterns, include, url
from rest_framework import routers
from django.contrib import admin
from news import views

#admin.autodiscover()

#router = routers.DefaultRouter()
#router.register(r'news', views.NewsViewSet)
#router.register(r'groups', views.GroupViewSet)

urlpatterns = patterns('',
    # Examples:
    url(r'', include('news.urls')),
    # url(r'^blog/', include('blog.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', include(admin.site.urls)),
)
