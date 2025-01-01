from django.urls import path, include
from . import views
from django.contrib import admin
from django.contrib.auth import views as auth_views

# model
urlpatterns = [
  path("users/", views.UserList.as_view()),
  path("user/<int:id>", views.UserDetail.as_view(), name='user-detail'),
  path("events/", views.EventList.as_view()), 
  path("event/<int:id>", views.EventDetail.as_view()),
]