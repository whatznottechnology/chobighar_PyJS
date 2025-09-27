from django.urls import path
from . import views

urlpatterns = [
    path('hero-slides/', views.hero_slides, name='hero_slides'),
    path('showcase-images/', views.showcase_images, name='showcase_images'),
    path('video-testimonials/', views.video_testimonials, name='video_testimonials'),
    path('text-testimonials/', views.text_testimonials, name='text_testimonials'),
    path('faqs/', views.faqs, name='faqs'),
    path('achievements/', views.achievements, name='achievements'),
    path('video-showcase/', views.video_showcase, name='video_showcase'),
    path('video-showcases/', views.video_showcases, name='video_showcases'),
]
