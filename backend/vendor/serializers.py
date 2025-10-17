from rest_framework import serializers
from .models import (
    VendorCategory, VendorSubCategory, VendorProfile, VendorImage,
    VendorVideo, VendorService, VendorSpecialty, VendorWhyChooseUs,
    VendorTestimonial
)


class VendorImageSerializer(serializers.ModelSerializer):
    """Serializer for vendor images"""
    
    class Meta:
        model = VendorImage
        fields = ['id', 'image', 'alt_text']


class VendorVideoSerializer(serializers.ModelSerializer):
    """Serializer for vendor videos"""
    
    class Meta:
        model = VendorVideo
        fields = ['id', 'title', 'youtube_id', 'description', 'youtube_url', 'youtube_embed_url']


class VendorServiceSerializer(serializers.ModelSerializer):
    """Serializer for vendor services"""
    
    class Meta:
        model = VendorService
        fields = ['id', 'name', 'description']


class VendorSpecialtySerializer(serializers.ModelSerializer):
    """Serializer for vendor specialties"""
    
    class Meta:
        model = VendorSpecialty
        fields = ['id', 'name']


class VendorWhyChooseUsSerializer(serializers.ModelSerializer):
    """Serializer for why choose us points"""
    
    class Meta:
        model = VendorWhyChooseUs
        fields = ['id', 'text']


class VendorTestimonialSerializer(serializers.ModelSerializer):
    """Serializer for vendor testimonials"""
    
    date_display = serializers.ReadOnlyField()
    
    class Meta:
        model = VendorTestimonial
        fields = [
            'id', 'client_name', 'rating', 'review', 'event_type', 
            'date', 'date_display', 'is_featured'
        ]


class VendorProfileSerializer(serializers.ModelSerializer):
    """Comprehensive serializer for vendor profiles"""
    
    # Related data
    images = VendorImageSerializer(many=True, read_only=True)
    videos = VendorVideoSerializer(many=True, read_only=True)
    services = VendorServiceSerializer(many=True, read_only=True)
    specialties = VendorSpecialtySerializer(many=True, read_only=True)
    why_choose_us = VendorWhyChooseUsSerializer(many=True, read_only=True)
    testimonials = VendorTestimonialSerializer(many=True, read_only=True)
    
    # Computed fields
    category_name = serializers.CharField(source='category.name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    
    # Hero images (4 individual images)
    hero_images = serializers.SerializerMethodField()
    gallery_images = serializers.SerializerMethodField()
    profile_image_url = serializers.SerializerMethodField()
    social_media = serializers.SerializerMethodField()
    
    class Meta:
        model = VendorProfile
        fields = [
            'id', 'name', 'slug', 'tagline', 'type', 'location', 'address',
            'phone', 'email', 'website', 'instagram', 'facebook', 'youtube',
            'description', 'story', 'experience',
            'price_range', 'capacity', 'rating', 'reviews_count', 'business_hours',
            'stats_count', 'stats_label', 'love_count',
            'is_featured', 'category_name', 'subcategory_name',
            'hero_images', 'gallery_images', 'profile_image_url', 'social_media',
            'images', 'videos', 'services', 'specialties', 'why_choose_us',
            'testimonials',
            'meta_title', 'meta_description', 'meta_keywords'
        ]
    
    def get_social_media(self, obj):
        """Get social media links"""
        return {
            'instagram': obj.instagram or '',
            'facebook': obj.facebook or '',
            'youtube': obj.youtube or ''
        }
    
    def get_hero_images(self, obj):
        """Get 4 individual hero images with absolute URLs - No fallback"""
        request = self.context.get('request')
        hero_imgs = []
        
        for field_name in ['hero_image_1', 'hero_image_2', 'hero_image_3', 'hero_image_4']:
            field_value = getattr(obj, field_name, None)
            if field_value:
                if request:
                    hero_imgs.append(request.build_absolute_uri(field_value.url))
                else:
                    hero_imgs.append(field_value.url)
        
        return hero_imgs
    
    def get_gallery_images(self, obj):
        """Get all gallery images with absolute URLs"""
        request = self.context.get('request')
        gallery_images = obj.images.filter(is_active=True).order_by('created_at')
        result = []
        for img in gallery_images:
            if img.image:
                if request:
                    result.append(request.build_absolute_uri(img.image.url))
                else:
                    result.append(img.image.url)
        return result
    
    def get_profile_image_url(self, obj):
        """Get profile image from dedicated profile_image field with absolute URL - No fallback"""
        request = self.context.get('request')
        if obj.profile_image:
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
        return None


class VendorProfileListSerializer(serializers.ModelSerializer):
    """Simplified serializer for vendor profile listings"""
    
    category_name = serializers.CharField(source='category.name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    main_image = serializers.SerializerMethodField()
    
    class Meta:
        model = VendorProfile
        fields = [
            'id', 'name', 'slug', 'tagline', 'type', 'location',
            'phone', 'email', 'description', 'experience', 'price_range',
            'rating', 'reviews_count', 'is_featured', 'category_name',
            'subcategory_name', 'main_image'
        ]
    
    def get_main_image(self, obj):
        """Get main image for listing - use profile_image with absolute URL - No fallback"""
        request = self.context.get('request')
        image_url = None
        
        # Use profile_image only
        if obj.profile_image:
            image_url = obj.profile_image.url
        
        if image_url and request:
            return request.build_absolute_uri(image_url)
        return image_url


class VendorSubCategorySerializer(serializers.ModelSerializer):
    """Serializer for vendor subcategories"""
    
    class Meta:
        model = VendorSubCategory
        fields = [
            'id', 'name', 'slug', 'description', 'banner_image',
            'vendor_count', 'is_active'
        ]


class VendorCategorySerializer(serializers.ModelSerializer):
    """Serializer for vendor categories with subcategories"""
    
    subcategories = VendorSubCategorySerializer(many=True, read_only=True)
    vendor_count = serializers.ReadOnlyField()
    gradient_class = serializers.ReadOnlyField()
    
    class Meta:
        model = VendorCategory
        fields = [
            'id', 'name', 'slug', 'description', 'image',
            'icon_emoji', 'gradient_from', 'gradient_to', 'gradient_class',
            'vendor_count', 'subcategories', 'is_active'
        ]


class VendorSubCategoryDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for individual subcategory pages"""
    
    category = VendorCategorySerializer(read_only=True)
    
    class Meta:
        model = VendorSubCategory
        fields = [
            'id', 'category', 'name', 'slug', 'description', 'banner_image',
            'vendor_count', 'is_active', 'created_at', 'updated_at'
        ]