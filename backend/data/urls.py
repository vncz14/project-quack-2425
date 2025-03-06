from django.urls import path, include
from . import views
from django.contrib import admin
from django.contrib.auth import views as auth_views
from .auth_views import GoogleLogin

# model
urlpatterns = [
  path("users/", views.UserList.as_view()),
  path("user/<int:id>", views.UserDetail.as_view(), name='user-detail'),
  path("user/email/<str:email>", views.RetrieveIdByEmail.as_view()),
  path("events/", views.EventList.as_view()),
  path("event/<int:id>", views.EventDetail.as_view()),
  path("homepage/", views.Homepage.as_view()),
  path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login')
]