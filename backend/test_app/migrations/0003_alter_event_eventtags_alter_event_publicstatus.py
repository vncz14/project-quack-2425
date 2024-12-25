# Generated by Django 5.1.4 on 2024-12-24 22:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('test_app', '0002_event_description_event_eventdate_event_eventtags_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='eventTags',
            field=models.CharField(choices=[('SOCIAL', 'Social'), ('SPORT', 'Sport'), ('HOBBY', 'Hobby'), ('OTHER', 'Other')], default='OTHER', max_length=30),
        ),
        migrations.AlterField(
            model_name='event',
            name='publicStatus',
            field=models.CharField(choices=[('OPEN', 'Open'), ('CLOSED', 'Closed')], max_length=30),
        ),
    ]