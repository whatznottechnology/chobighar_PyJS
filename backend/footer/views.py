from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import (
    FooterBrandInfo, FooterContactInfo, FooterSocialMedia,
    FooterCopyright
)
from .serializers import (
    FooterBrandInfoSerializer, FooterContactInfoSerializer, 
    FooterSocialMediaSerializer, FooterCopyrightSerializer,
    FooterDataSerializer
)
from staticpages.models import StaticPage
from staticpages.serializers import StaticPageListSerializer

@api_view(['GET'])
def get_footer_data(request):
    """Get all footer data in a single API call"""
    try:
        # Get active footer data
        brand_info = FooterBrandInfo.objects.filter(is_active=True).first()
        contact_info = FooterContactInfo.objects.filter(is_active=True).first()
        social_media = FooterSocialMedia.objects.filter(is_active=True).order_by('order')
        copyright_info = FooterCopyright.objects.filter(is_active=True).first()
        
        # Create default data if not exists
        if not brand_info:
            brand_info = FooterBrandInfo.objects.create(
                main_text="chobighar",
                sub_text="(Art Direction and Design Studio)",
                description="Your trusted partner for creating memorable wedding experiences. From planning to execution, we make your special day perfect."
            )
        
        if not contact_info:
            contact_info = FooterContactInfo.objects.create(
                phone="+91 96479 66765",
                email="booking@chobighar.com",
                whatsapp_number="+91 96479 66765",
                address_line1="123 Wedding Street",
                address_line2="Kolkata, West Bengal 700001",
                weekday_hours="Mon-Fri: 10:00 AM - 8:00 PM",
                weekend_hours="Sat-Sun: 11:00 AM - 6:00 PM"
            )
        
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
                FooterSocialMedia.objects.create(**social_data)
            social_media = FooterSocialMedia.objects.filter(is_active=True).order_by('order')
        
        if not copyright_info:
            copyright_info = FooterCopyright.objects.create(
                text="© 2024 chobighar. All rights reserved.",
                company_name="chobighar"
            )
        
        # Get static pages for footer
        static_pages = StaticPage.objects.filter(
            is_published=True, 
            show_in_footer=True
        ).order_by('display_order', 'title')
        
        # Serialize data
        response_data = {
            'brand_info': FooterBrandInfoSerializer(brand_info, context={'request': request}).data,
            'contact_info': FooterContactInfoSerializer(contact_info).data,
            'social_media': FooterSocialMediaSerializer(social_media, many=True).data,
            'copyright_info': FooterCopyrightSerializer(copyright_info).data,
            'static_pages': StaticPageListSerializer(static_pages, many=True).data
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response(
            {'error': f'Error fetching footer data: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def get_footer_brand_info(request):
    """Get footer brand information"""
    brand_info = FooterBrandInfo.objects.filter(is_active=True).first()
    if brand_info:
        serializer = FooterBrandInfoSerializer(brand_info, context={'request': request})
        return Response(serializer.data)
    return Response({'error': 'No brand info found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_footer_contact_info(request):
    """Get footer contact information"""
    contact_info = FooterContactInfo.objects.filter(is_active=True).first()
    if contact_info:
        serializer = FooterContactInfoSerializer(contact_info)
        return Response(serializer.data)
    return Response({'error': 'No contact info found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_footer_social_media(request):
    """Get all active footer social media links"""
    social_media = FooterSocialMedia.objects.filter(is_active=True).order_by('order')
    serializer = FooterSocialMediaSerializer(social_media, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_footer_copyright(request):
    """Get footer copyright information"""
    copyright_info = FooterCopyright.objects.filter(is_active=True).first()
    if copyright_info:
        serializer = FooterCopyrightSerializer(copyright_info)
        return Response(serializer.data)
    return Response({'error': 'No copyright info found'}, status=status.HTTP_404_NOT_FOUND)
