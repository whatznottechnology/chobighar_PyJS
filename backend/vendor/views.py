from rest_framework import generics, status, filters
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.http import Http404
from django_filters.rest_framework import DjangoFilterBackend
from .models import VendorCategory, VendorSubCategory, VendorProfile
from .serializers import (
    VendorCategorySerializer, 
    VendorSubCategorySerializer,
    VendorSubCategoryDetailSerializer,
    VendorProfileSerializer,
    VendorProfileListSerializer
)


class VendorCategoryListView(generics.ListAPIView):
    """
    API endpoint to get all active vendor categories with their subcategories
    Used for the main /vendors page
    """
    serializer_class = VendorCategorySerializer
    
    def get_queryset(self):
        return VendorCategory.objects.filter(
            is_active=True
        ).prefetch_related('subcategories').order_by('name')


class VendorSubCategoryDetailView(generics.RetrieveAPIView):
    """
    API endpoint to get individual subcategory details by slug
    Used for subcategory detail pages like /vendors/banquet-halls
    """
    serializer_class = VendorSubCategoryDetailSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        return VendorSubCategory.objects.filter(
            is_active=True
        ).select_related('category')


class VendorProfileListView(generics.ListAPIView):
    """
    API endpoint to get all vendor profiles with filtering and search
    """
    serializer_class = VendorProfileListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category__slug', 'subcategory__slug', 'is_featured', 'location']
    search_fields = ['name', 'tagline', 'description', 'location']
    ordering_fields = ['rating', 'reviews_count', 'created_at', 'name']
    ordering = ['-is_featured', '-rating', 'name']
    
    def get_queryset(self):
        return VendorProfile.objects.filter(
            is_active=True
        ).select_related('category', 'subcategory').prefetch_related('images')


class VendorProfileDetailView(generics.RetrieveAPIView):
    """
    API endpoint to get individual vendor profile details by slug
    Used for vendor profile pages like /royal-palace-banquets
    """
    serializer_class = VendorProfileSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        return VendorProfile.objects.filter(
            is_active=True
        ).select_related('category', 'subcategory').prefetch_related(
            'images', 'videos', 'services', 'specialties', 'highlights',
            'testimonials', 'portfolio_items'
        )


@api_view(['GET'])
def vendor_category_detail(request, slug):
    """
    Get category details by slug
    """
    try:
        category = VendorCategory.objects.get(slug=slug, is_active=True)
        serializer = VendorCategorySerializer(category)
        return Response(serializer.data)
    except VendorCategory.DoesNotExist:
        return Response(
            {'error': 'Category not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
def vendor_subcategory_by_category(request, category_slug):
    """
    Get all subcategories for a specific category
    """
    try:
        category = VendorCategory.objects.get(slug=category_slug, is_active=True)
        subcategories = VendorSubCategory.objects.filter(
            category=category,
            is_active=True
        ).order_by('name')
        
        serializer = VendorSubCategorySerializer(subcategories, many=True)
        return Response({
            'category': VendorCategorySerializer(category).data,
            'subcategories': serializer.data
        })
    except VendorCategory.DoesNotExist:
        return Response(
            {'error': 'Category not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
def featured_vendors(request):
    """
    Get featured vendor profiles
    """
    vendors = VendorProfile.objects.filter(
        is_active=True,
        is_featured=True
    ).select_related('category', 'subcategory').prefetch_related('images')[:6]
    
    serializer = VendorProfileListSerializer(vendors, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def vendors_by_category(request, category_slug):
    """
    Get vendor profiles by category
    """
    try:
        category = VendorCategory.objects.get(slug=category_slug, is_active=True)
        vendors = VendorProfile.objects.filter(
            category=category,
            is_active=True
        ).select_related('category', 'subcategory').prefetch_related('images').order_by('-is_featured', '-rating', 'name')
        
        serializer = VendorProfileListSerializer(vendors, many=True)
        return Response({
            'category': VendorCategorySerializer(category).data,
            'vendors': serializer.data
        })
    except VendorCategory.DoesNotExist:
        return Response(
            {'error': 'Category not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
def vendors_by_subcategory(request, subcategory_slug):
    """
    Get vendor profiles by subcategory
    """
    try:
        subcategory = VendorSubCategory.objects.select_related('category').get(
            slug=subcategory_slug, 
            is_active=True
        )
        vendors = VendorProfile.objects.filter(
            subcategory=subcategory,
            is_active=True
        ).select_related('category', 'subcategory').prefetch_related('images').order_by('-is_featured', '-rating', 'name')
        
        serializer = VendorProfileListSerializer(vendors, many=True)
        return Response({
            'subcategory': VendorSubCategoryDetailSerializer(subcategory).data,
            'vendors': serializer.data
        })
    except VendorSubCategory.DoesNotExist:
        return Response(
            {'error': 'Subcategory not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
def increment_love_count(request, slug):
    """
    Increment the love count for a vendor profile
    """
    try:
        vendor = VendorProfile.objects.get(slug=slug, is_active=True)
        vendor.love_count += 1
        vendor.save(update_fields=['love_count'])
        
        return Response({
            'success': True,
            'love_count': vendor.love_count
        })
    except VendorProfile.DoesNotExist:
        return Response(
            {'error': 'Vendor not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
