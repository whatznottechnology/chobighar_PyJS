from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline, StackedInline
from .models import ContactUsHero, ContactUsInfo, WhyChooseUs, ContactTestimonial

@admin.register(ContactUsHero)
class ContactUsHeroAdmin(ModelAdmin):
    list_display = ['main_title', 'subtitle', 'is_active', 'created_at', 'updated_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['main_title', 'subtitle', 'description']
    list_editable = ['is_active']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Hero Content', {
            'fields': ('hero_image', 'main_title', 'subtitle', 'description')
        }),
        ('Settings', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(ContactUsInfo)
class ContactUsInfoAdmin(ModelAdmin):
    list_display = ['primary_phone', 'primary_email', 'city', 'state', 'is_active', 'updated_at']
    list_filter = ['is_active', 'city', 'state', 'created_at']
    search_fields = ['primary_phone', 'primary_email', 'address_line1', 'city']
    list_editable = ['is_active']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Primary Contact', {
            'fields': ('primary_phone', 'secondary_phone', 'primary_email', 'secondary_email', 'whatsapp_number')
        }),
        ('Address Information', {
            'fields': ('address_line1', 'address_line2', 'city', 'state', 'postal_code', 'country')
        }),
        ('Business Hours', {
            'fields': ('weekday_hours', 'weekend_hours', 'emergency_note')
        }),
        ('Contact Labels', {
            'fields': ('phone_label', 'email_label', 'address_label', 'hours_label'),
            'classes': ('collapse',)
        }),
        ('Contact Descriptions', {
            'fields': ('phone_description', 'email_description', 'address_description'),
            'classes': ('collapse',)
        }),
        ('Google Map', {
            'fields': ('google_map_url', 'map_height')
        }),
        ('Settings', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(WhyChooseUs)
class WhyChooseUsAdmin(ModelAdmin):
    list_display = ['point_preview', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['point']
    list_editable = ['order', 'is_active']
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    def point_preview(self, obj):
        return obj.point[:50] + "..." if len(obj.point) > 50 else obj.point
    point_preview.short_description = 'Point'
    
    fieldsets = (
        ('Content', {
            'fields': ('point',)
        }),
        ('Settings', {
            'fields': ('order', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(ContactTestimonial)
class ContactTestimonialAdmin(ModelAdmin):
    list_display = ['name', 'service', 'rating', 'comment_preview', 'order', 'is_active', 'created_at']
    list_filter = ['rating', 'service', 'is_active', 'created_at']
    search_fields = ['name', 'service', 'comment']
    list_editable = ['order', 'is_active']
    ordering = ['order', 'created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    def comment_preview(self, obj):
        return obj.comment[:50] + "..." if len(obj.comment) > 50 else obj.comment
    comment_preview.short_description = 'Comment'
    
    fieldsets = (
        ('Client Information', {
            'fields': ('name', 'service', 'rating')
        }),
        ('Testimonial', {
            'fields': ('comment',)
        }),
        ('Settings', {
            'fields': ('order', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
