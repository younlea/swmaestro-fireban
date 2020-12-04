from rest_framework import serializers

from hwInfo.serializers import HWMacSerializer, HWSerializer, LocationSerializer
from streamInfo.models import Stream




class StreamSerializer(serializers.HyperlinkedModelSerializer):
    target = HWSerializer(read_only=True)
    start_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True, source='startedAt')
    finish_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True, source='finishedAt')


    class Meta:
        model = Stream
        fields = ['target', 'key', 'isActive', 'start_date', 'finish_date', 'hls_url', 'tic_url']


class StreamUriSerializer(serializers.HyperlinkedModelSerializer):
    target = HWMacSerializer(read_only=True)
    class Meta:
        model = Stream
        fields = ['target', 'key', 'hls_url', 'tic_url']
