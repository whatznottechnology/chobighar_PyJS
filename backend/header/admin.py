import os
from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.conf import settings
from .models import SocialMedia, ContactInfo, BrandInfo

@admin.register(SocialMedia)
class SocialMediaAdmin(admin.ModelAdmin):
    list_display = ['platform_icon', 'get_name_display', 'url_preview', 'active_status', 'order_badge']
    list_filter = ['is_active', 'name']
    list_editable = []
    search_fields = ['name', 'url']
    ordering = ['order', 'name']
    readonly_fields = ['url_preview_full']
    
    fieldsets = (
        ('📱 Social Media Platform', {
            'fields': ('name', 'url', 'url_preview_full'),
            'classes': ('wide',)
        }),
        ('⚙️ Display Settings', {
            'fields': ('order', 'is_active')
        }),
    )
    
    def platform_icon(self, obj):
        """Display platform icon"""
        icons = {
            'facebook': '📘',
            'instagram': '📷',
            'twitter': '🐦',
            'youtube': '📺',
            'linkedin': '💼',
            'tiktok': '🎵',
            'pinterest': '📌',
            'snapchat': '👻'
        }
        return icons.get(obj.name, '🌐')
    platform_icon.short_description = 'Icon'
    
    def get_name_display(self, obj):
        return obj.get_name_display()
    get_name_display.short_description = 'Platform'
    
    def url_preview(self, obj):
        """Display truncated URL"""
        if obj.url:
            return obj.url[:40] + '...' if len(obj.url) > 40 else obj.url
        return "No URL"
    url_preview.short_description = 'URL'
    
    def url_preview_full(self, obj):
        """Display full URL as clickable link"""
        if obj.url:
            return format_html(
                '<a href="{}" target="_blank" style="color: #B22222; text-decoration: none;">🔗 {}</a>',
                obj.url, obj.url
            )
        return "No URL provided"
    url_preview_full.short_description = 'Full URL'
    
    def active_status(self, obj):
        """Display active status"""
        if obj.is_active:
            return format_html('<span style="color: #28a745;">✅</span>')
        return format_html('<span style="color: #dc3545;">❌</span>')
    active_status.short_description = 'Active'
    
    def order_badge(self, obj):
        """Display order with badge styling"""
        return format_html(
            '<span style="background: #e3f2fd; padding: 4px 8px; border-radius: 12px; color: #1976d2; font-weight: bold; font-size: 11px;">#{}</span>',
            obj.order
        )
    order_badge.short_description = 'Order'
    
    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }
        js = ('admin/js/custom_admin.js',)

@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ['contact_summary', 'active_status']
    list_filter = ['is_active']
    list_editable = []
    search_fields = ['phone', 'email', 'whatsapp_number']
    
    fieldsets = (
        ('📞 Contact Information', {
            'fields': ('phone', 'email', 'whatsapp_number'),
            'classes': ('wide',)
        }),
        ('⚙️ Settings', {
            'fields': ('is_active',)
        }),
    )
    
    def contact_summary(self, obj):
        """Display all contact information in one cell"""
        info = []
        if obj.phone:
            info.append(f"📞 {obj.phone}")
        if obj.email:
            info.append(f"✉️ {obj.email}")
        if obj.whatsapp_number:
            info.append(f"💬 {obj.whatsapp_number}")
        return format_html("<br>".join(info)) if info else "No contact info"
    contact_summary.short_description = 'Contact Details'
    
    def active_status(self, obj):
        """Display active status"""
        if obj.is_active:
            return format_html('<span style="color: #28a745; font-weight: bold;">✅ Active</span>')
        return format_html('<span style="color: #dc3545; font-weight: bold;">❌ Inactive</span>')
    active_status.short_description = 'Status'
    
    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }
        js = ('admin/js/custom_admin.js',)

@admin.register(BrandInfo)
class BrandInfoAdmin(admin.ModelAdmin):
    list_display = ['brand_preview', 'logo_preview', 'active_status']
    list_filter = ['is_active']
    list_editable = []
    search_fields = ['main_text', 'sub_text']
    readonly_fields = ['logo_preview']
    
    fieldsets = (
        ('🖼️ Logo', {
            'fields': ('logo_image', 'logo_preview'),
            'classes': ('wide',),
            'description': 'Upload your brand logo image here. Recommended size: 200x80px or similar ratio.'
        }),
        ('🏷️ Brand Information', {
            'fields': ('main_text', 'sub_text'),
            'classes': ('wide',)
        }),
        ('⚙️ Settings', {
            'fields': ('is_active',)
        }),
    )
    
    def logo_preview(self, obj):
        """Display logo image preview with robust error handling"""
        if obj.logo_image:
            try:
                # Use Django's built-in URL method - this is the most reliable
                image_url = obj.logo_image.url
                file_name = os.path.basename(obj.logo_image.name) if obj.logo_image.name else 'logo'
                
                return format_html(
                    '<div style="text-align: center; padding: 5px;">'
                    '<img src="{}" style="max-height: 80px; max-width: 200px; border: 2px solid #e0e0e0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />'
                    '<br><small style="color: #666; font-size: 10px;">📄 {}</small>'
                    '<br><small style="color: #999; font-size: 9px;">🔗 {}</small>'
                    '</div>',
                    image_url,
                    file_name,
                    image_url
                )
            except Exception as e:
                return format_html(
                    '<div style="color: #f44336; padding: 10px; border: 1px solid #f44336; border-radius: 4px;">'
                    '⚠️ Error: {}<br>'
                    '<small>File: {}</small>'
                    '</div>', 
                    str(e), 
                    obj.logo_image.name if hasattr(obj.logo_image, 'name') else 'Unknown'
                )
        return format_html(
            '<div style="text-align: center; padding: 10px; border: 2px dashed #ccc; border-radius: 8px; color: #666;">'
            '📷 No logo uploaded<br>'
            '<small>Upload a logo image above</small>'
            '</div>'
        )
    logo_preview.short_description = '🖼️ Logo Preview'
    
    def brand_preview(self, obj):
        """Display comprehensive brand preview with logo"""
        logo_html = mark_safe("")
        if obj.logo_image:
            try:
                # Use Django's built-in URL method
                image_url = obj.logo_image.url
                logo_html = mark_safe(f'<img src="{image_url}" style="max-height: 40px; max-width: 80px; margin-right: 10px; border-radius: 4px;" />')
            except Exception as e:
                logo_html = mark_safe(f'<span style="color: #f44336;">❌ Error</span>')

        return format_html(
            '<div style="display: flex; align-items: center; padding: 12px; border: 2px solid #B22222; border-radius: 12px; background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%); box-shadow: 0 2px 8px rgba(178,34,34,0.1);">'
            '{}'
            '<div>'
            '<div style="color: #B22222; font-weight: bold; font-size: 18px; margin-bottom: 2px;">{}</div>'
            '<div style="color: #666; font-size: 12px;">{}</div>'
            '</div>'
            '</div>',
            logo_html,
            obj.main_text or 'No main text',
            obj.sub_text or 'No sub text'
        )
    brand_preview.short_description = '🏷️ Brand Preview'
    
    def active_status(self, obj):
        """Display active status with enhanced styling"""
        if obj.is_active:
            return format_html(
                '<span style="background: #e8f5e8; color: #2e7d32; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 11px;">✅ ACTIVE</span>'
            )
        return format_html(
            '<span style="background: #ffebee; color: #d32f2f; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 11px;">❌ INACTIVE</span>'
        )
    active_status.short_description = '⚙️ Status'
    
    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }
        js = ('admin/js/custom_admin.js',)
