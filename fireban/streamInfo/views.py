from django.http import HttpResponse, HttpResponseForbidden
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
import requests, json
from streamInfo.models import Stream
from streamInfo.serializers import StreamSerializer, StreamUriSerializer
import os.path


@permission_classes((IsAuthenticated,))
class StreamActive(APIView):
    def post(self, request):
        if 'stream_key' not in request.data:
            return Response({"message": "key is not valid"}, status=status.HTTP_400_BAD_REQUEST)
        key = request.data['stream_key']
        if key is None:
            return Response({"message": "key are not valid"}, status=status.HTTP_403_FORBIDDEN)

        check_tic = os.path.isfile("/var/www/api/stream/tic/"+key+"/index.m3u8")
        check_hls = os.path.isfile("/var/www/api/stream/live/"+key+"/index.m3u8")

        if check_tic == True or check_hls ==True:
            return Response({"message": "success"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "file not exist"}, status=status.HTTP_404_NOT_FOUND)





@permission_classes((IsAuthenticated,))
class Info(APIView):
    def get(self, request):
        queryset = Stream.objects.all()
        serializer = StreamSerializer(queryset, many=True)
        return Response({"message": serializer.data}, status=status.HTTP_200_OK)


@permission_classes((IsAuthenticated,))
class ActiveInfo(APIView):
    def get(self, request):
        queryset = Stream.objects.filter(isActive=True)
        serializer = StreamSerializer(queryset, many=True)
        return Response({"message": serializer.data}, status=status.HTTP_200_OK)


@permission_classes((IsAuthenticated,))
class Uri(APIView):
    def get(self, request, target):
        queryset = Stream.objects.get(key=target)
        serializer = StreamUriSerializer(queryset)
        return Response({"message": serializer.data}, status=status.HTTP_200_OK)

@require_POST
@csrf_exempt
def start_stream(request):
    """ This view is called when a stream starts.
    """
    stream = get_object_or_404(Stream, key=request.POST["name"])
    if not stream.target.isActive:
        return HttpResponseForbidden("Inactive Target")

    if stream.isActive:
        return HttpResponseForbidden("Already streaming")

    try:
        key = stream.key
        data = {'hw_key': key}
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        res = requests.post("http://127.0.0.1:5000/start_detect", data=json.dumps(data), headers=headers)
    except:
        print("detect server error")

    stream.startedAt = timezone.now()
    stream.isActive = True
    stream.save()

    return HttpResponse(stream.target.name)



@require_POST
@csrf_exempt
def stop_stream(request):
    """ This view is called when a stream stops.
    """
    Stream.objects.filter(key=request.POST["name"]).update(isActive=False, finishedAt=timezone.now())
    return HttpResponse("OK")
