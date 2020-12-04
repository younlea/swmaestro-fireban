from django.contrib import admin

# Register your models here.
from userApp.models import User





@admin.register(User)
class UserAdmin(admin.ModelAdmin):

    list_display = (
        'userid',
        'name',
        'createdAt',
        'is_active',
    )
    readonly_fields = ('createdAt',)

    list_display_links = (
        'userid',
        'name',
    )



    fieldsets = (
        (('User'), {'fields': ('userid', 'name', 'createdAt', 'activeAt')}),
        (('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    # fields = (
    #     (('User'), {'fields': ('userid', 'name', 'activeAt', 'createdAt')}),
    # )