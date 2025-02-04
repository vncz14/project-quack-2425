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
  publicStatus = models.CharField(max_length=30, choices=[('Open'), ('Closed')])
  # having invites as a many to many field here is redundant and unnecessary

  # TAGS
  # interestTags = models.ForeignKey(Users.interests)
  eventTags = models.CharField(max_length=30, default='OTHER', choices=[
    ('Social'), ('Sport'), ('Hobby'), ('Other')
    ])
  
class Invite(models.Model):
  sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_invites')
  receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_invites')
  event = models.ForeignKey(Event, on_delete=models.CASCADE)

  def __str__(self):
    return f'Invite from {self.sender} to {self.receiver} for {self.event}'

class EventAttendance(models.Model): # Handles event attendance of both invited and non invited people (in the case of a public event where a person doesn't need to be invited)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    attendee = models.ForeignKey(User, on_delete=models.CASCADE)
    rsvp_status = models.CharField(max_length=30, choices=[('confirmed'), ('pending'), ('denied')]) # Pending should only apply to invites. Anyone can confirm or deny if event is pub, only invited users can if event is private (NOT IMPLEMENTED YET)
    invite = models.ForeignKey(Invite, on_delete=models.SET_NULL, null=True, blank=True) # For public events (non invited participants), this will be null

    class Meta:
        unique_together = ('event', 'attendee') # Meta option that ensures unique pairing (attendee can not attend event multiple times)