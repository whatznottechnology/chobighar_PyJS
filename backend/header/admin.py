from django.contrib import admin
from .models import SocialMedia, ContactInfo, BrandInfo

@admin.register(SocialMedia)
class SocialMediaAdmin(admin.ModelAdmin):
    list_display = ['get_name_display', 'url', 'is_active', 'order']
    list_filter = ['is_active', 'name']
    list_editable = ['is_active', 'order']
    search_fields = ['name', 'url']
    ordering = ['order', 'name']
    
    def get_name_display(self, obj):
        return obj.get_name_display()
    get_name_display.short_description = 'Platform'

@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ['phone', 'email', 'is_active']
    list_filter = ['is_active']
    list_editable = ['is_active']
    search_fields = ['phone', 'email']

@admin.register(BrandInfo)
class BrandInfoAdmin(admin.ModelAdmin):
    list_display = ['main_text', 'sub_text', 'is_active']
    list_filter = ['is_active']
    list_editable = ['is_active']
    search_fields = ['main_text', 'sub_text']
