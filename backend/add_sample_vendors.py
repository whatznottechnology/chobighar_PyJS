#!/usr/bin/env python
import os
import sys
import django
from pathlib import Path

# Setup Django
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chobighar_backend.settings')
django.setup()

from vendor.models import VendorProfile, VendorSubCategory, VendorCategory

# Get the bridal makeup artists subcategory
bridal_sub = VendorSubCategory.objects.filter(slug='bridal-makeup-artists').first()
if not bridal_sub:
    print("Bridal makeup artists subcategory not found!")
    sys.exit(1)

# Get the parent category
parent_category = bridal_sub.category

# Sample vendor data
sample_vendors = [
    {
        'name': 'Glamour by Priya',
        'slug': 'glamour-by-priya',
        'tagline': 'Professional Bridal Makeup Artist',
        'type': 'Makeup Artist',
        'location': 'Salt Lake, Kolkata',
        'address': '123 Salt Lake City, Sector V, Kolkata - 700091',
        'phone': '+91 98765 43210',
        'email': 'priya@glamourbypriya.com',
        'website': 'https://www.glamourbypriya.com',
        'description': 'Specializing in traditional and contemporary bridal makeup with 8+ years of experience. Expert in HD makeup, airbrush techniques, and personalized bridal looks.',
        'story': 'Started my journey as a makeup artist 8 years ago with a passion for making brides look absolutely stunning on their special day. Trained under renowned makeup artists and constantly updating with latest trends.',
        'experience': '8+ Years Experience',
        'price_range': '₹15,000 - ₹35,000',
        'capacity': 'Up to 5 events per month',
        'rating': '4.8',
        'reviews_count': 127,
        'is_featured': True,
        'is_active': True,
        'category': parent_category,
        'subcategory': bridal_sub,
        'business_hours': {
            'monday': '10:00 AM - 8:00 PM',
            'tuesday': '10:00 AM - 8:00 PM',
            'wednesday': '10:00 AM - 8:00 PM',
            'thursday': '10:00 AM - 8:00 PM',
            'friday': '10:00 AM - 8:00 PM',
            'saturday': '9:00 AM - 9:00 PM',
            'sunday': '9:00 AM - 6:00 PM'
        },
        'instagram': 'glamourbypriya',
        'facebook': 'glamourbypriya',
        'youtube': 'glamourbypriya'
    },
    {
        'name': 'Radiant Beauty Studio',
        'slug': 'radiant-beauty-studio',
        'tagline': 'Complete Bridal Makeover Solutions',
        'type': 'Beauty Studio',
        'location': 'Park Street, Kolkata',
        'address': '456 Park Street, Kolkata - 700016',
        'phone': '+91 87654 32109',
        'email': 'info@radiantbeauty.com',
        'website': 'https://www.radiantbeauty.com',
        'description': 'Full-service bridal beauty studio offering makeup, hair styling, and pre-bridal treatments. Known for creating timeless and elegant bridal looks.',
        'story': 'A team of professional makeup artists and hair stylists dedicated to making every bride feel like a queen. We believe in enhancing natural beauty while creating stunning bridal transformations.',
        'experience': '12+ Years Experience',
        'price_range': '₹20,000 - ₹50,000',
        'capacity': 'Multiple bookings per day',
        'rating': '4.9',
        'reviews_count': 89,
        'is_featured': True,
        'is_active': True,
        'category': parent_category,
        'subcategory': bridal_sub,
        'business_hours': {
            'monday': '9:00 AM - 9:00 PM',
            'tuesday': '9:00 AM - 9:00 PM',
            'wednesday': '9:00 AM - 9:00 PM',
            'thursday': '9:00 AM - 9:00 PM',
            'friday': '9:00 AM - 9:00 PM',
            'saturday': '8:00 AM - 10:00 PM',
            'sunday': '8:00 AM - 8:00 PM'
        },
        'instagram': 'radiantbeautystudio',
        'facebook': 'radiantbeautystudio'
    },
    {
        'name': 'Makeup Magic by Ria',
        'slug': 'makeup-magic-by-ria',
        'tagline': 'Creating Magic with Makeup',
        'type': 'Freelance Makeup Artist',
        'location': 'New Town, Kolkata',
        'address': '789 New Town, Action Area 1, Kolkata - 700156',
        'phone': '+91 76543 21098',
        'email': 'ria@makeupmagic.com',
        'website': '',
        'description': 'Freelance bridal makeup artist specializing in natural, dewy looks and dramatic evening makeup. Available for home visits and destination weddings.',
        'story': 'Passionate makeup artist who believes every bride deserves to look and feel her absolute best. Specializing in creating personalized looks that reflect each bride\'s unique personality.',
        'experience': '5+ Years Experience',
        'price_range': '₹12,000 - ₹28,000',
        'capacity': 'Flexible scheduling',
        'rating': '4.7',
        'reviews_count': 54,
        'is_featured': False,
        'is_active': True,
        'category': parent_category,
        'subcategory': bridal_sub,
        'business_hours': {
            'monday': 'By Appointment',
            'tuesday': 'By Appointment',
            'wednesday': 'By Appointment',
            'thursday': 'By Appointment',
            'friday': 'By Appointment',
            'saturday': '8:00 AM - 10:00 PM',
            'sunday': '8:00 AM - 8:00 PM'
        },
        'instagram': 'makeupmagicbyria',
        'facebook': 'makeupmagicbyria'
    }
]

# Create the vendor profiles
created_count = 0
for vendor_data in sample_vendors:
    # Check if vendor already exists
    if VendorProfile.objects.filter(slug=vendor_data['slug']).exists():
        print(f"Vendor '{vendor_data['name']}' already exists, skipping...")
        continue
    
    # Create the vendor
    vendor = VendorProfile.objects.create(**vendor_data)
    created_count += 1
    print(f"✅ Created vendor: {vendor.name}")

print(f"\n🎉 Successfully created {created_count} new vendors!")
print(f"Total vendors in 'bridal-makeup-artists': {VendorProfile.objects.filter(subcategory=bridal_sub).count()}")

# Update the subcategory vendor count
bridal_sub.vendor_count = VendorProfile.objects.filter(subcategory=bridal_sub, is_active=True).count()
bridal_sub.save()
print(f"Updated subcategory vendor count: {bridal_sub.vendor_count}")