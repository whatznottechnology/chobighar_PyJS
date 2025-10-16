from django.db import models
from django.utils.text import slugify
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
import os

def portfolio_cover_upload_to(instance, filename):
    """Upload path for portfolio cover images"""
    return f'portfolio/{instance.id}/cover/{filename}'

def portfolio_image_upload_to(instance, filename):
    """Upload path for portfolio images"""
    return f'portfolio/{instance.portfolio.id}/images/{filename}'


class Category(models.Model):
    """Portfolio categories like wedding, prewedding, portrait, event"""
    CATEGORY_CHOICES = [
        ('wedding', 'Weddings'),
        ('prewedding', 'Pre-Wedding'),
        ('portrait', 'Portraits'),
        ('event', 'Events'),
    ]
    
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Portfolio(models.Model):
    """Main portfolio/album model"""
    id = models.SlugField(max_length=100, primary_key=True)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='portfolios')
    
    # Support both file upload and URL for cover image
    cover_image_file = models.ImageField(
        upload_to=portfolio_cover_upload_to, 
        blank=True, 
        null=True,
        help_text="Upload cover image file"
    )
    cover_image_url = models.URLField(
        max_length=500, 
        blank=True,
        help_text="Or provide cover image URL"
    )
    
    image_count = models.IntegerField(default=0, help_text="Total number of images")
    date = models.DateField(help_text="Event date")
    location = models.CharField(max_length=200)
    duration = models.CharField(max_length=50, help_text="e.g., '2 Days', '3 Hours'")
    guests = models.CharField(max_length=50, help_text="e.g., '300+', '2'")
    description = models.TextField(help_text="Short description")
    story = models.TextField(help_text="Detailed story/narrative")
    
    # SEO Metadata Fields
    meta_title = models.CharField(
        max_length=200, 
        blank=True, 
        help_text="SEO title (leave blank to auto-generate from title)"
    )
    meta_description = models.TextField(
        max_length=320, 
        blank=True, 
        help_text="SEO description (leave blank to auto-generate from description)"
    )
    meta_keywords = models.CharField(
        max_length=500, 
        blank=True, 
        help_text="SEO keywords, comma-separated (e.g., 'wedding photography, Kolkata, pre-wedding shoot')"
    )
    og_image = models.ImageField(
        upload_to='portfolio/og_images/', 
        blank=True, 
        null=True,
        help_text="Open Graph image for social media sharing (1200x630px recommended)"
    )
    
    is_active = models.BooleanField(default=True)
    featured = models.BooleanField(default=False, help_text="Show in featured section")
    order = models.IntegerField(default=0, help_text="Custom ordering")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-date']

    def __str__(self):
        return self.title

    def clean(self):
        """Validate that at least one cover image source is provided"""
        if not self.cover_image_file and not self.cover_image_url:
            raise ValidationError("Please provide either a cover image file or URL.")

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = slugify(self.title)
        super().save(*args, **kwargs)

    @property
    def cover_image(self):
        """Get cover image URL (prioritize uploaded file over URL)"""
        if self.cover_image_file:
            return self.cover_image_file.url
        return self.cover_image_url or ""

    @property
    def images(self):
        """Get all images for this portfolio"""
        return self.portfolio_images.filter(is_active=True).order_by('order')

    @property
    def videos(self):
        """Get all videos for this portfolio"""
        return self.portfolio_videos.filter(is_active=True).order_by('order')

    @property
    def highlights(self):
        """Get all highlights for this portfolio"""
        return self.portfolio_highlights.all().order_by('order')

    @property
    def services(self):
        """Get all services for this portfolio"""
        return self.portfolio_services.all().order_by('order')


class PortfolioImage(models.Model):
    """Images within each portfolio"""
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name='portfolio_images')
    
    # Support both file upload and URL for images
    image_file = models.ImageField(
        upload_to=portfolio_image_upload_to,
        blank=True,
        null=True,
        help_text="Upload image file"
    )
    image_url = models.URLField(
        max_length=500,
        blank=True,
        help_text="Or provide image URL"
    )
    
    caption = models.CharField(max_length=200, blank=True)
    order = models.IntegerField(default=0)
    is_cover = models.BooleanField(default=False, help_text="Use as cover image")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return f"{self.portfolio.title} - Image {self.order}"

    def clean(self):
        """Validate that at least one image source is provided"""
        if not self.image_file and not self.image_url:
            raise ValidationError("Please provide either an image file or URL.")

    @property
    def image(self):
        """Get image URL (prioritize uploaded file over URL)"""
        if self.image_file:
            return self.image_file.url
        return self.image_url or ""

    def save(self, *args, **kwargs):
        # If this is marked as cover image, unmark others
        if self.is_cover:
            PortfolioImage.objects.filter(
                portfolio=self.portfolio, 
                is_cover=True
            ).exclude(pk=self.pk).update(is_cover=False)
            
            # Update portfolio cover_image_url with this image
            if self.image_file:
                self.portfolio.cover_image_file = None  # Clear file to use this image
                self.portfolio.cover_image_url = self.image
            else:
                self.portfolio.cover_image_url = self.image_url
            self.portfolio.save()
        
        super().save(*args, **kwargs)


def portfolio_video_thumbnail_upload_to(instance, filename):
    """Upload path for video thumbnails"""
    return f'portfolio/{instance.portfolio.id}/video_thumbnails/{filename}'


class PortfolioVideo(models.Model):
    """Videos within each portfolio"""
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name='portfolio_videos')
    video_id = models.CharField(max_length=100, help_text="YouTube video ID")
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    duration = models.CharField(max_length=20, help_text="e.g., '3:45', '2:30'")
    
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return f"{self.portfolio.title} - {self.title}"


class PortfolioHighlight(models.Model):
    """Highlights/bullet points for each portfolio"""
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name='portfolio_highlights')
    highlight_text = models.CharField(max_length=300)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return f"{self.portfolio.title} - {self.highlight_text[:50]}"


class PortfolioService(models.Model):
    """Services provided for each portfolio"""
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name='portfolio_services')
    service_name = models.CharField(max_length=200)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return f"{self.portfolio.title} - {self.service_name}"


class PortfolioInquiry(models.Model):
    """Quote requests from portfolio pages"""
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('converted', 'Converted'),
        ('closed', 'Closed'),
    ]
    
    portfolio = models.ForeignKey(Portfolio, on_delete=models.SET_NULL, null=True, blank=True, related_name='inquiries')
    name = models.CharField(max_length=100)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone = models.CharField(validators=[phone_regex], max_length=17)
    event_date = models.DateField()
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        portfolio_name = self.portfolio.title if self.portfolio else "General"
        return f"{self.name} - {portfolio_name} - {self.status}"