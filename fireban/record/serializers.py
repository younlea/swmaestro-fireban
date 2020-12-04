from rest_framework import serializers
from hwInfo.serializers import HWMacSerializer, HWSerializer
from record.models import TicRecord, StreamRecord


class RecordSerializer(serializers.HyperlinkedModelSerializer):
    target = HWSerializer(read_only=True)
    createdAt = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True, source='createAt')

    class Meta:
        model = TicRecord
        fields = ['target', 'name', 'createdAt']