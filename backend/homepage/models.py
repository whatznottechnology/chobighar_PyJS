from django.db import models

class HeroSlide(models.Model):
    """Hero slider images for homepage"""
    title = models.CharField(
        max_length=200, 
        help_text="Slide title (optional, for admin reference)",
        blank=True
    )
    image = models.ImageField(
        upload_to='homepage/slider/', 
        help_text="Slider image (recommended: 1920x1080px or similar aspect ratio)",
        blank=True,
        null=True
    )
    alt_text = models.CharField(
        max_length=200,
        help_text="Alt text for accessibility",
        default="Chabighar Photography"
    )
    order = models.PositiveIntegerField(
        default=0, 
        help_text="Display order (lower numbers first)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Show this slide in the slider"
    )
    
    # Optional fields for future enhancements
    caption = models.CharField(
        max_length=300,
        blank=True,
        help_text="Optional caption text overlay (not used currently)"
    )
    link_url = models.URLField(
        blank=True,
        help_text="Optional link when slide is clicked (not used currently)"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Hero Slide"
        verbose_name_plural = "Hero Slides"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return f"{self.title or f'Slide {self.id}'} (Order: {self.order})"

class ShowcaseImage(models.Model):
    """Showcase images displayed after album slider on homepage"""
    image = models.ImageField(
        upload_to='homepage/showcase/', 
        help_text="Showcase image"
    )
    alt_text = models.CharField(
        max_length=200,
        help_text="Alt text for accessibility",
        default="Chabighar Photography Showcase"
    )
    order = models.PositiveIntegerField(
        default=0, 
        help_text="Display order (lower numbers first)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Show this image in the showcase"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Showcase Image"
        verbose_name_plural = "Showcase Images"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return f"Showcase Image {self.id} (Order: {self.order})"

class VideoTestimonial(models.Model):
    """Video testimonials from clients"""
    name = models.CharField(
        max_length=200,
        help_text="Client name (e.g., 'Dr. Rahman Ahmed')"
    )
    location = models.CharField(
        max_length=100,
        help_text="Client location (e.g., 'Kolkata, Mumbai')",
        blank=True
    )
    event = models.CharField(
        max_length=200,
        help_text="Event type (e.g., 'Wedding Photography', 'Pre-Wedding Shoot')",
        blank=True
    )
    date = models.CharField(
        max_length=50,
        help_text="Event date (e.g., 'December 2024')",
        blank=True
    )
    
    # Video fields
    video_file = models.FileField(
        upload_to='testimonials/videos/',
        help_text="Upload video testimonial file (MP4 recommended)"
    )
    thumbnail = models.ImageField(
        upload_to='testimonials/thumbnails/',
        help_text="Video thumbnail image",
        blank=True,
        null=True
    )
    
    # Rating and content
    rating = models.PositiveSmallIntegerField(
        default=5,
        choices=[(i, i) for i in range(1, 6)],
        help_text="Rating from 1 to 5 stars"
    )
    description = models.TextField(
        blank=True,
        help_text="Optional description of the testimonial"
    )
    
    # Display settings
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower numbers first)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Show this testimonial on website"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Video Testimonial"
        verbose_name_plural = "Video Testimonials"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return f"{self.name} - {self.event or 'Video Testimonial'}"

class TextTestimonial(models.Model):
    """Text testimonials from clients"""
    name = models.CharField(
        max_length=200,
        help_text="Client name (e.g., 'Priya & Arjun Sharma')"
    )
    location = models.CharField(
        max_length=100,
        help_text="Client location (e.g., 'Kolkata, Mumbai')",
        blank=True
    )
    event = models.CharField(
        max_length=200,
        help_text="Event type (e.g., 'Wedding Photography', 'Pre-Wedding Shoot')",
        blank=True
    )
    date = models.CharField(
        max_length=50,
        help_text="Event date (e.g., 'December 2024')",
        blank=True
    )
    
    # Image and content
    image = models.ImageField(
        upload_to='testimonials/images/',
        help_text="Client photo or event image"
    )
    text = models.TextField(
        help_text="Testimonial text content"
    )
    
    # Rating
    rating = models.PositiveSmallIntegerField(
        default=5,
        choices=[(i, i) for i in range(1, 6)],
        help_text="Rating from 1 to 5 stars"
    )
    
    # Display settings
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower numbers first)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Show this testimonial on website"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Text Testimonial"
        verbose_name_plural = "Text Testimonials"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return f"{self.name} - {self.event or 'Testimonial'}"

