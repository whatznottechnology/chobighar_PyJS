from django.core.management.base import BaseCommand
from django.utils.text import slugify
from vendor.models import (
    VendorCategory, VendorSubCategory, VendorProfile, VendorImage,
    VendorVideo, VendorService, VendorSpecialty, VendorHighlight,
    VendorPackage, VendorTestimonial, VendorPortfolio
)
from django.core.files.base import ContentFile
import json
import requests
from io import BytesIO


class Command(BaseCommand):
    help = 'Populate vendor profiles with sample data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting vendor profile population...'))
        
        # Sample vendor profiles data
        vendor_profiles_data = [
            {
                'name': 'Royal Palace Banquets',
                'tagline': 'Where Dreams Meet Elegance',
                'type': 'banquet_hall',
                'category_slug': 'venues-spaces',
                'subcategory_slug': 'banquet-halls',
                'location': 'Dhaka, Bangladesh',
                'address': '123 Gulshan Avenue, Dhaka 1212',
                'phone': '+880-1712-345678',
                'email': 'info@royalpalacebanquets.com',
                'website': 'https://royalpalacebanquets.com',
                'description': 'Experience the pinnacle of luxury at Royal Palace Banquets, where every celebration becomes a masterpiece of elegance and sophistication.',
                'story': 'Founded in 2010, Royal Palace Banquets has been creating unforgettable moments for families across Bangladesh. Our commitment to excellence and attention to detail has made us the preferred choice for discerning couples.',
                'experience': '13+ years',
                'price_range': '৳80,000 - ৳2,50,000',
                'capacity': '500-2000 guests',
                'rating': 4.8,
                'reviews_count': 156,
                'business_hours': {
                    'monday': '9:00 AM - 10:00 PM',
                    'tuesday': '9:00 AM - 10:00 PM',
                    'wednesday': '9:00 AM - 10:00 PM',
                    'thursday': '9:00 AM - 10:00 PM',
                    'friday': '9:00 AM - 10:00 PM',
                    'saturday': '9:00 AM - 11:00 PM',
                    'sunday': '9:00 AM - 11:00 PM'
                },
                'is_featured': True,
                'facebook': 'royalpalacebanquets',
                'instagram': 'royalpalacebd',
                'youtube': '@royalpalacebanquets',
                'services': [
                    'Full Wedding Planning',
                    'Catering Services',
                    'Decoration & Lighting',
                    'Sound & Music System',
                    'Photography Coverage',
                    'Bridal Room',
                    'Parking Facilities',
                    'Security Services'
                ],
                'specialties': [
                    'Traditional Bengali Weddings',
                    'Grand Reception Halls',
                    'Outdoor Garden Ceremonies',
                    'Corporate Events'
                ],
                'highlights': [
                    'Largest banquet hall in Dhaka',
                    'Award-winning catering team',
                    'State-of-the-art lighting system',
                    'Complimentary bridal suite'
                ],
                'packages': [
                    {
                        'name': 'Silver Package',
                        'price': '৳80,000',
                        'features': ['Basic decoration', 'Standard catering', 'Sound system', 'Basic lighting'],
                        'is_popular': False
                    },
                    {
                        'name': 'Gold Package',
                        'price': '৳1,50,000',
                        'features': ['Premium decoration', 'Deluxe catering', 'Professional sound system', 'LED lighting', 'Photography'],
                        'is_popular': True
                    },
                    {
                        'name': 'Platinum Package',
                        'price': '৳2,50,000',
                        'features': ['Luxury decoration', 'Royal catering', 'Complete AV setup', 'Designer lighting', 'Full photography & videography', 'Bridal suite'],
                        'is_popular': False
                    }
                ],
                'testimonials': [
                    {
                        'client_name': 'Rashida & Karim',
                        'rating': 5,
                        'review': 'Royal Palace made our wedding absolutely magical! The service was impeccable and the food was outstanding.',
                        'event_type': 'Wedding Reception',
                        'is_featured': True
                    },
                    {
                        'client_name': 'Fatima Rahman',
                        'rating': 5,
                        'review': 'Perfect venue for our daughter\'s wedding. The staff was professional and accommodating throughout.',
                        'event_type': 'Wedding',
                        'is_featured': True
                    }
                ],
                'videos': [
                    {
                        'title': 'Royal Palace Banquets - Venue Tour',
                        'youtube_id': 'dQw4w9WgXcQ',
                        'description': 'Take a virtual tour of our stunning banquet facilities'
                    }
                ]
            },
            {
                'name': 'Snapmemories Photography',
                'tagline': 'Capturing Life\'s Beautiful Moments',
                'type': 'photography_studio',
                'category_slug': 'photography', 
                'subcategory_slug': 'wedding-photography',
                'location': 'Chittagong, Bangladesh',
                'address': '456 CDA Avenue, Chittagong 4000',
                'phone': '+880-1812-987654',
                'email': 'hello@snapmemories.com',
                'website': 'https://snapmemories.com',
                'description': 'Professional wedding photography with a creative touch. We specialize in capturing authentic emotions and candid moments.',
                'story': 'Started by passionate photographers in 2015, Snapmemories has grown to become one of the most trusted wedding photography studios in Bangladesh.',
                'experience': '8+ years',
                'price_range': '৳25,000 - ৳1,20,000',
                'capacity': 'Unlimited coverage',
                'rating': 4.9,
                'reviews_count': 89,
                'business_hours': {
                    'monday': '10:00 AM - 8:00 PM',
                    'tuesday': '10:00 AM - 8:00 PM',
                    'wednesday': '10:00 AM - 8:00 PM',
                    'thursday': '10:00 AM - 8:00 PM',
                    'friday': '10:00 AM - 8:00 PM',
                    'saturday': '9:00 AM - 10:00 PM',
                    'sunday': '9:00 AM - 10:00 PM'
                },
                'is_featured': True,
                'facebook': 'snapmemoriesbd',
                'instagram': 'snapmemories_bd',
                'services': [
                    'Pre-wedding Photography',
                    'Wedding Day Coverage',
                    'Reception Photography',
                    'Cinematic Videography',
                    'Photo Album Design',
                    'Digital Gallery',
                    'Same Day Editing'
                ],
                'specialties': [
                    'Candid Photography',
                    'Traditional Portraits',
                    'Drone Photography',
                    'Night Photography'
                ],
                'highlights': [
                    '500+ successful weddings',
                    'Award-winning photography team',
                    'Same-day photo delivery',
                    'Lifetime digital storage'
                ]
            },
            {
                'name': 'Blooming Petals Decor',
                'tagline': 'Transforming Spaces with Floral Excellence',
                'type': 'decoration_service',
                'category_slug': 'decoration',
                'subcategory_slug': 'flower-decoration',
                'location': 'Sylhet, Bangladesh',
                'address': '789 Zindabazar, Sylhet 3100',
                'phone': '+880-1912-456789',
                'email': 'info@bloomingpetals.com',
                'website': 'https://bloomingpetals.com',
                'description': 'Creating stunning floral arrangements and decorations that make every celebration bloom with beauty and elegance.',
                'story': 'Blooming Petals started as a small flower shop and has blossomed into Sylhet\'s premier decoration service, known for innovative designs and fresh flowers.',
                'experience': '6+ years',
                'price_range': '৳15,000 - ৳80,000',
                'capacity': 'Any size event',
                'rating': 4.7,
                'reviews_count': 67,
                'business_hours': {
                    'monday': '8:00 AM - 7:00 PM',
                    'tuesday': '8:00 AM - 7:00 PM',
                    'wednesday': '8:00 AM - 7:00 PM',
                    'thursday': '8:00 AM - 7:00 PM',
                    'friday': '8:00 AM - 7:00 PM',
                    'saturday': '8:00 AM - 8:00 PM',
                    'sunday': '9:00 AM - 6:00 PM'
                },
                'is_featured': False,
                'facebook': 'bloomingpetalsbd',
                'instagram': 'bloomingpetals_sylhet',
                'services': [
                    'Bridal Bouquets',
                    'Stage Decoration',
                    'Table Centerpieces',
                    'Mandap Decoration',
                    'Car Decoration',
                    'Fresh Flower Supply',
                    'Event Consultation'
                ],
                'specialties': [
                    'Traditional Bengali Designs',
                    'Modern Minimalist Decor',
                    'Seasonal Arrangements',
                    'Custom Color Schemes'
                ],
                'highlights': [
                    'Fresh flowers daily',
                    'Custom design consultation',
                    '24/7 event support',
                    'Eco-friendly materials'
                ]
            }
        ]
        
        # Create vendor profiles
        for vendor_data in vendor_profiles_data:
            try:
                # Get category and subcategory
                category = VendorCategory.objects.get(slug=vendor_data['category_slug'], is_active=True)
                subcategory = VendorSubCategory.objects.get(slug=vendor_data['subcategory_slug'], is_active=True)
                
                # Create or update vendor profile
                vendor_profile, created = VendorProfile.objects.get_or_create(
                    slug=slugify(vendor_data['name']),
                    defaults={
                        'name': vendor_data['name'],
                        'tagline': vendor_data['tagline'],
                        'type': vendor_data['type'],
                        'category': category,
                        'subcategory': subcategory,
                        'location': vendor_data['location'],
                        'address': vendor_data['address'],
                        'phone': vendor_data['phone'],
                        'email': vendor_data['email'],
                        'website': vendor_data['website'],
                        'description': vendor_data['description'],
                        'story': vendor_data['story'],
                        'experience': vendor_data['experience'],
                        'price_range': vendor_data['price_range'],
                        'capacity': vendor_data['capacity'],
                        'rating': vendor_data['rating'],
                        'reviews_count': vendor_data['reviews_count'],
                        'business_hours': vendor_data['business_hours'],
                        'is_featured': vendor_data['is_featured'],
                        'facebook': vendor_data.get('facebook', ''),
                        'instagram': vendor_data.get('instagram', ''),
                        'youtube': vendor_data.get('youtube', ''),
                        'is_active': True
                    }
                )
                
                if created:
                    self.stdout.write(f'Created vendor profile: {vendor_profile.name}')
                    
                    # Add services
                    for idx, service_name in enumerate(vendor_data.get('services', [])):
                        VendorService.objects.get_or_create(
                            vendor=vendor_profile,
                            name=service_name,
                            defaults={'display_order': idx + 1}
                        )
                    
                    # Add specialties
                    for idx, specialty_name in enumerate(vendor_data.get('specialties', [])):
                        VendorSpecialty.objects.get_or_create(
                            vendor=vendor_profile,
                            name=specialty_name,
                            defaults={'display_order': idx + 1}
                        )
                    
                    # Add highlights
                    for idx, highlight_text in enumerate(vendor_data.get('highlights', [])):
                        VendorHighlight.objects.get_or_create(
                            vendor=vendor_profile,
                            text=highlight_text,
                            defaults={'display_order': idx + 1}
                        )
                    
                    # Add packages
                    for idx, package_data in enumerate(vendor_data.get('packages', [])):
                        VendorPackage.objects.get_or_create(
                            vendor=vendor_profile,
                            name=package_data['name'],
                            defaults={
                                'price': package_data['price'],
                                'features': package_data['features'],
                                'is_popular': package_data['is_popular'],
                                'display_order': idx + 1
                            }
                        )
                    
                    # Add testimonials
                    for testimonial_data in vendor_data.get('testimonials', []):
                        VendorTestimonial.objects.get_or_create(
                            vendor=vendor_profile,
                            client_name=testimonial_data['client_name'],
                            defaults={
                                'rating': testimonial_data['rating'],
                                'review': testimonial_data['review'],
                                'event_type': testimonial_data['event_type'],
                                'is_featured': testimonial_data['is_featured']
                            }
                        )
                    
                    # Add videos
                    for video_data in vendor_data.get('videos', []):
                        VendorVideo.objects.get_or_create(
                            vendor=vendor_profile,
                            youtube_id=video_data['youtube_id'],
                            defaults={
                                'title': video_data['title'],
                                'description': video_data['description']
                            }
                        )
                    
                    # Create sample images (placeholder URLs for now)
                    sample_images = [
                        {'type': 'cover', 'title': f'{vendor_profile.name} Cover'},
                        {'type': 'profile', 'title': f'{vendor_profile.name} Profile'},
                        {'type': 'hero', 'title': f'{vendor_profile.name} Hero 1'},
                        {'type': 'hero', 'title': f'{vendor_profile.name} Hero 2'},
                        {'type': 'hero', 'title': f'{vendor_profile.name} Hero 3'},
                        {'type': 'hero', 'title': f'{vendor_profile.name} Hero 4'},
                        {'type': 'gallery', 'title': f'{vendor_profile.name} Gallery 1'},
                        {'type': 'gallery', 'title': f'{vendor_profile.name} Gallery 2'},
                        {'type': 'gallery', 'title': f'{vendor_profile.name} Gallery 3'},
                    ]
                    
                    for idx, img_data in enumerate(sample_images):
                        # Create placeholder image records (actual images would need to be uploaded via admin)
                        VendorImage.objects.get_or_create(
                            vendor=vendor_profile,
                            image_type=img_data['type'],
                            title=img_data['title'],
                            defaults={
                                'alt_text': img_data['title'],
                                'display_order': idx + 1,
                                'is_active': True
                            }
                        )
                        
                else:
                    self.stdout.write(f'Vendor profile already exists: {vendor_profile.name}')
                    
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'Error creating vendor profile {vendor_data["name"]}: {str(e)}')
                )
        
        self.stdout.write(
            self.style.SUCCESS('Successfully populated vendor profiles!')
        )