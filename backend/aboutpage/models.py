from django.db import models

class AboutHero(models.Model):
    """Hero section for about page"""
    title = models.CharField(
        max_length=200,
        help_text="Hero section title (e.g., 'About chobighar')",
        default="About chobighar"
    )
    subtitle = models.TextField(
        help_text="Hero section subtitle/description"
    )
    hero_image = models.ImageField(
        upload_to='about/hero/',
        help_text="Hero section background image (full width, 50vh height recommended)"
    )
    alt_text = models.CharField(
        max_length=200,
        help_text="Alt text for accessibility",
        default="About chobighar hero image"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Show this hero section"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "About Hero Section"
        verbose_name_plural = "About Hero Sections"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

class AboutStory(models.Model):
    """Our story section content"""
    title = models.CharField(
        max_length=200,
        help_text="Story section title (e.g., 'Our Story')",
        default="Our Story"
    )
    content = models.TextField(
        help_text="Main story content (HTML supported)"
    )
    story_image = models.ImageField(
        upload_to='about/story/',
        help_text="Story section image"
    )
    alt_text = models.CharField(
        max_length=200,
        help_text="Alt text for story image",
        default="Our story image"
    )
    
    # Statistics
    happy_couples = models.PositiveIntegerField(
        default=500,
        help_text="Number of happy couples served"
    )
    years_experience = models.PositiveIntegerField(
        default=5,
        help_text="Years of experience"
    )
    photos_captured = models.CharField(
        max_length=20,
        default="50k+",
        help_text="Number of photos captured (e.g., '50k+', '10000')"
    )
    
    is_active = models.BooleanField(
        default=True,
        help_text="Show this story section"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "About Story Section"
        verbose_name_plural = "About Story Sections"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

class AboutValue(models.Model):
    """Our mission & values content"""
    
    ICON_CHOICES = [
        ('camera', 'Camera'),
        ('heart', 'Heart'),
        ('users', 'Users'),
        ('star', 'Star'),
        ('trophy', 'Trophy'),
        ('target', 'Target'),
        ('shield', 'Shield'),
        ('lightbulb', 'Lightbulb'),
    ]
    
    title = models.CharField(
        max_length=100,
        help_text="Value title (e.g., 'Excellence', 'Passion')"
    )
    description = models.TextField(
        help_text="Value description"
    )
    icon_type = models.CharField(
        max_length=20,
        choices=ICON_CHOICES,
        default='star',
        help_text="Icon to display with this value"
    )
    
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower numbers first)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Show this value"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "About Value"
        verbose_name_plural = "About Values"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return self.title

class TeamMember(models.Model):
    """Team members for about page"""
    
    name = models.CharField(
        max_length=200,
        help_text="Team member name"
    )
    position = models.CharField(
        max_length=200,
        help_text="Job position/title"
    )
    bio = models.TextField(
        help_text="Short biography",
        blank=True
    )
    profile_image = models.ImageField(
        upload_to='about/team/',
        help_text="Team member profile photo (square aspect ratio recommended)"
    )
    alt_text = models.CharField(
        max_length=200,
        help_text="Alt text for profile image"
    )
    
    # Social links (optional)
    email = models.EmailField(
        blank=True,
        help_text="Email address (optional)"
    )
    phone = models.CharField(
        max_length=20,
        blank=True,
        help_text="Phone number (optional)"
    )
    
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower numbers first)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Show this team member"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return f"{self.name} - {self.position}"

class AboutContent(models.Model):
    """Additional content sections for about page"""
    
    SECTION_CHOICES = [
        ('mission', 'Mission Statement'),
        ('vision', 'Vision Statement'),
        ('approach', 'Our Approach'),
        ('philosophy', 'Our Philosophy'),
        ('custom', 'Custom Section'),
    ]
    
    section_type = models.CharField(
        max_length=20,
        choices=SECTION_CHOICES,
        default='custom',
        help_text="Type of content section"
    )
    title = models.CharField(
        max_length=200,
        help_text="Section title"
    )
    content = models.TextField(
        help_text="Section content (HTML supported)"
    )
    image = models.ImageField(
        upload_to='about/content/',
        help_text="Optional section image",
        blank=True,
        null=True
    )
    alt_text = models.CharField(
        max_length=200,
        help_text="Alt text for image",
        blank=True
    )
    
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower numbers first)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Show this content section"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "About Content Section"
        verbose_name_plural = "About Content Sections"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return f"{self.get_section_type_display()}: {self.title}"
