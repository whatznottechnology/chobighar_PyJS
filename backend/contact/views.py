from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import ContactUsHero, ContactUsInfo, WhyChooseUs, ContactTestimonial
from .serializers import (
    ContactUsHeroSerializer, 
    ContactUsInfoSerializer, 
    WhyChooseUsSerializer, 
    ContactTestimonialSerializer,
    ContactPageDataSerializer
)

@api_view(['GET'])
def contact_page_data(request):
    """Get all contact page data in one API call"""
    try:
        # Get active hero data (get first active one)
        hero = ContactUsHero.objects.filter(is_active=True).first()
        if not hero:
            # Create default hero if none exists
            hero = ContactUsHero.objects.create()
        
        # Get active contact info (get first active one)
        contact_info = ContactUsInfo.objects.filter(is_active=True).first()
        if not contact_info:
            # Create default contact info if none exists
            contact_info = ContactUsInfo.objects.create()
        
        # Get active why choose us points
        why_choose_us = WhyChooseUs.objects.filter(is_active=True).order_by('order', 'created_at')
        
        # Get active testimonials
        testimonials = ContactTestimonial.objects.filter(is_active=True).order_by('order', 'created_at')[:3]
        
        # Serialize data
        hero_data = ContactUsHeroSerializer(hero, context={'request': request}).data
        contact_info_data = ContactUsInfoSerializer(contact_info, context={'request': request}).data
        why_choose_us_data = WhyChooseUsSerializer(why_choose_us, many=True, context={'request': request}).data
        testimonials_data = ContactTestimonialSerializer(testimonials, many=True, context={'request': request}).data
        
        data = {
            'hero': hero_data,
            'contact_info': contact_info_data,
            'why_choose_us': why_choose_us_data,
            'testimonials': testimonials_data
        }
        
        return Response(data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response(
            {'error': f'Error fetching contact page data: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def hero_data(request):
    """Get contact hero data"""
    try:
        hero = ContactUsHero.objects.filter(is_active=True).first()
        if not hero:
            hero = ContactUsHero.objects.create()
        
        serializer = ContactUsHeroSerializer(hero, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def contact_info_data(request):
    """Get contact information"""
    try:
        contact_info = ContactUsInfo.objects.filter(is_active=True).first()
        if not contact_info:
            contact_info = ContactUsInfo.objects.create()
        
        serializer = ContactUsInfoSerializer(contact_info, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def why_choose_us_data(request):
    """Get why choose us points"""
    try:
        points = WhyChooseUs.objects.filter(is_active=True).order_by('order', 'created_at')
        serializer = WhyChooseUsSerializer(points, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def contact_testimonials_data(request):
    """Get contact testimonials"""
    try:
        testimonials = ContactTestimonial.objects.filter(is_active=True).order_by('order', 'created_at')
        serializer = ContactTestimonialSerializer(testimonials, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)