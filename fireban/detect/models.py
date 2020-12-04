from django.utils import timezone

from django.db import models

# Create your models here.
from hwInfo.models import Product


class TargetImage(models.Model):
    target = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True, default=None,
                               verbose_name="대상 기기")
    path = models.CharField(max_length=254, unique=True, verbose_name="이미지 파일 경로")
    createAt = models.DateTimeField(default=timezone.now, verbose_name="파일 생성일")
    isUpdated = models.BooleanField(default=False)

    class Meta:
        verbose_name = "원본 이미지"
        verbose_name_plural = "원본 이미지"

    def __str__(self):
        return self.path


class TargetDetection(models.Model):
    targetImage = models.ForeignKey(TargetImage, on_delete=models.CASCADE, related_name="target_detection", blank=True, null=True, default=None,
                               verbose_name="대상 이미지")
    detectType = models.IntegerField(default=0, null=True, blank=True, verbose_name="타겟 종류")
    xmin = models.FloatField(default=0, null=True, blank=True, verbose_name="xmin")
    ymin = models.FloatField(default=0, null=True, blank=True, verbose_name="ymin")
    xmax = models.FloatField(default=0, null=True, blank=True, verbose_name="xmax")
    ymax = models.FloatField(default=0, null=True, blank=True, verbose_name="ymax")
    createAt = models.DateTimeField(default=timezone.now, verbose_name="탐지 생성일")
    isUpdated = models.BooleanField(default=False)

    class Meta:
        verbose_name = "탐지 결과"
        verbose_name_plural = "탐지 결과"

    def __str__(self):
        return str(self.createAt)

    @property
    def width(self):
       return self.xmax - self.xmin

    @property
    def height(self):
       return self.ymax - self.ymin


class DetectionInfo(models.Model):
    target = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name="대상 기기")
    imageRaw = models.TextField()
    width = models.FloatField(default=0, null=True, blank=True, verbose_name="width")
    height = models.FloatField(default=0, null=True, blank=True, verbose_name="height")
    xmin = models.FloatField(default=0, null=True, blank=True, verbose_name="xmin")
    ymin = models.FloatField(default=0, null=True, blank=True, verbose_name="ymin")
    xmax = models.FloatField(default=0, null=True, blank=True, verbose_name="xmax")
    ymax = models.FloatField(default=0, null=True, blank=True, verbose_name="ymax")
    createAt = models.DateTimeField(default=timezone.now, verbose_name="탐지 생성일")
    detectType = models.IntegerField(default=0, null=True, blank=True, verbose_name="타겟 종류")
    isUpdated = models.BooleanField(default=False)


    class Meta:
        verbose_name = "탐지 결과 (새 모델)"
        verbose_name_plural = "탐지 결과 (새 모델)"

    def __str__(self):
        return str(self.createAt)
