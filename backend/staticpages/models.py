from django.db import models
from django.utils.text import slugify
from ckeditor_uploader.fields import RichTextUploadingField


class StaticPage(models.Model):
    """Model for static/legal pages like Terms, Privacy Policy, etc"""
    
    # Basic Info
    title = models.CharField(max_length=200, help_text="Page title")
    slug = models.SlugField(max_length=220, unique=True, blank=True, help_text="URL-friendly version of title")
    
    # Content
    content = RichTextUploadingField(
        config_name='blog_content',
        help_text="Rich content with support for images and formatted text"
    )
    
    # SEO Meta Data
    meta_title = models.CharField(max_length=60, blank=True, help_text="SEO title (60 chars max)")
    meta_description = models.CharField(max_length=160, blank=True, help_text="SEO description (160 chars max)")
    meta_keywords = models.CharField(max_length=255, blank=True, help_text="Comma-separated keywords")
    
    # Publishing
    is_published = models.BooleanField(default=True, help_text="Show/hide page")
    show_in_footer = models.BooleanField(default=True, help_text="Display link in footer")
    display_order = models.PositiveIntegerField(default=0, help_text="Order in footer (lower number = higher position)")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', 'title']
        verbose_name = 'Static Page'
        verbose_name_plural = 'Static Pages'
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['is_published']),
            models.Index(fields=['show_in_footer', 'display_order']),
        ]
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Auto-generate slug if not provided
        if not self.slug:
            self.slug = slugify(self.title)
        
        # Auto-generate meta fields if empty
        if not self.meta_title:
            self.meta_title = self.title[:60]
        if not self.meta_description:
            # Extract first 160 chars from content (strip HTML tags)
            import re
            clean_content = re.sub('<[^<]+?>', '', self.content)
            self.meta_description = clean_content[:160]
        
        super().save(*args, **kwargs)
