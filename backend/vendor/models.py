from django.db import models
from django.core.validators import MinLengthValidator
from django.utils.text import slugify

class VendorCategory(models.Model):
    """Main vendor categories like 'Venues & Spaces', 'Photography', etc."""
    
    name = models.CharField(
        max_length=100, 
        unique=True,
        validators=[MinLengthValidator(2)],
        help_text="Category name (e.g., 'Venues & Spaces')"
    )
    
    slug = models.SlugField(
        max_length=120,
        unique=True,
        blank=True,
        help_text="URL-friendly version of the name"
    )
    
    description = models.TextField(
        help_text="Short description of the category"
    )
    
    image = models.ImageField(
        upload_to='vendor_categories/',
        help_text="Category image (recommended: 600x400 pixels)",
        null=True,
        blank=True
    )
    
    icon_emoji = models.CharField(
        max_length=10,
        default="🏛️",
        help_text="Emoji icon for the category"
    )
    
    gradient_from = models.CharField(
        max_length=50,
        default="from-blue-900/80",
        help_text="Tailwind gradient start class"
    )
    
    gradient_to = models.CharField(
        max_length=50,
        default="to-purple-900/80",
        help_text="Tailwind gradient end class"
    )
    
    display_order = models.PositiveIntegerField(
        default=0,
        help_text="Order in which categories are displayed (0 = first)"
    )
    
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this category is visible on the website"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Vendor Category"
        verbose_name_plural = "Vendor Categories"
        ordering = ['display_order', 'name']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name
    
    @property
    def vendor_count(self):
        """Return total number of vendors in all subcategories"""
        return sum(sub.vendor_count for sub in self.subcategories.all())
    
    @property
    def gradient_class(self):
        """Return combined gradient class for frontend"""
        return f"{self.gradient_from} {self.gradient_to}"


class VendorSubCategory(models.Model):
    """Subcategories like 'Banquet Halls', 'Marriage Gardens', etc."""
    
    category = models.ForeignKey(
        VendorCategory,
        on_delete=models.CASCADE,
        related_name='subcategories',
        help_text="Parent category"
    )
    
    name = models.CharField(
        max_length=100,
        validators=[MinLengthValidator(2)],
        help_text="Subcategory name (e.g., 'Banquet Halls')"
    )
    
    slug = models.SlugField(
        max_length=120,
        unique=True,
        blank=True,
        help_text="URL-friendly version of the name"
    )
    
    description = models.TextField(
        help_text="Detailed description of the subcategory"
    )
    
    banner_image = models.ImageField(
        upload_to='vendor_subcategories/',
        help_text="Banner image for subcategory detail page (recommended: 1200x600 pixels)",
        null=True,
        blank=True
    )
    
    vendor_count = models.PositiveIntegerField(
        default=0,
        help_text="Number of vendors in this subcategory"
    )
    
    display_order = models.PositiveIntegerField(
        default=0,
        help_text="Order within the parent category (0 = first)"
    )
    
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this subcategory is visible on the website"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Vendor Subcategory"
        verbose_name_plural = "Vendor Subcategories"
        ordering = ['display_order', 'name']
        unique_together = ['category', 'name']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            # Create slug from name, replacing spaces and forward slashes with hyphens
            base_slug = self.name.lower().replace(' ', '-').replace('/', '-')
            self.slug = slugify(base_slug)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.category.name} > {self.name}"


