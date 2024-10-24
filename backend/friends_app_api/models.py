from django.db import models

# Need to input choices (using json file maybe??) and check docs to make sure I'm doing it correctly

class Event(models.Model):
    name = models.CharField(max_length=30, null=False)
    description = models.CharField(max_length=255, null=True)
    interestTags = models.CharField(choices=[])
    maxCapacity = models.IntegerField()
    invites = # manytomanyfield of a new custom invite model
    location = models.CharField(choices=[])
    eventType = models.CharField(choices=["Social", "Bike", "Walk"]) # add other types
    eventDate = models.DateTimeField()
    owner = models.ForeignKey(Users)
    publicStatus = models.CharField(choices=["Public", "Private"])
    #chats = 


class Users(models.Model):
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    bio = models.CharField(max_length=255)
    major = models.Charfield(choices=[])
    interests = models.CharField(choices=[])
    clubs = models.CharField(choices=[])
    points = models.PositiveIntegerField()
    eventsWentTo = # make a computed property
    residentialStatus = models.CharField(choices=["Residential", "Commuter"])
    calendar = #foreignkey to a calendar model (ISSUE)
    standing = models.CharField(choices=["Freshman", "Sophomore", "Junior", "Senior"]) # also not in doc, should we include grad students?
    # work on google auth stuff

    # stretch goal: items for wolfie

# stretch goals: invite class and chat message class