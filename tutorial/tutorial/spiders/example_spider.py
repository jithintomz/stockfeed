import scrapy
from scrapy.spiders import CrawlSpider, Rule
from tutorial.items import *
from scrapy.selector import Selector
from scrapy.http import HtmlResponse
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from bs4 import BeautifulSoup
from datetime import datetime
from scrapy.exceptions import CloseSpider


class MySpider(CrawlSpider):
    name = 'example_spider'
    allowed_domains = ['moneycontrol.com']
    start_urls = ['http://www.moneycontrol.com/news/channel/stocks-6-1-next-0.html']
    item_list = []


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
        date_object = datetime.strptime(responseDate, '%d %b,%Y %H%Mhrs IST')
        if date_object < datetime.strptime('06 Feb,2016 1227hrs IST', '%d %b,%Y %H%Mhrs IST'):
            self.quit()
        item = NewsItem()
    	item["title"] = response.xpath('//title/text()')[0].extract()
    	item["description"] = response.xpath("//meta[@name='description']/@content")[0].extract();  
    	item["image_url"] = response.xpath("//meta[@property='og:image']/@content")[0].extract()
    	item["content"] = BeautifulSoup(response.xpath("//div[@class='MT20']")[0].extract()).getText()
        item["date_published"] = date_object
        item.save()
        yield item

        