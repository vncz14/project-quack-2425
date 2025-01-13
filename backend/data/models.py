from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator
from .my_validators import *

# Create your models here. yummy data 🤤


class Event(models.Model):
  event_name = models.CharField(max_length=30, null=False)
  hosts = models.ManyToManyField(User, related_name='hosts_of')
  participants = models.ManyToManyField(User, related_name='event_participants')
  description = models.CharField(max_length=999, null=True, editable=True)
  capacity = models.PositiveIntegerField(validators=[MaxValueValidator(250)])
  UTC_of_event = models.DateTimeField(null=False)
  open_to_the_public = models.BooleanField()

  # TAGS
  # interestTags = models.ForeignKey(Users.interests)
  eventTags = models.CharField(max_length=30, default='OTHER', choices=[
    ('SOCIAL','Social'), ('SPORT','Sport'), ('HOBBY','Hobby'), ('OTHER', 'Other')
    ])
  