from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.authtoken.models import Token

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

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

class EventList(generics.ListCreateAPIView):
  queryset = models.Event.objects.all()
  serializer_class = serializers.EventSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = serializers.EventSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

  def get_object(self):
    return get_object_or_404(models.Event, id=self.kwargs.get("id"))
