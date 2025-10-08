from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.utils import timezone
from django.db.models import Q
from .models import BlogCategory, BlogPost, BlogComment, PopupInquiry, PopupSettings
from .serializers import (
    BlogCategorySerializer, BlogPostListSerializer, BlogPostDetailSerializer,
    BlogCommentSerializer, PopupInquirySerializer, PopupSettingsSerializer
)


class BlogCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for blog categories
    """
    queryset = BlogCategory.objects.filter(is_active=True)
    serializer_class = BlogCategorySerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for blog posts
    """
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = BlogPost.objects.filter(status='published', published_date__lte=timezone.now())
        
        # Filter by category
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        
        # Filter by tag
        tag = self.request.query_params.get('tag', None)
        if tag:
            queryset = queryset.filter(tags__icontains=tag)
        
        # Filter featured posts
        featured = self.request.query_params.get('featured', None)
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
        
        # Search
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(excerpt__icontains=search) |
                Q(content__icontains=search) |
                Q(tags__icontains=search)
            )
        
        return queryset.order_by('-published_date')
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BlogPostDetailSerializer
        return BlogPostListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Increment view count
        instance.increment_views()
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured blog posts"""
        featured_posts = self.get_queryset().filter(is_featured=True)[:3]
        serializer = BlogPostListSerializer(featured_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get recent blog posts"""
        recent_posts = self.get_queryset()[:6]
        serializer = BlogPostListSerializer(recent_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def related(self, request, slug=None):
        """Get related posts"""
        post = self.get_object()
        related = BlogPost.objects.filter(
            category=post.category,
            status='published'
        ).exclude(id=post.id)[:3]
        serializer = BlogPostListSerializer(related, many=True)
        return Response(serializer.data)


class BlogCommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for blog comments
    """
    queryset = BlogComment.objects.all()
    serializer_class = BlogCommentSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = BlogComment.objects.filter(is_approved=True)
        
        # Filter by post
        post_slug = self.request.query_params.get('post', None)
        if post_slug:
            queryset = queryset.filter(post__slug=post_slug)
        
        return queryset.order_by('-created_at')
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response({
            'message': 'Comment submitted successfully. It will be visible after approval.',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)


class PopupInquiryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for popup inquiries
    """
    queryset = PopupInquiry.objects.all()
    serializer_class = PopupInquirySerializer
    permission_classes = [AllowAny]
    http_method_names = ['post']  # Only allow POST
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response({
            'message': 'Thank you! We have received your inquiry and will contact you soon.',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)


class PopupSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for popup settings
    """
    queryset = PopupSettings.objects.filter(is_active=True)
    serializer_class = PopupSettingsSerializer
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get active popup settings"""
        try:
            settings = PopupSettings.objects.filter(is_active=True).first()
            if settings:
                serializer = self.get_serializer(settings)
                return Response(serializer.data)
            return Response({'is_active': False})
        except PopupSettings.DoesNotExist:
            return Response({'is_active': False})
