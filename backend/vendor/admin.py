import os
from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.conf import settings
from .models import (
    VendorCategory, VendorSubCategory, VendorProfile, VendorImage, 
    VendorVideo, VendorService, VendorSpecialty, VendorWhyChooseUs,
    VendorTestimonial
)


# Inline classes for related models
class VendorVideoInline(TabularInline):
    model = VendorVideo
    extra = 1
    fields = ['title', 'youtube_id', 'is_active']


class VendorServiceInline(TabularInline):
    model = VendorService
    extra = 1
    fields = ['name', 'description', 'is_active']
    ordering = ['name']


class VendorSpecialtyInline(TabularInline):
    model = VendorSpecialty
    extra = 1
    fields = ['name', 'is_active']
    ordering = ['name']


class VendorWhyChooseUsInline(TabularInline):
    model = VendorWhyChooseUs
    extra = 1
    fields = ['text', 'is_active']


class VendorTestimonialInline(TabularInline):
    model = VendorTestimonial
    extra = 1
    fields = ['client_name', 'rating', 'review', 'event_type', 'date', 'is_featured', 'is_active']
    ordering = ['-is_featured', '-date']


class VendorSubCategoryInline(TabularInline):
    """Inline admin for subcategories within category admin"""
    model = VendorSubCategory
    extra = 1
    fields = ['name', 'description', 'banner_image', 'vendor_count', 'is_active']
    readonly_fields = ['slug']


