from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from django.utils import timezone
from homepage.models import (
    HeroSlide, ShowcaseImage, TextTestimonial, VideoTestimonial,
    FAQ, Achievement, VideoShowcase
)
from header.models import SocialMedia
from portfolio.models import Category, Portfolio, PortfolioImage
from aboutpage.models import AboutHero, AboutStory, TeamMember, AboutValue
from photoshootpage.models import PhotoshootService, PhotoshootTestimonial
from contact.models import ContactUsInfo, WhyChooseUs
from footer.models import FooterBrandInfo, FooterContactInfo
import random


class Command(BaseCommand):
    help = 'Add dummy data to the database for development and testing'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before adding dummy data',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write('Clearing existing data...')
            self.clear_data()

        self.stdout.write('Adding dummy data...')
        
        # Add data
        self.add_social_media()
        self.add_hero_slides()
        self.add_showcase_images()
        self.add_text_testimonials()
        self.add_video_testimonials()
        self.add_faqs()
        self.add_achievements()
        self.add_video_showcase()
        self.add_categories()
        self.add_portfolios()
        self.add_about_data()
        self.add_photoshoot_packages()
        self.add_contact_info()
        self.add_footer_info()

        self.stdout.write(
            self.style.SUCCESS('Successfully added dummy data!')
        )

    def clear_data(self):
        """Clear existing data"""
        models_to_clear = [
            HeroSlide, ShowcaseImage, TextTestimonial, VideoTestimonial,
            FAQ, Achievement, VideoShowcase, Portfolio, PortfolioImage,
            Category, AboutStory, TeamMember, PhotoshootService,
            ContactUsInfo, WhyChooseUs
        ]
        
        for model in models_to_clear:
            count = model.objects.count()
            if count > 0:
                model.objects.all().delete()
                self.stdout.write(f'Cleared {count} {model.__name__} objects')

    def add_social_media(self):
        """Add social media links"""
        social_links = [
            ('instagram', 'https://instagram.com/chobighar'),
            ('facebook', 'https://facebook.com/chobighar'),
            ('youtube', 'https://youtube.com/@chobighar'),
            ('pinterest', 'https://pinterest.com/chobighar'),
            ('linkedin', 'https://linkedin.com/company/chobighar'),
        ]
        
        for name, url in social_links:
            SocialMedia.objects.get_or_create(
                name=name,
                defaults={'url': url}
            )
        
        self.stdout.write('Added social media links')

    def add_hero_slides(self):
        """Add hero slides"""
        slides = [
            {
                'title': 'Wedding Photography',
                'alt_text': 'Beautiful wedding couple photography',
                'caption': 'Capturing your special moments',
                'order': 1
            },
            {
                'title': 'Pre-Wedding Shoots',
                'alt_text': 'Romantic pre-wedding photography',
                'caption': 'Love stories before the big day',
                'order': 2
            },
            {
                'title': 'Portrait Sessions',
                'alt_text': 'Professional portrait photography',
                'caption': 'Professional portraits that tell your story',
                'order': 3
            },
            {
                'title': 'Event Photography',
                'alt_text': 'Event and celebration photography',
                'caption': 'Memorable moments from your celebrations',
                'order': 4
            }
        ]
        
        for slide_data in slides:
            HeroSlide.objects.get_or_create(
                title=slide_data['title'],
                defaults=slide_data
            )
        
        self.stdout.write('Added hero slides')

    def add_showcase_images(self):
        """Add showcase images"""
        for i in range(1, 9):
            ShowcaseImage.objects.get_or_create(
                order=i,
                defaults={
                    'alt_text': f'Photography showcase {i}',
                }
            )
        
        self.stdout.write('Added showcase images')

    def add_text_testimonials(self):
        """Add text testimonials"""
        testimonials = [
            {
                'name': 'Priya & Arjun Sharma',
                'location': 'Mumbai, Maharashtra',
                'event': 'Wedding Photography',
                'date': 'December 2024',
                'text': 'chobighar captured our wedding beautifully. Every moment was preserved with such artistic vision. The team was professional, creative, and made us feel so comfortable. Our photos are absolutely stunning!',
                'rating': 5,
                'order': 1
            },
            {
                'name': 'Anjali & Rahul Das',
                'location': 'Kolkata, West Bengal',
                'event': 'Pre-Wedding Shoot',
                'date': 'November 2024',
                'text': 'The pre-wedding shoot with chobighar exceeded all our expectations. They found the most beautiful locations and captured our love story perfectly. Highly recommended for couples!',
                'rating': 5,
                'order': 2
            },
            {
                'name': 'Meera Singh',
                'location': 'Delhi, India',
                'event': 'Portrait Session',
                'date': 'January 2025',
                'text': 'Professional and creative team! My portrait session was amazing. They knew exactly how to bring out my personality in the photos. The final images were beyond my expectations.',
                'rating': 5,
                'order': 3
            },
            {
                'name': 'Rajesh & Kavya Patel',
                'location': 'Ahmedabad, Gujarat',
                'event': 'Wedding Photography',
                'date': 'October 2024',
                'text': 'From engagement to wedding, chobighar documented our entire journey. Their attention to detail and ability to capture emotions is remarkable. Thank you for giving us memories to cherish forever!',
                'rating': 5,
                'order': 4
            },
            {
                'name': 'Siddharth Gupta',
                'location': 'Bangalore, Karnataka',
                'event': 'Corporate Headshots',
                'date': 'February 2025',
                'text': 'Needed professional headshots for my business and chobighar delivered excellence. The lighting, composition, and final editing were perfect. Very professional service!',
                'rating': 5,
                'order': 5
            }
        ]
        
        for testimonial_data in testimonials:
            TextTestimonial.objects.get_or_create(
                name=testimonial_data['name'],
                defaults=testimonial_data
            )
        
        self.stdout.write('Added text testimonials')

    def add_video_testimonials(self):
        """Add video testimonials"""
        video_testimonials = [
            {
                'name': 'Dr. Rahman Ahmed & Dr. Fatima Khan',
                'location': 'Hyderabad, Telangana',
                'event': 'Wedding Photography',
                'date': 'September 2024',
                'description': 'Beautiful wedding testimonial from our medical professionals couple',
                'rating': 5,
                'order': 1
            },
            {
                'name': 'Vikram & Ishita Mehta',
                'location': 'Jaipur, Rajasthan',
                'event': 'Destination Wedding',
                'date': 'March 2024',
                'description': 'Stunning Rajasthani destination wedding testimonial',
                'rating': 5,
                'order': 2
            }
        ]
        
        for testimonial_data in video_testimonials:
            VideoTestimonial.objects.get_or_create(
                name=testimonial_data['name'],
                defaults=testimonial_data
            )
        
        self.stdout.write('Added video testimonials')

    def add_faqs(self):
        """Add frequently asked questions"""
        faqs = [
            {
                'question': 'What photography packages do you offer?',
                'answer': 'We offer comprehensive wedding photography packages, pre-wedding shoots, portrait sessions, and event photography. Each package can be customized according to your specific needs and budget. Contact us for detailed pricing and package information.',
                'order': 1,
                'keywords': 'packages, pricing, wedding, pre-wedding'
            },
            {
                'question': 'How far in advance should I book?',
                'answer': 'We recommend booking at least 3-6 months in advance, especially for wedding photography during peak season (October to March). For pre-wedding shoots and portraits, 2-4 weeks advance booking is usually sufficient.',
                'order': 2,
                'keywords': 'booking, advance, wedding, timeline'
            },
            {
                'question': 'Do you travel for destination weddings?',
                'answer': 'Yes! We love destination weddings and are available to travel across India and internationally. Travel and accommodation costs are additional and will be discussed during the consultation.',
                'order': 3,
                'keywords': 'destination, travel, wedding, international'
            },
            {
                'question': 'How long does it take to receive the final photos?',
                'answer': 'For wedding photography, you can expect to receive your edited photos within 4-6 weeks. Pre-wedding shoots and portrait sessions are typically delivered within 2-3 weeks. We provide online galleries for easy viewing and downloading.',
                'order': 4,
                'keywords': 'delivery, timeline, editing, photos'
            },
            {
                'question': 'What is included in your wedding photography package?',
                'answer': 'Our wedding packages typically include pre-wedding consultation, full-day coverage, edited high-resolution images, online gallery, and print release. Additional services like albums, videography, and extra photographers can be added.',
                'order': 5,
                'keywords': 'wedding, package, includes, services'
            },
            {
                'question': 'Do you offer videography services as well?',
                'answer': 'Yes, we offer professional videography services including cinematic wedding films, traditional ceremony recording, and highlight reels. Videography can be booked separately or as part of combined photography+videography packages.',
                'order': 6,
                'keywords': 'videography, video, cinematic, wedding film'
            },
            {
                'question': 'Can we see full wedding galleries from previous clients?',
                'answer': 'Absolutely! We can share password-protected full wedding galleries during your consultation to give you a complete view of our work and storytelling style. We respect client privacy while showcasing our comprehensive coverage.',
                'order': 7,
                'keywords': 'portfolio, gallery, previous work, examples'
            },
            {
                'question': 'What happens if there is bad weather on the wedding day?',
                'answer': 'We always have backup plans for weather contingencies. Our experienced team is skilled at working in various weather conditions and can suggest indoor alternatives or creative solutions to ensure beautiful photos regardless of weather.',
                'order': 8,
                'keywords': 'weather, backup, rain, contingency'
            }
        ]
        
        for faq_data in faqs:
            FAQ.objects.get_or_create(
                question=faq_data['question'],
                defaults=faq_data
            )
        
        self.stdout.write('Added FAQs')

    def add_achievements(self):
        """Add achievement counters"""
        achievements = [
            {
                'title': 'Happy Couples',
                'count_value': 500,
                'suffix': '+',
                'description': 'Beautiful love stories captured',
                'icon_type': 'heart',
                'order': 1
            },
            {
                'title': 'Video Reviews',
                'count_value': 150,
                'suffix': '+',
                'description': 'Glowing testimonials from clients',
                'icon_type': 'video',
                'order': 2
            },
            {
                'title': 'Average Rating',
                'count_value': 4.9,
                'suffix': '/5',
                'description': 'Client satisfaction rating',
                'icon_type': 'star',
                'order': 3
            },
            {
                'title': 'Years Experience',
                'count_value': 8,
                'suffix': '+',
                'description': 'Professional photography expertise',
                'icon_type': 'calendar',
                'order': 4
            },
            {
                'title': 'Photos Delivered',
                'count_value': 50,
                'suffix': 'K+',
                'description': 'Memorable moments captured',
                'icon_type': 'camera',
                'order': 5
            },
            {
                'title': 'Awards Won',
                'count_value': 12,
                'suffix': '+',
                'description': 'Photography competition awards',
                'icon_type': 'award',
                'order': 6
            }
        ]
        
        for achievement_data in achievements:
            Achievement.objects.get_or_create(
                title=achievement_data['title'],
                defaults=achievement_data
            )
        
        self.stdout.write('Added achievements')

    def add_video_showcase(self):
        """Add video showcase"""
        videos = [
            {
                'title': 'Wedding Cinematic Reel 2024',
                'description': 'A beautiful compilation of our best wedding moments from 2024',
                'youtube_video_id': 'dQw4w9WgXcQ',  # Sample YouTube video ID
                'alt_text': 'Wedding cinematic reel showcasing beautiful couples',
                'autoplay': True,
                'loop_video': True,
                'show_controls': False,
                'mute_audio': True
            },
            {
                'title': 'Pre-Wedding Story Highlights',
                'description': 'Romantic pre-wedding shoots across beautiful locations',
                'youtube_video_id': 'M7lc1UVf-VE',  # Sample YouTube video ID
                'alt_text': 'Pre-wedding photography highlights',
                'autoplay': False,
                'loop_video': False,
                'show_controls': True,
                'mute_audio': False
            }
        ]
        
        for video_data in videos:
            VideoShowcase.objects.get_or_create(
                title=video_data['title'],
                defaults=video_data
            )
        
        self.stdout.write('Added video showcase')

    def add_categories(self):
        """Add portfolio categories"""
        categories = [
            {
                'id': 'wedding',
                'name': 'Weddings',
                'description': 'Beautiful wedding photography capturing your special day',
                'order': 1
            },
            {
                'id': 'prewedding',
                'name': 'Pre-Wedding',
                'description': 'Romantic pre-wedding shoots in stunning locations',
                'order': 2
            },
            {
                'id': 'portrait',
                'name': 'Portraits',
                'description': 'Professional portrait photography for individuals and families',
                'order': 3
            },
            {
                'id': 'event',
                'name': 'Events',
                'description': 'Corporate events, parties, and special celebrations',
                'order': 4
            }
        ]
        
        for category_data in categories:
            Category.objects.get_or_create(
                id=category_data['id'],
                defaults=category_data
            )
        
        self.stdout.write('Added portfolio categories')

    def add_portfolios(self):
        """Add sample portfolios"""
        portfolios = [
            {
                'id': 'priya-arjun-wedding',
                'title': 'Priya & Arjun',
                'subtitle': 'A Beautiful Mumbai Wedding',
                'category_id': 'wedding',
                'description': 'A stunning wedding celebration in Mumbai with traditional ceremonies and modern touches.',
                'location': 'Mumbai, Maharashtra',
                'date': '2024-12-15',
                'duration': '2 Days',
                'guests': '300+',
                'story': 'A beautiful love story culminating in a grand wedding celebration.',
                'featured': True,
                'order': 1
            },
            {
                'id': 'anjali-rahul-prewedding',
                'title': 'Anjali & Rahul',
                'subtitle': 'Kolkata Pre-Wedding Story',
                'category_id': 'prewedding',
                'description': 'A romantic pre-wedding shoot around the beautiful heritage locations of Kolkata.',
                'location': 'Kolkata, West Bengal',
                'date': '2024-11-10',
                'duration': '4 Hours',
                'guests': '2',
                'story': 'Capturing the romance before the big day in the city of joy.',
                'featured': True,
                'order': 2
            },
            {
                'id': 'meera-portrait-session',
                'title': 'Meera Singh',
                'subtitle': 'Professional Portrait Session',
                'category_id': 'portrait',
                'description': 'Professional headshots and portrait session for a corporate executive.',
                'location': 'Delhi, India',
                'date': '2025-01-20',
                'duration': '2 Hours',
                'guests': '1',
                'story': 'Professional portraits that capture personality and confidence.',
                'featured': False,
                'order': 3
            },
            {
                'id': 'corporate-event-bangalore',
                'title': 'Tech Summit 2024',
                'subtitle': 'Corporate Event Coverage',
                'category_id': 'event',
                'description': 'Professional event photography for a major technology summit in Bangalore.',
                'location': 'Bangalore, Karnataka',
                'date': '2024-11-25',
                'duration': '1 Day',
                'guests': '500+',
                'story': 'Capturing the energy and innovation of the tech summit.',
                'featured': False,
                'order': 4
            },
            {
                'id': 'destination-wedding-jaipur',
                'title': 'Vikram & Ishita',
                'subtitle': 'Royal Rajasthani Wedding',
                'category_id': 'wedding',
                'description': 'A grand destination wedding in the royal city of Jaipur with traditional Rajasthani ceremonies.',
                'location': 'Jaipur, Rajasthan',
                'date': '2024-03-12',
                'duration': '3 Days',
                'guests': '400+',
                'story': 'A royal wedding celebration in the pink city with traditional splendor.',
                'featured': True,
                'order': 5
            }
        ]
        
        for portfolio_data in portfolios:
            portfolio, created = Portfolio.objects.get_or_create(
                id=portfolio_data['id'],
                defaults=portfolio_data
            )
            
            if created:
                # Add sample images for each portfolio
                for i in range(1, 6):  # 5 images per portfolio
                    PortfolioImage.objects.create(
                        portfolio=portfolio,
                        caption=f'{portfolio.title} - Image {i}',
                        order=i,
                        is_cover=(i == 1)  # First image as cover
                    )
        
        self.stdout.write('Added portfolios')

    def add_about_data(self):
        """Add about page data"""
        # Add team members
        team_members = [
            {
                'name': 'Rajesh Kumar',
                'position': 'Lead Photographer & Founder',
                'bio': 'With over 8 years of experience in photography, Rajesh founded chobighar with a vision to capture life\'s most precious moments. His artistic eye and technical expertise ensure every shot tells a story.',
                'alt_text': 'Rajesh Kumar - Lead Photographer',
                'order': 1
            },
            {
                'name': 'Priyanka Sharma',
                'position': 'Senior Photographer',
                'bio': 'Priyanka specializes in wedding and portrait photography. Her warm personality and creative approach make clients feel comfortable, resulting in natural and beautiful photographs.',
                'alt_text': 'Priyanka Sharma - Senior Photographer',
                'order': 2
            },
            {
                'name': 'Arjun Das',
                'position': 'Videographer',
                'bio': 'Arjun brings stories to life through cinematic videography. His expertise in creating wedding films and event videos adds a dynamic dimension to our services.',
                'alt_text': 'Arjun Das - Videographer',
                'order': 3
            }
        ]
        
        for member_data in team_members:
            try:
                TeamMember.objects.get_or_create(
                    name=member_data['name'],
                    defaults=member_data
                )
            except:
                pass  # Model might not exist
        
        self.stdout.write('Added about page data')

    def add_photoshoot_packages(self):
        """Add photoshoot packages"""
        packages = [
            {
                'name': 'Basic Wedding Package',
                'description': 'Perfect for intimate weddings and smaller celebrations',
                'price': 25000,
                'duration': '6 hours',
                'features': 'Full ceremony coverage, 300+ edited photos, online gallery, basic album',
                'is_featured': False,
                'order': 1
            },
            {
                'name': 'Premium Wedding Package',
                'description': 'Comprehensive coverage for your special day',
                'price': 45000,
                'duration': '10 hours',
                'features': 'Full day coverage, 500+ edited photos, premium album, online gallery, pre-wedding consultation',
                'is_featured': True,
                'order': 2
            },
            {
                'name': 'Luxury Wedding Package',
                'description': 'Complete wedding photography experience',
                'price': 75000,
                'duration': '12 hours',
                'features': 'Full day coverage, 800+ edited photos, luxury album, videography, online gallery, engagement shoot',
                'is_featured': True,
                'order': 3
            },
            {
                'name': 'Pre-Wedding Shoot',
                'description': 'Romantic pre-wedding photography session',
                'price': 15000,
                'duration': '3 hours',
                'features': '2 locations, 100+ edited photos, online gallery, consultation',
                'is_featured': False,
                'order': 4
            }
        ]
        
        for package_data in packages:
            try:
                PhotoshootService.objects.get_or_create(
                    name=package_data['name'],
                    defaults=package_data
                )
            except:
                pass  # Model might not exist
        
        self.stdout.write('Added photoshoot packages')

    def add_contact_info(self):
        """Add contact information"""
        contact_data = {
            'phone': '+91 98765 43210',
            'email': 'hello@chobighar.com',
            'address': 'Studio 123, Photography Lane, Artist Quarter, Mumbai, Maharashtra 400001',
            'business_hours': 'Monday to Saturday: 10:00 AM - 7:00 PM, Sunday: By Appointment',
            'is_active': True
        }
        
        try:
            ContactUsInfo.objects.get_or_create(
                email=contact_data['email'],
                defaults=contact_data
            )
        except:
            pass
        
        # Add why choose us points
        why_choose_points = [
            {
                'title': 'Professional Experience',
                'description': '8+ years of professional photography experience with 500+ happy couples',
                'order': 1
            },
            {
                'title': 'Creative Excellence',
                'description': 'Award-winning photography with unique artistic vision and storytelling approach',
                'order': 2
            },
            {
                'title': 'Latest Equipment',
                'description': 'High-end cameras, lenses, and editing technology for the best quality results',
                'order': 3
            },
            {
                'title': 'Personalized Service',
                'description': 'Customized packages and personal attention to make your experience special',
                'order': 4
            }
        ]
        
        for point_data in why_choose_points:
            try:
                WhyChooseUs.objects.get_or_create(
                    title=point_data['title'],
                    defaults=point_data
                )
            except:
                pass
        
        self.stdout.write('Added contact information')

    def add_footer_info(self):
        """Add footer information"""
        footer_data = {
            'company_name': 'chobighar Photography',
            'description': 'Professional photography services specializing in weddings, pre-wedding shoots, portraits, and events. Capturing life\'s precious moments with artistic excellence.',
            'address': 'Studio 123, Photography Lane, Mumbai, Maharashtra 400001',
            'phone': '+91 98765 43210',
            'email': 'hello@chobighar.com',
            'copyright_text': '© 2025 chobighar Photography. All rights reserved.',
            'is_active': True
        }
        
        try:
            FooterBrandInfo.objects.get_or_create(
                company_name=footer_data['company_name'],
                defaults=footer_data
            )
        except:
            pass
        
        self.stdout.write('Added footer information')