from rest_framework import serializers
from .models import (
    VendorCategory, VendorSubCategory, VendorProfile, VendorImage,
    VendorVideo, VendorService, VendorSpecialty, VendorHighlight,
    VendorTestimonial, VendorPortfolio
)


class VendorImageSerializer(serializers.ModelSerializer):
    """Serializer for vendor images"""
    
    class Meta:
        model = VendorImage
        fields = ['id', 'image', 'title', 'alt_text', 'image_type']


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


class VendorHighlightSerializer(serializers.ModelSerializer):
    """Serializer for vendor highlights"""
    
    class Meta:
        model = VendorHighlight
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


class VendorPortfolioSerializer(serializers.ModelSerializer):
    """Serializer for vendor portfolio"""
    
    class Meta:
        model = VendorPortfolio
        fields = ['id', 'title', 'description', 'image', 'category']


class VendorProfileSerializer(serializers.ModelSerializer):
    """Comprehensive serializer for vendor profiles"""
    
    # Related data
    images = VendorImageSerializer(many=True, read_only=True)
    videos = VendorVideoSerializer(many=True, read_only=True)
    services = VendorServiceSerializer(many=True, read_only=True)
    specialties = VendorSpecialtySerializer(many=True, read_only=True)
    highlights = VendorHighlightSerializer(many=True, read_only=True)
    testimonials = VendorTestimonialSerializer(many=True, read_only=True)
    portfolio_items = VendorPortfolioSerializer(many=True, read_only=True)
    
    # Computed fields
    social_media = serializers.ReadOnlyField()
    category_name = serializers.CharField(source='category.name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    
    # Hero images (first 4 images for hero section)
    hero_images = serializers.SerializerMethodField()
    gallery_images = serializers.SerializerMethodField()
    cover_image = serializers.SerializerMethodField()
    profile_image = serializers.SerializerMethodField()
    
    class Meta:
        model = VendorProfile
        fields = [
            'id', 'name', 'slug', 'tagline', 'type', 'location', 'address',
            'phone', 'email', 'website', 'description', 'story', 'experience',
            'price_range', 'capacity', 'rating', 'reviews_count', 'business_hours',
            'stats_count', 'stats_label', 'love_count',
            'is_featured', 'category_name', 'subcategory_name', 'social_media',
            'hero_images', 'gallery_images', 'cover_image', 'profile_image',
            'images', 'videos', 'services', 'specialties', 'highlights',
            'testimonials', 'portfolio_items',
            'meta_title', 'meta_description', 'meta_keywords'
        ]
    
    def get_hero_images(self, obj):
        """Get first 4 images for hero section"""
        hero_images = obj.images.filter(is_active=True).order_by('image_type')[:4]
        return [img.image.url for img in hero_images if img.image]
    
    def get_gallery_images(self, obj):
        """Get all gallery images"""
        gallery_images = obj.images.filter(
            image_type='gallery', 
            is_active=True
        ).order_by('image_type')
        return [img.image.url for img in gallery_images if img.image]
    
    def get_cover_image(self, obj):
        """Get cover image"""
        cover_image = obj.images.filter(image_type='cover', is_active=True).first()
        return cover_image.image.url if cover_image and cover_image.image else None
    
    def get_profile_image(self, obj):
        """Get profile image"""
        profile_image = obj.images.filter(image_type='profile', is_active=True).first()
        return profile_image.image.url if profile_image and profile_image.image else None


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
        """Get main image for listing"""
        main_image = obj.images.filter(is_active=True).order_by('image_type').first()
        return main_image.image.url if main_image and main_image.image else None


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