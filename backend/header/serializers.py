from rest_framework import serializers
from .models import SocialMedia, ContactInfo, BrandInfo

class SocialMediaSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='get_name_display', read_only=True)
    icon_svg = serializers.CharField(source='get_icon_svg', read_only=True)
    
    class Meta:
        model = SocialMedia
        fields = ['id', 'name', 'display_name', 'url', 'icon_svg', 'is_active', 'order']

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ['id', 'phone', 'email', 'whatsapp_number', 'is_active']

class BrandInfoSerializer(serializers.ModelSerializer):
    logo_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = BrandInfo
        fields = ['id', 'logo_image', 'logo_image_url', 'main_text', 'sub_text', 'is_active']
    
    def get_logo_image_url(self, obj):
        if obj.logo_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo_image.url)
            return obj.logo_image.url
        return None

class HeaderDataSerializer(serializers.Serializer):
    """Combined serializer for all header data"""
    social_media = SocialMediaSerializer(many=True)
    contact_info = ContactInfoSerializer()
    brand_info = BrandInfoSerializer()