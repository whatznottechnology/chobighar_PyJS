from rest_framework import serializers
from .models import Category, Portfolio, PortfolioImage, PortfolioVideo, PortfolioHighlight, PortfolioService, PortfolioInquiry

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
        fields = ['id', 'image', 'caption', 'order', 'is_cover']
    
    def get_image(self, obj):
        """Return the image URL (either uploaded file or URL)"""
        return obj.image


class PortfolioVideoSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    
    class Meta:
        model = PortfolioVideo
        fields = ['id', 'video_id', 'title', 'description', 'duration', 'thumbnail', 'order']
    
    def get_thumbnail(self, obj):
        return obj.thumbnail


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
            'duration', 'guests', 'description', 'featured'
        ]


class PortfolioDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for individual portfolio view"""
    category = CategorySerializer(read_only=True)
    images = PortfolioImageSerializer(many=True, read_only=True)
    videos = PortfolioVideoSerializer(many=True, read_only=True)
    highlights = PortfolioHighlightSerializer(many=True, read_only=True)
    services = PortfolioServiceSerializer(many=True, read_only=True)
    
    class Meta:
        model = Portfolio
        fields = [
            'id', 'title', 'subtitle', 'category', 'cover_image', 
            'image_count', 'date', 'location', 'duration', 'guests',
            'description', 'story', 'featured', 'images', 'videos', 
            'highlights', 'services', 'created_at', 'updated_at',
            'meta_title', 'meta_description', 'meta_keywords'
        ]


class PortfolioInquirySerializer(serializers.ModelSerializer):
    portfolio_title = serializers.CharField(source='portfolio.title', read_only=True)
    
    class Meta:
        model = PortfolioInquiry
        fields = ['id', 'portfolio', 'portfolio_title', 'name', 'phone', 'event_date', 'message', 'status', 'created_at']
        read_only_fields = ['id', 'created_at', 'status']

    def create(self, validated_data):
        # Auto-set status to 'new' for new inquiries
        validated_data['status'] = 'new'
        return super().create(validated_data)