import numpy
from django.shortcuts import render
from PIL import Image
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import json
from detect.models import DetectionInfo, TargetDetection, TargetImage
from detect.serializers import DetectImageDetailSerializer, DetectImageListSerializer
from fireban.settings import PAGE_CONTENTS_NUM
from hwInfo.models import Location, Product
from hwInfo.serializers import LocationSerializer
from datetime import date, datetime
import os
import base64
class DetectImageInfoList(APIView):
    def get(self, request, page_param):
        queryset = TargetImage.objects.all().order_by('-pk')[(int(page_param) - 1) * PAGE_CONTENTS_NUM:(int(page_param) - 1) * PAGE_CONTENTS_NUM + PAGE_CONTENTS_NUM]
        serializer = DetectImageListSerializer(queryset, many=True)
        return Response({"message": serializer.data, "page": page_param}, status=status.HTTP_200_OK)


class DetectImageInfoDetail(APIView):
    def get(self, request, target):
        queryset = TargetImage.objects.get(pk=target)
        targetProduct = queryset.target
        targetCreatedAt = queryset.createAt

        defaultSerializer = DetectImageDetailSerializer(queryset)
        closest_greater_qs = Location.objects.filter(target=targetProduct, updatedAt__gte=targetCreatedAt).order_by('updatedAt')
        closest_less_qs = Location.objects.filter(target=targetProduct, updatedAt__lte=targetCreatedAt).order_by('-updatedAt')

        try:
            try:
                closest_greater = closest_greater_qs[0]
            except IndexError:
                serializer = LocationSerializer(closest_less_qs[0])
                return Response({"message": defaultSerializer.data, "gps": serializer.data}, status=status.HTTP_200_OK)

            try:
                closest_less = closest_less_qs[0]
            except IndexError:
                serializer = LocationSerializer(closest_greater_qs[0])
                return Response({"message": defaultSerializer.data, "gps": serializer.data}, status=status.HTTP_200_OK)
        except IndexError:
            raise self.model.DoesNotExist("There is no closest object"
                                          " because there are no objects.")

        if closest_greater.updatedAt.replace(tzinfo=None) - targetCreatedAt.replace(tzinfo=None) > targetCreatedAt.replace(
                tzinfo=None) - closest_less.updatedAt.replace(tzinfo=None):
            serializer = LocationSerializer(closest_less)
        else:
            serializer = LocationSerializer(closest_greater)

        return Response({"message": defaultSerializer.data, "gps": serializer.data}, status=status.HTTP_200_OK)


class DetectInfoUpdate(APIView):
    def post(self, request):
        if 'targetKey' not in request.data or 'target' not in request.data:
            return Response({"message": "key is not valid"}, status=status.HTTP_400_BAD_REQUEST)
        targetKey = request.data['targetKey']
        target = request.data['target']
        if targetKey is None or target is None:
            return Response({"message": "key are not valid"}, status=status.HTTP_403_FORBIDDEN)

        try:
            checkTarget = TargetImage.objects.get(pk=targetKey)
            delTarget = TargetDetection.objects.filter(targetImage=checkTarget)
            delTarget.delete()
            for i in target:
                TargetDetection.objects.create(targetImage=checkTarget, xmin=i['x'], ymin=i['y'],
                                               xmax=int(i['x'])+int(i['width']), ymax=int(i['y'])+int(i['height']),
                                               detectType=i['type'], isUpdated=True
                                               )
            queryset = TargetImage.objects.get(pk=targetKey)
            checkTarget.isUpdated=True
            checkTarget.save()
            serializer = DetectImageDetailSerializer(queryset)
            return Response({"message": serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response({"message": "not valid target"}, status=status.HTTP_403_FORBIDDEN)


class FindDetection(APIView):
    def post(self, request):
        print('mac: ' + request.data['mac'])
        print('type: ' + request.data['type'])
        if 'mac' not in request.data or 'image' not in request.data:
            return Response({"message": "key is not valid"}, status=status.HTTP_400_BAD_REQUEST)
        print('plz') 
        mac = request.data['mac']
        image = request.data['image']
        width = request.data['width']
        height = request.data['height']
        min_x = request.data['min_x']
        min_y = request.data['min_y']
        max_x = request.data['max_x']
        max_y = request.data['max_y']
        detectType = request.data['type']
        print('asdf')
        if detectType == "1":
            try:

                queryset = Product.objects.get(mac=mac)
                print(55)
                img_byte = bytes.fromhex(image)
                image = Image.frombytes('RGBA', (240, 320), img_byte)
                pix = numpy.array(image.getdata()).reshape(image.size[0], image.size[1], 4)
                image_np = numpy.zeros(pix.shape, dtype=int)
                image_np[:, :, 0:3] = pix[:, :, 1:4];
                image_np[:, :, 3] = pix[:, :, 0]
                image = Image.fromarray(image_np.astype('uint8'), 'RGBA')
                now = datetime.today()
                imageNmae = queryset.authKey+'-'+'1604468341'+'-'+now.strftime('%Y%m%d%H%M%S')+'.png'


                if not os.path.exists('/var/www/output/origin/'+queryset.authKey):
                    os.makedirs('/var/www/output/origin/'+queryset.authKey)
                print(6)
                image.save('/var/www/output/origin/'+queryset.authKey+'/'+imageNmae)



                print(1)
                newImage = TargetImage.objects.create(target=queryset, path = '/output/origin/' +queryset.authKey + '/'+imageNmae)
                print(2)
                TargetDetection.objects.create(targetImage=newImage, detectType=detectType, xmin=min_x, ymin=min_y, xmax=max_x, ymax=max_y)

                return Response({"message": "success"}, status=status.HTTP_200_OK)

            except:
                return Response({"message": "not valid data"}, status=status.HTTP_403_FORBIDDEN)
        elif detectType == "0":
            try:
                queryset = Product.objects.get(mac=mac)
                img_bytes = base64.b64decode(image)
                image = Image.frombytes('RGBA', (320, 240), img_bytes)
                #pix = numpy.array(image.getdata()).reshape(image.size[0], image.size[1], 4)
                #image_np = numpy.zeros(pix.shape, dtype=int)
                #image_np[:, :, 0:3] = pix[:, :, 1:4];
                #image_np[:, :, 3] = pix[:, :, 0]
                #image = Image.fromarray(image_np.astype('uint8'), 'RGBA')
                now = datetime.today()
                imageName = queryset.authKey + '-' + '1604468341' + '-' + now.strftime('%Y%m%d%H%M%S') + '.png'
                if not os.path.exists('/var/www/detect/' + now.strftime('%Y%m%d')):
                    os.makedirs('/var/www/detect/' + now.strftime('%Y%m%d'))
                image.save('/var/www/detect/' + now.strftime('%Y%m%d') + '/' + imageName)
                print("saved")
                return Response({"message": "success"}, status=status.HTTP_200_OK)
            except:
                return Response({"message": "not valid data"}, status=status.HTTP_403_FORBIDDEN)

        else:
            return Response({"message": "not valid data"}, status=status.HTTP_403_FORBIDDEN)
