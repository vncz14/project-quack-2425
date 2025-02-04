# tests/test_forms.py
from django.test import TestCase
from test_app.forms import EventForm
from test_app.models import Event, User, Invite
from django.contrib.auth.models import User as AuthUser
