from django.test import TestCase
from .. import models

class UserTestCase(TestCase):
  def setUp(self):
    models.User.objects.create(username="testuser1")

  def test_user_greeting(self):
    testuser1 = models.User.objects.get(username="testuser1")
    self.assertEqual(testuser1.greeting(), "Hello testuser1")
