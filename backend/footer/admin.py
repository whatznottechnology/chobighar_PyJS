from django.contrib import admin
from .models import (
    FooterBrandInfo, FooterContactInfo, FooterSocialMedia, 
    FooterCopyright
)

@admin.register(FooterBrandInfo)
class FooterBrandInfoAdmin(admin.ModelAdmin):
    list_display = ['main_text', 'sub_text', 'is_active', 'updated_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['main_text', 'sub_text', 'description']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Brand Information', {
            'fields': ('main_text', 'sub_text', 'logo_image')
        }),
        ('Description', {
            'fields': ('description',),
            'classes': ('wide',)
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(FooterContactInfo)
class FooterContactInfoAdmin(admin.ModelAdmin):
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
class FooterSocialMediaAdmin(admin.ModelAdmin):
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
class FooterCopyrightAdmin(admin.ModelAdmin):
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
