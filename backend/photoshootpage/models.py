from django.db import models

class PhotoshootHero(models.Model):
    """Hero section for photoshoot page"""
    title = models.CharField(
        max_length=200,
        help_text="Hero section main title",
        default="Photography That Tells Your Story"
    )
    subtitle = models.TextField(
        help_text="Hero section subtitle/description"
    )
    hero_image = models.ImageField(
        upload_to='photoshoot/hero/',
        help_text="Hero section background image (full screen recommended)"
    )
    alt_text = models.CharField(
        max_length=200,
        help_text="Alt text for accessibility",
        default="Professional photography services"
    )
    
    # CTA Buttons
    primary_button_text = models.CharField(
        max_length=50,
        default="Book a Session",
        help_text="Primary button text"
    )
    primary_button_link = models.URLField(
        default="/contact",
        help_text="Primary button URL"
    )
    secondary_button_text = models.CharField(
        max_length=50,
        default="View Portfolio",
        help_text="Secondary button text"
    )
    secondary_button_link = models.URLField(
        default="#portfolio",
        help_text="Secondary button URL"
    )
    
    is_active = models.BooleanField(
        default=True,
        help_text="Show this hero section"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Photoshoot Hero Section"
        verbose_name_plural = "Photoshoot Hero Sections"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

class PhotoshootService(models.Model):
    """Photography services offered"""
    title = models.CharField(
        max_length=200,
        help_text="Service title (e.g., 'Bengali Traditional Wedding Photography')"
    )
    description = models.TextField(
        help_text="Detailed service description"
    )
    service_image = models.ImageField(
        upload_to='photoshoot/services/',
        help_text="Service showcase image"
    )
    alt_text = models.CharField(
        max_length=200,
        help_text="Alt text for service image"
    )
    
    # Pricing and Duration
    price = models.CharField(
        max_length=50,
        help_text="Price range (e.g., 'Starting from ₹45,000')"
    )
    duration = models.CharField(
        max_length=50,
        help_text="Service duration (e.g., '10-12 Hours')"
    )
    deliverables = models.CharField(
        max_length=200,
        help_text="What client receives (e.g., '500+ Photos, Custom Album, Digital Gallery')"
    )
    
    # Features and Inclusions (stored as JSON or separate models)
    features = models.JSONField(
        default=list,
        help_text="List of service features",
        blank=True
    )
    inclusions = models.JSONField(
        default=list,
        help_text="What's included in the package",
        blank=True
    )
    
    # Display settings
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower numbers first)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Show this service"
    )
    is_featured = models.BooleanField(
        default=False,
        help_text="Feature this service"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Photoshoot Service"
        verbose_name_plural = "Photoshoot Services"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return self.title

class PhotoshootPageSettings(models.Model):
    """General settings for photoshoot page"""
    services_section_title = models.CharField(
        max_length=200,
        default="Our Photography Services",
        help_text="Services section title"
    )
    services_section_description = models.TextField(
        default="From intimate portraits to grand celebrations, we specialize in capturing life's most precious moments with artistic excellence and cultural authenticity.",
        help_text="Services section description"
    )
    
    # SEO Settings
    meta_title = models.CharField(
        max_length=200,
        default="Professional Photography Services | Chabighar",
        help_text="SEO meta title"
    )
    meta_description = models.TextField(
        default="Professional photography services including Bengali wedding photography, pre-wedding shoots, portraits, and cultural events. Book your session today.",
        help_text="SEO meta description"
    )
    
    is_active = models.BooleanField(
        default=True,
        help_text="Enable photoshoot page"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Photoshoot Page Settings"
        verbose_name_plural = "Photoshoot Page Settings"
    
    def __str__(self):
        return "Photoshoot Page Settings"

    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if PhotoshootPageSettings.objects.exists() and not self.pk:
            raise ValueError("Only one PhotoshootPageSettings instance allowed")
        return super().save(*args, **kwargs)


class PhotoshootTestimonial(models.Model):
    """Client testimonials for photoshoot services"""
    client_name = models.CharField(
        max_length=100,
        help_text="Client name (e.g., 'Priya & Arjun' or 'Sneha Sharma')"
    )
    service_type = models.CharField(
        max_length=100,
        help_text="Service received (e.g., 'Bengali Wedding Photography', 'Portrait Session')"
    )
    rating = models.PositiveIntegerField(
        choices=[(i, f"{i} Star{'s' if i != 1 else ''}") for i in range(1, 6)],
        default=5,
        help_text="Rating out of 5 stars"
    )
    testimonial_text = models.TextField(
        help_text="Client's review/testimonial"
    )
    client_image = models.ImageField(
        upload_to='photoshoot/testimonials/',
        help_text="Client photo (recommended: square image, 100x100px minimum)",
        blank=True,
        null=True
    )
    
    # Display settings
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower numbers first)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Show this testimonial"
    )
    is_featured = models.BooleanField(
        default=False,
        help_text="Feature this testimonial on homepage"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Photoshoot Testimonial"
        verbose_name_plural = "Photoshoot Testimonials"
        ordering = ['order', '-created_at']
    
    def __str__(self):
        return f"{self.client_name} - {self.service_type} ({self.rating}★)"
    
    @property
    def image_url(self):
        """Get the full URL for client image"""
        if self.client_image:
            return self.client_image.url
        return None
