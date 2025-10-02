import os
from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.conf import settings
from .models import (
    VendorCategory, VendorSubCategory, VendorProfile, VendorImage, 
    VendorVideo, VendorService, VendorSpecialty, VendorHighlight,
    VendorTestimonial, VendorPortfolio
)


# Inline classes for related models
class VendorImageInline(admin.TabularInline):
    model = VendorImage
    extra = 1
    fields = ['image', 'title', 'image_type', 'display_order', 'is_active']
    ordering = ['image_type', 'display_order']


class VendorVideoInline(admin.TabularInline):
    model = VendorVideo
    extra = 1
    fields = ['title', 'youtube_id', 'display_order', 'is_active']
    ordering = ['display_order']


class VendorServiceInline(admin.TabularInline):
    model = VendorService
    extra = 1
    fields = ['name', 'description', 'display_order', 'is_active']
    ordering = ['display_order']


class VendorSpecialtyInline(admin.TabularInline):
    model = VendorSpecialty
    extra = 1
    fields = ['name', 'display_order', 'is_active']
    ordering = ['display_order']


class VendorHighlightInline(admin.TabularInline):
    model = VendorHighlight
    extra = 1
    fields = ['text', 'display_order', 'is_active']
    ordering = ['display_order']





class VendorTestimonialInline(admin.TabularInline):
    model = VendorTestimonial
    extra = 1
    fields = ['client_name', 'rating', 'review', 'event_type', 'date', 'is_featured', 'is_active']
    ordering = ['-is_featured', '-date']


class VendorPortfolioInline(admin.TabularInline):
    model = VendorPortfolio
    extra = 1
    fields = ['title', 'image', 'category', 'display_order', 'is_active']
    ordering = ['display_order']


class VendorSubCategoryInline(admin.TabularInline):
    """Inline admin for subcategories within category admin"""
    model = VendorSubCategory
    extra = 1
    fields = ['name', 'description', 'banner_image', 'vendor_count', 'display_order', 'is_active']
    readonly_fields = ['slug']


