from django.db import models

# Need to input choices (using json file maybe??) and check docs to make sure I'm doing it correctly

class Event(models.Model):
    name = models.CharField(max_length=30, null=False)
    description = models.CharField(max_length=255, null=True)
    interestTags = models.CharField(choices=[])
    maxCapacity = models.IntegerField()
    invites = # would this be the people who are invited? If so, maybe connect this to the user id
    location = models.CharField(choices=[])
    eventType = models.CharField(choices=["Social", "Bike", "Walk"]) # add other types
    eventDate = models.DateTimeField()
    owner = # connect to user id?
    publicStatus = models.CharField(choices=["Public", "Private"])
    chats = # how would this be implemented/connected to db?
    rsvps = #connect to user ids
    participants = # people who show up, also connect to user ids (and maybe limit to only people to rsvp'd)



class Users(models.Model):
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    bio = models.CharField(max_length=255)
    major = models.Charfield(choices=[])
    interests = models.CharField(choices=[])
    clubs = models.CharField(choices=[])
    points = models.IntegerField()
    eventsWentTo = # would this be integer, char, or something else?
    id = models.IntegerField() # isn't in the doc but a unique id might make things easier, could also be used for referral code system
    residentialStatus = models.CharField(choices=["Residential", "Commuter"])
    calendar =
    standing = models.CharField(choices=["Freshman", "Sophomore", "Junior", "Senior"]) # also not in doc, should we include grad students?
    # work on google auth stuff
    # stretch goal: items for wolfie

# stretch goals: invite class and chat message class