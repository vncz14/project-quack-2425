from rest_framework import serializers, reverse
from .models import Event
from django.contrib.auth.models import User
from dj_rest_auth.models import TokenModel

class UserSerializer(serializers.ModelSerializer):
  id_of_hosts = serializers.SlugRelatedField(many=True, slug_field='id', read_only='True')
  class Meta:
    model = User
    fields = "__all__"

class ClientUserSerializer(UserSerializer):
  class Meta(UserSerializer.Meta):
    fields = ['date_joined', 'username', 'email', 'first_name', 'last_name', 'groups']
class EventSerializer(serializers.ModelSerializer):
  id_of_hosts = UserSerializer(many=True).data
  class Meta:
    model = Event
    fields = "__all__"

  def create(self, validated_data):
        validated_data['host'] = User.objects.get(username=validated_data.get('host')['username'])
        return Event.objects.create(**validated_data)
  
  def update(self, instance, validated_data):
    instance.eventName = validated_data.get('eventName', instance.eventName)
    instance.host = User.objects.get(username=validated_data.get('host', instance.host)['username'])
    instance.description = validated_data.get('description', instance.description)
    instance.maxCapacity = validated_data.get('maxCapacity', instance.maxCapacity)
    instance.eventDate = validated_data.get('eventDate', instance.eventDate)
    instance.publicStatus = validated_data.get('publicStatus', instance.publicStatus)
    instance.save()
    return instance

class TokenSerializer(serializers.ModelSerializer):
    user = ClientUserSerializer()
    class Meta:
        model = TokenModel
        fields = ('key', 'user')