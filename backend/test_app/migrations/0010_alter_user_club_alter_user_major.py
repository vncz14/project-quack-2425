# Generated by Django 5.1.2 on 2025-01-08 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('test_app', '0009_remove_user_club_remove_user_major_user_club_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='club',
            field=models.ManyToManyField(blank=True, to='test_app.club'),
        ),
        migrations.AlterField(
            model_name='user',
            name='major',
            field=models.ManyToManyField(blank=True, to='test_app.major'),
        ),
    ]