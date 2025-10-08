from rest_framework import serializers
from .models import BlogCategory, BlogPost, BlogComment, PopupInquiry, PopupSettings


class BlogCategorySerializer(serializers.ModelSerializer):
    posts_count = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogCategory
        fields = [
            'id', 'name', 'slug', 'description', 'icon', 
            'display_order', 'is_active', 'posts_count',
            'meta_title', 'meta_description', 'meta_keywords',
            'created_at', 'updated_at'
        ]
    
    def get_posts_count(self, obj):
        return obj.posts.filter(status='published').count()


class BlogPostListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    tags_list = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'category_name', 'category_slug',
            'author', 'excerpt', 'thumbnail', 'status', 'published_date',
            'views_count', 'reading_time', 'is_featured', 'tags_list',
            'meta_title', 'meta_description', 'created_at'
        ]
    
    def get_tags_list(self, obj):
        return obj.get_tags_list()
    
    def get_thumbnail(self, obj):
        if obj.thumbnail_image:
            return obj.thumbnail_image.url
        elif obj.featured_image:
            return obj.featured_image.url
        return None


class BlogPostDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    tags_list = serializers.SerializerMethodField()
    related_posts = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'category_name', 'category_slug',
            'author', 'excerpt', 'content', 'featured_image', 
            'featured_image_alt', 'status', 'published_date',
            'views_count', 'reading_time', 'is_featured',
            'meta_title', 'meta_description', 'meta_keywords',
            'og_image', 'tags_list', 'tags', 'related_posts',
            'created_at', 'updated_at'
        ]
    
    def get_tags_list(self, obj):
        return obj.get_tags_list()
    
    def get_related_posts(self, obj):
        # Get related posts from same category
        related = BlogPost.objects.filter(
            category=obj.category,
            status='published'
        ).exclude(id=obj.id)[:3]
        
        return BlogPostListSerializer(related, many=True).data


class BlogCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogComment
        fields = ['id', 'post', 'name', 'email', 'comment', 'is_approved', 'created_at']
        read_only_fields = ['is_approved', 'created_at']


class PopupInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = PopupInquiry
        fields = [
            'id', 'name', 'email', 'whatsapp_number', 'location',
            'event_date', 'event_type', 'message', 'submitted_at'
        ]
        read_only_fields = ['submitted_at']
    
    def create(self, validated_data):
        # Get IP address and user agent from request context
        request = self.context.get('request')
        if request:
            validated_data['ip_address'] = self.get_client_ip(request)
            validated_data['user_agent'] = request.META.get('HTTP_USER_AGENT', '')[:255]
        
        return super().create(validated_data)
    
    def get_client_ip(self, request):
        """Get client IP address"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class PopupSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopupSettings
        fields = [
            'id', 'is_active', 'popup_image', 'popup_title',
            'popup_subtitle', 'show_delay', 'cookie_duration_days'
        ]
