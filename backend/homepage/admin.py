import os
from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline, StackedInline
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.conf import settings
from .models import HeroSlide, VideoTestimonial, TextTestimonial, FAQ, Achievement, VideoShowcase

@admin.register(HeroSlide)
class HeroSlideAdmin(ModelAdmin):
    list_display = ['image_thumbnail', 'title_or_id', 'alt_text', 'order_badge', 'active_status', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'alt_text', 'caption']
    list_editable = []
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at', 'full_image_preview']
    
    def image_thumbnail(self, obj):
        """Display image thumbnail with proper error handling"""
        if obj.image:
            try:
                # Ensure proper URL construction
                media_url = getattr(settings, 'MEDIA_URL', '/media/')
                if not obj.image.url.startswith('http'):
                    image_url = f"{media_url.rstrip('/')}/{obj.image.name}" if not obj.image.url.startswith(media_url) else obj.image.url
                else:
                    image_url = obj.image.url
                
                return format_html(
                    '<div style="text-align: center;">'
                    '<img src="{}" width="80" height="50" style="border-radius: 8px; object-fit: cover; box-shadow: 0 3px 6px rgba(0,0,0,0.15); border: 2px solid #e0e0e0;" />'
                    '<br><small style="color: #666; font-size: 9px;">📸 {}</small>'
                    '</div>',
                    image_url,
                    os.path.basename(obj.image.name)[:15] + '...' if len(os.path.basename(obj.image.name)) > 15 else os.path.basename(obj.image.name)
                )
            except Exception as e:
                return format_html('<span style="color: #f44336;">⚠️ Error</span>')
        return format_html(
            '<div style="text-align: center; padding: 8px; border: 1px dashed #ccc; border-radius: 6px; color: #999;">'
            '📷<br><small>No image</small>'
            '</div>'
        )
    image_thumbnail.short_description = '🖼️ Preview'
    
    def title_or_id(self, obj):
        return obj.title or f'🎭 Hero Slide {obj.id}'
    title_or_id.short_description = 'Title'
    
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
            return format_html('<span style="color: #28a745;">✅</span>')
        return format_html('<span style="color: #dc3545;">❌</span>')
    active_status.short_description = 'Active'
    
    def full_image_preview(self, obj):
        """Display full image preview with comprehensive error handling"""
        if obj.image:
            try:
                # Construct proper image URL
                media_url = getattr(settings, 'MEDIA_URL', '/media/')
                if not obj.image.url.startswith('http'):
                    image_url = f"{media_url.rstrip('/')}/{obj.image.name}" if not obj.image.url.startswith(media_url) else obj.image.url
                else:
                    image_url = obj.image.url
                
                # Get file info
                file_size = "Unknown size"
                try:
                    if hasattr(obj.image, 'size'):
                        file_size = f"{obj.image.size / 1024:.1f} KB" if obj.image.size < 1024*1024 else f"{obj.image.size / (1024*1024):.1f} MB"
                except:
                    pass
                
                return format_html(
                    '<div style="text-align: center; padding: 15px; border: 2px solid #e3f2fd; border-radius: 12px; background: #f8f9fa;">'
                    '<img src="{}" style="max-width: 500px; max-height: 400px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 3px solid #fff;" />'
                    '<div style="margin-top: 10px; padding: 8px; background: #fff; border-radius: 6px; color: #666; font-size: 12px;">'
                    '<strong>📄 File:</strong> {} &nbsp; <strong>📏 Size:</strong> {}'
                    '</div>'
                    '</div>',
                    image_url,
                    os.path.basename(obj.image.name),
                    file_size
                )
            except Exception as e:
                return format_html(
                    '<div style="padding: 15px; border: 2px solid #ffcdd2; border-radius: 8px; background: #ffebee; color: #d32f2f; text-align: center;">'
                    '<strong>⚠️ Image Load Error</strong><br>'
                    '<small>{}</small><br>'
                    '<small>File: {}</small>'
                    '</div>',
                    str(e),
                    obj.image.name if hasattr(obj, 'image') and obj.image else 'Unknown'
                )
        return format_html(
            '<div style="text-align: center; padding: 20px; border: 2px dashed #ccc; border-radius: 8px; color: #666; background: #f9f9f9;">'
            '<div style="font-size: 48px; margin-bottom: 10px;">📷</div>'
            '<strong>No image uploaded</strong><br>'
            '<small>Upload an image using the field above</small>'
            '</div>'
        )
    full_image_preview.short_description = '🖼️ Full Preview'
    
    fieldsets = (
        ('🖼️ Hero Slide Content', {
            'fields': ('image', 'full_image_preview', 'title', 'alt_text'),
            'classes': ('wide',)
        }),
        ('⚙️ Display Settings', {
            'fields': ('order', 'is_active')
        }),
        ('📝 Optional Content', {
            'fields': ('caption', 'link_url'),
            'classes': ('collapse',)
        }),
        ('🕒 Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }
        js = ('admin/js/custom_admin.js',)

@admin.register(VideoTestimonial)
class VideoTestimonialAdmin(ModelAdmin):
    list_display = ['name', 'event', 'location', 'rating', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'rating', 'created_at']
    search_fields = ['name', 'event', 'location']
    list_editable = ['order', 'is_active', 'rating']
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Client Information', {
            'fields': ('name', 'location', 'event', 'date')
        }),
        ('Video Content', {
            'fields': ('video_file', 'thumbnail', 'rating', 'description')
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(TextTestimonial)
class TextTestimonialAdmin(ModelAdmin):
    list_display = ['client_thumbnail', 'name', 'event', 'location', 'rating_stars', 'order_badge', 'active_status', 'created_at']
    list_filter = ['is_active', 'rating', 'created_at']
    search_fields = ['name', 'event', 'location', 'text']
    list_editable = []
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at', 'full_image_preview']
    
    def client_thumbnail(self, obj):
        """Display client image thumbnail with proper error handling"""
        if obj.image:
            try:
                media_url = getattr(settings, 'MEDIA_URL', '/media/')
                if not obj.image.url.startswith('http'):
                    image_url = f"{media_url.rstrip('/')}/{obj.image.name}" if not obj.image.url.startswith(media_url) else obj.image.url
                else:
                    image_url = obj.image.url
                
                return format_html(
                    '<div style="text-align: center;">'
                    '<img src="{}" width="50" height="50" style="border-radius: 50%; object-fit: cover; box-shadow: 0 3px 6px rgba(0,0,0,0.15); border: 3px solid #fff;" />'
                    '</div>',
                    image_url
                )
            except Exception as e:
                return format_html('<span style="color: #f44336;">⚠️</span>')
        return format_html(
            '<div style="text-align: center; width: 50px; height: 50px; border-radius: 50%; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #999; font-size: 20px;">👤</div>'
        )
    client_thumbnail.short_description = '👤 Photo'
    
    def rating_stars(self, obj):
        """Display rating as stars"""
        stars = '⭐' * obj.rating + '☆' * (5 - obj.rating)
        return format_html('<span title="{} stars">{}</span>', obj.rating, stars)
    rating_stars.short_description = 'Rating'
    
    def order_badge(self, obj):
        """Display order with badge styling"""
        return format_html(
            '<span style="background: #e8f5e8; padding: 4px 8px; border-radius: 12px; color: #2e7d32; font-weight: bold; font-size: 11px;">#{}</span>',
            obj.order
        )
    order_badge.short_description = 'Order'
    
    def active_status(self, obj):
        """Display active status with styling"""
        if obj.is_active:
            return format_html('<span style="color: #28a745;">✅</span>')
        return format_html('<span style="color: #dc3545;">❌</span>')
    active_status.short_description = 'Active'
    
    def full_image_preview(self, obj):
        """Display full client image preview with error handling"""
        if obj.image:
            try:
                media_url = getattr(settings, 'MEDIA_URL', '/media/')
                if not obj.image.url.startswith('http'):
                    image_url = f"{media_url.rstrip('/')}/{obj.image.name}" if not obj.image.url.startswith(media_url) else obj.image.url
                else:
                    image_url = obj.image.url
                
                return format_html(
                    '<div style="text-align: center; padding: 15px; border: 2px solid #e8f5e8; border-radius: 12px; background: #f9f9f9;">'
                    '<img src="{}" style="max-width: 250px; max-height: 250px; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 4px solid #fff;" />'
                    '<div style="margin-top: 10px; color: #666; font-size: 12px;">'
                    '<strong>👤 Client Photo:</strong> {}'
                    '</div>'
                    '</div>',
                    image_url,
                    os.path.basename(obj.image.name)
                )
            except Exception as e:
                return format_html(
                    '<div style="padding: 15px; border: 2px solid #ffcdd2; border-radius: 8px; background: #ffebee; color: #d32f2f; text-align: center;">'
                    '<strong>⚠️ Client Photo Error</strong><br>'
                    '<small>{}</small>'
                    '</div>',
                    str(e)
                )
        return format_html(
            '<div style="text-align: center; padding: 20px; border: 2px dashed #ccc; border-radius: 8px; color: #666; background: #f9f9f9;">'
            '<div style="font-size: 48px; margin-bottom: 10px;">👤</div>'
            '<strong>No client photo</strong><br>'
            '<small>Upload a client photo above</small>'
            '</div>'
        )
    full_image_preview.short_description = '👤 Client Photo Preview'
    
    fieldsets = (
        ('👤 Client Information', {
            'fields': ('name', 'location', 'event', 'date'),
            'classes': ('wide',)
        }),
        ('🖼️ Photo & Content', {
            'fields': ('image', 'full_image_preview', 'text', 'rating'),
            'classes': ('wide',)
        }),
        ('⚙️ Display Settings', {
            'fields': ('order', 'is_active')
        }),
        ('🕒 Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(FAQ)
class FAQAdmin(ModelAdmin):
    list_display = ['question_preview', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['question', 'answer', 'keywords']
    list_editable = ['order', 'is_active']
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    def question_preview(self, obj):
        return obj.question[:50] + '...' if len(obj.question) > 50 else obj.question
    question_preview.short_description = 'Question'
    
    fieldsets = (
        ('FAQ Content', {
            'fields': ('question', 'answer')
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active')
        }),
        ('SEO & Keywords', {
            'fields': ('keywords',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Achievement)
class AchievementAdmin(ModelAdmin):
    list_display = ['title', 'display_count', 'icon_type', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'icon_type', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['order', 'is_active']
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    def display_count(self, obj):
        return f"{obj.count_value}{obj.suffix}"
    display_count.short_description = 'Count'
    
    fieldsets = (
        ('Achievement Content', {
            'fields': ('title', 'count_value', 'suffix', 'description', 'icon_type')
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(VideoShowcase)
class VideoShowcaseAdmin(ModelAdmin):
    list_display = ['title', 'youtube_video_id', 'is_active', 'autoplay', 'created_at']
    list_filter = ['is_active', 'autoplay', 'loop_video', 'mute_audio', 'created_at']
    search_fields = ['title', 'description', 'youtube_video_id']
    list_editable = ['is_active', 'autoplay']
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at', 'youtube_thumbnail_preview', 'youtube_embed_preview']
    
    def youtube_thumbnail_preview(self, obj):
        if obj.youtube_video_id:
            thumbnail_url = obj.youtube_thumbnail_url
            return f'<img src="{thumbnail_url}" style="max-width: 200px; height: auto;" />'
        return 'No thumbnail available'
    youtube_thumbnail_preview.short_description = 'YouTube Thumbnail'
    youtube_thumbnail_preview.allow_tags = True
    
    def youtube_embed_preview(self, obj):
        if obj.youtube_video_id:
            return f'<a href="{obj.youtube_embed_url}" target="_blank">Preview Embed URL</a>'
        return 'No embed URL'
    youtube_embed_preview.short_description = 'Embed URL'
    youtube_embed_preview.allow_tags = True
    
    fieldsets = (
        ('Video Content', {
            'fields': ('title', 'description', 'youtube_video_id', 'thumbnail_image', 'alt_text')
        }),
        ('Playback Settings', {
            'fields': ('autoplay', 'loop_video', 'show_controls', 'mute_audio')
        }),
        ('Display Settings', {
            'fields': ('is_active',)
        }),
        ('Preview', {
            'fields': ('youtube_thumbnail_preview', 'youtube_embed_preview'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

