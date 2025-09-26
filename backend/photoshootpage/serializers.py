from rest_framework import serializers
from .models import PhotoshootHero, PhotoshootService, PhotoshootPageSettings, PhotoshootTestimonial

class PhotoshootHeroSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = PhotoshootHero
        fields = [
            'id', 'title', 'subtitle', 'hero_image', 'image_url', 'alt_text',
            'primary_button_text', 'primary_button_link',
            'secondary_button_text', 'secondary_button_link',
            'is_active'
        ]
    
    def get_image_url(self, obj):
        if obj.hero_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.hero_image.url)
            return obj.hero_image.url
        return None

class PhotoshootServiceSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = PhotoshootService
        fields = [
            'id', 'title', 'description', 'service_image', 'image_url', 'alt_text',
            'price', 'duration', 'deliverables', 'features', 'inclusions',
            'order', 'is_active', 'is_featured'
        ]
    
    def get_image_url(self, obj):
        if obj.service_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.service_image.url)
            return obj.service_image.url
        return None

class PhotoshootPageSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoshootPageSettings
        fields = [
            'id', 'services_section_title', 'services_section_description',
            'meta_title', 'meta_description', 'is_active'
        ]


class PhotoshootTestimonialSerializer(serializers.ModelSerializer):
    client_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = PhotoshootTestimonial
        fields = [
            'id', 'client_name', 'service_type', 'rating', 'testimonial_text',
            'client_image', 'client_image_url', 'order', 'is_active', 'is_featured'
        ]
    
    def get_client_image_url(self, obj):
        if obj.client_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.client_image.url)
            return obj.client_image.url
        return None