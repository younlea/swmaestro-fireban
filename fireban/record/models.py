from django.utils import timezone
from django.db import models

# Create your models here.
from hwInfo.models import Product


class TicRecord(models.Model):
    target = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name="대상 기기")

    name = models.CharField(max_length=254, unique=True, verbose_name="영상 파일 이름")
    createAt = models.DateTimeField(default=timezone.now, verbose_name="파일 생성일")

    class Meta:
        verbose_name = "열화상 영상"
        verbose_name_plural = "열화상 영상"

    def __str__(self):
        return self.name


class StreamRecord(models.Model):
    target = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name="대상 기기")
    name = models.CharField(max_length=254, unique=True, verbose_name="영상 파일 이름")
    createAt = models.DateTimeField(default=timezone.now, verbose_name="파일 생성일")

    class Meta:
        verbose_name = "실화상 영상"
        verbose_name_plural = "실화상 영상"

    def __str__(self):
        return self.name
