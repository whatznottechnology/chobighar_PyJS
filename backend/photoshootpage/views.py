from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import PhotoshootHero, PhotoshootService, PhotoshootPageSettings, PhotoshootTestimonial
from .serializers import PhotoshootHeroSerializer, PhotoshootServiceSerializer, PhotoshootPageSettingsSerializer, PhotoshootTestimonialSerializer

class PhotoshootHeroListView(generics.ListAPIView):
    """Get active photoshoot hero sections"""
    serializer_class = PhotoshootHeroSerializer
    
    def get_queryset(self):
        return PhotoshootHero.objects.filter(is_active=True)

@api_view(['GET'])
def photoshoot_hero_detail(request):
    """Get the active photoshoot hero section"""
    try:
        hero = PhotoshootHero.objects.filter(is_active=True).first()
        if hero:
            serializer = PhotoshootHeroSerializer(hero, context={'request': request})
            return Response(serializer.data)
        return Response({'message': 'No active hero section found'}, status=404)
    except PhotoshootHero.DoesNotExist:
        return Response({'message': 'Hero section not found'}, status=404)

class PhotoshootServiceListView(generics.ListAPIView):
    """Get active photoshoot services"""
    serializer_class = PhotoshootServiceSerializer
    
    def get_queryset(self):
        return PhotoshootService.objects.filter(is_active=True).order_by('order', 'created_at')

@api_view(['GET'])
def photoshoot_service_detail(request, pk):
    """Get specific photoshoot service"""
    service = get_object_or_404(PhotoshootService, pk=pk, is_active=True)
    serializer = PhotoshootServiceSerializer(service, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def photoshoot_featured_services(request):
    """Get featured photoshoot services"""
    services = PhotoshootService.objects.filter(is_active=True, is_featured=True).order_by('order', 'created_at')
    serializer = PhotoshootServiceSerializer(services, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def photoshoot_page_settings(request):
    """Get photoshoot page settings"""
    try:
        settings = PhotoshootPageSettings.objects.filter(is_active=True).first()
        if settings:
            serializer = PhotoshootPageSettingsSerializer(settings, context={'request': request})
            return Response(serializer.data)
        return Response({'message': 'Page settings not found'}, status=404)
    except PhotoshootPageSettings.DoesNotExist:
        return Response({'message': 'Page settings not found'}, status=404)


class PhotoshootTestimonialListView(generics.ListAPIView):
    """Get active photoshoot testimonials"""
    serializer_class = PhotoshootTestimonialSerializer
    
    def get_queryset(self):
        return PhotoshootTestimonial.objects.filter(is_active=True).order_by('order', '-created_at')


@api_view(['GET'])
def photoshoot_featured_testimonials(request):
    """Get featured photoshoot testimonials"""
    testimonials = PhotoshootTestimonial.objects.filter(is_active=True, is_featured=True).order_by('order', '-created_at')
    serializer = PhotoshootTestimonialSerializer(testimonials, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def photoshoot_page_data(request):
    """Get all photoshoot page data in one API call"""
    data = {}
    
    # Get hero section
    hero = PhotoshootHero.objects.filter(is_active=True).first()
    if hero:
        data['hero'] = PhotoshootHeroSerializer(hero, context={'request': request}).data
    
    # Get services
    services = PhotoshootService.objects.filter(is_active=True).order_by('order', 'created_at')
    data['services'] = PhotoshootServiceSerializer(services, many=True, context={'request': request}).data
    
    # Get testimonials
    testimonials = PhotoshootTestimonial.objects.filter(is_active=True).order_by('order', '-created_at')
    data['testimonials'] = PhotoshootTestimonialSerializer(testimonials, many=True, context={'request': request}).data
    
    # Get page settings
    settings = PhotoshootPageSettings.objects.filter(is_active=True).first()
    if settings:
        data['settings'] = PhotoshootPageSettingsSerializer(settings, context={'request': request}).data
    
    return Response(data)
