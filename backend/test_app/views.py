from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from . import models, serializers
from django.http import HttpResponse

class UserList(generics.ListCreateAPIView):
  queryset = models.User.objects.all()
  serializer_class = serializers.UserSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = serializers.UserSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]
  def get_object(self):
    return get_object_or_404(models.User, id=self.kwargs.get("id"))

class UserFindByUsername(generics.RetrieveDestroyAPIView):
  serializer_class = serializers.UserSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]
  def get_object(self):
    return get_object_or_404(models.User, username=self.kwargs.get("username"))

class EventList(generics.ListCreateAPIView):
  queryset = models.Event.objects.all()
  serializer_class = serializers.EventSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = serializers.EventSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

  def get_object(self):
    print(self.kwargs.get("id"))
    return get_object_or_404(models.Event, id=self.kwargs.get("id"))
