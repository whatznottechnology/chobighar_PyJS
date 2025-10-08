from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator


class BlogCategory(models.Model):
    """Blog categories for organizing posts"""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True, help_text="Icon class or emoji")
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    # SEO Fields
    meta_title = models.CharField(max_length=60, blank=True, help_text="SEO title (60 chars max)")
    meta_description = models.CharField(max_length=160, blank=True, help_text="SEO description (160 chars max)")
    meta_keywords = models.CharField(max_length=255, blank=True, help_text="Comma-separated keywords")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', 'name']
        verbose_name = 'Blog Category'
        verbose_name_plural = 'Blog Categories'
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class BlogPost(models.Model):
    """Main blog post model"""
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('scheduled', 'Scheduled'),
        ('archived', 'Archived'),
    ]
    
    # Basic Info
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, related_name='posts')
    author = models.CharField(max_length=100, default='chobighar Team')
    
    # Content
    excerpt = models.TextField(max_length=300, help_text="Brief summary (300 chars max)")
    content = models.TextField(help_text="Main blog content (supports HTML)")
    
    # Media
    featured_image = models.ImageField(upload_to='blog/featured/', null=True, blank=True)
    featured_image_alt = models.CharField(max_length=200, blank=True, help_text="Alt text for featured image")
    thumbnail_image = models.ImageField(upload_to='blog/thumbnails/', null=True, blank=True, help_text="Optional custom thumbnail")
    
    # Publishing
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    published_date = models.DateTimeField(null=True, blank=True)
    scheduled_date = models.DateTimeField(null=True, blank=True, help_text="For scheduled posts")
    
    # Engagement
    views_count = models.PositiveIntegerField(default=0)
    reading_time = models.PositiveIntegerField(default=5, help_text="Estimated reading time in minutes")
    is_featured = models.BooleanField(default=False, help_text="Show in featured posts section")
    
    # SEO Fields
    meta_title = models.CharField(max_length=60, blank=True, help_text="SEO title (60 chars max)")
    meta_description = models.CharField(max_length=160, blank=True, help_text="SEO description (160 chars max)")
    meta_keywords = models.CharField(max_length=255, blank=True, help_text="Comma-separated keywords")
    og_image = models.ImageField(upload_to='blog/og/', null=True, blank=True, help_text="Open Graph image for social sharing")
    
    # Tags (comma-separated)
    tags = models.CharField(max_length=255, blank=True, help_text="Comma-separated tags")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-published_date', '-created_at']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'
        indexes = [
            models.Index(fields=['-published_date']),
            models.Index(fields=['status']),
            models.Index(fields=['slug']),
        ]
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        
        # Auto-generate meta fields if empty
        if not self.meta_title:
            self.meta_title = self.title[:60]
        if not self.meta_description:
            self.meta_description = self.excerpt[:160]
        
        super().save(*args, **kwargs)
    
    def get_tags_list(self):
        """Return tags as a list"""
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]
    
    def increment_views(self):
        """Increment view count"""
        self.views_count += 1
        self.save(update_fields=['views_count'])


class BlogComment(models.Model):
    """Comments for blog posts"""
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    comment = models.TextField()
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Blog Comment'
        verbose_name_plural = 'Blog Comments'
    
    def __str__(self):
        return f"Comment by {self.name} on {self.post.title}"


class PopupInquiry(models.Model):
    """First-time popup inquiry submissions"""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    whatsapp_number = models.CharField(max_length=20)
    location = models.CharField(max_length=200)
    event_date = models.DateField(null=True, blank=True)
    event_type = models.CharField(max_length=100)
    message = models.TextField(blank=True)
    
    # Metadata
    submitted_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=255, blank=True)
    
    class Meta:
        ordering = ['-submitted_at']
        verbose_name = 'Popup Inquiry'
        verbose_name_plural = 'Popup Inquiries'
    
    def __str__(self):
        return f"{self.name} - {self.event_type} ({self.submitted_at.strftime('%Y-%m-%d')})"


class PopupSettings(models.Model):
    """Settings for the first-time popup"""
    is_active = models.BooleanField(default=True, help_text="Enable/disable popup")
    popup_image = models.ImageField(upload_to='popup/', help_text="Main popup image")
    popup_title = models.CharField(max_length=200, default="Plan Your Dream Event!")
    popup_subtitle = models.CharField(max_length=300, blank=True)
    
    # Display settings
    show_delay = models.PositiveIntegerField(default=2000, help_text="Delay in milliseconds before showing")
    cookie_duration_days = models.PositiveIntegerField(default=7, help_text="Days before showing again")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Popup Settings'
        verbose_name_plural = 'Popup Settings'
    
    def __str__(self):
        return f"Popup Settings ({'Active' if self.is_active else 'Inactive'})"
    
    def save(self, *args, **kwargs):
        # Ensure only one settings instance exists
        if not self.pk and PopupSettings.objects.exists():
            raise ValueError("Only one PopupSettings instance is allowed")
        super().save(*args, **kwargs)
