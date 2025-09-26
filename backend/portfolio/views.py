from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Category, Portfolio, PortfolioInquiry
from .serializers import (
    CategorySerializer, PortfolioListSerializer, PortfolioDetailSerializer, 
    PortfolioInquirySerializer
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


class PortfolioInquiryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for portfolio inquiries
    Handles quote requests from portfolio pages
    """
    queryset = PortfolioInquiry.objects.all()
    serializer_class = PortfolioInquirySerializer
    
    def get_queryset(self):
        """Filter inquiries based on permissions"""
        # For admin users, return all inquiries
        # For regular users, they shouldn't access this endpoint
        return super().get_queryset().order_by('-created_at')
    
    def create(self, request, *args, **kwargs):
        """Create new portfolio inquiry"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save the inquiry
        inquiry = serializer.save()
        
        # Here you could add email notification logic
        # send_inquiry_notification(inquiry)
        
        return Response({
            'message': 'Thank you for your inquiry! We will get back to you soon.',
            'inquiry_id': inquiry.id
        }, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get inquiry statistics for admin dashboard"""
        total = self.queryset.count()
        new = self.queryset.filter(status='new').count()
        contacted = self.queryset.filter(status='contacted').count()
        converted = self.queryset.filter(status='converted').count()
        
        return Response({
            'total': total,
            'new': new,
            'contacted': contacted,
            'converted': converted,
            'conversion_rate': round((converted / total * 100), 2) if total > 0 else 0
        })