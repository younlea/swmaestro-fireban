from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager


class User(AbstractUser):
    objects = UserManager()
    userid = models.CharField(max_length=16, null=True, unique=True, verbose_name="사용자 ID")
    username = models.CharField(max_length=16, null=True, unique=False)
    name = models.CharField(max_length=16, null=True, verbose_name="사용자 이름")
    createdAt = models.DateTimeField(auto_now_add=True, verbose_name="계정 생성 일시")
    activeAt = models.DateTimeField(auto_now_add=False, null=True, default=None, verbose_name="계정 활성화 일시")
    is_active = models.BooleanField(default=False, verbose_name="계정 활성화")
    is_admin = models.BooleanField(default=False, verbose_name="권한 : 관리자")
    is_superuser = models.BooleanField(default=False, verbose_name="권환 : 최고관리자")

    USERNAME_FIELD = 'userid'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.userid



