from django.urls import path, include
from . import views

urlpatterns = [
    path("auth/", include("dj_rest_auth.urls")),
    path("event", views.EventList.as_view(), name="event-list"),
]
