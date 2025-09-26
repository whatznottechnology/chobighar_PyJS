from django.urls import path
from . import views

urlpatterns = [
    path('hero/', views.about_hero, name='about_hero'),
    path('story/', views.about_story, name='about_story'),
    path('values/', views.about_values, name='about_values'),
    path('team/', views.team_members, name='team_members'),
    path('content/', views.about_content, name='about_content'),
]