from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import StaticPage
from .serializers import StaticPageSerializer, StaticPageListSerializer


class StaticPageViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for static pages
    - List: Returns footer pages (show_in_footer=True)
    - Retrieve: Returns full page content by slug
    """
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    
    def get_queryset(self):
        """Return only published pages"""
        return StaticPage.objects.filter(is_published=True)
    
    def get_serializer_class(self):
        """Use different serializer for list vs detail"""
        if self.action == 'list':
            return StaticPageListSerializer
        return StaticPageSerializer
    
    def list(self, request, *args, **kwargs):
        """List pages for footer links"""
        queryset = self.get_queryset().filter(show_in_footer=True).order_by('display_order', 'title')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        """Get page detail by slug"""
        try:
            page = self.get_queryset().get(slug=kwargs['slug'])
            serializer = self.get_serializer(page)
            return Response(serializer.data)
        except StaticPage.DoesNotExist:
            return Response(
                {'error': 'Page not found'},
                status=status.HTTP_404_NOT_FOUND
            )
