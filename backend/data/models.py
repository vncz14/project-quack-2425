from django.db import models
from django.contrib.auth.models import User as contrib_auth_user
from django.core.validators import MaxValueValidator
from .my_validators import *

# Create your models here. yummy data 🤤
import re

def validate_username(value): # Checks to make sure usernames do not contain invalid characters
    if not re.match('^[a-zA-Z0-9_]+$', value):
        raise ValidationError('Invalid username')

class Location(models.Model):
  name = models.CharField(max_length=255)

  def __str__(self): # makes location into a human readable format in admin interface
    return self.name

class Major(models.Model):
  name = models.CharField(max_length=255)

  def __str__(self):
    return self.name

class Club(models.Model):
  name = models.CharField(max_length=255)

  def __str__(self):
    return self.name

class User(contrib_auth_user):
  name = models.CharField(max_length=30, null=False, unique=True, validators=[validate_username])
  major = models.ManyToManyField(Major, blank=True)
  club = models.ManyToManyField(Club, blank=True) # associated clubs/clubs they are in
  bio = models.CharField(max_length=255, null=True, editable=True, blank=True)
  points = models.PositiveIntegerField(default=0)
  residentialStatus = models.CharField(choices = [('RES', 'Residential'), ('COM', 'Commuter')], max_length = 255, default = 'Residental')
  standing = models.CharField(choices = [('FRE', 'Freshman'), ('SOP', 'Sophomore'), ('JUN', 'Junior'), ('SEN', 'Senior')], max_length = 255, default = 'Freshman')

  def greeting(self):
    return "Hello " + self.name

  def __str__(self):
    return self.name

class Event(models.Model):
  event_name = models.CharField(max_length=30, null=False)
  hosts = models.ManyToManyField(User, related_name='hosts_of')
  participants = models.ManyToManyField(User, related_name='event_participants')
  description = models.CharField(max_length=999, null=True, editable=True)
  capacity = models.PositiveIntegerField(validators=[MaxValueValidator(250)])
  UTC_of_event = models.DateTimeField(null=False)
  open_to_the_public = models.BooleanField()
  location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True)# on_delete=models.SET_NULL means if a Location is deleted from databse, the Event will still exist but won't have any value in location field
  
  def __str__(self):
    return self.event_name

  # TAGS
  # interestTags = models.ForeignKey(Users.interests)
  eventTags = models.CharField(max_length=30, default='OTHER', choices=[
    ('SOCIAL','Social'), ('SPORT','Sport'), ('HOBBY','Hobby'), ('OTHER', 'Other')
  ])
