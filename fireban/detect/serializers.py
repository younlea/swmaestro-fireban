from rest_framework import serializers

from detect.models import TargetDetection, TargetImage
from hwInfo.serializers import HWSerializer



class DetectionInfo(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(source='pk')
    x = serializers.IntegerField(source='xmin')
    y = serializers.IntegerField(source='ymin')
    type = serializers.IntegerField(source='detectType')

    class Meta:
        model = TargetDetection
        fields = ['id', 'x', 'y', 'width', 'height', 'type']


class DetectImageListSerializer(serializers.HyperlinkedModelSerializer):
    target = HWSerializer(read_only=True)
    createdAt = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True, source='createAt')
    class Meta:
        model = TargetImage
        fields = ['pk', 'path', 'createdAt', 'target', 'isUpdated']


class DetectImageDetailSerializer(serializers.HyperlinkedModelSerializer):
    target = HWSerializer(read_only=True)
    target_detection = DetectionInfo(read_only=True, many=True)
    createdAt = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True, source='createAt')
    class Meta:
        model = TargetImage
        fields = ['pk', 'target', 'path', 'createdAt','isUpdated', 'target_detection']