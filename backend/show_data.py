#!/usr/bin/env python
"""
Chabighar Backend Data Summary
This script displays all the dummy data that has been added to the Django backend.
"""

import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chabighar_backend.settings')
django.setup()

# Import models
from homepage.models import (
    HeroSlide, ShowcaseImage, TextTestimonial, VideoTestimonial,
    FAQ, Achievement, VideoShowcase
)
from header.models import SocialMedia
from portfolio.models import Category, Portfolio, PortfolioImage
from aboutpage.models import AboutHero, AboutStory, TeamMember
from contact.models import ContactUsInfo, WhyChooseUs

def display_data_summary():
    print("=" * 60)
    print("CHABIGHAR BACKEND DATA SUMMARY")
    print("=" * 60)
    
    # Header Data
    print("\n📱 HEADER & SOCIAL MEDIA:")
    print("-" * 40)
    social_media = SocialMedia.objects.all()
    print(f"Social Media Links: {social_media.count()}")
    for social in social_media:
        print(f"  • {social.get_name_display()}: {social.url}")
    
    # Homepage Data
    print("\n🏠 HOMEPAGE CONTENT:")
    print("-" * 40)
    print(f"Hero Slides: {HeroSlide.objects.count()}")
    print(f"Showcase Images: {ShowcaseImage.objects.count()}")
    print(f"Text Testimonials: {TextTestimonial.objects.count()}")
    print(f"Video Testimonials: {VideoTestimonial.objects.count()}")
    print(f"FAQs: {FAQ.objects.count()}")
    print(f"Achievements: {Achievement.objects.count()}")
    print(f"Video Showcases: {VideoShowcase.objects.count()}")
    
    # Display some sample achievements
    print("\nSample Achievements:")
    for achievement in Achievement.objects.all()[:3]:
        print(f"  • {achievement.title}: {achievement.count_value}{achievement.suffix} - {achievement.description}")
    
    # Portfolio Data
    print("\n📸 PORTFOLIO & GALLERY:")
    print("-" * 40)
    print(f"Categories: {Category.objects.count()}")
    print(f"Portfolios: {Portfolio.objects.count()}")
    print(f"Portfolio Images: {PortfolioImage.objects.count()}")
    
    # Display categories
    print("\nCategories:")
    for category in Category.objects.all():
        count = category.portfolios.count()
        print(f"  • {category.name}: {count} portfolios")
    
    # Display sample portfolios
    print("\nSample Portfolios:")
    for portfolio in Portfolio.objects.all()[:3]:
        print(f"  • {portfolio.title} ({portfolio.category.name})")
        print(f"    Location: {portfolio.location}, Date: {portfolio.date}")
        print(f"    Images: {portfolio.portfolio_images.count()}")
    
    # About Page Data
    print("\n👥 ABOUT PAGE:")
    print("-" * 40)
    print(f"About Hero Sections: {AboutHero.objects.count()}")
    print(f"About Stories: {AboutStory.objects.count()}")
    print(f"Team Members: {TeamMember.objects.count()}")
    
    # Display team members
    if TeamMember.objects.exists():
        print("\nTeam Members:")
        for member in TeamMember.objects.all():
            print(f"  • {member.name} - {member.position}")
    
    # API Endpoints
    print("\n🔗 AVAILABLE API ENDPOINTS:")
    print("-" * 40)
    endpoints = [
        "http://127.0.0.1:8000/api/header/social-media/",
        "http://127.0.0.1:8000/api/homepage/hero-slides/",
        "http://127.0.0.1:8000/api/homepage/showcase-images/",
        "http://127.0.0.1:8000/api/homepage/text-testimonials/",
        "http://127.0.0.1:8000/api/homepage/video-testimonials/",
        "http://127.0.0.1:8000/api/homepage/faqs/",
        "http://127.0.0.1:8000/api/homepage/achievements/",
        "http://127.0.0.1:8000/api/homepage/video-showcase/",
        "http://127.0.0.1:8000/api/portfolio/portfolios/",
        "http://127.0.0.1:8000/api/portfolio/portfolios/categories_with_count/",
        "http://127.0.0.1:8000/admin/",  # Django Admin
    ]
    
    for endpoint in endpoints:
        print(f"  • {endpoint}")
    
    print("\n" + "=" * 60)
    print("✅ Django Backend is ready with comprehensive dummy data!")
    print("✅ Server running at: http://127.0.0.1:8000/")
    print("✅ Admin interface: http://127.0.0.1:8000/admin/")
    print("=" * 60)

if __name__ == "__main__":
    display_data_summary()