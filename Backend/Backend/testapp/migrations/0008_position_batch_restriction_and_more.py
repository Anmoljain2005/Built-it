# Generated by Django 5.1.4 on 2025-03-17 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0007_election_display_election_election_display_results'),
    ]

    operations = [
        migrations.AddField(
            model_name='position',
            name='batch_restriction',
            field=models.CharField(choices=[('All Batches', 'All Batches'), ('1st Year', '1st Year'), ('2nd Year', '2nd Year'), ('3rd Year', '3rd Year'), ('4th Year', '4th Year')], default='All Batches', help_text='Only students from the selected batch can vote.', max_length=20),
        ),
        migrations.AddField(
            model_name='position',
            name='branch_restriction',
            field=models.CharField(choices=[('All Branches', 'All Branches'), ('CSE', 'CSE'), ('MECH', 'MECH'), ('CIVIL', 'CIVIL'), ('EE', 'EE'), ('EP', 'EP'), ('SSE', 'SSE'), ('MEMS', 'MEMS'), ('MNC', 'MNC'), ('MSC', 'MSC'), ('PHD', 'PHD')], default='All Branches', help_text='Only students from the selected branch can vote.', max_length=20),
        ),
    ]