class VendorProfile(models.Model):
    """Detailed vendor profiles with all business information"""
    
    # Basic Information
    name = models.CharField(
        max_length=200,
        validators=[MinLengthValidator(2)],
        help_text="Business name (e.g., 'Royal Palace Banquets')"
    )
    
    slug = models.SlugField(
        max_length=220,
        unique=True,
        blank=True,
        help_text="URL-friendly version of the name"
    )
    
    tagline = models.CharField(
        max_length=200,
        help_text="Business tagline (e.g., 'Where Dreams Meet Reality')"
    )
    
    # Category and Type
    category = models.ForeignKey(
        VendorCategory,
        on_delete=models.CASCADE,
        related_name='vendor_profiles',
        help_text="Primary business category"
    )
    
    subcategory = models.ForeignKey(
        VendorSubCategory,
        on_delete=models.CASCADE,
        related_name='vendor_profiles',
        help_text="Specific subcategory"
    )
    
    type = models.CharField(
        max_length=100,
        help_text="Business type (e.g., 'Banquet Hall', 'Wedding Photography')"
    )
    
    # Location and Contact
    location = models.CharField(
        max_length=200,
        help_text="Business location (e.g., 'Salt Lake, Kolkata')"
    )
    
    address = models.TextField(
        help_text="Full business address"
    )
    
    phone = models.CharField(
        max_length=20,
        help_text="Primary contact number"
    )
    
    email = models.EmailField(
        help_text="Business email address"
    )
    
    website = models.URLField(
        blank=True,
        null=True,
        help_text="Business website URL"
    )
    
    # Descriptions
    description = models.TextField(
        help_text="Short business description for cards and listings"
    )
    
    story = models.TextField(
        help_text="Detailed business story and background"
    )
    
    # Business Details
    experience = models.CharField(
        max_length=50,
        help_text="Years of experience (e.g., '13+ Years')"
    )
    
    price_range = models.CharField(
        max_length=100,
        help_text="Price range (e.g., '₹50,000 - ₹1,50,000')"
    )
    
    capacity = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Capacity information (e.g., '200-800 guests')"
    )
    
    # Ratings and Reviews
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        default=0.0,
        help_text="Average rating (0.0 to 5.0)"
    )
    
    reviews_count = models.PositiveIntegerField(
        default=0,
        help_text="Total number of reviews"
    )
    
    # Social Media
    instagram = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Instagram handle (without @)"
    )
    
    facebook = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Facebook page name"
    )
    
    youtube = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="YouTube channel name"
    )
    
    # Business Status
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this vendor is visible on the website"
    )
    
    is_featured = models.BooleanField(
        default=False,
        help_text="Whether this vendor appears in featured listings"
    )
    
    # Business Hours (JSON field for flexibility)
    business_hours = models.JSONField(
        default=dict,
        help_text="Business hours for each day of the week"
    )
    
    # SEO Metadata Fields
    meta_title = models.CharField(
        max_length=200,
        blank=True,
        help_text="SEO title (leave blank to auto-generate from name and location)"
    )
    
    meta_description = models.TextField(
        max_length=320,
        blank=True,
        help_text="SEO description (leave blank to auto-generate from description)"
    )
    
    meta_keywords = models.CharField(
        max_length=500,
        blank=True,
        help_text="SEO keywords, comma-separated (e.g., 'wedding photographer Kolkata, pre-wedding shoot')"
    )
    
    og_image = models.ImageField(
        upload_to='vendor/og_images/',
        blank=True,
        null=True,
        help_text="Open Graph image for social media sharing (1200x630px recommended)"
    )
    
    # Meta Information
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Vendor Profile"
        verbose_name_plural = "Vendor Profiles"
        ordering = ['-is_featured', '-rating', 'name']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name
    
    @property
    def social_media(self):
        """Return social media information as dict"""
        return {
            'instagram': f"@{self.instagram}" if self.instagram else None,
            'facebook': self.facebook,
            'youtube': self.youtube
        }


class VendorImage(models.Model):
    """Images for vendor profiles"""
    
    vendor = models.ForeignKey(
        VendorProfile,
        on_delete=models.CASCADE,
        related_name='images'
    )
    
    image = models.ImageField(
        upload_to='vendor_images/',
        help_text="Vendor image"
    )
    
    title = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        help_text="Image title/caption"
    )
    
    alt_text = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        help_text="Alt text for accessibility"
    )
    
    image_type = models.CharField(
        max_length=20,
        choices=[
            ('hero', 'Hero Image'),
            ('gallery', 'Gallery Image'),
            ('cover', 'Cover Image'),
            ('profile', 'Profile Image'),
        ],
        default='gallery',
        help_text="Type of image"
    )
    
    display_order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (0 = first)"
    )
    
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this image is visible"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Vendor Image"
        verbose_name_plural = "Vendor Images"
        ordering = ['image_type', 'display_order']
    
    def __str__(self):
        return f"{self.vendor.name} - {self.get_image_type_display()}"


class VendorVideo(models.Model):
    """Videos for vendor profiles"""
    
    vendor = models.ForeignKey(
        VendorProfile,
        on_delete=models.CASCADE,
        related_name='videos'
    )
    
    title = models.CharField(
        max_length=200,
        help_text="Video title"
    )
    
    youtube_id = models.CharField(
        max_length=20,
        help_text="YouTube video ID (e.g., 'dQw4w9WgXcQ')"
    )
    
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Video description"
    )
    
    display_order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (0 = first)"
    )
    
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this video is visible"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Vendor Video"
        verbose_name_plural = "Vendor Videos"
        ordering = ['display_order']
    
    def __str__(self):
        return f"{self.vendor.name} - {self.title}"
    
    @property
    def youtube_url(self):
        return f"https://www.youtube.com/watch?v={self.youtube_id}"
    
    @property
    def youtube_embed_url(self):
        return f"https://www.youtube.com/embed/{self.youtube_id}"


class VendorService(models.Model):
    """Services offered by vendors"""
    
    vendor = models.ForeignKey(
        VendorProfile,
        on_delete=models.CASCADE,
        related_name='services'
    )
    
    name = models.CharField(
        max_length=200,
        help_text="Service name (e.g., 'AC Banquet Hall')"
    )
    
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Service description"
    )
    
    display_order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (0 = first)"
    )
    
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this service is visible"
    )
    
    class Meta:
        verbose_name = "Vendor Service"
        verbose_name_plural = "Vendor Services"
        ordering = ['display_order', 'name']
        unique_together = ['vendor', 'name']
    
    def __str__(self):
        return f"{self.vendor.name} - {self.name}"


