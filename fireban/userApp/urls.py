from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from userApp.views import Register, UserViewSet

urlpatterns = [
    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # 로그인 > access/refresh token 발급
    path('register', Register.as_view(), name='register'),
    # 회원가입
    path('refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('user', UserViewSet.as_view(), name='get_user_info'),
    # 토큰 갱신
]
