from rest_framework import serializers
from .models import AboutHero, AboutStory, AboutValue, TeamMember, AboutContent

class AboutHeroSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = AboutHero
        fields = ['id', 'title', 'subtitle', 'hero_image', 'image_url', 'alt_text', 'is_active']
    
    def get_image_url(self, obj):
        if obj.hero_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.hero_image.url)
        return None

class AboutStorySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = AboutStory
        fields = [
            'id', 'title', 'content', 'story_image', 'image_url', 'alt_text',
            'happy_couples', 'years_experience', 'photos_captured', 'is_active'
        ]
    
    def get_image_url(self, obj):
        if obj.story_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.story_image.url)
        return None

class AboutValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutValue
        fields = ['id', 'title', 'description', 'icon_type', 'order', 'is_active']

class TeamMemberSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = TeamMember
        fields = [
            'id', 'name', 'position', 'bio', 'profile_image', 'image_url', 
            'alt_text', 'email', 'phone', 'order', 'is_active'
        ]
    
    def get_image_url(self, obj):
        if obj.profile_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
        return None

class AboutContentSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    section_type_display = serializers.CharField(source='get_section_type_display', read_only=True)
    
    class Meta:
        model = AboutContent
        fields = [
            'id', 'section_type', 'section_type_display', 'title', 'content', 
            'image', 'image_url', 'alt_text', 'order', 'is_active'
        ]
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None