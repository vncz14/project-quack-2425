from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator
from django.core.validators import validate_email
from .my_validators import *
# Create your models here.

class Event(models.Model):
  eventName = models.CharField(max_length=30, null=False)
  host = models.ForeignKey(User, on_delete=models.CASCADE)
  description = models.CharField(max_length=999, null=True, editable=True)
  maxCapacity = models.PositiveIntegerField(validators=[MaxValueValidator(250)])
  eventDate = models.DateTimeField(null=False)
  publicStatus = models.CharField(max_length=30, choices=[('OPEN','Open'), ('CLOSED','Closed')])

  # TAGS
  # interestTags = models.ForeignKey(Users.interests)
  eventTags = models.CharField(max_length=30, default='OTHER', choices=[
    ('SOCIAL','Social'), ('SPORT','Sport'), ('HOBBY','Hobby'), ('OTHER', 'Other')
    ])
  

