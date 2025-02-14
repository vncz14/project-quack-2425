from rest_framework import serializers, reverse
from . import models
from data.models import Event
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = "__all__"

class EventSerializer(serializers.ModelSerializer):
  host = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
  class Meta:
    model = Event
    fields = "__all__"

  def create(self, validated_data):
    try:
      host_instance = validated_data.pop('host')
      instance = Event.objects.create(host=host_instance, **validated_data)
      return instance
    except KeyError:
      raise serializers.ValidationError("Host information not provided")
    except User.DoesNotExist:
      raise serializers.ValidationError("User not found")

  
  def update(self, instance, validated_data):
    try:
      if 'host' in validated_data:
        host_username = validated_data['host']['username']
        instance.host = User.objects.get(username=host_username)
      instance.eventName = validated_data.get('eventName', instance.eventName)
      instance.description = validated_data.get('description', instance.description)
      instance.maxCapacity = validated_data.get('maxCapacity', instance.maxCapacity)
      instance.eventDate = validated_data.get('eventDate', instance.eventDate)
      instance.publicStatus = validated_data.get('publicStatus', instance.publicStatus)
      instance.save()
    except KeyError as e:
      raise serializers.ValidationError(f"Missing key: {str(e)}")
    except Exception as e:
      raise serializers.ValidationError(str(e))
    return instance
