from django.db import models
from functools import partial
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.urls import reverse
from django.utils.crypto import get_random_string
from hwInfo.models import Product

make_stream_key = partial(get_random_string, 20)


class Stream(models.Model):
    target = models.OneToOneField(
        Product, related_name="stream", on_delete=models.CASCADE, null=True, verbose_name="스트리밍 대상 기기")
    key = models.CharField(max_length=20, default=make_stream_key, unique=True, verbose_name="스트리밍 접근 키")
    isActive = models.BooleanField(default=False, verbose_name="스트리밍 상태")
    startedAt = models.DateTimeField(null=True, blank=True, verbose_name="스트리밍 시작 일시")
    finishedAt = models.DateTimeField(null=True, blank=True, verbose_name="스트리밍 종료 일시")


    class Meta:
        verbose_name = "스트리밍 상태"
        verbose_name_plural = "스트리밍 상태"


    def __str__(self):
        return self.target.name

    @property
    def tic_url(self):
        return "/api/stream/tic/"+self.key+"/index.m3u8"

    @property
    def hls_url(self):
        return reverse("hls-url", args=(self.key,))


@receiver(post_save, sender=Product, dispatch_uid="create_stream_for_user")
def create_stream_for_product(sender, instance=None, created=False, **kwargs):
    """ Create a stream for new users.
    """
    if created:
        Stream.objects.create(target=instance)