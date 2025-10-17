from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from .models import HeroSlide, VideoTestimonial, TextTestimonial, FAQ, Achievement, VideoShowcase
from portfolio.models import PortfolioImage
from .serializers import (
    HeroSlideSerializer, 
    VideoTestimonialSerializer, TextTestimonialSerializer, FAQSerializer, AchievementSerializer, VideoShowcaseSerializer
)
from portfolio.serializers import PortfolioImageSerializer

class ShowcaseImagePagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 50

@api_view(['GET'])
def hero_slides(request):
    """
    Get all active hero slides
    """
    try:
        slides = HeroSlide.objects.filter(is_active=True).order_by('order', 'created_at')
        serializer = HeroSlideSerializer(slides, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch hero slides: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def showcase_images(request):
    """
    Get all featured portfolio images from all albums for homepage showcase
    Supports pagination with load more functionality
    """
    try:
        # Get all featured portfolio images from all portfolios
        images = PortfolioImage.objects.filter(
            is_active=True, 
            featured=True,
            portfolio__is_active=True
        ).select_related('portfolio').order_by('order', 'created_at')
        
        # Apply pagination
        paginator = ShowcaseImagePagination()
        paginated_images = paginator.paginate_queryset(images, request)
        
        serializer = PortfolioImageSerializer(paginated_images, many=True, context={'request': request})
        
        # Return paginated response with load more info
        return paginator.get_paginated_response(serializer.data)
        
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch showcase images: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def video_testimonials(request):
    """
    Get all active video testimonials
    """
    try:
        testimonials = VideoTestimonial.objects.filter(is_active=True).order_by('order', 'created_at')
        serializer = VideoTestimonialSerializer(testimonials, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch video testimonials: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def text_testimonials(request):
    """
    Get all active text testimonials
    """
    try:
        testimonials = TextTestimonial.objects.filter(is_active=True).order_by('order', 'created_at')
        serializer = TextTestimonialSerializer(testimonials, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch text testimonials: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def faqs(request):
    """
    Get all active FAQs
    """
    try:
        faq_list = FAQ.objects.filter(is_active=True).order_by('order', 'created_at')
        serializer = FAQSerializer(faq_list, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch FAQs: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def achievements(request):
    """
    Get all active achievements
    """
    try:
        achievements_list = Achievement.objects.filter(is_active=True).order_by('order', 'created_at')
        serializer = AchievementSerializer(achievements_list, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch achievements: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def video_showcase(request):
    """
    Get active video showcase - returns the first active video for homepage
    """
    try:
        video = VideoShowcase.objects.filter(is_active=True).first()
        if video:
            serializer = VideoShowcaseSerializer(video, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No active video showcase found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch video showcase: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def video_showcases(request):
    """
    Get all active video showcases for portfolio page
    """
    try:
        videos = VideoShowcase.objects.filter(is_active=True).order_by('-created_at')
        serializer = VideoShowcaseSerializer(videos, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch video showcases: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
