import os
from django.contrib import admin
from django import forms
from django.db import models
from unfold.admin import ModelAdmin, TabularInline, StackedInline
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.conf import settings
from .models import Category, Portfolio, PortfolioImage, PortfolioVideo, PortfolioHighlight, PortfolioService

class PortfolioImageInline(TabularInline):
    model = PortfolioImage
    extra = 1
    fields = ('image_preview', 'image_file', 'caption', 'featured')
    readonly_fields = ('image_preview',)
    list_editable = ('featured',)
    
    def image_preview(self, obj):
        """Display image thumbnail in inline with error handling"""
        if obj.image:
            try:
                # Handle both file and URL images
                if hasattr(obj, 'image_file') and obj.image_file:
                    media_url = getattr(settings, 'MEDIA_URL', '/media/')
                    if not obj.image_file.url.startswith('http'):
                        image_url = f"{media_url.rstrip('/')}/{obj.image_file.name}" if not obj.image_file.url.startswith(media_url) else obj.image_file.url
                    else:
                        image_url = obj.image_file.url
                elif hasattr(obj, 'image_url') and obj.image_url:
                    image_url = obj.image_url
                else:
                    image_url = obj.image
                
                # Show featured badge and orange border if featured
                if obj.featured:
                    return format_html(
                        '<div style="position: relative; display: inline-block;">'
                        '<div style="position: absolute; top: 2px; right: 2px; background: #ff6b35; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; z-index: 10;">⭐ Featured</div>'
                        '<img src="{}" width="80" height="80" style="border-radius: 8px; object-fit: cover; border: 2px solid #ff6b35; box-shadow: 0 2px 6px rgba(0,0,0,0.1);" />'
                        '</div>',
                        image_url
                    )
                else:
                    return format_html(
                        '<img src="{}" width="80" height="80" style="border-radius: 8px; object-fit: cover; border: 2px solid #e0e0e0; box-shadow: 0 2px 6px rgba(0,0,0,0.1);" />',
                        image_url
                    )
            except Exception as e:
                return format_html('<span style="color: #f44336;">⚠️ Error</span>')
        return format_html('<div style="width: 80px; height: 80px; border: 2px dashed #ccc; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 12px;">📷 No image</div>')
    image_preview.short_description = '🖼️ Preview'

class PortfolioVideoInline(TabularInline):
    model = PortfolioVideo
    extra = 1
    fields = ('video_id', 'title', 'description', 'featured', 'is_active')

class PortfolioHighlightInline(TabularInline):
    model = PortfolioHighlight
    extra = 1
    fields = ('highlight_text',)

class PortfolioServiceInline(TabularInline):
    model = PortfolioService
    extra = 1
    fields = ('service_name',)

