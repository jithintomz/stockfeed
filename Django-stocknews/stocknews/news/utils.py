from django.http import HttpResponse
from django.core.serializers.json import DjangoJSONEncoder
import json


class JsonResponse(HttpResponse):
    def __init__(self, content={}, mimetype=None, status=None, content_type='application/json'):
        super(JsonResponse,self).__init__(json.dumps(content,cls=DjangoJSONEncoder), mimetype=mimetype,
                                           status=status, content_type=content_type)