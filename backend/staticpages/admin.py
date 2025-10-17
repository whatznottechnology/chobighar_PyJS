from django.contrib import admin
from unfold.admin import ModelAdmin
from django.utils.html import format_html
from .models import StaticPage


@admin.register(StaticPage)
class StaticPageAdmin(ModelAdmin):
    list_display = ['title_with_badge', 'slug', 'published_status', 'footer_status', 'display_order', 'updated_at']
    list_filter = ['is_published', 'show_in_footer', 'created_at']
    search_fields = ['title', 'slug', 'content', 'meta_keywords']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['display_order']
    ordering = ['display_order', 'title']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('📄 Page Information', {
            'fields': ('title', 'slug', 'content'),
            'description': 'Basic page details and rich content'
        }),
        ('🔍 SEO Meta Data', {
            'fields': ('meta_title', 'meta_description', 'meta_keywords'),
            'classes': ('collapse',),
            'description': 'Search engine optimization settings'
        }),
        ('⚙️ Publishing Options', {
            'fields': ('is_published', 'show_in_footer', 'display_order'),
            'description': 'Control page visibility and placement'
        }),
        ('🕒 Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )
    
    def title_with_badge(self, obj):
        """Display title with icon badge"""
        icons = {
            'terms': '📜',
            'privacy': '🔒',
            'refund': '↩️',
            'shipping': '📦',
            'cookie': '🍪',
            'about': 'ℹ️',
        }
        icon = '📄'
        for key, emoji in icons.items():
            if key in obj.slug.lower():
                icon = emoji
                break
        return format_html(
            '<span style="font-size: 18px;">{}</span> <strong>{}</strong>',
            icon, obj.title
        )
    title_with_badge.short_description = 'Page Title'
    
    def published_status(self, obj):
        """Display publish status with badge"""
        if obj.is_published:
            return format_html(
                '<span style="background: #4caf50; color: white; padding: 4px 12px; '
                'border-radius: 12px; font-size: 11px; font-weight: 600;">✓ PUBLISHED</span>'
            )
        return format_html(
            '<span style="background: #f44336; color: white; padding: 4px 12px; '
            'border-radius: 12px; font-size: 11px; font-weight: 600;">✗ DRAFT</span>'
        )
    published_status.short_description = 'Status'
    
    def footer_status(self, obj):
        """Display footer visibility status"""
        if obj.show_in_footer:
            return format_html(
                '<span style="color: #4caf50; font-weight: 600;">✓ Yes</span>'
            )
        return format_html(
            '<span style="color: #999;">✗ No</span>'
        )
    footer_status.short_description = 'In Footer'
    
    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }
        js = ('admin/js/custom_admin.js',)
