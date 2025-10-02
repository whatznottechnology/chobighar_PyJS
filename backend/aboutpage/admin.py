import os
from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.conf import settings
from .models import AboutHero, AboutStory, AboutValue, TeamMember, AboutContent

@admin.register(AboutHero)
class AboutHeroAdmin(admin.ModelAdmin):
    list_display = ['title', 'hero_image_preview', 'active_status', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'subtitle']
    list_editable = []
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at', 'hero_image_full_preview']
    
    def hero_image_preview(self, obj):
        """Display hero image thumbnail"""
        if obj.hero_image:
            try:
                media_url = getattr(settings, 'MEDIA_URL', '/media/')
                if not obj.hero_image.url.startswith('http'):
                    image_url = f"{media_url.rstrip('/')}/{obj.hero_image.name}" if not obj.hero_image.url.startswith(media_url) else obj.hero_image.url
                else:
                    image_url = obj.hero_image.url
                
                return format_html(
                    '<div style="text-align: center;">'
                    '<img src="{}" width="80" height="50" style="border-radius: 8px; object-fit: cover; box-shadow: 0 3px 6px rgba(0,0,0,0.15); border: 2px solid #e0e0e0;" />'
                    '</div>',
                    image_url
                )
            except Exception as e:
                return format_html('<span style="color: #f44336;">⚠️ Error</span>')
        return format_html('<span style="color: #666;">📷 No image</span>')
    hero_image_preview.short_description = '🖼️ Hero Image'
    
    def hero_image_full_preview(self, obj):
        """Display full hero image preview"""
        if obj.hero_image:
            try:
                media_url = getattr(settings, 'MEDIA_URL', '/media/')
                if not obj.hero_image.url.startswith('http'):
                    image_url = f"{media_url.rstrip('/')}/{obj.hero_image.name}" if not obj.hero_image.url.startswith(media_url) else obj.hero_image.url
                else:
                    image_url = obj.hero_image.url
                
                return format_html(
                    '<div style="text-align: center; padding: 15px; border: 2px solid #e3f2fd; border-radius: 12px; background: #f9f9f9;">'
                    '<img src="{}" style="max-width: 600px; max-height: 400px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 3px solid #fff;" />'
                    '<div style="margin-top: 10px; color: #666; font-size: 12px;">'
                    '<strong>📄 File:</strong> {}'
                    '</div>'
                    '</div>',
                    image_url,
                    os.path.basename(obj.hero_image.name)
                )
            except Exception as e:
                return format_html('<span style="color: #f44336;">⚠️ Error loading image</span>')
        return format_html('<div style="text-align: center; padding: 20px; border: 2px dashed #ccc; border-radius: 8px; color: #666;">📷 No hero image uploaded</div>')
    hero_image_full_preview.short_description = '🖼️ Hero Image Preview'
    
    def active_status(self, obj):
        """Display active status with styling"""
        if obj.is_active:
            return format_html('<span style="background: #e8f5e8; color: #2e7d32; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 11px;">✅ ACTIVE</span>')
        return format_html('<span style="background: #ffebee; color: #d32f2f; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 11px;">❌ INACTIVE</span>')
    active_status.short_description = '⚙️ Status'
    
    fieldsets = (
        ('🦸 Hero Content', {
            'fields': ('title', 'subtitle', 'hero_image', 'hero_image_full_preview', 'alt_text'),
            'classes': ('wide',)
        }),
        ('⚙️ Display Settings', {
            'fields': ('is_active',)
        }),
        ('🕒 Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(AboutStory)
class AboutStoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'happy_couples', 'years_experience', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'content']
    list_editable = ['is_active']
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Story Content', {
            'fields': ('title', 'content', 'story_image', 'alt_text')
        }),
        ('Statistics', {
            'fields': ('happy_couples', 'years_experience', 'photos_captured')
        }),
        ('Display Settings', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(AboutValue)
class AboutValueAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon_type', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'icon_type', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['order', 'is_active']
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Value Content', {
            'fields': ('title', 'description', 'icon_type')
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['profile_image_preview', 'name', 'position', 'order_badge', 'active_status', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'position', 'bio']
    list_editable = []
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at', 'profile_image_full_preview']
    
    def profile_image_preview(self, obj):
        """Display profile image thumbnail"""
        if obj.profile_image:
            try:
                media_url = getattr(settings, 'MEDIA_URL', '/media/')
                if not obj.profile_image.url.startswith('http'):
                    image_url = f"{media_url.rstrip('/')}/{obj.profile_image.name}" if not obj.profile_image.url.startswith(media_url) else obj.profile_image.url
                else:
                    image_url = obj.profile_image.url
                
                return format_html(
                    '<div style="text-align: center;">'
                    '<img src="{}" width="50" height="50" style="border-radius: 50%; object-fit: cover; box-shadow: 0 3px 6px rgba(0,0,0,0.15); border: 3px solid #fff;" />'
                    '</div>',
                    image_url
                )
            except Exception as e:
                return format_html('<span style="color: #f44336;">⚠️</span>')
        return format_html('<div style="text-align: center; width: 50px; height: 50px; border-radius: 50%; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #999; font-size: 20px;">👤</div>')
    profile_image_preview.short_description = '👤 Photo'
    
    def profile_image_full_preview(self, obj):
        """Display full profile image preview"""
        if obj.profile_image:
            try:
                media_url = getattr(settings, 'MEDIA_URL', '/media/')
                if not obj.profile_image.url.startswith('http'):
                    image_url = f"{media_url.rstrip('/')}/{obj.profile_image.name}" if not obj.profile_image.url.startswith(media_url) else obj.profile_image.url
                else:
                    image_url = obj.profile_image.url
                
                return format_html(
                    '<div style="text-align: center; padding: 15px; border: 2px solid #e8f5e8; border-radius: 12px; background: #f9f9f9;">'
                    '<img src="{}" style="max-width: 300px; max-height: 300px; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 4px solid #fff;" />'
                    '<div style="margin-top: 10px; color: #666; font-size: 12px;">'
                    '<strong>👤 Team Member Photo:</strong> {}'
                    '</div>'
                    '</div>',
                    image_url,
                    os.path.basename(obj.profile_image.name)
                )
            except Exception as e:
                return format_html('<span style="color: #f44336;">⚠️ Error loading photo</span>')
        return format_html('<div style="text-align: center; padding: 20px; border: 2px dashed #ccc; border-radius: 8px; color: #666;">👤 No profile photo uploaded</div>')
    profile_image_full_preview.short_description = '👤 Profile Photo Preview'
    
    def order_badge(self, obj):
        """Display order with badge styling"""
        return format_html(
            '<span style="background: #e3f2fd; padding: 4px 8px; border-radius: 12px; color: #1976d2; font-weight: bold; font-size: 11px;">#{}</span>',
            obj.order
        )
    order_badge.short_description = 'Order'
    
    def active_status(self, obj):
        """Display active status with styling"""
        if obj.is_active:
            return format_html('<span style="background: #e8f5e8; color: #2e7d32; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 11px;">✅ ACTIVE</span>')
        return format_html('<span style="background: #ffebee; color: #d32f2f; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 11px;">❌ INACTIVE</span>')
    active_status.short_description = '⚙️ Status'
    
    fieldsets = (
        ('👤 Team Member Info', {
            'fields': ('name', 'position', 'bio', 'profile_image', 'profile_image_full_preview', 'alt_text'),
            'classes': ('wide',)
        }),
        ('📞 Contact Information', {
            'fields': ('email', 'phone'),
            'classes': ('collapse',)
        }),
        ('⚙️ Display Settings', {
            'fields': ('order', 'is_active')
        }),
        ('🕒 Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(AboutContent)
class AboutContentAdmin(admin.ModelAdmin):
    list_display = ['title', 'section_type', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'section_type', 'created_at']
    search_fields = ['title', 'content']
    list_editable = ['order', 'is_active']
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Content Information', {
            'fields': ('section_type', 'title', 'content', 'image', 'alt_text')
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
