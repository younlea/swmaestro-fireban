# Generated by Django 3.0.8 on 2020-10-14 05:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('detect', '0004_auto_20201002_1719'),
    ]

    operations = [
        migrations.AddField(
            model_name='targetdetection',
            name='isUpdated',
            field=models.BooleanField(default=False),
        ),
    ]