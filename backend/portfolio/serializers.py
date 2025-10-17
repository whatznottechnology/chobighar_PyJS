from rest_framework import serializers
from .models import Category, Portfolio, PortfolioImage, PortfolioVideo, PortfolioHighlight, PortfolioService

class CategorySerializer(serializers.ModelSerializer):
    portfolio_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'is_active', 'order', 'portfolio_count']
    
    def get_portfolio_count(self, obj):
        return obj.portfolios.filter(is_active=True).count()


class PortfolioImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = PortfolioImage
        fields = ['id', 'image', 'caption', 'order', 'is_cover', 'featured']
    
    def get_image(self, obj):
        """Return the image URL (either uploaded file or URL)"""
        return obj.image


class PortfolioVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioVideo
        fields = ['id', 'video_id', 'title', 'description', 'featured', 'order']


class PortfolioHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioHighlight
        fields = ['id', 'highlight_text', 'order']


class PortfolioServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioService
        fields = ['id', 'service_name', 'order']


class PortfolioListSerializer(serializers.ModelSerializer):
    """Simplified serializer for portfolio list view"""
    category = serializers.StringRelatedField()
    category_id = serializers.CharField(source='category.id', read_only=True)
    
    class Meta:
        model = Portfolio
        fields = [
            'id', 'title', 'subtitle', 'category', 'category_id', 
            'cover_image', 'image_count', 'date', 'location', 
            'duration', 'guests', 'description', 'featured', 'love_count'
        ]


class PortfolioDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for individual portfolio view"""
    category = CategorySerializer(read_only=True)
    images = PortfolioImageSerializer(many=True, read_only=True)
    videos = PortfolioVideoSerializer(many=True, read_only=True)
    highlights = PortfolioHighlightSerializer(many=True, read_only=True)
    services = PortfolioServiceSerializer(many=True, read_only=True)
    
    # CTA image URLs
    cta_image_1_url = serializers.SerializerMethodField()
    cta_image_2_url = serializers.SerializerMethodField()
    cta_image_3_url = serializers.SerializerMethodField()
    cta_image_4_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Portfolio
        fields = [
            'id', 'title', 'subtitle', 'category', 'cover_image', 
            'image_count', 'date', 'location', 'duration', 'guests',
            'description', 'story', 'featured', 'love_count', 'images', 'videos', 
            'highlights', 'services', 'created_at', 'updated_at',
            'meta_title', 'meta_description', 'meta_keywords',
            'cta_image_1_url', 'cta_image_2_url', 'cta_image_3_url', 'cta_image_4_url',
            'promotional_video_id'
        ]
    
    def get_cta_image_1_url(self, obj):
        try:
            return obj.cta_image_1.url if obj.cta_image_1 else None
        except (ValueError, AttributeError):
            return None
    
    def get_cta_image_2_url(self, obj):
        try:
            return obj.cta_image_2.url if obj.cta_image_2 else None
        except (ValueError, AttributeError):
            return None
    
    def get_cta_image_3_url(self, obj):
        try:
            return obj.cta_image_3.url if obj.cta_image_3 else None
        except (ValueError, AttributeError):
            return None
    
    def get_cta_image_4_url(self, obj):
        try:
            return obj.cta_image_4.url if obj.cta_image_4 else None
        except (ValueError, AttributeError):
            return None