from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^news-list/$', views.news_list, name='news_list'),
]

urlpatterns = format_suffix_patterns(urlpatterns)