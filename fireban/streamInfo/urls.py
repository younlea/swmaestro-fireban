from django.contrib import admin
from django.urls import path

from streamInfo.views import ActiveInfo, Info, StreamActive, Uri, start_stream, stop_stream


def fake_view(*args, **kwargs):
    """ This view should never be called because the URL paths
        that map here will be served by nginx directly.
    """
    raise Exception("This should never be called!")


urlpatterns = [
    path('info', Info.as_view(), name='stream-info'),
    path('info/active', ActiveInfo.as_view(), name='stream-info-active'),
    path('url/<target>', Uri.as_view(), name='stream-uri'),
    path("start_stream", start_stream, name="start-stream"),
    path("stop_stream", stop_stream, name="stop-stream"),
    path("live/<username>/index.m3u8", fake_view, name="hls-url"),
    path('check', StreamActive.as_view(), name="check-stream")
]