@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    list_display = ('name', 'id', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name', 'id')
    ordering = ('order', 'name')

@admin.register(Portfolio)
class PortfolioAdmin(ModelAdmin):
    list_display = ('cover_preview', 'title', 'category', 'date', 'location', 'image_count', 'love_count', 'featured_status', 'active_status')
    list_filter = ('category', 'featured', 'is_active', 'date', 'created_at')
    search_fields = ('title', 'subtitle', 'location', 'description')
    prepopulated_fields = {'id': ('title',)}
    date_hierarchy = 'date'
    ordering = ('order', '-date')
    actions = ['duplicate_portfolio']
    
    def cover_preview(self, obj):
        """Display cover image thumbnail with proper error handling"""
        if obj.cover_image:
            try:
                # Handle both file and URL images
                if hasattr(obj, 'cover_image_file') and obj.cover_image_file:
                    media_url = getattr(settings, 'MEDIA_URL', '/media/')
                    if not obj.cover_image_file.url.startswith('http'):
                        image_url = f"{media_url.rstrip('/')}/{obj.cover_image_file.name}" if not obj.cover_image_file.url.startswith(media_url) else obj.cover_image_file.url
                    else:
                        image_url = obj.cover_image_file.url
                elif hasattr(obj, 'cover_image_url') and obj.cover_image_url:
                    image_url = obj.cover_image_url
                else:
                    image_url = obj.cover_image
                
                return format_html(
                    '<div style="text-align: center;">'
                    '<img src="{}" width="70" height="70" style="border-radius: 10px; object-fit: cover; box-shadow: 0 3px 8px rgba(0,0,0,0.2); border: 2px solid #e0e0e0;" />'
                    '</div>',
                    image_url
                )
            except Exception as e:
                return format_html('<span style="color: #f44336;">⚠️</span>')
        return format_html('<div style="width: 70px; height: 70px; border: 2px dashed #ccc; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 12px;">📷</div>')
    cover_preview.short_description = '🖼️ Cover'
    
    def featured_status(self, obj):
        """Display featured status with styling"""
        if obj.featured:
            return format_html('<span style="color: #ff6b35; font-weight: bold;">🌟 Featured</span>')
        return ''
    featured_status.short_description = 'Featured'
    
    def active_status(self, obj):
        """Display active status with styling"""
        if obj.is_active:
            return format_html('<span style="color: #28a745;">✅ Active</span>')
        return format_html('<span style="color: #dc3545;">❌ Inactive</span>')
    active_status.short_description = 'Status'
    
    def duplicate_portfolio(self, request, queryset):
        """Duplicate selected portfolios for easy modification"""
        duplicated_count = 0
        for portfolio in queryset:
            # Get all related objects before duplication
            original_images = list(portfolio.images.all())
            original_videos = list(portfolio.videos.all())
            original_highlights = list(portfolio.highlights.all())
            original_services = list(portfolio.services.all())
            
            # Duplicate the main portfolio
            portfolio.pk = None  # This will create a new object
            portfolio.id = f"{portfolio.id}_copy_{duplicated_count + 1}"
            portfolio.title = f"{portfolio.title} (Copy)"
            portfolio.featured = False  # Don't make copies featured by default
            portfolio.save()
            
            # Duplicate related images
            for image in original_images:
                image.pk = None
                image.portfolio = portfolio
                image.save()
            
            # Duplicate related videos
            for video in original_videos:
                video.pk = None
                video.portfolio = portfolio
                video.save()
            
            # Duplicate related highlights
            for highlight in original_highlights:
                highlight.pk = None
                highlight.portfolio = portfolio
                highlight.save()
            
            # Duplicate related services
            for service in original_services:
                service.pk = None
                service.portfolio = portfolio
                service.save()
            
            duplicated_count += 1
        
        self.message_user(
            request,
            f"Successfully duplicated {duplicated_count} portfolio(s). Please edit the duplicated entries to customize them.",
            level='SUCCESS'
        )
    duplicate_portfolio.short_description = "🔄 Duplicate selected portfolios"
    
    def save_model(self, request, obj, form, change):
        """Override save_model to handle bulk image upload"""
        super().save_model(request, obj, form, change)
        
        # Handle bulk image upload if files were provided
        if 'bulk_images' in request.FILES:
            files = request.FILES.getlist('bulk_images')
            # Get the current max order for this portfolio
            max_order = PortfolioImage.objects.filter(portfolio=obj).aggregate(
                models.Max('order')
            )['order__max'] or 0
            
            uploaded_count = 0
            for file in files:
                max_order += 1
                PortfolioImage.objects.create(
                    portfolio=obj,
                    image_file=file,
                    order=max_order,
                    is_active=True,
                    is_cover=False
                )
                uploaded_count += 1
            
            if uploaded_count > 0:
                self.message_user(
                    request,
                    f"Successfully uploaded {uploaded_count} image(s) to portfolio.",
                    level='SUCCESS'
                )
    
    def bulk_upload_widget(self, obj):
        """Display bulk upload widget with preview"""
        return format_html(
            '<div style="margin: 15px 0;">'
            '<input type="file" name="bulk_images" id="bulk_images" multiple accept="image/*" '
            'style="padding: 10px; border: 2px dashed #ccc; border-radius: 8px; '
            'background: #f9f9f9; width: 100%; cursor: pointer;" '
            'onchange="previewBulkImages(this)" />'
            '<div id="bulk-image-previews" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px; margin-top: 20px;"></div>'
            '<p style="margin-top: 10px; color: #666; font-size: 13px;">'
            '💡 <strong>Tip:</strong> Hold Ctrl (Windows) or Cmd (Mac) and click to select multiple images at once. '
            'All selected images will be added to the portfolio gallery after you click "Save". '
            'You can remove any image before saving by clicking the ❌ button.'
            '</p>'
            '<script>'
            'var dataTransfer = new DataTransfer();'
            'function previewBulkImages(input) {{'
            '  const previewContainer = document.getElementById("bulk-image-previews");'
            '  previewContainer.innerHTML = "";'
            '  dataTransfer.items.clear();'
            '  if (input.files) {{'
            '    Array.from(input.files).forEach((file, index) => {{'
            '      dataTransfer.items.add(file);'
            '      const reader = new FileReader();'
            '      reader.onload = function(e) {{'
            '        const div = document.createElement("div");'
            '        div.style.cssText = "position: relative; border: 2px solid #e0e0e0; border-radius: 8px; overflow: hidden; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.1);";'
            '        div.innerHTML = `'
            '          <img src="${{e.target.result}}" style="width: 100%; height: 120px; object-fit: cover; display: block;" />'
            '          <button type="button" onclick="removeBulkImage(${{index}})" '
            '            style="position: absolute; top: 5px; right: 5px; background: #f44336; color: white; border: none; '
            '            border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; line-height: 1; '
            '            box-shadow: 0 2px 4px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;">❌</button>'
            '          <div style="padding: 5px; font-size: 11px; color: #666; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${{file.name}}</div>'
            '        `;'
            '        previewContainer.appendChild(div);'
            '      }};'
            '      reader.readAsDataURL(file);'
            '    }});'
            '    input.files = dataTransfer.files;'
            '  }}'
            '}}'
            'function removeBulkImage(indexToRemove) {{'
            '  const newDataTransfer = new DataTransfer();'
            '  Array.from(dataTransfer.files).forEach((file, index) => {{'
            '    if (index !== indexToRemove) {{'
            '      newDataTransfer.items.add(file);'
            '    }}'
            '  }});'
            '  dataTransfer = newDataTransfer;'
            '  const input = document.getElementById("bulk_images");'
            '  input.files = dataTransfer.files;'
            '  previewBulkImages(input);'
            '}}'
            '</script>'
            '</div>'
        )
    bulk_upload_widget.short_description = '📤 Bulk Upload Images'
    
    def get_form(self, request, obj=None, **kwargs):
        """Override to allow file uploads"""
        form = super().get_form(request, obj, **kwargs)
        return form
    
    fieldsets = (
        ('📷 Portfolio Information', {
            'fields': ('id', 'title', 'subtitle', 'category'),
            'classes': ('wide',)
        }),
        ('🖼️ Cover Image', {
            'fields': ('cover_image_preview', 'cover_image_file'),
            'description': 'Upload cover image for the portfolio'
        }),
        ('📤 Bulk Upload Portfolio Images', {
            'fields': ('bulk_upload_widget',),
            'classes': ('wide',),
            'description': '⚡ Quick bulk upload: Select multiple images at once to add them all to the portfolio gallery. They will appear in the "Portfolio images" section below after saving.'
        }),
        ('📅 Event Details', {
            'fields': ('date', 'location', 'duration', 'guests', 'image_count')
        }),
        ('📝 Content', {
            'fields': ('description', 'story'),
            'classes': ('wide',)
        }),
        ('🎯 CTA Section Images', {
            'fields': ('cta_images_preview', 'cta_image_1', 'cta_image_2', 'cta_image_3', 'cta_image_4'),
            'classes': ('collapse',),
            'description': 'Upload 4 images for the CTA section (2x2 grid layout). These will be shown in the sidebar.'
        }),
        ('📱 Promotional Video', {
            'fields': ('promotional_video_id',),
            'classes': ('collapse',),
            'description': 'Enter YouTube Video ID only (e.g., "dQw4w9WgXcQ"). Video will autoplay, loop, and be muted in a mobile phone mockup display.'
        }),
        ('🔍 SEO Metadata', {
            'fields': ('meta_title', 'meta_description', 'meta_keywords'),
            'classes': ('collapse',),
            'description': 'SEO fields for search engines and social media. Leave blank to auto-generate from portfolio information.'
        }),
        ('⚙️ Settings', {
            'fields': ('featured', 'is_active', 'love_count')
        })
    )
    
    readonly_fields = ('cover_image_preview', 'cta_images_preview', 'bulk_upload_widget')
    
    def cover_image_preview(self, obj):
        """Display larger cover image preview in form"""
        if obj.cover_image:
            return format_html(
                '<div class="responsive-image-container">'
                '<img src="{}" style="max-width: 300px; max-height: 200px; border-radius: 12px; '
                'box-shadow: 0 4px 12px rgba(0,0,0,0.15); cursor: pointer;" '
                'onclick="window.open(this.src, \'_blank\')" title="Click to view full size" />'
                '</div>',
                obj.cover_image
            )
        return "No cover image uploaded"
    cover_image_preview.short_description = 'Current Cover Image'
    
    def cta_images_preview(self, obj):
        """Display CTA images preview in 2x2 grid"""
        cta_images = [obj.cta_image_1, obj.cta_image_2, obj.cta_image_3, obj.cta_image_4]
        labels = ['Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right']
        
        preview_html = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-width: 400px;">'
        
        for i, (image, label) in enumerate(zip(cta_images, labels)):
            if image:
                try:
                    preview_html += f'''
                        <div style="text-align: center;">
                            <img src="{image.url}" style="width: 150px; height: 100px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer;" onclick="window.open(this.src, '_blank')" title="Click to view full size" />
                            <div style="font-size: 11px; color: #666; margin-top: 5px;">{label}</div>
                        </div>
                    '''
                except:
                    preview_html += f'''
                        <div style="text-align: center; padding: 20px; border: 2px dashed #ccc; border-radius: 8px; color: #999;">
                            <div style="font-size: 24px;">📷</div>
                            <div style="font-size: 11px; margin-top: 5px;">{label}</div>
                            <div style="font-size: 9px;">Error loading</div>
                        </div>
                    '''
            else:
                preview_html += f'''
                    <div style="text-align: center; padding: 20px; border: 2px dashed #ccc; border-radius: 8px; color: #999;">
                        <div style="font-size: 24px;">📷</div>
                        <div style="font-size: 11px; margin-top: 5px;">{label}</div>
                        <div style="font-size: 9px;">No image</div>
                    </div>
                '''
        
        preview_html += '</div>'
        return format_html(preview_html)
    cta_images_preview.short_description = 'CTA Images Grid Preview'
    
    inlines = [PortfolioImageInline, PortfolioVideoInline, PortfolioHighlightInline, PortfolioServiceInline]

@admin.register(PortfolioImage)
class PortfolioImageAdmin(ModelAdmin):
    list_display = ('image_thumbnail', 'portfolio', 'caption', 'featured_status', 'created_at')
    list_filter = ('portfolio', 'featured', 'created_at')
    search_fields = ('portfolio__title', 'caption')
    ordering = ('portfolio', 'order')
    actions = ['mark_as_featured', 'unmark_as_featured']
    
    def image_thumbnail(self, obj):
        """Display image thumbnail in list view"""
        if obj.image:
            border_color = '#ff6b35' if obj.featured else '#e0e0e0'
            return format_html(
                '<img src="{}" width="50" height="50" style="border-radius: 6px; object-fit: cover; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border: 2px solid {};" />',
                obj.image,
                border_color
            )
        return "No image"
    image_thumbnail.short_description = 'Image'
    
    def featured_status(self, obj):
        """Display featured status with styling"""
        if obj.featured:
            return format_html('<span style="color: #ff6b35; font-weight: bold;">⭐ Featured</span>')
        return format_html('<span style="color: #999;">—</span>')
    featured_status.short_description = 'Featured'
    
    def mark_as_featured(self, request, queryset):
        """Mark selected images as featured"""
        updated = queryset.update(featured=True)
        self.message_user(request, f"{updated} image(s) marked as featured.", level='SUCCESS')
    mark_as_featured.short_description = "⭐ Mark as featured"
    
    def unmark_as_featured(self, request, queryset):
        """Unmark selected images as featured"""
        updated = queryset.update(featured=False)
        self.message_user(request, f"{updated} image(s) unmarked as featured.", level='SUCCESS')
    unmark_as_featured.short_description = "Remove featured status"
    
    fieldsets = (
        ('Portfolio', {
            'fields': ('portfolio',)
        }),
        ('Image', {
            'fields': ('image_file',),
            'description': 'Upload portfolio image'
        }),
        ('Details', {
            'fields': ('caption', 'featured'),
            'description': 'Featured images will appear in homepage gallery and portfolio page'
        })
    )

@admin.register(PortfolioVideo)
class PortfolioVideoAdmin(ModelAdmin):
    list_display = ('portfolio', 'title', 'video_id', 'featured_status', 'is_active')
    list_filter = ('portfolio', 'featured', 'is_active', 'created_at')
    search_fields = ('portfolio__title', 'title', 'video_id')
    ordering = ('portfolio', 'order')
    actions = ['mark_as_featured', 'unmark_as_featured']
    
    def featured_status(self, obj):
        """Display featured status with styling"""
        if obj.featured:
            return format_html('<span style="color: #ff6b35; font-weight: bold;">⭐ Featured</span>')
        return format_html('<span style="color: #999;">—</span>')
    featured_status.short_description = 'Featured'
    
    def mark_as_featured(self, request, queryset):
        """Mark selected videos as featured"""
        updated = queryset.update(featured=True)
        self.message_user(request, f"{updated} video(s) marked as featured.", level='SUCCESS')
    mark_as_featured.short_description = "⭐ Mark as featured"
    
    def unmark_as_featured(self, request, queryset):
        """Unmark selected videos as featured"""
        updated = queryset.update(featured=False)
        self.message_user(request, f"{updated} video(s) unmarked as featured.", level='SUCCESS')
    unmark_as_featured.short_description = "Remove featured status"
    
    fieldsets = (
        ('Portfolio', {
            'fields': ('portfolio',)
        }),
        ('Video Details', {
            'fields': ('video_id', 'title', 'description'),
            'description': 'Enter YouTube video ID (e.g., dQw4w9WgXcQ from youtube.com/watch?v=dQw4w9WgXcQ)'
        }),
        ('Settings', {
            'fields': ('featured', 'is_active'),
            'description': 'Featured videos will appear in the "Featured Wedding Videos" section on portfolio page'
        })
    )
