from django.db import models
from django.core.validators import RegexValidator, URLValidator

class ContactUsHero(models.Model):
    """Contact Us hero section data"""
    hero_image = models.ImageField(
        upload_to='contact/hero/', 
        help_text="Hero section background image",
        blank=True, null=True
    )
    main_title = models.CharField(
        max_length=200, 
        default="Let's Create Something Beautiful",
        help_text="Main hero title"
    )
    subtitle = models.CharField(
        max_length=300,
        default="Ready to capture your precious moments? Get in touch with our creative team",
        help_text="Hero subtitle text"
    )
    description = models.TextField(
        default="Ready to capture your precious moments? Get in touch with our creative team and let's discuss how we can bring your vision to life with our signature Bengali artistry.",
        help_text="Hero description text"
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Contact Us Hero"
        verbose_name_plural = "Contact Us Hero"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.main_title

class ContactUsInfo(models.Model):
    """Contact Us information and details"""
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
    
    # Primary Contact Information
    primary_phone = models.CharField(validators=[phone_regex], max_length=17, default="+91 96479 66765")
    secondary_phone = models.CharField(validators=[phone_regex], max_length=17, blank=True, null=True)
    primary_email = models.EmailField(default="booking@chobighar.com")
    secondary_email = models.EmailField(blank=True, null=True)
    whatsapp_number = models.CharField(validators=[phone_regex], max_length=17, default="+91 96479 66765")
    
    # Address Information
    address_line1 = models.CharField(max_length=200, default="Sector 5, Salt Lake City")
    address_line2 = models.CharField(max_length=200, default="Kolkata, West Bengal 700091")
    city = models.CharField(max_length=100, default="Kolkata")
    state = models.CharField(max_length=100, default="West Bengal")
    postal_code = models.CharField(max_length=20, default="700091")
    country = models.CharField(max_length=100, default="India")
    
    # Business Hours
    weekday_hours = models.CharField(max_length=100, default="Mon - Sat: 10 AM - 7 PM")
    weekend_hours = models.CharField(max_length=100, default="Sun: 11 AM - 5 PM")
    emergency_note = models.CharField(max_length=200, default="Emergency shoots available")
    
    # Contact Labels/Text
    phone_label = models.CharField(max_length=50, default="Call Us")
    email_label = models.CharField(max_length=50, default="Email Us")
    address_label = models.CharField(max_length=50, default="Visit Us")
    hours_label = models.CharField(max_length=50, default="Office Hours")
    
    # Contact Descriptions
    phone_description = models.CharField(max_length=100, default="Available 9 AM - 9 PM")
    email_description = models.CharField(max_length=100, default="We respond within 24 hours")
    address_description = models.CharField(max_length=100, default="By appointment only")
    
    # Google Map
    google_map_url = models.URLField(
        max_length=600,
        blank=True, null=True,
        help_text="Google Maps embed URL for location",
        default="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0929455463855!2d88.36320731495713!3d22.576484185188667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027579f4b6c5e3%3A0x5d9f4a1a5d9e8a1a!2sSector%20V%2C%20Bidhannagar%2C%20Kolkata%2C%20West%20Bengal%20700091!5e0!3m2!1sen!2sin!4v1635746400000!5m2!1sen!2sin"
    )
    map_height = models.PositiveIntegerField(default=400, help_text="Map height in pixels")
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Contact Us Info"
        verbose_name_plural = "Contact Us Info"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Contact Info: {self.primary_phone} | {self.primary_email}"

class WhyChooseUs(models.Model):
    """Why Choose Us points for contact page"""
    point = models.CharField(max_length=300, help_text="A reason why clients should choose us")
    order = models.PositiveIntegerField(default=0, help_text="Display order (lower numbers first)")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Why Choose Us Point"
        verbose_name_plural = "Why Choose Us Points"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return self.point[:50] + "..." if len(self.point) > 50 else self.point

class ContactTestimonial(models.Model):
    """Testimonials specific to contact page"""
    name = models.CharField(max_length=100, help_text="Client name")
    service = models.CharField(max_length=100, help_text="Service they used")
    rating = models.PositiveIntegerField(default=5, help_text="Rating out of 5")
    comment = models.TextField(help_text="Testimonial comment")
    order = models.PositiveIntegerField(default=0, help_text="Display order (lower numbers first)")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Contact Testimonial"
        verbose_name_plural = "Contact Testimonials"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return f"{self.name} - {self.service} ({self.rating}★)"