@admin.register(VendorCategory)
class VendorCategoryAdmin(admin.ModelAdmin):
    """Admin interface for Vendor Categories"""
    
    list_display = [
        'name', 
        'display_order', 
        'vendor_count_display', 
        'subcategory_count', 
        'gradient_preview',
        'is_active',
        'created_at'
    ]
    
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    
    prepopulated_fields = {'slug': ('name',)}
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'description', 'image', 'is_active')
        }),
        ('Display Settings', {
            'fields': ('icon_emoji', 'gradient_from', 'gradient_to', 'display_order'),
            'description': 'Customize how the category appears on the website'
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    readonly_fields = ['created_at', 'updated_at']
    
    inlines = [VendorSubCategoryInline]
    
    def vendor_count_display(self, obj):
        """Display total vendor count across all subcategories"""
        count = obj.vendor_count
        return format_html(
            '<span style="background: #e3f2fd; padding: 2px 8px; border-radius: 12px; color: #1976d2; font-weight: bold;">{} vendors</span>',
            count
        )
    vendor_count_display.short_description = 'Total Vendors'
    
    def subcategory_count(self, obj):
        """Display number of subcategories"""
        count = obj.subcategories.count()
        return format_html(
            '<span style="background: #f3e5f5; padding: 2px 8px; border-radius: 12px; color: #7b1fa2; font-weight: bold;">{} subcategories</span>',
            count
        )
    subcategory_count.short_description = 'Subcategories'
    
    def gradient_preview(self, obj):
        """Show a preview of the gradient"""
        return format_html(
            '<div style="width: 60px; height: 20px; background: linear-gradient(to right, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8)); border-radius: 4px; display: inline-block;"></div>'
        )
    gradient_preview.short_description = 'Gradient'
    
    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }


@admin.register(VendorSubCategory)
class VendorSubCategoryAdmin(admin.ModelAdmin):
    """Admin interface for Vendor Subcategories"""
    
    list_display = [
        'name',
        'category',
        'vendor_count_display',
        'display_order',
        'is_active',
        'created_at'
    ]
    
    list_filter = ['category', 'is_active', 'created_at']
    search_fields = ['name', 'description', 'category__name']
    
    prepopulated_fields = {'slug': ('name',)}
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('category', 'name', 'slug', 'description', 'is_active')
        }),
        ('Media & Display', {
            'fields': ('banner_image', 'vendor_count', 'display_order'),
            'description': 'Banner image and display settings'
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    readonly_fields = ['created_at', 'updated_at']
    
    def vendor_count_display(self, obj):
        """Display vendor count with styling"""
        return format_html(
            '<span style="background: #e8f5e8; padding: 2px 8px; border-radius: 12px; color: #2e7d32; font-weight: bold;">{} vendors</span>',
            obj.vendor_count
        )
    vendor_count_display.short_description = 'Vendors'
    
    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }


@admin.register(VendorProfile)
class VendorProfileAdmin(admin.ModelAdmin):
    """Comprehensive admin interface for Vendor Profiles"""
    
    list_display = [
        'name', 'category', 'subcategory', 'location', 'rating_display', 
        'reviews_count', 'featured_status', 'active_status', 'created_at'
    ]
    list_filter = [
        'category', 'subcategory', 'is_featured', 'is_active', 
        'created_at', 'location'
    ]
    search_fields = ['name', 'tagline', 'description', 'location', 'phone', 'email']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['-is_featured', '-rating', 'name']
    
    fieldsets = (
        ('🏢 Basic Information', {
            'fields': ('name', 'slug', 'tagline', 'type'),
            'classes': ('wide',)
        }),
        ('📂 Category & Classification', {
            'fields': ('category', 'subcategory'),
        }),
        ('📍 Contact Information', {
            'fields': ('location', 'address', 'phone', 'email', 'website'),
            'classes': ('wide',)
        }),
        ('📝 Business Description', {
            'fields': ('description', 'story'),
            'classes': ('wide',)
        }),
        ('💼 Business Details', {
            'fields': ('experience', 'price_range', 'capacity'),
        }),
        ('⭐ Ratings & Reviews', {
            'fields': ('rating', 'reviews_count'),
        }),
        ('📱 Social Media', {
            'fields': ('instagram', 'facebook', 'youtube'),
            'description': 'Enter just the username/handle without @ or full URL'
        }),
        ('🕒 Business Hours', {
            'fields': ('business_hours',),
            'description': '''Enter business hours as JSON format:<br>
            <code>{"Monday": "9:00 AM - 9:00 PM", "Tuesday": "9:00 AM - 9:00 PM", "Wednesday": "9:00 AM - 9:00 PM", "Thursday": "9:00 AM - 9:00 PM", "Friday": "9:00 AM - 9:00 PM", "Saturday": "9:00 AM - 10:00 PM", "Sunday": "9:00 AM - 10:00 PM"}</code>'''
        }),
        ('🎯 Status & Features', {
            'fields': ('is_active', 'is_featured'),
            'description': 'Featured vendors appear first in listings and search results'
        }),
    )
    
    inlines = [
        VendorImageInline, VendorVideoInline, VendorServiceInline, 
        VendorSpecialtyInline, VendorHighlightInline,
        VendorTestimonialInline, VendorPortfolioInline
    ]
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('category', 'subcategory')
    
    def rating_display(self, obj):
        """Display rating with stars"""
        stars = '⭐' * int(obj.rating) + '☆' * (5 - int(obj.rating))
        return format_html(
            '<span title="{} out of 5 stars">{} {}</span>',
            obj.rating, stars, obj.rating
        )
    rating_display.short_description = 'Rating'
    
    def featured_status(self, obj):
        """Display featured status with icon"""
        if obj.is_featured:
            return format_html(
                '<span style="color: #ff6b35; font-weight: bold;">🌟 Featured</span>'
            )
        return format_html('<span style="color: #666;">Standard</span>')
    featured_status.short_description = 'Status'
    
    def active_status(self, obj):
        """Display active status with icon"""
        if obj.is_active:
            return format_html(
                '<span style="color: #28a745; font-weight: bold;">✅ Active</span>'
            )
        return format_html('<span style="color: #dc3545;">❌ Inactive</span>')
    active_status.short_description = 'Visibility'


@admin.register(VendorImage)
class VendorImageAdmin(admin.ModelAdmin):
    """Admin interface for Vendor Images"""
    
    list_display = ['vendor', 'title', 'image_type', 'image_preview', 'display_order', 'is_active', 'created_at']
    list_filter = ['image_type', 'is_active', 'created_at']
    search_fields = ['vendor__name', 'title', 'alt_text']
    ordering = ['vendor', 'image_type', 'display_order']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('vendor', 'image', 'title', 'alt_text')
        }),
        ('Classification', {
            'fields': ('image_type', 'display_order', 'is_active')
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('vendor')
    
    def image_preview(self, obj):
        """Display image thumbnail with proper error handling"""
        if obj.image:
            try:
                media_url = getattr(settings, 'MEDIA_URL', '/media/')
                if not obj.image.url.startswith('http'):
                    image_url = f"{media_url.rstrip('/')}/{obj.image.name}" if not obj.image.url.startswith(media_url) else obj.image.url
                else:
                    image_url = obj.image.url
                
                return format_html(
                    '<div style="text-align: center;">'
                    '<img src="{}" width="70" height="70" style="border-radius: 10px; object-fit: cover; box-shadow: 0 3px 8px rgba(0,0,0,0.2); border: 2px solid #e0e0e0;" />'
                    '<br><small style="color: #666; font-size: 9px;">🖼️ {}</small>'
                    '</div>',
                    image_url,
                    obj.image_type.upper() if obj.image_type else 'IMG'
                )
            except Exception as e:
                return format_html('<span style="color: #f44336;">⚠️ Error</span>')
        return format_html(
            '<div style="text-align: center; padding: 8px; border: 1px dashed #ccc; border-radius: 8px; color: #999; font-size: 12px;">'
            '🖼️<br>No image'
            '</div>'
        )
    image_preview.short_description = '🖼️ Preview'


@admin.register(VendorVideo)
class VendorVideoAdmin(admin.ModelAdmin):
    """Admin interface for Vendor Videos"""
    
    list_display = ['vendor', 'title', 'youtube_preview', 'display_order', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['vendor__name', 'title', 'description']
    ordering = ['vendor', 'display_order']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('vendor', 'title', 'youtube_id', 'description')
        }),
        ('Settings', {
            'fields': ('display_order', 'is_active')
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('vendor')
    
    def youtube_preview(self, obj):
        """Display YouTube link"""
        return format_html(
            '<a href="{}" target="_blank">🎥 View Video</a>',
            obj.youtube_url
        )
    youtube_preview.short_description = 'YouTube'


@admin.register(VendorTestimonial)
class VendorTestimonialAdmin(admin.ModelAdmin):
    """Admin interface for Vendor Testimonials"""
    
    list_display = [
        'vendor', 'client_name', 'rating_stars', 'event_type', 
        'date', 'featured_status', 'is_active'
    ]
    list_filter = ['rating', 'is_featured', 'is_active', 'date', 'event_type']
    search_fields = ['vendor__name', 'client_name', 'review', 'event_type']
    ordering = ['vendor', '-is_featured', '-date']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('vendor', 'client_name', 'rating', 'event_type', 'date')
        }),
        ('Review Content', {
            'fields': ('review',),
            'classes': ('wide',)
        }),
        ('Settings', {
            'fields': ('is_featured', 'is_active')
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('vendor')
    
    def rating_stars(self, obj):
        """Display rating as stars"""
        stars = '⭐' * obj.rating + '☆' * (5 - obj.rating)
        return format_html('<span title="{} stars">{}</span>', obj.rating, stars)
    rating_stars.short_description = 'Rating'
    
    def featured_status(self, obj):
        """Display featured status"""
        if obj.is_featured:
            return format_html('<span style="color: #ff6b35; font-weight: bold;">🌟 Featured</span>')
        return ''
    featured_status.short_description = 'Featured'


# Customize admin site header and title
admin.site.site_header = "🏛️ Chabighar Admin - Vendor Management"
admin.site.site_title = "Vendor Admin"
admin.site.index_title = "Manage Wedding Vendors & Services"

# Register remaining models with basic admin
admin.site.register(VendorService)
admin.site.register(VendorSpecialty)
admin.site.register(VendorHighlight)
admin.site.register(VendorPortfolio)
