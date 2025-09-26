from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import AboutHero, AboutStory, AboutValue, TeamMember, AboutContent
from .serializers import (
    AboutHeroSerializer, AboutStorySerializer, AboutValueSerializer,
    TeamMemberSerializer, AboutContentSerializer
)

@api_view(['GET'])
def about_hero(request):
    """
    Get active about hero section
    """
    try:
        hero = AboutHero.objects.filter(is_active=True).first()
        if hero:
            serializer = AboutHeroSerializer(hero, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No active hero section found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch about hero: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def about_story(request):
    """
    Get active about story section
    """
    try:
        story = AboutStory.objects.filter(is_active=True).first()
        if story:
            serializer = AboutStorySerializer(story, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No active story section found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch about story: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def about_values(request):
    """
    Get all active about values
    """
    try:
        values = AboutValue.objects.filter(is_active=True).order_by('order', 'created_at')
        serializer = AboutValueSerializer(values, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch about values: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def team_members(request):
    """
    Get all active team members
    """
    try:
        members = TeamMember.objects.filter(is_active=True).order_by('order', 'created_at')
        serializer = TeamMemberSerializer(members, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch team members: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def about_content(request):
    """
    Get all active about content sections
    """
    try:
        content = AboutContent.objects.filter(is_active=True).order_by('order', 'created_at')
        serializer = AboutContentSerializer(content, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch about content: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
