from rest_framework import serializers
from .models import (
    FooterBrandInfo, FooterContactInfo, FooterSocialMedia,
    FooterCopyright
)

class FooterBrandInfoSerializer(serializers.ModelSerializer):
    logo_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = FooterBrandInfo
        fields = [
            'id', 'logo_image', 'logo_image_url', 'main_text', 
            'sub_text', 'description', 'is_active'
        ]
    
    def get_logo_image_url(self, obj):
        if obj.logo_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo_image.url)
            return obj.logo_image.url
        return None

class FooterContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterContactInfo
        fields = [
            'id', 'phone', 'email', 'whatsapp_number',
            'address_line1', 'address_line2',
            'weekday_hours', 'weekend_hours',
            'phone_text', 'whatsapp_text', 'email_text',
            'is_active'
        ]

class FooterSocialMediaSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='get_name_display', read_only=True)
    icon_svg = serializers.CharField(source='get_icon_svg', read_only=True)
    
    class Meta:
        model = FooterSocialMedia
        fields = [
            'id', 'name', 'display_name', 'url', 
            'icon_svg', 'is_active', 'order'
        ]

class FooterCopyrightSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterCopyright
        fields = [
            'id', 'text', 'company_name', 'company_url', 'is_active'
        ]

class FooterDataSerializer(serializers.Serializer):
    """Combined serializer for all footer data"""
    brand_info = FooterBrandInfoSerializer()
    contact_info = FooterContactInfoSerializer()
    social_media = FooterSocialMediaSerializer(many=True)
    copyright_info = FooterCopyrightSerializer()