from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline, StackedInline
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from .models import (
    FooterBrandInfo, FooterContactInfo, FooterSocialMedia, 
    FooterCopyright
)

@admin.register(FooterBrandInfo)
class FooterBrandInfoAdmin(ModelAdmin):
    list_display = ['logo_preview', 'brand_text_preview', 'active_status', 'updated_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['main_text', 'sub_text', 'description']
    readonly_fields = ['created_at', 'updated_at', 'full_logo_preview']
    
    fieldsets = (
        ('🏷️ Brand Information', {
            'fields': ('main_text', 'sub_text', 'logo_image', 'full_logo_preview'),
            'classes': ('wide',)
        }),
        ('📝 Description', {
            'fields': ('description',),
            'classes': ('wide',)
        }),
        ('⚙️ Status', {
            'fields': ('is_active',)
        }),
        ('🕒 Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def logo_preview(self, obj):
        """Display logo thumbnail"""
        if obj.logo_image:
            return format_html(
                '<img src="{}" width="40" height="40" style="border-radius: 6px; object-fit: cover; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />',
                obj.logo_image.url
            )
        return "🏷️ No logo"
    logo_preview.short_description = 'Logo'
    
    def full_logo_preview(self, obj):
        """Display full logo preview"""
        if obj.logo_image:
            return format_html(
                '<div class="image-preview-container">'
                '<img src="{}" style="max-width: 200px; max-height: 200px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.15);" />'
                '</div>',
                obj.logo_image.url
            )
        return "No logo available"
    full_logo_preview.short_description = 'Logo Preview'
    
    def brand_text_preview(self, obj):
        """Display brand text"""
        return format_html(
            '<div style="text-align: center;">'
            '<div style="color: #B22222; font-weight: bold;">{}</div>'
            '<div style="color: #666; font-size: 12px;">{}</div>'
            '</div>',
            obj.main_text or 'No main text',
            obj.sub_text or 'No sub text'
        )
    brand_text_preview.short_description = 'Brand Text'
    
    def active_status(self, obj):
        """Display active status"""
        if obj.is_active:
            return format_html('<span style="color: #28a745;">✅</span>')
        return format_html('<span style="color: #dc3545;">❌</span>')
    active_status.short_description = 'Active'
    
    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }
        js = ('admin/js/custom_admin.js',)

@admin.register(FooterContactInfo)
class FooterContactInfoAdmin(ModelAdmin):
    list_display = ['phone', 'email', 'whatsapp_number', 'is_active', 'updated_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['phone', 'email', 'address_line1', 'address_line2']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('phone', 'email', 'whatsapp_number')
        }),
        ('Address Information', {
            'fields': ('address_line1', 'address_line2')
        }),
        ('Business Hours', {
            'fields': ('weekday_hours', 'weekend_hours')
        }),
        ('Contact Section Text', {
            'fields': ('phone_text', 'whatsapp_text', 'email_text')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(FooterSocialMedia)
class FooterSocialMediaAdmin(ModelAdmin):
    list_display = ['name', 'url', 'order', 'is_active', 'updated_at']
    list_filter = ['name', 'is_active', 'created_at']
    search_fields = ['name', 'url']
    ordering = ['order', 'name']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Social Media Information', {
            'fields': ('name', 'url', 'order')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(FooterCopyright)
class FooterCopyrightAdmin(ModelAdmin):
    list_display = ['text', 'company_name', 'is_active', 'updated_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['text', 'company_name']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Copyright Information', {
            'fields': ('text', 'company_name', 'company_url')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

