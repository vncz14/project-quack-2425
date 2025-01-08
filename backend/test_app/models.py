from django.db import models
from django.core.validators import MaxValueValidator

# Create your models here.

class Location(models.Model): #How can I make sure only one location is chosen?
  name = models.CharField(max_length=255)

  def __str__(self):
    return self.name

class Major(models.Model): #How can I make sure no more than 2 majors are chosen?
  name = models.CharField(max_length=255)

  def __str__(self):
    return self.name

class Club(models.Model): #How can I make sure a limit of ~10 clubs are chosen?
  name = models.CharField(max_length=255)

  def __str__(self):
    return self.name

class User(models.Model):
  username = models.CharField(max_length=30, null=False)
  major = models.ForeignKey(Major, on_delete=models.SET_NULL, null=True)
  club = models.ForeignKey(Club, on_delete=models.SET_NULL, null=True) # associated clubs/clubs they are in
  def greeting(self):
    return "Hello " + self.username

  def __str__(self):
    return self.username
  

class Event(models.Model):
  eventName = models.CharField(max_length=30, null=False)
  host = models.ForeignKey(User, on_delete=models.CASCADE)
  description = models.CharField(max_length=999, null=True, editable=True)
  maxCapacity = models.PositiveIntegerField(validators=[MaxValueValidator(250)])
  eventDate = models.DateTimeField(null=False)
  publicStatus = models.CharField(max_length=30, choices=[('OPEN','Open'), ('CLOSED','Closed')])
  location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True) #on_delete=models.SET_NULL means if a Location is deleted from databse, the Event will still exist but won't have any value in location field

  def __str__(self):
    return self.eventName

  # TAGS
  # interestTags = models.ForeignKey(Users.interests)
  eventTags = models.CharField(max_length=30, default='OTHER', choices=[
    ('SOCIAL','Social'), ('SPORT','Sport'), ('HOBBY','Hobby'), ('OTHER', 'Other')
    ])