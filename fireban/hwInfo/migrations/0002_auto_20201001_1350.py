# Generated by Django 3.0.8 on 2020-10-01 04:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hwInfo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='manager',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='담당자'),
        ),
        migrations.AddField(
            model_name='location',
            name='target',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hwInfo.Product', verbose_name='대상 기기'),
        ),
    ]