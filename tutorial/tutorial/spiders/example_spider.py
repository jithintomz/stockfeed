import scrapy
from scrapy.spiders import CrawlSpider, Rule
from tutorial.items import *
from scrapy.selector import Selector
from scrapy.http import HtmlResponse
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from bs4 import BeautifulSoup
from datetime import datetime
from scrapy.exceptions import CloseSpider
from textblob import TextBlob
from news.models import *
from django.utils import timezone


class MySpider(CrawlSpider):
    name = 'example_spider'
    allowed_domains = ['moneycontrol.com']
    start_urls = ['http://www.moneycontrol.com/news/channel/stocks-6-1-next-0.html']
    item_list = []
    lastDate = News.objects.filter().order_by("-date_published")[0].date_published


    rules = (
        # Extract links matching 'category.php' (but not matching 'subsection.php')
        # and follow links from them (since no callback means follow=True by default).
        Rule(SgmlLinkExtractor(allow=(), restrict_xpaths=('//a[@class="title"]',)), callback="parse_item", follow= False),
        Rule(SgmlLinkExtractor(allow=(), restrict_xpaths=('//*[starts-with(@href,"/news/channel/")]',)),  follow= True),
     )


    def quit(self):
        raise CloseSpider('MySpider is quitting now.')

    def parse_item(self, response):
        responseDate = response.xpath("//meta[@http-equiv='Last-Modified']/@content")[0].extract()
        #timezone.make_aware(datetime.datetime.now(), timezone.get_default_timezone())
        date_object = timezone.make_aware(datetime.strptime(responseDate, '%d %b,%Y %H%Mhrs IST'),timezone.get_default_timezone())
        if date_object <= self.lastDate:
            self.quit()
        item = NewsItem()
        item["link"] = response.request.url
    	item["title"] = response.xpath('//title/text()')[0].extract()
    	item["description"] = response.xpath("//meta[@name='description']/@content")[0].extract();
        item["tags"] = response.xpath("//meta[@name='news_keywords']/@content")[0].extract();  
    	item["image_url"] = response.xpath("//meta[@property='og:image']/@content")[0].extract()
    	item["content"] = BeautifulSoup(response.xpath("//div[@class='MT20']")[0].extract()).getText()
        item["date_published"] = date_object
        blob = TextBlob(item["content"])
        item["polarity"] = blob.sentiment.polarity
        item.save()
        yield item

        