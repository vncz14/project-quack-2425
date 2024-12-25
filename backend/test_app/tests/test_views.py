from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework.permissions import IsAuthenticated
from .. import models

class UserDetailTest(TestCase):
  def setUp(self):
    self.client = APIClient()
    models.User.objects.create(id=1, username="whatever")
  def test_user_detail_get(self):
    response = self.client.get(reverse("user-detail", kwargs={"id": 1})) # /v1/event/1
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data, {"id": 1, "username": "whatever"})

