from rest_framework import serializers
from userApp.models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ['userid', 'name', 'createdAt', 'activeAt']

