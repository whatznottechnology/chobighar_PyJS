from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.views import View
from django.conf import settings
from .models import SocialMedia, ContactInfo, BrandInfo
from .serializers import SocialMediaSerializer, ContactInfoSerializer, BrandInfoSerializer, HeaderDataSerializer
from homepage.models import HeroSlide
import os

@api_view(['GET'])
def get_header_data(request):
    """Get all header data in a single API call"""
    try:
        # Get active social media links
        social_media = SocialMedia.objects.filter(is_active=True)
        
        # Get active contact info (first active one)
        contact_info = ContactInfo.objects.filter(is_active=True).first()
        
        # Get active brand info (first active one)
        brand_info = BrandInfo.objects.filter(is_active=True).first()
        
        # If no data exists, create default data
        if not contact_info:
            contact_info = ContactInfo.objects.create(
                phone="+91 96479 66765",
                email="booking@chobighar.com"
            )
        
        if not brand_info:
            brand_info = BrandInfo.objects.create(
                main_text="chobighar",
                sub_text="(Art Direction and Design Studio)"
            )
        
        # If no social media exists, create default ones
        if not social_media.exists():
            default_social = [
                {'name': 'instagram', 'url': 'https://instagram.com/chobighar', 'order': 1},
                {'name': 'facebook', 'url': 'https://facebook.com/chobighar', 'order': 2},
                {'name': 'youtube', 'url': 'https://youtube.com/chobighar', 'order': 3},
                {'name': 'x', 'url': 'https://x.com/chobighar', 'order': 4},
                {'name': 'pinterest', 'url': 'https://pinterest.com/chobighar', 'order': 5},
                {'name': 'linkedin', 'url': 'https://linkedin.com/company/chobighar', 'order': 6},
            ]
            
            for social_data in default_social:
                SocialMedia.objects.create(**social_data)
            
            social_media = SocialMedia.objects.filter(is_active=True)
        
        # Serialize data
        response_data = {
            'social_media': SocialMediaSerializer(social_media, many=True).data,
            'contact_info': ContactInfoSerializer(contact_info).data,
            'brand_info': BrandInfoSerializer(brand_info, context={'request': request}).data
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response(
            {'error': f'Error fetching header data: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def get_social_media(request):
    """Get all active social media links"""
    social_media = SocialMedia.objects.filter(is_active=True)
    serializer = SocialMediaSerializer(social_media, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_contact_info(request):
    """Get active contact information"""
    contact_info = ContactInfo.objects.filter(is_active=True).first()
    if contact_info:
        serializer = ContactInfoSerializer(contact_info)
        return Response(serializer.data)
    return Response({'error': 'No contact info found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_brand_info(request):
    """Get active brand information"""
    brand_info = BrandInfo.objects.filter(is_active=True).first()
    if brand_info:
        serializer = BrandInfoSerializer(brand_info, context={'request': request})
        return Response(serializer.data)
    return Response({'error': 'No brand info found'}, status=status.HTTP_404_NOT_FOUND)

class MediaTestView(View):
    """Test view to check media file accessibility"""
    
    def get(self, request):
        results = {
            'media_root': str(settings.MEDIA_ROOT),
            'media_url': settings.MEDIA_URL,
            'debug': settings.DEBUG,
            'brand_images': [],
            'hero_images': [],
            'errors': []
        }
        
        try:
            # Test brand images
            brand_info = BrandInfo.objects.first()
            if brand_info and brand_info.logo_image:
                brand_data = {
                    'field_value': str(brand_info.logo_image),
                    'url': brand_info.logo_image.url,
                    'name': brand_info.logo_image.name,
                    'file_exists': os.path.exists(brand_info.logo_image.path),
                    'full_path': brand_info.logo_image.path
                }
                results['brand_images'].append(brand_data)
            
            # Test hero images  
            hero_slides = HeroSlide.objects.filter(image__isnull=False)[:2]
            for slide in hero_slides:
                hero_data = {
                    'title': slide.title or f'Slide {slide.id}',
                    'field_value': str(slide.image),
                    'url': slide.image.url,
                    'name': slide.image.name,
                    'file_exists': os.path.exists(slide.image.path),
                    'full_path': slide.image.path
                }
                results['hero_images'].append(hero_data)
                
        except Exception as e:
            results['errors'].append(str(e))
        
        return JsonResponse(results, json_dumps_params={'indent': 2})
