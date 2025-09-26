from django.urls import path
from . import views

app_name = 'footer'

urlpatterns = [
    path('', views.get_footer_data, name='footer_data'),
    path('brand-info/', views.get_footer_brand_info, name='brand_info'),
    path('contact-info/', views.get_footer_contact_info, name='contact_info'),
    path('social-media/', views.get_footer_social_media, name='social_media'),
    path('copyright/', views.get_footer_copyright, name='copyright'),
]