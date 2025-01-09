# Generated by Django 5.1.2 on 2025-01-08 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('test_app', '0005_club_location_major_user_club_event_location_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='bio',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='points',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='residentialStatus',
            field=models.CharField(choices=[('RES', 'Residential'), ('COM', 'Commuter')], default='Residental', max_length=255),
        ),
        migrations.AddField(
            model_name='user',
            name='standing',
            field=models.CharField(choices=[('FRE', 'Freshman'), ('SOP', 'Sophomore'), ('JUN', 'Junior'), ('SEN', 'Senior')], default='Freshman', max_length=255),
        ),
    ]
