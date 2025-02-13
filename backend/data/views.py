from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.authtoken.models import Token
from django.views.generic import ListView
from django.views.generic.detail import SingleObjectMixin
from django.http import Http404, JsonResponse
from django.shortcuts import get_object_or_404
from .models import User, Event
from .serializers import UserSerializer, EventSerializer
from rest_framework.renderers import JSONRenderer

# Users

class UserList(generics.ListCreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [permissions.AllowAny]

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = UserSerializer
  permission_classes = [permissions.AllowAny]
  def get_object(self):
    return get_object_or_404(User, id=self.kwargs.get("id"))

class RetrieveIdByEmail(generics.RetrieveAPIView):
  serializer_class = UserSerializer
  permission_classes = [permissions.AllowAny] # TODO: change back
  def get(self, *args, **kwargs):
    try:
      instance = User.objects.get(email=kwargs.get("email"))
      return JsonResponse({'id': instance.id, 'first_name': instance.first_name, 'last_name': instance.last_name})
    except:
      raise Http404

# Events

class EventList(generics.ListCreateAPIView):
  queryset = Event.objects.all()
  serializer_class = EventSerializer
  permission_classes = [permissions.AllowAny]

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = EventSerializer
  permission_classes = [permissions.AllowAny]

  def get_object(self):
    return get_object_or_404(Event, id=self.kwargs.get("id"))
  
# Pages

class Homepage(generics.ListAPIView):
  serializer_class = EventSerializer
  def get(self, request, *args, **kwargs):
    events_organized = Event.objects.filter(hosts=self.request.user.id)
    my_events = Event.objects.filter(participants=self.request.user.id)
    res = {
      'events_organized': EventSerializer(events_organized, many='True').data,
      'my_events': EventSerializer(my_events, many='True').data,
    }
    return Response(res, content_type='application/json')
