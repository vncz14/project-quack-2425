from django.urls import path, include
from . import views
from django.contrib import admin
urlpatterns = [
  path("user/", views.UserList.as_view()),
  path("user/<int:id>", views.UserDetail.as_view(), name='user-detail'),
  path("user/username/<str:username>", views.UserFindByUsername.as_view(), name='username-detail'), 
  path("event/", views.EventList.as_view()), 
  path("event/<int:id>", views.EventDetail.as_view())
]