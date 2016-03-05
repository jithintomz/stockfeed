from django.contrib.auth.models import User, Group
from news.models import *
from rest_framework import serializers

class NewsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = News
        fields = ('tags', 'polarity', 'title', 'content')
