from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=30, null=False)
    description = models.CharField(max_length=255, null=True)
    interestTags = 
    maxCapacity = models.IntegerField()
    invites = # would this be the people who are invited?
    location =
    eventType = models.CharField(choices=[public, private]) # have to check docs to see if this is correct
    eventDate = models.DateTimeField()



# Create your models here.
class Users(models.Model):
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    bio = models.CharField(max_length=255)
    major = models.Charfield(choices=[]) # also have to check docs to see if this is correct
    interests = 
    points = models.IntegerField()
    eventsWentTo = # would this be integer, char, or something else?