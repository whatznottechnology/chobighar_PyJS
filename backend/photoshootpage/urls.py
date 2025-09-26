from django.urls import path
from . import views

app_name = 'photoshootpage'

urlpatterns = [
    # Hero section
    path('hero/', views.photoshoot_hero_detail, name='hero'),
    path('hero/list/', views.PhotoshootHeroListView.as_view(), name='hero-list'),
    
    # Services
    path('services/', views.PhotoshootServiceListView.as_view(), name='services'),
    path('services/<int:pk>/', views.photoshoot_service_detail, name='service-detail'),
    path('services/featured/', views.photoshoot_featured_services, name='featured-services'),
    
    # Testimonials
    path('testimonials/', views.PhotoshootTestimonialListView.as_view(), name='testimonials'),
    path('testimonials/featured/', views.photoshoot_featured_testimonials, name='featured-testimonials'),
    
    # Page settings
    path('settings/', views.photoshoot_page_settings, name='settings'),
    
    # Complete page data
    path('page-data/', views.photoshoot_page_data, name='page-data'),
]