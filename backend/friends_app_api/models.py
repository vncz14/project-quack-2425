from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=30, null=False)
    description = models.CharField(max_length=255, null=True)
    interestTags = 
    publicStatus = models.BooleanField () #true=public, false=private
    maxCapacity = models.IntegerField()
    invites =
    location =
    eventType =
    eventDate = models.DateTimeField()



# Create your models here.
class Users(models.Model):
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    bio = models.CharField(max_length=255)
    major = [
    ('CSE', 'Computer Science'),
    ('AMS', 'Applied Mathematics and Statistics'),
    ('BIO', 'Biology'),
    ]
    interests = 
    points = models.IntegerField()
    eventsWentTo = #would this be integer, char, or something else?