from django.urls import path
from . import views
from .image_test_view import ImageTestView

app_name = 'header'

urlpatterns = [
    path('', views.get_header_data, name='header_data'),
    path('social-media/', views.get_social_media, name='social_media'),
    path('contact-info/', views.get_contact_info, name='contact_info'),
    path('brand-info/', views.get_brand_info, name='brand_info'),
    path('test-media/', views.MediaTestView.as_view(), name='test_media'),
    path('test-images/', ImageTestView.as_view(), name='test_images'),
]