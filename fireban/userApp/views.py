from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Prefetch
from userApp.models import User
from userApp.serializers import UserSerializer
from userApp.utils import get_authorization_header


class Register(APIView):
    # 회원가입
    @permission_classes((AllowAny,))
    @csrf_exempt
    def post(self, request):
        if 'userid' not in request.data or 'name' not in request.data or 'password' not in request.data:
            return Response({"message": "모든 정보를 입력해 주세요."}, status=status.HTTP_403_FORBIDDEN)
        # 파라미터 검증

        userid = request.data['userid']
        password = request.data['password']
        name = request.data['name']

        if not userid or not password or not name:
            return Response({"message": "모든 정보를 입력해 주세요."}, status=status.HTTP_403_FORBIDDEN)

        # value 검증
        try:
            # 사용자 아이디 중복 검사 로직
            user = get_user_model().objects.get(userid=userid)
            return Response({"message": "해당 아이디는 이미 사용중입니다."}, status=status.HTTP_403_FORBIDDEN)
        except:
            try:
                user = User.objects.create_user(userid=userid, password=password, name=name)
                user.save()
                return Response({"message": "회원가입이 완료되었습니다. 관리자 승인 후 로그인할 수 있습니다."}, status=status.HTTP_200_OK)
            # 사용자 생성 완료.
            except:
                return Response({"message": "회원가입에 실패하였습니다. 관리자에게 문의해주세요."}, status=status.HTTP_403_FORBIDDEN)
                #오류 관리


class UserViewSet(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user_id = get_authorization_header(request)
        queryset = get_user_model().objects.filter(id=user_id)
        if not queryset:
            return Response({"message" : "no user"}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(queryset,  many=True)

        return Response({"message": serializer.data[0]}, status=status.HTTP_200_OK)
