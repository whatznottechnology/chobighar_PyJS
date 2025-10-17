from rest_framework import serializers
from .models import StaticPage


class StaticPageSerializer(serializers.ModelSerializer):
    """Serializer for static page detail view"""
    
    class Meta:
        model = StaticPage
        fields = [
            'id', 'title', 'slug', 'content',
            'meta_title', 'meta_description', 'meta_keywords',
            'created_at', 'updated_at'
        ]


class StaticPageListSerializer(serializers.ModelSerializer):
    """Serializer for static page list (footer links)"""
    
    class Meta:
        model = StaticPage
        fields = ['id', 'title', 'slug', 'display_order']
