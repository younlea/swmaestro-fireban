from datetime import datetime

from django.shortcuts import get_object_or_404, render

# Create your views here.
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from fireban.settings import PAGE_CONTENTS_NUM
from hwInfo.models import Product
from record.models import StreamRecord, TicRecord
from record.serializers import RecordSerializer


@require_POST
@csrf_exempt
def tic_record(request, name):
    """ This view is called when a stream starts.
    """
    # stream = get_object_or_404(TicRecord, key=request.POST["name"])
    splitData = name.split('-')
    targetKey = splitData[0]
    targetName = splitData[2]
    targetTime = targetName.split('.')[0]
    targetTimeConvert = datetime.strptime(targetTime, '%Y%m%d%H%M%S')

    try:
        queryset = Product.objects.get(authKey=targetKey)
        TicRecord.objects.create(name=name, target=queryset, createAt=targetTimeConvert)
        return HttpResponse(name)
    except:
        return HttpResponse(name)


@require_POST
@csrf_exempt
def stream_record(request, name):
    """ This view is called when a stream starts.
    """
    # stream = get_object_or_404(TicRecord, key=request.POST["name"])

    splitData = name.split('-')
    targetKey = splitData[0]
    targetName = splitData[2]
    targetTime = targetName.split('.')[0]
    targetTimeConvert = datetime.strptime(targetTime, '%Y%m%d%H%M%S')

    try:
        queryset = Product.objects.get(authKey=targetKey)
        StreamRecord.objects.create(name=name, target=queryset, createAt=targetTimeConvert)
        return HttpResponse(name)
    except:
        return HttpResponse(name)


# @permission_classes((IsAuthenticated,))
@permission_classes((AllowAny,))
class TicRecordInfo(APIView):
    def get(self, request, page_param):
        queryset = TicRecord.objects.all().order_by('-pk')[(int(page_param) - 1) * PAGE_CONTENTS_NUM:(int(page_param) - 1) * PAGE_CONTENTS_NUM + PAGE_CONTENTS_NUM]
        serializer = RecordSerializer(queryset, many=True)
        return Response({"message": serializer.data, "page": page_param}, status=status.HTTP_200_OK)


@permission_classes((AllowAny,))
class StreamRecordInfo(APIView):
    def get(self, request, page_param):
        queryset = StreamRecord.objects.all().order_by('-pk')[(int(page_param) - 1) * PAGE_CONTENTS_NUM:(int(page_param) - 1) * PAGE_CONTENTS_NUM + PAGE_CONTENTS_NUM]
        serializer = RecordSerializer(queryset, many=True)
        return Response({"message": serializer.data, "page": page_param}, status=status.HTTP_200_OK)





@permission_classes((AllowAny,))
class TicRecordDetailInfo(APIView):
    def get(self, request, target):
        queryset = TicRecord.objects.get(name=target)
        serializer = RecordSerializer(queryset)
        return Response({"message": serializer.data}, status=status.HTTP_200_OK)

@permission_classes((AllowAny,))
class StreamRecordDetailInfo(APIView):
    def get(self, request, target):
        queryset = StreamRecord.objects.get(name=target)
        serializer = RecordSerializer(queryset)
        return Response({"message": serializer.data}, status=status.HTTP_200_OK)
