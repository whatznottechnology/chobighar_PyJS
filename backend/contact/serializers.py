from rest_framework import serializers
from .models import ContactUsHero, ContactUsInfo, WhyChooseUs, ContactTestimonial

class ContactUsHeroSerializer(serializers.ModelSerializer):
    hero_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ContactUsHero
        fields = ['id', 'hero_image', 'hero_image_url', 'main_title', 'subtitle', 'description', 'is_active']
    
    def get_hero_image_url(self, obj):
        if obj.hero_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.hero_image.url)
        return None

class ContactUsInfoSerializer(serializers.ModelSerializer):
    full_address = serializers.SerializerMethodField()
    
    class Meta:
        model = ContactUsInfo
        fields = [
            'id', 'primary_phone', 'secondary_phone', 'primary_email', 'secondary_email',
            'whatsapp_number', 'address_line1', 'address_line2', 'city', 'state', 
            'postal_code', 'country', 'full_address', 'weekday_hours', 'weekend_hours',
            'emergency_note', 'phone_label', 'email_label', 'address_label', 'hours_label',
            'phone_description', 'email_description', 'address_description',
            'google_map_url', 'map_height', 'is_active'
        ]
    
    def get_full_address(self, obj):
        return f"{obj.address_line1}, {obj.address_line2}, {obj.city}, {obj.state} {obj.postal_code}, {obj.country}"

class WhyChooseUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseUs
        fields = ['id', 'point', 'order', 'is_active']

class ContactTestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactTestimonial
        fields = ['id', 'name', 'service', 'rating', 'comment', 'order', 'is_active']

class ContactPageDataSerializer(serializers.Serializer):
    """Combined serializer for all contact page data"""
    hero = ContactUsHeroSerializer()
    contact_info = ContactUsInfoSerializer()
    why_choose_us = WhyChooseUsSerializer(many=True)
    testimonials = ContactTestimonialSerializer(many=True)