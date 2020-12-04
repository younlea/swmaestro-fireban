from django.contrib import admin
from .models import Location, Product


# admin.site.register(Product)
class LocationAdmin(admin.TabularInline):
    model = Location
    list_display = ['cordinateX', 'cordinateY', 'updatedAt']
    # readonly_fields = ['cordinateX', 'cordinateY', 'updatedAt']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['isPower', 'name', 'mac', 'manager', 'isPower_date']
    list_display_links = ['isPower', 'name', 'mac']
    list_per_page = 20
    list_filter = ['isPower']


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ['target', 'location', 'cordinateX', 'cordinateY', 'updatedAt']
    list_display_links = ['target']
    list_filter = ['target', 'cordinateX']
    list_per_page = 20