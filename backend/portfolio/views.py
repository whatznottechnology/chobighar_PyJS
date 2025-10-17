from rest_framework import viewsets, status, filters
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Category, Portfolio, PortfolioImage, PortfolioVideo
from .serializers import (
    CategorySerializer, PortfolioListSerializer, PortfolioDetailSerializer, 
    PortfolioImageSerializer, PortfolioVideoSerializer
)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for portfolio categories
    Provides list and retrieve actions
    """
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    
    @action(detail=True, methods=['get'])
    def portfolios(self, request, pk=None):
        """Get all portfolios for a specific category"""
        category = self.get_object()
        portfolios = Portfolio.objects.filter(category=category, is_active=True)
        serializer = PortfolioListSerializer(portfolios, many=True)
        return Response(serializer.data)


class PortfolioViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for portfolios
    Provides list, retrieve, and filtering capabilities
    """
    queryset = Portfolio.objects.filter(is_active=True)
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'featured']
    search_fields = ['title', 'subtitle', 'description', 'location']
    ordering_fields = ['date', 'created_at', 'order', 'title']
    ordering = ['order', '-date']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'retrieve':
            return PortfolioDetailSerializer
        return PortfolioListSerializer
    
    def get_queryset(self):
        """Filter queryset based on query parameters"""
        queryset = super().get_queryset()
        
        # Filter by category if provided
        category = self.request.query_params.get('category', None)
        if category and category != 'all':
            queryset = queryset.filter(category__id=category)
        
        # Filter featured portfolios
        featured = self.request.query_params.get('featured', None)
        if featured:
            queryset = queryset.filter(featured=True)
            
        return queryset
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured portfolios"""
        featured_portfolios = self.queryset.filter(featured=True)[:6]
        serializer = self.get_serializer(featured_portfolios, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def categories_with_count(self, request):
        """Get categories with portfolio counts"""
        categories = Category.objects.filter(is_active=True)
        category_data = []
        
        # Add 'All' category
        total_count = self.queryset.count()
        category_data.append({
            'id': 'all',
            'name': 'All Work',
            'count': total_count
        })
        
        # Add other categories
        for category in categories:
            count = self.queryset.filter(category=category).count()
            category_data.append({
                'id': category.id,
                'name': category.name,
                'count': count
            })
        
        return Response(category_data)
    
    @action(detail=True, methods=['get'])
    def related(self, request, pk=None):
        """Get related portfolios from the same category"""
        portfolio = self.get_object()
        related = Portfolio.objects.filter(
            category=portfolio.category,
            is_active=True
        ).exclude(pk=portfolio.pk)[:6]
        
        serializer = PortfolioListSerializer(related, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def love(self, request, pk=None):
        """Increment love count for a portfolio"""
        portfolio = self.get_object()
        new_count = portfolio.increment_love()
        
        return Response({
            'success': True,
            'love_count': new_count,
            'message': 'Love added successfully!'
        }, status=status.HTTP_200_OK)


@api_view(['GET'])
def showcase_images(request):
    """Get all featured portfolio images for showcase display"""
    images = PortfolioImage.objects.filter(
        is_active=True,
        featured=True,
        portfolio__is_active=True
    ).order_by('order', 'created_at')  # Order by order field and creation date
    
    serializer = PortfolioImageSerializer(images, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def portfolio_videos(request):
    """Get all featured portfolio videos for video showcase"""
    videos = PortfolioVideo.objects.filter(
        is_active=True,
        featured=True,
        portfolio__is_active=True
    ).select_related('portfolio').order_by('-portfolio__date', 'order')  # Latest portfolios first
    
    serializer = PortfolioVideoSerializer(videos, many=True)
    return Response(serializer.data)