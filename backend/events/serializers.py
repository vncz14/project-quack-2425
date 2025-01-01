from rest_framework import serializers, reverse
from . import models

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.User
    fields = "__all__"

class EventSerializer(serializers.ModelSerializer):
  host = UserSerializer()
  class Meta:
    model = models.Event
    fields = "__all__"

  def create(self, validated_data):
        validated_data['host'] = models.User.objects.get(username=validated_data.get('host')['username'])
        return models.Event.objects.create(**validated_data)
  
  def update(self, instance, validated_data):
    instance.eventName = validated_data.get('eventName', instance.eventName)
    instance.host = models.User.objects.get(username=validated_data.get('host', instance.host)['username'])
    instance.description = validated_data.get('description', instance.description)
    instance.maxCapacity = validated_data.get('maxCapacity', instance.maxCapacity)
    instance.eventDate = validated_data.get('eventDate', instance.eventDate)
    instance.publicStatus = validated_data.get('publicStatus', instance.publicStatus)
    instance.save()
    return instance
