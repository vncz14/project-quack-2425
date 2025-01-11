from django.db import models
from django.core.validators import MaxValueValidator

# Create your models here.

class User(models.Model):
  username = models.CharField(max_length=30, null=False)
  def greeting(self):
    return "Hello " + self.username

class Event(models.Model):
  eventName = models.CharField(max_length=30, null=False)
  host = models.ForeignKey(User, on_delete=models.CASCADE)
  description = models.CharField(max_length=999, null=True, editable=True)
  maxCapacity = models.PositiveIntegerField(validators=[MaxValueValidator(250)])
  eventDate = models.DateTimeField(null=False)
  publicStatus = models.CharField(max_length=30, choices=[('OPEN','Open'), ('CLOSED','Closed')])
  invites = models.ManyToManyField(User, through='Invite', related_name='events_invited_to', through_fields=('event', 'receiver'))

  # TAGS
  # interestTags = modecls.ForeignKey(Users.interests)
  eventTags = models.CharField(max_length=30, default='OTHER', choices=[
    ('SOCIAL','Social'), ('SPORT','Sport'), ('HOBBY','Hobby'), ('OTHER', 'Other')
    ])
  
class Invite(models.Model):
  sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_invites')
  receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_invites')
  event = models.ForeignKey(Event, on_delete=models.CASCADE)

  def __str__(self):
    return f'Invite from {self.sender} to {self.receiver} for {self.event}'