from rest_framework import serializers

from fireban.settings import KAKAOMAP_KEY
from hwInfo.models import Location, Product
from userApp.models import User
import requests
import json



class HWUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['name']


class LocationSerializer(serializers.HyperlinkedModelSerializer):
    createdAt = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True, source='updatedAt')

    class Meta:
        model = Location
        fields = ['cordinateX', 'cordinateY', 'createdAt', 'location']



class HWSerializer(serializers.HyperlinkedModelSerializer):
    manager = HWUserSerializer(read_only=True)
    location = LocationSerializer(read_only=True)
    active_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True, source='activeAt')
    power_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True, source='isPower_date')

    class Meta:
        model = Product
        fields = ['manager', 'mac', 'name', 'isPower', 'power_date', 'active_date', 'location']


class HWMacSerializer(serializers.HyperlinkedModelSerializer):
    location = LocationSerializer(read_only=True)
    class Meta:
        model = Product
        fields = ['mac', 'location']