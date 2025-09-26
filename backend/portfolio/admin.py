from django.contrib import admin
from .models import Category, Portfolio, PortfolioImage, PortfolioVideo, PortfolioHighlight, PortfolioService, PortfolioInquiry

class PortfolioImageInline(admin.TabularInline):
    model = PortfolioImage
    extra = 1
    fields = ('image_file', 'image_url', 'caption', 'order', 'is_cover', 'is_active')
    
    def get_readonly_fields(self, request, obj=None):
        # Make fields read-only based on which is used
        return []

class PortfolioVideoInline(admin.TabularInline):
    model = PortfolioVideo
    extra = 1
    fields = ('video_id', 'title', 'thumbnail_file', 'thumbnail_url', 'duration', 'order', 'is_active')

class PortfolioHighlightInline(admin.TabularInline):
    model = PortfolioHighlight
    extra = 1
    fields = ('highlight_text', 'order')

class PortfolioServiceInline(admin.TabularInline):
    model = PortfolioService
    extra = 1
    fields = ('service_name', 'order')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'id', 'is_active', 'order', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name', 'id')
    ordering = ('order', 'name')

@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date', 'location', 'image_count', 'featured', 'is_active')
    list_filter = ('category', 'featured', 'is_active', 'date', 'created_at')
    search_fields = ('title', 'subtitle', 'location', 'description')
    prepopulated_fields = {'id': ('title',)}
    date_hierarchy = 'date'
    ordering = ('order', '-date')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'title', 'subtitle', 'category')
        }),
        ('Cover Image', {
            'fields': ('cover_image_file', 'cover_image_url'),
            'description': 'Upload a file OR provide a URL (file takes priority)'
        }),
        ('Event Details', {
            'fields': ('date', 'location', 'duration', 'guests', 'image_count')
        }),
        ('Content', {
            'fields': ('description', 'story')
        }),
        ('Settings', {
            'fields': ('featured', 'is_active', 'order')
        })
    )
    
    inlines = [PortfolioImageInline, PortfolioVideoInline, PortfolioHighlightInline, PortfolioServiceInline]

@admin.register(PortfolioImage)
class PortfolioImageAdmin(admin.ModelAdmin):
    list_display = ('portfolio', 'caption', 'order', 'is_cover', 'is_active', 'has_file', 'has_url')
    list_filter = ('portfolio', 'is_cover', 'is_active', 'created_at')
    search_fields = ('portfolio__title', 'caption')
    ordering = ('portfolio', 'order')
    
    fieldsets = (
        ('Portfolio', {
            'fields': ('portfolio',)
        }),
        ('Image Source', {
            'fields': ('image_file', 'image_url'),
            'description': 'Upload a file OR provide a URL (file takes priority)'
        }),
        ('Details', {
            'fields': ('caption', 'order', 'is_cover', 'is_active')
        })
    )
    
    def has_file(self, obj):
        return bool(obj.image_file)
    has_file.boolean = True
    has_file.short_description = "Has File"
    
    def has_url(self, obj):
        return bool(obj.image_url)
    has_url.boolean = True
    has_url.short_description = "Has URL"

@admin.register(PortfolioVideo)
class PortfolioVideoAdmin(admin.ModelAdmin):
    list_display = ('portfolio', 'title', 'duration', 'order', 'is_active', 'has_custom_thumbnail')
    list_filter = ('portfolio', 'is_active', 'created_at')
    search_fields = ('portfolio__title', 'title', 'video_id')
    ordering = ('portfolio', 'order')
    
    fieldsets = (
        ('Portfolio', {
            'fields': ('portfolio',)
        }),
        ('Video Details', {
            'fields': ('video_id', 'title', 'description', 'duration')
        }),
        ('Thumbnail', {
            'fields': ('thumbnail_file', 'thumbnail_url'),
            'description': 'Upload custom thumbnail OR provide URL (auto-generated from YouTube if empty)'
        }),
        ('Settings', {
            'fields': ('order', 'is_active')
        })
    )
    
    def has_custom_thumbnail(self, obj):
        return bool(obj.thumbnail_file or obj.thumbnail_url)
    has_custom_thumbnail.boolean = True
    has_custom_thumbnail.short_description = "Custom Thumbnail"

@admin.register(PortfolioInquiry)
class PortfolioInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'portfolio', 'phone', 'event_date', 'status', 'created_at')
    list_filter = ('status', 'event_date', 'created_at', 'portfolio')
    search_fields = ('name', 'phone', 'portfolio__title')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Client Information', {
            'fields': ('name', 'phone', 'event_date')
        }),
        ('Inquiry Details', {
            'fields': ('portfolio', 'message', 'status')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    actions = ['mark_as_contacted', 'mark_as_converted']
    
    def mark_as_contacted(self, request, queryset):
        queryset.update(status='contacted')
        self.message_user(request, f"{queryset.count()} inquiries marked as contacted.")
    mark_as_contacted.short_description = "Mark selected inquiries as contacted"
    
    def mark_as_converted(self, request, queryset):
        queryset.update(status='converted')
        self.message_user(request, f"{queryset.count()} inquiries marked as converted.")
    mark_as_converted.short_description = "Mark selected inquiries as converted"