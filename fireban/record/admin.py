from django.contrib import admin
from .models import TicRecord, StreamRecord




@admin.register(TicRecord)
class TicRecordAdmin(admin.ModelAdmin):
    list_display = ['name', 'createAt']
    list_display_links = ['name', 'createAt']
    list_per_page = 20

@admin.register(StreamRecord)
class TicRecordAdmin(admin.ModelAdmin):
    list_display = ['name', 'createAt']
    list_display_links = ['name', 'createAt']
    list_per_page = 20



# Register your models here.
