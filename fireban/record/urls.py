from django.urls import path
from record.views import StreamRecordDetailInfo, TicRecordDetailInfo, stream_record, tic_record, TicRecordInfo, \
    StreamRecordInfo
from userApp.views import Register

urlpatterns = [
    path('tic_done/<str:name>', tic_record, name='tic_record_done'),
    # tic_record_done
    path('stream_done/<str:name>', stream_record, name='stream_record_done'),
    # stream_record_done
    path('tic/<int:page_param>', TicRecordInfo.as_view(), name='tic_record_all'),
    path('stream/<int:page_param>', StreamRecordInfo.as_view(), name='tic_record_all'),
    path('tic/detail/<str:target>', TicRecordDetailInfo.as_view()),
    path('stream/detail/<str:target>', StreamRecordDetailInfo.as_view())

]
