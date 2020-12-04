from django.urls import path

from hwInfo.views import GetGpsRecord, GetGpsTargetInfo, Info, Init, GpsHandler

urlpatterns = [
    path('info', Info.as_view(), name='hw-info'),
    path('init', Init.as_view(), name="hw-init"),
    path('gps', GpsHandler.as_view(), name="hw-gps"),
    path('gps/check/<str:target>', GetGpsTargetInfo.as_view(), name="hw-gps"),
    path('gps/record', GetGpsRecord.as_view())
]