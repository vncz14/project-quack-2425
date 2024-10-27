from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=30, null=False)
    description = models.CharField(max_length=255, null=True, editable=True)
    interestTags = models.ForeignKey(Users.interests)
    maxCapacity = models.PositiveIntegerField(max_length=3)
    '''invites = manytomanyfield of a new custom invite model'''
    location = models.CharField(choices=locationChoices)
    eventType = models.CharField(choices=[('S', 'Social'), ('B', 'Bike'), ('W', 'Walk')]) # add other types later
    eventDate = models.DateTimeField()
    owner = models.ForeignKey(Users)
    publicStatus = models.CharField(choices=[('PUB','Public'), ('PRI','Private')])
    locationChoices = [] #finish inputting
    # chats = 

class Users(models.Model):
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    bio = models.CharField(max_length=255)
    major = models.Charfield(choices=majorChoices)
    interests = models.CharField(choices=interestChoices)
    clubs = models.CharField(choices=clubChoices)
    points = models.PositiveIntegerField()
    '''eventsWentTo = make a computed property'''
    residentialStatus = models.CharField(choices=[('RES', 'Residential'), ('COM', 'Commuter')])
    '''calendar = foreignkey to a calendar model (ISSUE)'''
    standing = models.CharField(choices=[('FRE', 'Freshman'), ('SOP', 'Sophomore'), ('JUN', 'Junior'), ('SEN', 'Senior')])
    majorChoices = [
        ('AFS', 'Africana Studies'),
        ('ANT', 'Anthropology'),
        ('AMS', 'Applied Mathematics and Statistics')
    ] # finish inputting majors and major codes
    clubChoices = [] # finish inputting
    interestChoices = [] # finish inputting
    # work on google auth stuff