class FAQ(models.Model):
    """Frequently Asked Questions for the website"""
    question = models.CharField(
        max_length=500,
        help_text="The FAQ question"
    )
    answer = models.TextField(
        help_text="The detailed answer to the question"
    )
    
    # Display settings
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower numbers first)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Show this FAQ on website"
    )
    
    # SEO and metadata
    keywords = models.CharField(
        max_length=200,
        blank=True,
        help_text="Keywords for search (comma separated)"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return f"FAQ: {self.question[:50]}{'...' if len(self.question) > 50 else ''}"

class Achievement(models.Model):
    """Achievement counters for the website"""
    
    ICON_CHOICES = [
        ('heart', 'Heart (Happy Couples)'),
        ('video', 'Video (Video Reviews)'),
        ('star', 'Star (Average Rating)'),
        ('check', 'Check (Client Satisfaction)'),
        ('camera', 'Camera (Photos Taken)'),
        ('award', 'Award (Awards Won)'),
        ('users', 'Users (Team Members)'),
        ('calendar', 'Calendar (Years Experience)'),
    ]
    
    title = models.CharField(
        max_length=100,
        help_text="Achievement title (e.g., 'Happy Couples')"
    )
    count_value = models.DecimalField(
        max_digits=10,
        decimal_places=1,
        help_text="The number to display (e.g., 500, 5.0, 98)"
    )
    suffix = models.CharField(
        max_length=10,
        blank=True,
        help_text="Suffix for the number (e.g., '+', '%', 'K')"
    )
    description = models.CharField(
        max_length=200,
        help_text="Short description (e.g., 'Beautiful love stories captured')"
    )
    icon_type = models.CharField(
        max_length=20,
        choices=ICON_CHOICES,
        default='star',
        help_text="Icon to display with this achievement"
    )
    
    # Display settings
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower numbers first)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Show this achievement on website"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Achievement"
        verbose_name_plural = "Achievements"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return f"{self.title}: {self.count_value}{self.suffix}"

class VideoShowcase(models.Model):
    """Video showcase for homepage - supports YouTube videos"""
    
    title = models.CharField(
        max_length=200,
        help_text="Video title (e.g., 'Wedding Cinematic Reel')"
    )
    description = models.TextField(
        help_text="Video description",
        blank=True
    )
    
    # YouTube video fields
    youtube_video_id = models.CharField(
        max_length=50,
        help_text="YouTube video ID (from URL: https://www.youtube.com/watch?v=VIDEO_ID)",
        default=""
    )
    thumbnail_image = models.ImageField(
        upload_to='videos/thumbnails/',
        help_text="Custom thumbnail image (optional - will use YouTube thumbnail if not provided)",
        blank=True,
        null=True
    )
    
    # Display settings
    is_active = models.BooleanField(
        default=True,
        help_text="Show this video on website"
    )
    autoplay = models.BooleanField(
        default=True,
        help_text="Auto-play video when in view"
    )
    loop_video = models.BooleanField(
        default=True,
        help_text="Loop video playback"
    )
    show_controls = models.BooleanField(
        default=False,
        help_text="Show video player controls"
    )
    mute_audio = models.BooleanField(
        default=True,
        help_text="Mute video audio"
    )
    
    # SEO and metadata
    alt_text = models.CharField(
        max_length=200,
        help_text="Alt text for accessibility",
        default="Wedding video showcase"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Video Showcase"
        verbose_name_plural = "Video Showcases"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
    
    @property
    def youtube_thumbnail_url(self):
        """Get YouTube thumbnail URL"""
        if self.youtube_video_id:
            return f"https://img.youtube.com/vi/{self.youtube_video_id}/maxresdefault.jpg"
        return None
    
    @property 
    def youtube_embed_url(self):
        """Get YouTube embed URL with parameters"""
        if not self.youtube_video_id:
            return None
            
        params = []
        if self.autoplay:
            params.append("autoplay=1")
        if self.loop_video:
            params.append(f"loop=1&playlist={self.youtube_video_id}")
        if self.mute_audio:
            params.append("mute=1")
        if not self.show_controls:
            params.append("controls=0")
        
        # Additional YouTube embed parameters for better UX
        params.extend([
            "modestbranding=1",  # Remove YouTube logo
            "showinfo=0",        # Hide video info
            "rel=0",            # Don't show related videos
            "iv_load_policy=3"  # Hide annotations
        ])
        
        param_string = "&".join(params)
        return f"https://www.youtube.com/embed/{self.youtube_video_id}?{param_string}"
