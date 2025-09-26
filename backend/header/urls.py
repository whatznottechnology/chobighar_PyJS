from django.urls import path
from . import views

app_name = 'header'

urlpatterns = [
    path('', views.get_header_data, name='header_data'),
    path('social-media/', views.get_social_media, name='social_media'),
    path('contact-info/', views.get_contact_info, name='contact_info'),
    path('brand-info/', views.get_brand_info, name='brand_info'),
]