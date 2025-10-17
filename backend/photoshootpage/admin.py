from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline, StackedInline
from django.utils.html import format_html
from .models import PhotoshootHero, PhotoshootService, PhotoshootPageSettings, PhotoshootTestimonial

@admin.register(PhotoshootHero)
class PhotoshootHeroAdmin(ModelAdmin):
    list_display = ['title', 'is_active', 'created_at', 'image_preview']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'subtitle']
    
    fieldsets = [
        ('Hero Content', {
            'fields': ['title', 'subtitle', 'hero_image', 'alt_text']
        }),
        ('Call-to-Action Buttons', {
            'fields': [
                ('primary_button_text', 'primary_button_link'),
                ('secondary_button_text', 'secondary_button_link')
            ]
        }),
        ('Settings', {
            'fields': ['is_active']
        })
    ]
    
    def image_preview(self, obj):
        if obj.hero_image:
            return format_html(
                '<img src="{}" style="width: 50px; height: 30px; object-fit: cover; border-radius: 4px;" />',
                obj.hero_image.url
            )
        return "No image"
    image_preview.short_description = "Preview"

@admin.register(PhotoshootService)
class PhotoshootServiceAdmin(ModelAdmin):
    list_display = ['title', 'price', 'duration', 'is_active', 'is_featured', 'order', 'image_preview']
    list_filter = ['is_active', 'is_featured', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['order', 'is_active', 'is_featured']
    ordering = ['order', 'created_at']
    
    fieldsets = [
        ('Service Information', {
            'fields': ['title', 'description', 'service_image', 'alt_text']
        }),
        ('Pricing & Details', {
            'fields': ['price', 'duration', 'deliverables']
        }),
        ('Features & Inclusions', {
            'fields': ['features', 'inclusions'],
            'description': 'Enter as JSON array format: ["Feature 1", "Feature 2", "Feature 3"]'
        }),
        ('Display Settings', {
            'fields': ['order', 'is_active', 'is_featured']
        })
    ]
    
    def image_preview(self, obj):
        if obj.service_image:
            return format_html(
                '<img src="{}" style="width: 50px; height: 30px; object-fit: cover; border-radius: 4px;" />',
                obj.service_image.url
            )
        return "No image"
    image_preview.short_description = "Preview"
    
    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }

@admin.register(PhotoshootPageSettings)
class PhotoshootPageSettingsAdmin(ModelAdmin):
    list_display = ['__str__', 'is_active', 'updated_at']
    
    fieldsets = [
        ('Page Content', {
            'fields': ['services_section_title', 'services_section_description']
        }),
        ('SEO Settings', {
            'fields': ['meta_title', 'meta_description'],
            'classes': ['collapse']
        }),
        ('Settings', {
            'fields': ['is_active']
        })
    ]
    
    def has_add_permission(self, request):
        # Allow adding only if no instance exists
        return not PhotoshootPageSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Prevent deletion of settings
        return False


@admin.register(PhotoshootTestimonial)
class PhotoshootTestimonialAdmin(ModelAdmin):
    list_display = ['client_name', 'service_type', 'rating_display', 'is_active', 'is_featured', 'order', 'client_image_preview']
    list_filter = ['rating', 'service_type', 'is_active', 'is_featured', 'created_at']
    search_fields = ['client_name', 'service_type', 'testimonial_text']
    list_editable = ['order', 'is_active', 'is_featured']
    ordering = ['order', '-created_at']
    
    fieldsets = [
        ('Client Information', {
            'fields': ['client_name', 'service_type', 'client_image']
        }),
        ('Testimonial', {
            'fields': ['rating', 'testimonial_text']
        }),
        ('Display Settings', {
            'fields': ['order', 'is_active', 'is_featured']
        })
    ]
    
    def rating_display(self, obj):
        stars = '★' * obj.rating + '☆' * (5 - obj.rating)
        return format_html(
            '<span style="color: #ffa500; font-size: 16px;" title="{} out of 5 stars">{}</span>',
            obj.rating,
            stars
        )
    rating_display.short_description = "Rating"
    
    def client_image_preview(self, obj):
        if obj.client_image:
            return format_html(
                '<img src="{}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%;" />',
                obj.client_image.url
            )
        return "No image"
    client_image_preview.short_description = "Photo"

