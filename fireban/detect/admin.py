from django.contrib import admin
from .models import DetectionInfo, TargetImage, TargetDetection




@admin.register(TargetImage)
class TargetImageAdmin(admin.ModelAdmin):
    list_display = ['pk', 'path', 'createAt']
    list_display_links = ['pk', 'path', 'createAt']
    list_per_page = 20

@admin.register(TargetDetection)
class TargetDetectionAdmin(admin.ModelAdmin):
    list_display = ['pk', 'createAt']
    list_display_links = ['pk', 'createAt']
    list_per_page = 20

@admin.register(DetectionInfo)
class DetectionNewAdmin(admin.ModelAdmin):
    list_display = ['pk', 'createAt']
    list_display_links = ['pk', 'createAt']
    list_per_page = 20


# Register your models here.
