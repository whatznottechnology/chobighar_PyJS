from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import SocialMedia, ContactInfo, BrandInfo
from .serializers import SocialMediaSerializer, ContactInfoSerializer, BrandInfoSerializer, HeaderDataSerializer

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
                email="booking@chabighar.com"
            )
        
        if not brand_info:
            brand_info = BrandInfo.objects.create(
                main_text="Chabighar",
                sub_text="(Art Direction and Design Studio)"
            )
        
        # If no social media exists, create default ones
        if not social_media.exists():
            default_social = [
                {'name': 'instagram', 'url': 'https://instagram.com/chabighar', 'order': 1},
                {'name': 'facebook', 'url': 'https://facebook.com/chabighar', 'order': 2},
                {'name': 'youtube', 'url': 'https://youtube.com/chabighar', 'order': 3},
                {'name': 'x', 'url': 'https://x.com/chabighar', 'order': 4},
                {'name': 'pinterest', 'url': 'https://pinterest.com/chabighar', 'order': 5},
                {'name': 'linkedin', 'url': 'https://linkedin.com/company/chabighar', 'order': 6},
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
