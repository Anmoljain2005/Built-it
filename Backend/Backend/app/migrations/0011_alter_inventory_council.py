# Generated by Django 5.1.4 on 2025-03-20 09:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_alter_club_id_alter_clubmembership_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventory',
            name='council',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='inventories', to='app.council'),
        ),
    ]
