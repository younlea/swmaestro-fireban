from django.contrib import admin

from streamInfo.models import Stream


@admin.register(Stream)
class StreamAdmin(admin.ModelAdmin):
    list_display = ("isActive", "__str__", "startedAt", 'finishedAt')
    list_display_links = ['__str__', 'isActive']
    readonly_fields = ("hls_url", "tic_url")