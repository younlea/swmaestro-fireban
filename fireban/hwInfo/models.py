from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
import requests
import json
from fireban import settings
from fireban.settings import KAKAOMAP_KEY


class Product(models.Model):
    manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, verbose_name="담당자")
    # 담당자
    name = models.CharField(max_length=100, blank=True, verbose_name="기기 명")
    # 기기 이름
    mac = models.CharField(max_length=200, unique=True, verbose_name="기기 MAC 주소")
    # 고유 식별 번호 - mac 주소
    authKey = models.CharField(max_length=20, blank=True, null=True, verbose_name="인증 키")
    # 인증 키 번호
    isPower = models.BooleanField(default=False, verbose_name="전원 상태")
    # 파워 상태
    isActive = models.BooleanField(default=False, verbose_name="기기 활성화")
    # 기기 활성화 상태
    createAt = models.DateTimeField(default=timezone.now, verbose_name="기기 생성일")
    # 생성일
    activeAt = models.DateTimeField(default=timezone.now, verbose_name="기기 등록일")
    # 등록일
    isPower_date = models.DateTimeField(default=timezone.now, verbose_name="전원 상태 업데이트 일시")
    # isPower 변경 시간

    class Meta:
        verbose_name = "제품(카메라) 상태"
        verbose_name_plural = "제품(카메라) 상태"

    def __str__(self):
        return self.name


class Location(models.Model):
    target = models.ForeignKey(Product,  on_delete=models.CASCADE, verbose_name="대상 기기")
    cordinateX = models.FloatField(max_length=50, blank=True, verbose_name="x좌표")
    # X좌표
    cordinateY = models.FloatField(max_length=50, blank=True, verbose_name="y좌표")
    altValue = models.FloatField(default=0, blank=True, verbose_name="고도")
    updatedAt = models.DateTimeField(default=timezone.now, verbose_name="최신 위치")
    # Y좌표

    class Meta:
        verbose_name = "GPS"
        verbose_name_plural = "GPS"

    @property
    def location(self):
        y = self.cordinateX
        x = self.cordinateY

        url = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?input_cood=WGS85&x=" + str(x) + "&y=" + str(y)
        headers = {"Authorization": "KakaoAK " + KAKAOMAP_KEY}
        try:
            api_test = requests.get(url, headers=headers)
            url_text = json.loads(api_test.text)
            return url_text['documents'][0]['address_name']

        except:
            return "invalid gps"