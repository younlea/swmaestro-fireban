from datetime import datetime

from django.utils import timezone
from django.utils.crypto import get_random_string
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from hwInfo.models import Location, Product
from hwInfo.serializers import HWSerializer, LocationSerializer
from streamInfo.models import Stream



class Info(APIView):
    @permission_classes((IsAuthenticated,))
    def get(self, request):
        queryset = Product.objects.all()
        serializer = HWSerializer(queryset, many=True)
        # user_pk = get_authorization_header(request)
        # print(user_pk)
        return Response({"message": serializer.data}, status=status.HTTP_200_OK)





class Init(APIView):
    @permission_classes((AllowAny,))
    def post(self, request):
        if 'mac' not in request.data:
            return Response({"message": "mac is not valid"}, status=status.HTTP_400_BAD_REQUEST)
        mac = request.data['mac']
        if mac is None:
            return Response({"message": "mac are not valid"}, status=status.HTTP_403_FORBIDDEN)
        # input & param check
        try:
            # 기존 등록된 장비가 존재할 경우
            queryset = Product.objects.get(mac=mac)
            if (queryset.isActive is True):
                # actvie => 관리자가 등록 했을 경우
                newKey = get_random_string(20)
                queryset.authKey = newKey
                queryset.save()
                # hw 새로운 키 발급
                stream_queryset = Stream.objects.get(target=queryset)
                stream_queryset.key = newKey
                stream_queryset.save()
                # stream 새로운 키 발급
                return Response({"message": "active", "key": newKey}, status=status.HTTP_200_OK)
            else:
                # inactvie => 관리자가 등록하지 안았을 경우
                return Response({"message": "not active"}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            # 기존 등록된 장비가 존재하지 않을 경우
            Product.objects.create(mac=mac)
            return Response({"message": "created"}, status=status.HTTP_201_CREATED)



class GetGpsTargetInfo(APIView):
    @permission_classes((IsAuthenticated,))
    @csrf_exempt
    def get(self, request, target):
        # get device gps info
        # if 'target' not in request.data:
        #     return Response({"message": "invalid data input"}, status=status.HTTP_400_BAD_REQUEST)
        # target = request.data['target']
        if target is None:
            return Response({"message": "not invalid data input"}, status=status.HTTP_403_FORBIDDEN)
        try:
            # 기존 등록된 장비가 존재할 경우
            queryset = Product.objects.get(authKey=target)

            if (queryset.isActive is True):

                # LocationSerializer
                gpsInfo = Location.objects.filter(target=queryset).order_by('-pk')[0]
                serializer = LocationSerializer(gpsInfo)

                return Response({"message": serializer.data}, status=status.HTTP_200_OK)

            else:
                # inactvie => 관리자가 등록하지 안았을 경우
                return Response({"message": "not active"}, status=status.HTTP_401_UNAUTHORIZED)

        except:
            return Response({"message": "not valid data"}, status=status.HTTP_403_FORBIDDEN)

# @csrf_exempt
class GpsHandler(APIView):
    @permission_classes((AllowAny,))
    @csrf_exempt
    def post(self, request):
        # edit device gps info
        if 'mac' not in request.data or 'cordinate_x' not in request.data or 'cordinate_y' not in request.data:
            return Response({"message": "invalid data input"}, status=status.HTTP_400_BAD_REQUEST)
        mac = request.data['mac']
        cordinate_x = request.data['cordinate_x']
        cordinate_y = request.data['cordinate_y']
        altValue = request.data['alt']
        if mac is None or cordinate_x is None or cordinate_y is None:
            return Response({"message": "not invalid data input"}, status=status.HTTP_403_FORBIDDEN)
        # input & param check

        try:
            # 기존 등록된 장비가 존재할 경우
            queryset = Product.objects.get(mac=mac)
            Location.objects.create(target=queryset, cordinateX=cordinate_x, cordinateY=cordinate_y, altValue=altValue,
                                    updatedAt=timezone.now())

            return Response({"message": "success"}, status=status.HTTP_200_OK)


        except:
            return Response({"message": "not valid data"}, status=status.HTTP_403_FORBIDDEN)


@permission_classes((AllowAny,))
class GetGpsRecord(APIView):
    def post(self, request):
        if 'mac' not in request.data or 'createdAt' not in request.data:
            return Response({"message": "invalid data input"}, status=status.HTTP_400_BAD_REQUEST)
        mac = request.data['mac']
        createdAt = request.data['createdAt']

        date = datetime.strptime(createdAt, '%Y-%m-%d %H:%M:%S')
        print(createdAt)
        print(date)

        queryset = Product.objects.get(mac=mac)

        closest_greater_qs = Location.objects.filter(target=queryset, updatedAt__gte=date).order_by('updatedAt')
        closest_less_qs = Location.objects.filter(target=queryset, updatedAt__lte=date).order_by('-updatedAt')

        try:
            try:
                closest_greater = closest_greater_qs[0]
            except IndexError:
                serializer = LocationSerializer(closest_less_qs[0])
                return Response({"message": serializer.data}, status=status.HTTP_200_OK)

            try:
                closest_less = closest_less_qs[0]
            except IndexError:
                serializer = LocationSerializer(closest_greater_qs[0])
                return Response({"message": serializer.data}, status=status.HTTP_200_OK)
        except IndexError:
            raise self.model.DoesNotExist("There is no closest object"
                                          " because there are no objects.")

        if closest_greater.updatedAt.replace(tzinfo=None) - date.replace(tzinfo=None) > date.replace(tzinfo=None) - closest_less.updatedAt.replace(tzinfo=None):
            serializer = LocationSerializer(closest_less)
        else:
            serializer = LocationSerializer(closest_greater)


        return Response({"message": serializer.data}, status=status.HTTP_200_OK)
