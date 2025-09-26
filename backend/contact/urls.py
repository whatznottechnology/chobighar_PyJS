from django.urls import path
from . import views

urlpatterns = [
    path('contact-page-data/', views.contact_page_data, name='contact-page-data'),
    path('hero/', views.hero_data, name='contact-hero-data'),
    path('info/', views.contact_info_data, name='contact-info-data'),
    path('why-choose-us/', views.why_choose_us_data, name='why-choose-us-data'),
    path('testimonials/', views.contact_testimonials_data, name='contact-testimonials-data'),
]