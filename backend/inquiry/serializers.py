from rest_framework import serializers
from .models import Inquiry, InquiryFollowUp

class InquiryCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating new inquiries from frontend forms
    """
    class Meta:
        model = Inquiry
        fields = [
            'inquiry_type', 'name', 'email', 'phone', 'subject', 'message',
            'service_name', 'service_id', 'event_date', 'event_location', 
            'budget_range', 'source'
        ]
        
    def validate_phone(self, value):
        """
        Validate phone number format
        """
        if not value.replace('+', '').replace('-', '').replace(' ', '').isdigit():
            raise serializers.ValidationError("Phone number should contain only digits, +, -, and spaces.")
        return value

class InquiryFollowUpSerializer(serializers.ModelSerializer):
    """
    Serializer for inquiry follow-ups
    """
    class Meta:
        model = InquiryFollowUp
        fields = '__all__'

class InquirySerializer(serializers.ModelSerializer):
    """
    Serializer for displaying inquiry details
    """
    followups = InquiryFollowUpSerializer(many=True, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    priority_display = serializers.CharField(source='get_priority_display', read_only=True)
    inquiry_type_display = serializers.CharField(source='get_inquiry_type_display', read_only=True)
    is_urgent = serializers.BooleanField(read_only=True)
    is_new = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Inquiry
        fields = '__all__'