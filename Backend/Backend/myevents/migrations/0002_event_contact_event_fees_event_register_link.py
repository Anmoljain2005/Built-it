# Generated by Django 5.1.4 on 2025-03-23 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myevents', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='contact',
            field=models.EmailField(default='info@iitindore.ac.in', max_length=254),
        ),
        migrations.AddField(
            model_name='event',
            name='fees',
            field=models.CharField(default='Free Entry', max_length=255),
        ),
        migrations.AddField(
            model_name='event',
            name='register_link',
            field=models.URLField(blank=True, default='#', null=True),
        ),
    ]
