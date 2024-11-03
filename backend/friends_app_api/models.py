from django.db import models
from django.utils import timezone

class InterestModel(models.Model):
    choices = [] # finish inputting
    name = models.CharField(choices = choices, max_length = 255, default = 'none')

class User(models.Model):
    majorChoices = [
        ('AFS', 'Africana Studies'),
        ('ANT', 'Anthropology'),
        ('AMS', 'Applied Mathematics and Statistics')
    ] # finish inputting majors and major codes
    clubChoices = [] # finish inputting
    firstName = models.CharField(max_length = 255)
    lastName = models.CharField(max_length = 255)
    bio = models.CharField(max_length = 255)
    major = models.CharField(choices = majorChoices, max_length = 255, default = 'Undecided') # will change defaults later
    userinterest = models.ManyToManyField(InterestModel)
    clubs = models.CharField(choices = clubChoices, max_length = 255, default = 'none')
    points = models.PositiveIntegerField()
    '''eventsWentTo = make a computed property'''
    residentialStatus = models.CharField(choices = [('RES', 'Residential'), ('COM', 'Commuter')], max_length = 255, default = 'Residental')
    '''calendar = foreignkey to a calendar model (ISSUE)'''
    standing = models.CharField(choices = [('FRE', 'Freshman'), ('SOP', 'Sophomore'), ('JUN', 'Junior'), ('SEN', 'Senior')], max_length = 255, default = 'Freshman')
    # work on google auth stuff

class Event(models.Model):
    locationChoices = [] #finish inputting
    name = models.CharField(max_length = 30)
    description = models.CharField(max_length = 255)
    interestTag = models.ManyToManyField(InterestModel, blank = True)
    maxCapacity = models.PositiveIntegerField(default = 10)
    # invites = manytomanyfield of a new custom invite model
    location = models.CharField(choices=locationChoices, max_length = 255, default = 'Student Activity Center')
    eventType = models.CharField(choices = [('S', 'Social'), ('B', 'Bike'), ('W', 'Walk')], max_length = 255, default = 'Social') # add other types later
    eventDate = models.DateTimeField(default = timezone.now)
    owner = models.ForeignKey(User, on_delete = models.CASCADE) #Fix this default
    publicStatus = models.CharField(choices = [('PUB','Public'), ('PRI','Private')], max_length = 255, default = 'Public')
    # chats = 