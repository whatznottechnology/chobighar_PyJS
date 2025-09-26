from django.core.management.base import BaseCommand
from portfolio.models import Category, Portfolio, PortfolioImage, PortfolioVideo, PortfolioHighlight, PortfolioService
from datetime import date

class Command(BaseCommand):
    help = 'Load sample portfolio data matching the Next.js frontend'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Creating sample portfolio data...'))
        
        # Create categories
        categories_data = [
            {'id': 'wedding', 'name': 'Weddings', 'description': 'Beautiful wedding ceremonies', 'order': 1},
            {'id': 'prewedding', 'name': 'Pre-Wedding', 'description': 'Romantic pre-wedding shoots', 'order': 2},
            {'id': 'portrait', 'name': 'Portraits', 'description': 'Individual and family portraits', 'order': 3},
            {'id': 'event', 'name': 'Events', 'description': 'Corporate and social events', 'order': 4},
        ]
        
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                id=cat_data['id'],
                defaults=cat_data
            )
            if created:
                self.stdout.write(f'Created category: {category.name}')
        
        # Get category objects
        wedding_cat = Category.objects.get(id='wedding')
        prewedding_cat = Category.objects.get(id='prewedding')
        portrait_cat = Category.objects.get(id='portrait')
        event_cat = Category.objects.get(id='event')
        
        # Create portfolios
        portfolios_data = [
            {
                'id': 'priya-arjun-wedding',
                'title': 'Priya & Arjun Wedding',
                'subtitle': 'Traditional Bengali Wedding',
                'category': wedding_cat,
                'cover_image': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&auto=format',
                'image_count': 85,
                'date': date(2024, 12, 15),
                'location': 'ITC Sonar, Kolkata',
                'duration': '2 Days',
                'guests': '300+',
                'description': 'A beautiful traditional Bengali wedding celebration filled with rituals, colors, and joy.',
                'story': 'Priya and Arjun\'s love story began in college, and after 8 years of being together, they decided to tie the knot in a grand Bengali wedding. The celebration was a perfect blend of tradition and modernity, with beautiful decorations featuring marigold flowers, traditional Bengali sweets, and heartfelt moments shared between two families.',
                'featured': True,
                'order': 1,
                'images': [
                    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=800&fit=crop&auto=format'
                ],
                'videos': [
                    {'video_id': 'dQw4w9WgXcQ', 'title': 'Wedding Highlights', 'duration': '3:45'},
                    {'video_id': 'jNQXAC9IVRw', 'title': 'Ceremony Moments', 'duration': '2:30'},
                    {'video_id': 'ScMzIvxBSi4', 'title': 'Reception Celebration', 'duration': '4:15'},
                    {'video_id': 'ZZ5LpwO-An4', 'title': 'Behind the Scenes', 'duration': '1:45'}
                ],
                'highlights': [
                    'Traditional Gaye Holud ceremony with turmeric rituals',
                    'Grand Bor Jatri procession with dhol and music',
                    'Beautiful mandap decoration with fresh flowers',
                    'Emotional bidaai ceremony',
                    'Reception party with contemporary music and dance'
                ],
                'services': ['Full Wedding Photography', 'Videography', 'Same Day Edit', 'Drone Coverage', 'Photo Albums']
            },
            {
                'id': 'sneha-rahul-prewedding',
                'title': 'Sneha & Rahul',
                'subtitle': 'Pre-Wedding Shoot',
                'category': prewedding_cat,
                'cover_image': 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop&auto=format',
                'image_count': 45,
                'date': date(2024, 11, 20),
                'location': 'Darjeeling Hills',
                'duration': '1 Day',
                'guests': '2',
                'description': 'Romantic pre-wedding session in the beautiful hills of Darjeeling with stunning mountain views and tea gardens.',
                'story': 'Sneha and Rahul wanted their pre-wedding shoot to reflect their love for nature and adventure. We chose Darjeeling for its breathtaking landscapes, misty mornings, and romantic tea gardens. The shoot captured their playful chemistry against the backdrop of the majestic Himalayas.',
                'featured': True,
                'order': 2,
                'images': [
                    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&h=800&fit=crop&auto=format'
                ],
                'videos': [
                    {'video_id': 'M7lc1UVf-VE', 'title': 'Pre-Wedding Highlights', 'duration': '2:30'},
                    {'video_id': 'hT_nvWreIhg', 'title': 'Mountain Romance', 'duration': '3:10'}
                ],
                'highlights': [
                    'Sunrise shoot at Tiger Hill viewpoint',
                    'Romantic walk through tea gardens',
                    'Vintage train ride photography',
                    'Cozy moments at a hillside café',
                    'Golden hour shots with mountain backdrop'
                ],
                'services': ['Pre-Wedding Photography', 'Location Scouting', 'Styling Consultation', 'Digital Gallery']
            },
            {
                'id': 'kavya-portrait',
                'title': 'Kavya Portrait Session',
                'subtitle': 'Individual Portraits',
                'category': portrait_cat,
                'cover_image': 'https://images.unsplash.com/photo-1494790108755-2616c31b7a63?w=600&h=400&fit=crop&auto=format',
                'image_count': 25,
                'date': date(2024, 10, 10),
                'location': 'Studio & Outdoor',
                'duration': '3 Hours',
                'guests': '1',
                'description': 'Professional portrait session showcasing elegance and personality with both studio and outdoor setups.',
                'story': 'Kavya, a classical dancer, wanted portraits that captured both her professional artistic side and her natural personality. We created a diverse portfolio with studio shots highlighting her dance poses and outdoor shots showcasing her everyday elegance.',
                'featured': False,
                'order': 3,
                'images': [
                    'https://images.unsplash.com/photo-1494790108755-2616c31b7a63?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&h=800&fit=crop&auto=format'
                ],
                'videos': [
                    {'video_id': 'YQHsXMglC9A', 'title': 'Portrait Session', 'duration': '1:45'}
                ],
                'highlights': [
                    'Classical dance poses in traditional attire',
                    'Modern professional headshots',
                    'Outdoor natural light portraits',
                    'Creative artistic compositions',
                    'Variety of outfits and moods'
                ],
                'services': ['Portrait Photography', 'Studio Setup', 'Professional Lighting', 'Retouching', 'Print Ready Files']
            },
            {
                'id': 'corporate-event',
                'title': 'Corporate Annual Meet',
                'subtitle': 'Event Photography',
                'category': event_cat,
                'cover_image': 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop&auto=format',
                'image_count': 60,
                'date': date(2024, 9, 25),
                'location': 'Hyatt Regency, Kolkata',
                'duration': '8 Hours',
                'guests': '500+',
                'description': 'Professional coverage of corporate annual meeting and celebrations with keynote speeches, awards, and networking.',
                'story': 'TechCorp\'s annual meet was a grand celebration of their achievements and future vision. The event featured keynote speakers, award ceremonies, team building activities, and a gala dinner. Our team captured the professional atmosphere while highlighting the human connections and celebrations.',
                'featured': False,
                'order': 4,
                'images': [
                    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&auto=format'
                ],
                'videos': [
                    {'video_id': 'dQw4w9WgXcQ', 'title': 'Event Highlights', 'duration': '3:20'},
                    {'video_id': 'jNQXAC9IVRw', 'title': 'Award Ceremony', 'duration': '2:15'}
                ],
                'highlights': [
                    'Keynote speaker presentations',
                    'Award ceremony moments',
                    'Team building activities',
                    'Networking sessions',
                    'Gala dinner and entertainment'
                ],
                'services': ['Event Photography', 'Corporate Videography', 'Live Photo Sharing', 'Same Day Delivery']
            },
            {
                'id': 'ananya-wedding',
                'title': 'Ananya & Dev Wedding',
                'subtitle': 'Destination Wedding',
                'category': wedding_cat,
                'cover_image': 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&h=400&fit=crop&auto=format',
                'image_count': 120,
                'date': date(2025, 1, 12),
                'location': 'The Leela, Goa',
                'duration': '3 Days',
                'guests': '150',
                'description': 'Beautiful destination wedding by the beach with Bengali traditions blended with tropical vibes.',
                'story': 'Ananya and Dev chose Goa for their wedding to combine their love for the beach with traditional Bengali ceremonies. The three-day celebration included beachside ceremonies, traditional rituals, and a sunset reception by the ocean.',
                'featured': True,
                'order': 5,
                'images': [
                    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=800&fit=crop&auto=format'
                ],
                'videos': [
                    {'video_id': 'ScMzIvxBSi4', 'title': 'Beach Wedding', 'duration': '4:30'},
                    {'video_id': 'ZZ5LpwO-An4', 'title': 'Sunset Reception', 'duration': '3:45'},
                    {'video_id': 'M7lc1UVf-VE', 'title': 'Destination Highlights', 'duration': '5:20'}
                ],
                'highlights': [
                    'Beachside Gaye Holud ceremony',
                    'Traditional Bengali wedding by the sea',
                    'Sunset couple portraits on the beach',
                    'Beach party reception',
                    'Drone footage of coastal ceremonies'
                ],
                'services': ['Destination Wedding Photography', 'Videography', 'Drone Coverage', 'Multi-day Coverage', 'Travel Documentation']
            },
            {
                'id': 'family-portrait',
                'title': 'The Sharma Family',
                'subtitle': 'Family Portraits',
                'category': portrait_cat,
                'cover_image': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop&auto=format',
                'image_count': 30,
                'date': date(2024, 8, 15),
                'location': 'Central Park, Kolkata',
                'duration': '2 Hours',
                'guests': '6',
                'description': 'Warm and loving family portrait session in natural outdoor setting with three generations.',
                'story': 'The Sharma family wanted to create lasting memories with their grandparents visiting from Delhi. We chose Central Park for its beautiful natural setting and conducted a heartwarming session capturing the love and bonds between three generations.',
                'featured': False,
                'order': 6,
                'images': [
                    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&h=800&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&h=800&fit=crop&auto=format'
                ],
                'videos': [
                    {'video_id': 'hT_nvWreIhg', 'title': 'Family Moments', 'duration': '2:10'}
                ],
                'highlights': [
                    'Three generation family portraits',
                    'Candid moments between grandparents and grandchildren',
                    'Natural outdoor lighting',
                    'Various family combinations',
                    'Playful children photography'
                ],
                'services': ['Family Photography', 'Outdoor Session', 'Multiple Setups', 'Digital Gallery', 'Print Packages']
            }
        ]
        
        # Create portfolios with related data
        for portfolio_data in portfolios_data:
            # Extract related data
            images_data = portfolio_data.pop('images', [])
            videos_data = portfolio_data.pop('videos', [])
            highlights_data = portfolio_data.pop('highlights', [])
            services_data = portfolio_data.pop('services', [])
            
            # Create or update portfolio
            portfolio, created = Portfolio.objects.get_or_create(
                id=portfolio_data['id'],
                defaults=portfolio_data
            )
            
            if created:
                self.stdout.write(f'Created portfolio: {portfolio.title}')
                
                # Create images
                for idx, image_url in enumerate(images_data):
                    PortfolioImage.objects.create(
                        portfolio=portfolio,
                        image=image_url,
                        order=idx + 1,
                        is_cover=(idx == 0)
                    )
                
                # Create videos
                for idx, video_data in enumerate(videos_data):
                    PortfolioVideo.objects.create(
                        portfolio=portfolio,
                        video_id=video_data['video_id'],
                        title=video_data['title'],
                        duration=video_data['duration'],
                        order=idx + 1
                    )
                
                # Create highlights
                for idx, highlight in enumerate(highlights_data):
                    PortfolioHighlight.objects.create(
                        portfolio=portfolio,
                        highlight_text=highlight,
                        order=idx + 1
                    )
                
                # Create services
                for idx, service in enumerate(services_data):
                    PortfolioService.objects.create(
                        portfolio=portfolio,
                        service_name=service,
                        order=idx + 1
                    )
            else:
                self.stdout.write(f'Portfolio already exists: {portfolio.title}')
        
        self.stdout.write(
            self.style.SUCCESS('Successfully created sample portfolio data!')
        )