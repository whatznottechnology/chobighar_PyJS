from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import BlogCategory, BlogPost, BlogComment, PopupInquiry, PopupSettings


class BlogPostAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget())
    
    class Meta:
        model = BlogPost
        fields = '__all__'


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'display_order', 'posts_count', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['display_order', 'name']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'description', 'icon', 'display_order', 'is_active')
        }),
        ('SEO Settings', {
            'fields': ('meta_title', 'meta_description', 'meta_keywords'),
            'classes': ('collapse',)
        }),
    )
    
    def posts_count(self, obj):
        count = obj.posts.filter(status='published').count()
        return format_html(
            '<span style="background: #e3f2fd; padding: 2px 8px; border-radius: 12px; color: #1976d2; font-weight: bold;">{} posts</span>',
            count
        )
    posts_count.short_description = 'Published Posts'


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    form = BlogPostAdminForm
    list_display = ['image_preview', 'title', 'category', 'author', 'status', 'published_date', 'views_count', 'is_featured', 'created_at']
    list_filter = ['status', 'is_featured', 'category', 'created_at', 'published_date']
    search_fields = ['title', 'content', 'tags', 'author']
    prepopulated_fields = {'slug': ('title',)}
    ordering = ['-created_at']
    date_hierarchy = 'published_date'
    list_editable = ['is_featured', 'status']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'category', 'author', 'excerpt')
        }),
        ('Content', {
            'fields': ('content',),
            'description': 'Rich content editor - Add images, videos, and formatted text. Use the toolbar to embed media and style your content.',
            'classes': ('wide',)
        }),
        ('Media', {
            'fields': ('featured_image', 'featured_image_alt', 'thumbnail_image', 'og_image')
        }),
        ('Publishing', {
            'fields': ('status', 'published_date', 'scheduled_date')
        }),
        ('Engagement', {
            'fields': ('reading_time', 'is_featured', 'tags'),
            'classes': ('collapse',)
        }),
        ('SEO Settings', {
            'fields': ('meta_title', 'meta_description', 'meta_keywords'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = []
    
    def image_preview(self, obj):
        """Display thumbnail preview"""
        image = obj.thumbnail_image or obj.featured_image
        if image:
            try:
                return format_html(
                    '<div style="text-align: center;">'
                    '<img src="{}" width="70" height="70" style="border-radius: 10px; object-fit: cover; box-shadow: 0 3px 8px rgba(0,0,0,0.2); border: 2px solid #e0e0e0;" />'
                    '</div>',
                    image.url
                )
            except Exception:
                pass
        return format_html(
            '<div style="text-align: center; padding: 8px; border: 1px dashed #ccc; border-radius: 8px; color: #999; font-size: 12px;">'
            '🖼️<br>No image'
            '</div>'
        )
    image_preview.short_description = '🖼️ Preview'
    
    def save_model(self, request, obj, form, change):
        # Auto-set published_date when status changes to published
        if obj.status == 'published' and not obj.published_date:
            from django.utils import timezone
            obj.published_date = timezone.now()
        super().save_model(request, obj, form, change)


@admin.register(BlogComment)
class BlogCommentAdmin(admin.ModelAdmin):
    list_display = ['name', 'post', 'is_approved', 'created_at']
    list_filter = ['is_approved', 'created_at']
    search_fields = ['name', 'email', 'comment', 'post__title']
    ordering = ['-created_at']
    list_editable = ['is_approved']
    
    fieldsets = (
        ('Comment Details', {
            'fields': ('post', 'name', 'email', 'comment')
        }),
        ('Moderation', {
            'fields': ('is_approved',)
        }),
    )


@admin.register(PopupInquiry)
class PopupInquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'whatsapp_number', 'event_type', 'event_date', 'location', 'submitted_at']
    list_filter = ['event_type', 'event_date', 'submitted_at']
    search_fields = ['name', 'email', 'whatsapp_number', 'location', 'event_type']
    ordering = ['-submitted_at']
    readonly_fields = ['submitted_at', 'ip_address', 'user_agent']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'whatsapp_number')
        }),
        ('Event Details', {
            'fields': ('event_type', 'event_date', 'location', 'message')
        }),
        ('Metadata', {
            'fields': ('submitted_at', 'ip_address', 'user_agent'),
            'classes': ('collapse',)
        }),
    )
    
    def has_add_permission(self, request):
        # Disable manual addition (only via API)
        return False


@admin.register(PopupSettings)
class PopupSettingsAdmin(admin.ModelAdmin):
    list_display = ['popup_title', 'is_active', 'show_delay', 'cookie_duration_days', 'image_preview']
    
    fieldsets = (
        ('Popup Content', {
            'fields': ('popup_title', 'popup_subtitle', 'popup_image')
        }),
        ('Display Settings', {
            'fields': ('is_active', 'show_delay', 'cookie_duration_days')
        }),
    )
    
    def image_preview(self, obj):
        """Display popup image preview"""
        if obj.popup_image:
            try:
                return format_html(
                    '<div style="text-align: center;">'
                    '<img src="{}" width="70" height="70" style="border-radius: 10px; object-fit: cover; box-shadow: 0 3px 8px rgba(0,0,0,0.2); border: 2px solid #e0e0e0;" />'
                    '</div>',
                    obj.popup_image.url
                )
            except Exception:
                pass
        return format_html(
            '<div style="text-align: center; padding: 8px; border: 1px dashed #ccc; border-radius: 8px; color: #999; font-size: 12px;">'
            '🖼️<br>No image'
            '</div>'
        )
    image_preview.short_description = 'Image'
    
    def has_add_permission(self, request):
        # Only allow one PopupSettings instance
        if PopupSettings.objects.exists():
            return False
        return True
    
    def has_delete_permission(self, request, obj=None):
        # Prevent deletion
        return False