@admin.register(VendorCategory)
class VendorCategoryAdmin(ModelAdmin):
    """Admin interface for Vendor Categories"""
    
    list_display = [
        'image_thumbnail',
        'name', 
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
            'fields': ('icon_emoji', 'gradient_from', 'gradient_to'),
            'description': 'Customize how the category appears on the website'
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    readonly_fields = ['created_at', 'updated_at']
    
    inlines = [VendorSubCategoryInline]
    
    def image_thumbnail(self, obj):
        """Display category image thumbnail"""
        if obj.image:
            try:
                return format_html(
                    '<div style="text-align: center;">'
                    '<img src="{}" width="60" height="60" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.15); border: 2px solid #e0e0e0;" />'
                    '</div>',
                    obj.image.url
                )
            except Exception:
                pass
        return format_html(
            '<div style="width: 60px; height: 60px; border-radius: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">'
            '{}'
            '</div>',
            obj.name[0].upper() if obj.name else '?'
        )
    image_thumbnail.short_description = '🖼️ Image'
    
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
class VendorSubCategoryAdmin(ModelAdmin):
    """Admin interface for Vendor Subcategories"""
    
    list_display = [
        'banner_thumbnail',
        'name',
        'category',
        'vendor_count_display',
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
            'fields': ('banner_image', 'vendor_count'),
            'description': 'Banner image and display settings'
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    readonly_fields = ['created_at', 'updated_at']
    
    def banner_thumbnail(self, obj):
        """Display banner image thumbnail"""
        if obj.banner_image:
            try:
                return format_html(
                    '<div style="text-align: center;">'
                    '<img src="{}" width="80" height="60" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.15); border: 2px solid #e0e0e0;" />'
                    '</div>',
                    obj.banner_image.url
                )
            except Exception:
                pass
        return format_html(
            '<div style="width: 80px; height: 60px; border-radius: 8px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.15); text-align: center; padding: 4px;">'
            '<span style="font-size: 10px;">No Image</span>'
            '</div>'
        )
    banner_thumbnail.short_description = '🖼️ Banner'
    
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
class VendorProfileAdmin(ModelAdmin):
    """Comprehensive admin interface for Vendor Profiles"""
    
    def get_urls(self):
        from django.urls import path
        urls = super().get_urls()
        custom_urls = [
            path('delete-image/<int:image_id>/', self.admin_site.admin_view(self.delete_gallery_image_view), name='delete_vendor_image'),
        ]
        return custom_urls + urls
    
    def delete_gallery_image_view(self, request, image_id):
        """View to delete a gallery image"""
        from django.shortcuts import redirect
        from django.contrib import messages
        
        try:
            image = VendorImage.objects.get(id=image_id)
            vendor_id = image.vendor.id
            image.delete()
            messages.success(request, 'Image deleted successfully!')
        except VendorImage.DoesNotExist:
            messages.error(request, 'Image not found!')
        except Exception as e:
            messages.error(request, f'Error deleting image: {str(e)}')
        
        return redirect('admin:vendor_vendorprofile_change', vendor_id)
    
    list_display = [
        'profile_preview', 'name', 'category', 'subcategory', 'location', 
        'rating_display', 'reviews_count', 'featured_status', 'active_status'
    ]
    list_filter = [
        'category', 'subcategory', 'is_featured', 'is_active', 
        'created_at', 'location'
    ]
    search_fields = ['name', 'tagline', 'description', 'location', 'phone', 'email']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['-is_featured', '-rating', 'name']
    actions = ['duplicate_vendor']
    readonly_fields = ['profile_image_preview', 'hero_images_preview', 'bulk_upload_gallery_widget', 'uploaded_gallery_images_preview']
    
    def profile_image_preview(self, obj):
        """Display profile image preview"""
        if obj.profile_image:
            return format_html(
                '<div class="responsive-image-container">'
                '<img src="{}" style="max-width: 200px; max-height: 150px; border-radius: 12px; '
                'box-shadow: 0 4px 12px rgba(0,0,0,0.15); cursor: pointer;" '
                'onclick="window.open(this.src, \'_blank\')" title="Click to view full size" />'
                '</div>',
                obj.profile_image.url
            )
        return "No profile image uploaded"
    profile_image_preview.short_description = 'Current Profile Image'
    
    def hero_images_preview(self, obj):
        """Display 4 hero images in 2x2 grid"""
        hero_images = [obj.hero_image_1, obj.hero_image_2, obj.hero_image_3, obj.hero_image_4]
        labels = ['Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right']
        
        preview_html = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-width: 400px;">'
        
        for i, (image, label) in enumerate(zip(hero_images, labels)):
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
    hero_images_preview.short_description = 'Hero Images Grid Preview'
    
    def bulk_upload_gallery_widget(self, obj):
        """Display bulk upload widget for gallery images"""
        return format_html(
            '<div style="margin: 15px 0;">'
            '<input type="file" name="bulk_gallery_images" id="bulk_gallery_images" multiple accept="image/*" '
            'style="padding: 10px; border: 2px dashed #ccc; border-radius: 8px; '
            'background: #f9f9f9; width: 100%; cursor: pointer;" '
            'onchange="previewBulkGalleryImages(this)" />'
            '<div id="bulk-gallery-image-previews" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px; margin-top: 20px;"></div>'
            '<p style="margin-top: 10px; color: #666; font-size: 13px;">'
            '💡 <strong>Tip:</strong> Select multiple images for the gallery. Hold Ctrl (Windows) or Cmd (Mac) to select multiple. '
            'Alt text will be auto-generated as "chobighar - Vendor Name - Gallery Image".'
            '</p>'
            '<script>'
            'var galleryDataTransfer = new DataTransfer();'
            'var galleryFilesList = [];'
            'function previewBulkGalleryImages(input) {{'
            '  const previewContainer = document.getElementById("bulk-gallery-image-previews");'
            '  previewContainer.innerHTML = "";'
            '  '
            '  if (!input || !input.files || input.files.length === 0) {{'
            '    galleryFilesList = [];'
            '    return;'
            '  }}'
            '  '
            '  galleryFilesList = Array.from(input.files);'
            '  '
            '  if (galleryFilesList.length === 0) {{'
            '    return;'
            '  }}'
            '  '
            '  galleryFilesList.forEach((file, idx) => {{'
            '    const reader = new FileReader();'
            '    reader.onload = function(e) {{'
            '      const div = document.createElement("div");'
            '      div.className = "bulk-gallery-preview-item";'
            '      div.setAttribute("data-file-index", idx);'
            '      div.style.cssText = "position: relative; border: 2px solid #e0e0e0; border-radius: 8px; overflow: hidden; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.1);";'
            '      '
            '      const img = document.createElement("img");'
            '      img.src = e.target.result;'
            '      img.style.cssText = "width: 100%; height: 120px; object-fit: cover; display: block;";'
            '      '
            '      const btn = document.createElement("button");'
            '      btn.type = "button";'
            '      btn.innerHTML = "❌";'
            '      btn.style.cssText = "position: absolute; top: 5px; right: 5px; background: #f44336; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; line-height: 1; box-shadow: 0 2px 4px rgba(0,0,0,0.2);";'
            '      btn.onclick = (function(index) {{'
            '        return function(e) {{'
            '          e.preventDefault();'
            '          e.stopPropagation();'
            '          removeBulkGalleryImage(index);'
            '        }};'
            '      }})(idx);'
            '      '
            '      const label = document.createElement("div");'
            '      label.textContent = file.name;'
            '      label.style.cssText = "padding: 5px; font-size: 11px; color: #666; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;";'
            '      '
            '      div.appendChild(img);'
            '      div.appendChild(btn);'
            '      div.appendChild(label);'
            '      previewContainer.appendChild(div);'
            '    }};'
            '    reader.readAsDataURL(file);'
            '  }});'
            '}}'
            'function removeBulkGalleryImage(indexToRemove) {{'
            '  galleryFilesList.splice(indexToRemove, 1);'
            '  '
            '  const input = document.getElementById("bulk_gallery_images");'
            '  const previewContainer = document.getElementById("bulk-gallery-image-previews");'
            '  '
            '  if (galleryFilesList.length === 0) {{'
            '    input.value = "";'
            '    input.files = null;'
            '    previewContainer.innerHTML = "";'
            '    galleryFilesList = [];'
            '    return;'
            '  }}'
            '  '
            '  const newDataTransfer = new DataTransfer();'
            '  galleryFilesList.forEach(file => {{'
            '    newDataTransfer.items.add(file);'
            '  }});'
            '  '
            '  input.files = newDataTransfer.files;'
            '  previewBulkGalleryImages(input);'
            '}}'
            '</script>'
            '</div>'
        )
    bulk_upload_gallery_widget.short_description = '📤 Bulk Upload Gallery Images'
    
    def uploaded_gallery_images_preview(self, obj):
        """Display already uploaded gallery images with delete buttons"""
        if not obj.pk:
            return format_html('<p style="color: #666;">Save the vendor first to see uploaded images</p>')
        
        images = obj.images.filter(is_active=True).order_by('-created_at')
        
        if not images.exists():
            return format_html('<p style="color: #666;">No gallery images uploaded yet. Use the bulk upload above to add images.</p>')
        
        from django.utils.safestring import mark_safe
        from django.urls import reverse
        
        preview_html = '<div style="margin-bottom: 10px; padding: 10px; background: #e8f5e9; border-radius: 4px; border-left: 4px solid #4caf50;">'
        preview_html += '<strong>📸 Found {} gallery images</strong>'.format(images.count())
        preview_html += '</div>'
        preview_html += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; margin-top: 15px;">'
        
        rendered_count = 0
        for img in images:
            if img.image:
                try:
                    delete_url = reverse('admin:delete_vendor_image', args=[img.id])
                    preview_html += '<div style="position: relative;">'
                    preview_html += '<img src="{}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); cursor: pointer; border: 2px solid #e0e0e0;" onclick="window.open(this.src, \'_blank\')" title="Click to view full size" />'.format(img.image.url)
                    preview_html += '<a href="{}" onclick="return confirm(\'Are you sure you want to delete this image?\')" style="position: absolute; top: 5px; right: 5px; background: #f44336; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; line-height: 1; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; text-decoration: none;">❌</a>'.format(delete_url)
                    preview_html += '</div>'
                    rendered_count += 1
                except Exception as e:
                    preview_html += '<div style="padding: 10px; background: #ffebee; border-radius: 4px;">Error: {}</div>'.format(str(e))
        
        preview_html += '</div>'
        preview_html += '<p style="margin-top: 10px; color: #666; font-size: 12px;"><strong>Displaying {} of {} total images</strong></p>'.format(rendered_count, obj.images.count())
        
        return mark_safe(preview_html)
    uploaded_gallery_images_preview.short_description = '🖼️ Uploaded Gallery Images'
    
    def save_model(self, request, obj, form, change):
        """Override save_model to handle bulk uploads"""
        super().save_model(request, obj, form, change)
        
        # Handle bulk gallery image upload
        if 'bulk_gallery_images' in request.FILES:
            files = request.FILES.getlist('bulk_gallery_images')
            uploaded_count = 0
            for file in files:
                VendorImage.objects.create(
                    vendor=obj,
                    image=file,
                    is_active=True
                )
                uploaded_count += 1
            
            if uploaded_count > 0:
                self.message_user(
                    request,
                    f"Successfully uploaded {uploaded_count} gallery image(s).",
                    level='SUCCESS'
                )
    
    fieldsets = (
        ('🏢 Basic Information', {
            'fields': ('name', 'slug', 'tagline', 'type'),
            'classes': ('wide',)
        }),
        ('� Category & Classification', {
            'fields': ('category', 'subcategory'),
        }),
        ('🖼️ Profile Image', {
            'fields': ('profile_image_preview', 'profile_image'),
            'description': 'Upload main profile/featured image for the vendor'
        }),
        ('🌟 Hero Section Images', {
            'fields': ('hero_images_preview', 'hero_image_1', 'hero_image_2', 'hero_image_3', 'hero_image_4'),
            'description': 'Upload 4 individual images for the hero section (Top-Left, Top-Right, Bottom-Left, Bottom-Right)'
        }),
        ('📤 Bulk Upload Gallery Images', {
            'fields': ('bulk_upload_gallery_widget',),
            'classes': ('wide',),
            'description': '⚡ Quick bulk upload: Select multiple images for the gallery section.'
        }),
        ('�️ Uploaded Gallery Images', {
            'fields': ('uploaded_gallery_images_preview',),
            'classes': ('wide',),
            'description': 'Preview of already uploaded gallery images'
        }),
        ('📍 Contact Information', {
            'fields': ('location', 'address', 'phone', 'email', 'website'),
            'classes': ('wide',)
        }),
        ('📱 Social Media', {
            'fields': ('instagram', 'facebook', 'youtube'),
            'classes': ('wide',),
            'description': 'Social media profile links'
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
        ('📊 Stats & Engagement', {
            'fields': ('stats_count', 'stats_label', 'love_count'),
            'description': 'Display stats in hero section'
        }),
        (' Business Hours', {
            'fields': ('business_hours',),
        }),
        ('🔍 SEO Metadata', {
            'fields': ('meta_title', 'meta_description', 'meta_keywords'),
            'classes': ('collapse',),
        }),
        ('🎯 Status & Features', {
            'fields': ('is_active', 'is_featured'),
        }),
    )
    
    inlines = [
        VendorVideoInline, VendorServiceInline, 
        VendorSpecialtyInline, VendorWhyChooseUsInline,
        VendorTestimonialInline
    ]
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('category', 'subcategory').prefetch_related('images')
    
    def profile_preview(self, obj):
        """Display profile or cover image thumbnail"""
        # Use profile_image field if available, otherwise use first gallery image
        if obj.profile_image:
            try:
                return format_html(
                    '<div style="text-align: center;">'
                    '<img src="{}" width="60" height="60" style="border-radius: 50%; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.15); border: 2px solid #e0e0e0;" />'
                    '</div>',
                    obj.profile_image.url
                )
            except Exception:
                pass
        
        # Fallback to first gallery image
        image_obj = obj.images.first()
        
        if image_obj and image_obj.image:
            try:
                return format_html(
                    '<div style="text-align: center;">'
                    '<img src="{}" width="60" height="60" style="border-radius: 50%; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.15); border: 2px solid #e0e0e0;" />'
                    '</div>',
                    image_obj.image.url
                )
            except Exception:
                pass
        
        return format_html(
            '<div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #B22222 0%, #8B0000 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">'
            '{}'
            '</div>',
            obj.name[0].upper() if obj.name else '?'
        )
    profile_preview.short_description = '📷'
    
    def duplicate_vendor(self, request, queryset):
        """Duplicate selected vendor profiles for easy modification"""
        duplicated_count = 0
        for vendor in queryset:
            # Get all related objects before duplication
            original_images = list(vendor.images.all())
            original_videos = list(vendor.videos.all())
            original_services = list(vendor.services.all())
            original_specialties = list(vendor.specialties.all())
            original_why_choose_us = list(vendor.why_choose_us.all())
            original_testimonials = list(vendor.testimonials.all())
            
            # Duplicate the main vendor profile
            original_slug = vendor.slug
            vendor.pk = None  # This will create a new object
            vendor.name = f"{vendor.name} (Copy)"
            vendor.slug = f"{original_slug}_copy_{duplicated_count + 1}"
            vendor.is_featured = False  # Don't make copies featured by default
            vendor.save()
            
            # Duplicate related images
            for image in original_images:
                image.pk = None
                image.vendor = vendor
                image.save()
            
            # Duplicate related videos
            for video in original_videos:
                video.pk = None
                video.vendor = vendor
                video.save()
            
            # Duplicate related services
            for service in original_services:
                service.pk = None
                service.vendor = vendor
                service.save()
            
            # Duplicate related specialties
            for specialty in original_specialties:
                specialty.pk = None
                specialty.vendor = vendor
                specialty.save()
            
            # Duplicate related testimonials
            for testimonial in original_testimonials:
                testimonial.pk = None
                testimonial.vendor = vendor
                testimonial.is_featured = False  # Don't make copies featured
                testimonial.save()
            
            # Duplicate related why_choose_us points
            for point in original_why_choose_us:
                point.pk = None
                point.vendor = vendor
                point.save()
            
            duplicated_count += 1
        
        self.message_user(
            request,
            f"Successfully duplicated {duplicated_count} vendor profile(s). Please edit the duplicated entries to customize them.",
            level='SUCCESS'
        )
    duplicate_vendor.short_description = "🔄 Duplicate selected vendor profiles"
    
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
class VendorImageAdmin(ModelAdmin):
    """Admin interface for Vendor Images"""
    
    list_display = ['vendor', 'image_preview', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['vendor__name', 'alt_text']
    ordering = ['vendor', 'created_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('vendor', 'image', 'alt_text', 'is_active')
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
                    '<br><small style="color: #666; font-size: 9px;">🖼️ GALLERY</small>'
                    '</div>',
                    image_url
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
class VendorVideoAdmin(ModelAdmin):
    """Admin interface for Vendor Videos"""
    
    list_display = ['vendor', 'title', 'youtube_preview', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['vendor__name', 'title', 'description']
    ordering = ['vendor']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('vendor', 'title', 'youtube_id', 'description')
        }),
        ('Settings', {
            'fields': ('is_active',)
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
class VendorTestimonialAdmin(ModelAdmin):
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
admin.site.site_header = "🏛️ chobighar Admin - Vendor Management"
admin.site.site_title = "chobighar Vendor Admin"
admin.site.index_title = "Manage Wedding Vendors & Services"

# Register remaining models with basic admin
admin.site.register(VendorService)
admin.site.register(VendorSpecialty)
admin.site.register(VendorWhyChooseUs)
