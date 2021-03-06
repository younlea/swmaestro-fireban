# Generated by Django 3.0.8 on 2020-10-01 04:50

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('userid', models.CharField(max_length=16, null=True, unique=True, verbose_name='사용자 ID')),
                ('username', models.CharField(max_length=16, null=True)),
                ('name', models.CharField(max_length=16, null=True, verbose_name='사용자 이름')),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='계정 생성 일시')),
                ('activeAt', models.DateTimeField(default=None, null=True, verbose_name='계정 활성화 일시')),
                ('is_active', models.BooleanField(default=False, verbose_name='계정 활성화')),
                ('is_admin', models.BooleanField(default=False, verbose_name='권한 : 관리자')),
                ('is_superuser', models.BooleanField(default=False, verbose_name='권환 : 최고관리자')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
    ]
