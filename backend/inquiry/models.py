from django.db import models
from django.core.validators import RegexValidator
import uuid

class Inquiry(models.Model):
    """
    Model for storing customer inquiries from various forms
    """
    INQUIRY_TYPES = [
        ('photoshoot', 'Photoshoot Service'),
        ('vendor', 'Vendor Service'),
        ('portfolio', 'Portfolio Inquiry'),
        ('general', 'General Inquiry'),
        ('quote', 'Quote Request'),
    ]
    
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    
    # Basic Information
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    inquiry_type = models.CharField(
        max_length=20,
        choices=INQUIRY_TYPES,
        default='general',
        help_text="Type of inquiry"
    )
    
    # Customer Information
    name = models.CharField(
        max_length=100,
        help_text="Customer's full name"
    )
    email = models.EmailField(
        help_text="Customer's email address"
    )
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
    phone = models.CharField(
        validators=[phone_regex],
        max_length=17,
        help_text="Customer's phone number"
    )
    
    # Inquiry Details
    subject = models.CharField(
        max_length=200,
        help_text="Subject of inquiry"
    )
    message = models.TextField(
        help_text="Detailed message from customer"
    )
    
    # Service Related (Optional)
    service_name = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        help_text="Name of service inquired about"
    )
    service_id = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        help_text="ID of service/vendor/portfolio inquired about"
    )
    
    # Event Details (Optional for photoshoot/wedding services)
    event_date = models.DateField(
        blank=True,
        null=True,
        help_text="Date of event/photoshoot"
    )
    event_location = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        help_text="Location of event/photoshoot"
    )
    budget_range = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Customer's budget range"
    )
    
    # Management Fields
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='new',
        help_text="Current status of inquiry"
    )
    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default='medium',
        help_text="Priority level"
    )
    assigned_to = models.CharField(
        max_length=100,
        blank=True,
        null=True,  
        help_text="Staff member assigned to handle this inquiry"
    )
    
    # Additional Information
    source = models.CharField(
        max_length=50,
        default='website',
        help_text="Source of inquiry (website, social media, etc.)"
    )
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="Internal notes about this inquiry"
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    responded_at = models.DateTimeField(
        blank=True,
        null=True,
        help_text="When the inquiry was first responded to"
    )
    
    class Meta:
        verbose_name = "Inquiry"
        verbose_name_plural = "Inquiries"
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.name} - {self.subject} ({self.inquiry_type})"
    
    @property
    def is_urgent(self):
        return self.priority == 'urgent'
    
    @property
    def is_new(self):
        return self.status == 'new'
    
    def mark_as_contacted(self):
        """Mark inquiry as contacted and set responded_at timestamp"""
        from django.utils import timezone
        self.status = 'contacted'
        if not self.responded_at:
            self.responded_at = timezone.now()
        self.save()


class InquiryFollowUp(models.Model):
    """
    Model for tracking follow-ups on inquiries
    """
    inquiry = models.ForeignKey(
        Inquiry,
        on_delete=models.CASCADE,
        related_name='followups'
    )
    
    follow_up_date = models.DateTimeField(
        help_text="Date and time of follow-up"
    )
    method = models.CharField(
        max_length=20,
        choices=[
            ('phone', 'Phone Call'),
            ('email', 'Email'),
            ('whatsapp', 'WhatsApp'),
            ('meeting', 'In-Person Meeting'),
            ('video_call', 'Video Call'),
        ],
        help_text="Method of follow-up"
    )
    notes = models.TextField(
        help_text="Notes from the follow-up"
    )
    staff_member = models.CharField(
        max_length=100,
        help_text="Staff member who did the follow-up"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Follow-up"
        verbose_name_plural = "Follow-ups"
        ordering = ['-follow_up_date']
        
    def __str__(self):
        return f"Follow-up for {self.inquiry.name} on {self.follow_up_date.strftime('%Y-%m-%d')}"
