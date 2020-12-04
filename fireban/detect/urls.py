from django.urls import path
from detect.views import DetectImageInfoDetail, DetectImageInfoList, DetectInfoUpdate, FindDetection

urlpatterns = [
    path('list/<int:page_param>', DetectImageInfoList.as_view(), name='tic_record_done'),
    # tic_record_done
    path('info/<str:target>', DetectImageInfoDetail.as_view(), name='stream_record_done'),
    # stream_record_done
    path('update/', DetectInfoUpdate.as_view()),
    path('find/', FindDetection.as_view()),


]
