from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=30, null=False)


# Create your models here.
