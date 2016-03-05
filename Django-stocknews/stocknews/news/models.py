from django.db import models
from decimal import Decimal

# Create your models here.

class News(models.Model):
    title = models.CharField(blank=True, null=True,max_length=250);
    link = models.CharField(blank=True, null=True,max_length=250);
    description = models.CharField(blank=True, null=True,max_length=500);
    content = models.TextField(blank=True, null=True);
    date_published = models.DateTimeField(null=True,blank=True)
    image_url = models.CharField(blank=True, null=True,max_length=250);
    tags = models.CharField(blank=True, null=True,max_length=500);
    polarity = models.DecimalField(max_digits=20,decimal_places=6,default=Decimal('0.0000'))