class VendorSpecialty(models.Model):
    """Specialties of vendors"""
    
    vendor = models.ForeignKey(
        VendorProfile,
        on_delete=models.CASCADE,
        related_name='specialties'
    )
    
    name = models.CharField(
        max_length=200,
        help_text="Specialty name (e.g., 'Grand Wedding Celebrations')"
    )
    
    display_order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (0 = first)"
    )
    
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this specialty is visible"
    )
    
    class Meta:
        verbose_name = "Vendor Specialty"
        verbose_name_plural = "Vendor Specialties"
        ordering = ['display_order', 'name']
        unique_together = ['vendor', 'name']
    
    def __str__(self):
        return f"{self.vendor.name} - {self.name}"


class VendorHighlight(models.Model):
    """Key highlights/features of vendors"""
    
    vendor = models.ForeignKey(
        VendorProfile,
        on_delete=models.CASCADE,
        related_name='highlights'
    )
    
    text = models.CharField(
        max_length=200,
        help_text="Highlight text (e.g., 'Capacity up to 800 guests')"
    )
    
    display_order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (0 = first)"
    )
    
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this highlight is visible"
    )
    
    class Meta:
        verbose_name = "Vendor Highlight"
        verbose_name_plural = "Vendor Highlights"
        ordering = ['display_order']
    
    def __str__(self):
        return f"{self.vendor.name} - {self.text[:50]}"


class VendorPackage(models.Model):
    """Pricing packages offered by vendors"""
    
    vendor = models.ForeignKey(
        VendorProfile,
        on_delete=models.CASCADE,
        related_name='packages'
    )
    
    name = models.CharField(
        max_length=100,
        help_text="Package name (e.g., 'Silver Package')"
    )
    
    price = models.CharField(
        max_length=50,
        help_text="Package price (e.g., '₹50,000')"
    )
    
    features = models.JSONField(
        default=list,
        help_text="List of features included in this package"
    )
    
    is_popular = models.BooleanField(
        default=False,
        help_text="Mark this package as popular/recommended"
    )
    
    display_order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (0 = first)"
    )
    
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this package is visible"
    )
    
    class Meta:
        verbose_name = "Vendor Package"
        verbose_name_plural = "Vendor Packages"
        ordering = ['display_order', 'name']
    
    def __str__(self):
        return f"{self.vendor.name} - {self.name}"


class VendorTestimonial(models.Model):
    """Customer testimonials for vendors"""
    
    vendor = models.ForeignKey(
        VendorProfile,
        on_delete=models.CASCADE,
        related_name='testimonials'
    )
    
    client_name = models.CharField(
        max_length=100,
        help_text="Client name"
    )
    
    rating = models.PositiveIntegerField(
        choices=[(i, i) for i in range(1, 6)],
        default=5,
        help_text="Rating given by client (1-5 stars)"
    )
    
    review = models.TextField(
        help_text="Client review/testimonial"
    )
    
    event_type = models.CharField(
        max_length=100,
        help_text="Type of event (e.g., 'Wedding Reception')"
    )
    
    date = models.DateField(
        help_text="Date of review"
    )
    
    is_featured = models.BooleanField(
        default=False,
        help_text="Feature this testimonial prominently"
    )
    
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this testimonial is visible"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Vendor Testimonial"
        verbose_name_plural = "Vendor Testimonials"
        ordering = ['-is_featured', '-date']
    
    def __str__(self):
        return f"{self.vendor.name} - {self.client_name}"
    
    @property
    def date_display(self):
        """Return a human-readable date format"""
        from datetime import date
        today = date.today()
        diff = today - self.date
        
        if diff.days < 7:
            return f"{diff.days} days ago"
        elif diff.days < 30:
            weeks = diff.days // 7
            return f"{weeks} week{'s' if weeks > 1 else ''} ago"
        elif diff.days < 365:
            months = diff.days // 30
            return f"{months} month{'s' if months > 1 else ''} ago"
        else:
            years = diff.days // 365
            return f"{years} year{'s' if years > 1 else ''} ago"


class VendorPortfolio(models.Model):
    """Portfolio items for vendors"""
    
    vendor = models.ForeignKey(
        VendorProfile,
        on_delete=models.CASCADE,
        related_name='portfolio_items'
    )
    
    title = models.CharField(
        max_length=200,
        help_text="Portfolio item title (e.g., 'Priya & Arjun Wedding')"
    )
    
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Portfolio item description"
    )
    
    image = models.ImageField(
        upload_to='vendor_portfolio/',
        help_text="Portfolio image"
    )
    
    category = models.CharField(
        max_length=100,
        help_text="Portfolio category (e.g., 'Wedding', 'Corporate')"
    )
    
    display_order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (0 = first)"
    )
    
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this portfolio item is visible"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Vendor Portfolio"
        verbose_name_plural = "Vendor Portfolio Items"
        ordering = ['display_order', '-created_at']
    
    def __str__(self):
        return f"{self.vendor.name} - {self.title}"
