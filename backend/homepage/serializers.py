from rest_framework import serializers
from .models import HeroSlide, VideoTestimonial, TextTestimonial, FAQ, Achievement, VideoShowcase

class HeroSlideSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = HeroSlide
        fields = ['id', 'title', 'image', 'image_url', 'alt_text', 'order', 'caption', 'link_url', 'is_active']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None

class VideoTestimonialSerializer(serializers.ModelSerializer):
    video_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()
    
    class Meta:
        model = VideoTestimonial
        fields = [
            'id', 'name', 'location', 'event', 'date', 'video_file', 'video_url', 
            'thumbnail', 'thumbnail_url', 'rating', 'description', 'order', 'is_active'
        ]
    
    def get_video_url(self, obj):
        if obj.video_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.video_file.url)
        return None
    
    def get_thumbnail_url(self, obj):
        if obj.thumbnail:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.thumbnail.url)
        return None

class TextTestimonialSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = TextTestimonial
        fields = [
            'id', 'name', 'location', 'event', 'date', 'image', 'image_url', 
            'text', 'rating', 'order', 'is_active'
        ]
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer', 'order', 'keywords', 'is_active']

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['id', 'title', 'count_value', 'suffix', 'description', 'icon_type', 'order', 'is_active']

class VideoShowcaseSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.SerializerMethodField()
    youtube_thumbnail_url = serializers.ReadOnlyField()
    youtube_embed_url = serializers.ReadOnlyField()
    
    class Meta:
        model = VideoShowcase
        fields = [
            'id', 'title', 'description', 'youtube_video_id', 'thumbnail_image', 
            'thumbnail_url', 'youtube_thumbnail_url', 'youtube_embed_url',
            'is_active', 'autoplay', 'loop_video', 'show_controls', 'mute_audio', 'alt_text'
        ]
    
    def get_thumbnail_url(self, obj):
        if obj.thumbnail_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.thumbnail_image.url)
        return None
