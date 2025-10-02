from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from .models import HeroSlide, ShowcaseImage, VideoTestimonial, TextTestimonial, FAQ, Achievement, VideoShowcase

@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ['image_thumbnail', 'title_or_id', 'alt_text', 'order_badge', 'active_status', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'alt_text', 'caption']
    list_editable = []
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at', 'full_image_preview']
    
    def image_thumbnail(self, obj):
        """Display image thumbnail in list view"""
        if obj.image:
            return format_html(
                '<img src="{}" width="60" height="40" style="border-radius: 6px; object-fit: cover; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />',
                obj.image.url
            )
        return "📷 No image"
    image_thumbnail.short_description = 'Preview'
    
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
        """Display full image preview in detail view"""
        if obj.image:
            return format_html(
                '<div class="image-preview-container">'
                '<img src="{}" style="max-width: 400px; max-height: 300px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.15);" />'
                '</div>',
                obj.image.url
            )
        return "No image available"
    full_image_preview.short_description = 'Image Preview'
    
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

@admin.register(ShowcaseImage)
class ShowcaseImageAdmin(admin.ModelAdmin):
    list_display = ['image_thumbnail', 'alt_text_preview', 'order_badge', 'active_status', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['alt_text']
    list_editable = []
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at', 'full_image_preview']
    
    def image_thumbnail(self, obj):
        """Display image thumbnail in list view"""
        if obj.image:
            return format_html(
                '<img src="{}" width="60" height="60" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />',
                obj.image.url
            )
        return "📷 No image"
    image_thumbnail.short_description = 'Preview'
    
    def alt_text_preview(self, obj):
        """Display alt text with truncation"""
        if obj.alt_text:
            return obj.alt_text[:30] + '...' if len(obj.alt_text) > 30 else obj.alt_text
        return "No alt text"
    alt_text_preview.short_description = 'Alt Text'
    
    def order_badge(self, obj):
        """Display order with badge styling"""
        return format_html(
            '<span style="background: #f3e5f5; padding: 4px 8px; border-radius: 12px; color: #7b1fa2; font-weight: bold; font-size: 11px;">#{}</span>',
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
        """Display full image preview in detail view"""
        if obj.image:
            return format_html(
                '<div class="image-preview-container">'
                '<img src="{}" style="max-width: 300px; max-height: 300px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.15);" />'
                '</div>',
                obj.image.url
            )
        return "No image available"
    full_image_preview.short_description = 'Image Preview'
    
    fieldsets = (
        ('🖼️ Showcase Image', {
            'fields': ('image', 'full_image_preview', 'alt_text'),
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

@admin.register(VideoTestimonial)
class VideoTestimonialAdmin(admin.ModelAdmin):
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
class TextTestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_thumbnail', 'name', 'event', 'location', 'rating_stars', 'order_badge', 'active_status', 'created_at']
    list_filter = ['is_active', 'rating', 'created_at']
    search_fields = ['name', 'event', 'location', 'text']
    list_editable = []
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at', 'full_image_preview']
    
    def client_thumbnail(self, obj):
        """Display client image thumbnail"""
        if obj.image:
            return format_html(
                '<img src="{}" width="40" height="40" style="border-radius: 50%; object-fit: cover; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />',
                obj.image.url
            )
        return "👤"
    client_thumbnail.short_description = 'Photo'
    
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
        """Display full image preview in detail view"""
        if obj.image:
            return format_html(
                '<div class="image-preview-container">'
                '<img src="{}" style="max-width: 200px; max-height: 200px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.15);" />'
                '</div>',
                obj.image.url
            )
        return "No image available"
    full_image_preview.short_description = 'Client Photo Preview'
    
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
class FAQAdmin(admin.ModelAdmin):
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
class AchievementAdmin(admin.ModelAdmin):
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
class VideoShowcaseAdmin(admin.ModelAdmin):
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
