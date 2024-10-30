from django.db import models
from django.utils import timezone

class InterestModel(models.Model):
    interestChoices = [] # finish inputting
    interest = models.CharField(choices=interestChoices, max_length=255, default= ('N', 'None'))

class User(models.Model):
    majorChoices = [
        ('AFS', 'Africana Studies'),
        ('ANT', 'Anthropology'),
        ('AMS', 'Applied Mathematics and Statistics')
    ] # finish inputting majors and major codes
    clubChoices = [] # finish inputting
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    bio = models.CharField(max_length=255)
    major = models.CharField(choices=majorChoices, max_length=255, default = ('AFS', 'Africana Studies')) # will change defaults later
    userinterest = models.ManyToManyField(InterestModel)
    clubs = models.CharField(choices=clubChoices, max_length=255, default = ('N', 'None'))
    points = models.PositiveIntegerField()
    '''eventsWentTo = make a computed property'''
    residentialStatus = models.CharField(choices=[('RES', 'Residential'), ('COM', 'Commuter')], max_length=255, default = ('RES', 'Residential'))
    '''calendar = foreignkey to a calendar model (ISSUE)'''
    standing = models.CharField(choices=[('FRE', 'Freshman'), ('SOP', 'Sophomore'), ('JUN', 'Junior'), ('SEN', 'Senior')], max_length=255, default = ('FRE', 'Freshman'))
    # work on google auth stuff

class Event(models.Model):
    locationChoices = [] #finish inputting
    name = models.CharField(max_length=30, null=False)
    description = models.CharField(max_length=255, null=True, editable=True)
    interestTag = models.ManyToManyField(InterestModel, default = ('N', 'None'))
    maxCapacity = models.PositiveIntegerField(default = 10)
    '''invites = manytomanyfield of a new custom invite model'''
    location = models.CharField(choices=locationChoices, max_length=255, default = ('SAC', 'Student Activity Center'))
    eventType = models.CharField(choices=[('S', 'Social'), ('B', 'Bike'), ('W', 'Walk')], max_length=255, default = ('S', 'Social')) # add other types later
    eventDate = models.DateTimeField(default = timezone.now)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default = ('N', 'None')) #Fix this default
    publicStatus = models.CharField(choices=[('PUB','Public'), ('PRI','Private')], max_length=255, default = ('PUB', 'Public'))
    # chats = 