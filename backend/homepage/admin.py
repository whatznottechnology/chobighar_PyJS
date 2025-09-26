from django.contrib import admin
from .models import HeroSlide, ShowcaseImage, VideoTestimonial, TextTestimonial, FAQ, Achievement, VideoShowcase

@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ['title_or_id', 'alt_text', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'alt_text', 'caption']
    list_editable = ['order', 'is_active']
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    def title_or_id(self, obj):
        return obj.title or f'Slide {obj.id}'
    title_or_id.short_description = 'Title'
    
    fieldsets = (
        ('Image Information', {
            'fields': ('image', 'title', 'alt_text')
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active')
        }),
        ('Optional Fields', {
            'fields': ('caption', 'link_url'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(ShowcaseImage)
class ShowcaseImageAdmin(admin.ModelAdmin):
    list_display = ['image_preview', 'alt_text', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['alt_text']
    list_editable = ['order', 'is_active']
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    def image_preview(self, obj):
        if obj.image:
            return f'Image {obj.id}'
        return 'No image'
    image_preview.short_description = 'Image'
    
    fieldsets = (
        ('Image Information', {
            'fields': ('image', 'alt_text')
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active')
        }),
        ('Timestamps', {
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
    list_display = ['name', 'event', 'location', 'rating', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'rating', 'created_at']
    search_fields = ['name', 'event', 'location', 'text']
    list_editable = ['order', 'is_active', 'rating']
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Client Information', {
            'fields': ('name', 'location', 'event', 'date')
        }),
        ('Content', {
            'fields': ('image', 'text', 'rating')
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active')
        }),
        ('Timestamps', {
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
