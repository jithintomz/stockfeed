from django.shortcuts import render
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from utils import *
from news.models import *
from django.http import HttpResponse
import ast
from django.db.models import Q
from rest_framework import viewsets,status
from news.serializers import *




# Create your views here.

def home(request):
	return render(request, 'news/home.html')

@api_view(['GET', 'POST'])
def news_list(request,format=None):
	news = News.objects.all().order_by('-id')
	news = NewsSerializer(news, many=True)
	return Response(news.data)


'''def news_details


class NewsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = News.objects.all().order_by('-id')
    serializer_class = NewsSerializer'''

