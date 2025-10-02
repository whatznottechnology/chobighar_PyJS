from django.core.management.base import BaseCommand
from photoshootpage.models import PhotoshootHero, PhotoshootService, PhotoshootPageSettings

class Command(BaseCommand):
    help = 'Setup sample data for photoshoot page'

    def handle(self, *args, **options):
        # Create Hero Section
        hero, created = PhotoshootHero.objects.update_or_create(
            id=1,
            defaults={
                'title': 'Photography That Tells Your Story',
                'subtitle': 'Professional photography services with a touch of Bengali heritage and modern artistry',
                'alt_text': 'Professional wedding photography session',
                'primary_button_text': 'Book a Session',
                'primary_button_link': '/contact',
                'secondary_button_text': 'View Portfolio',
                'secondary_button_link': '#portfolio',
                'is_active': True,
            }
        )
        
        action = "Created" if created else "Updated"
        self.stdout.write(f'{action} PhotoshootHero: {hero.title}')

        # Create Page Settings
        settings, created = PhotoshootPageSettings.objects.update_or_create(
            id=1,
            defaults={
                'services_section_title': 'Our Photography Services',
                'services_section_description': 'From intimate portraits to grand celebrations, we specialize in capturing life\'s most precious moments with artistic excellence and cultural authenticity.',
                'meta_title': 'Professional Photography Services | chobighar',
                'meta_description': 'Professional photography services including Bengali wedding photography, pre-wedding shoots, portraits, and cultural events. Book your session today.',
                'is_active': True,
            }
        )
        
        action = "Created" if created else "Updated"
        self.stdout.write(f'{action} PhotoshootPageSettings: {settings}')

        # Create Services
        services_data = [
            {
                'title': 'Bengali Traditional Wedding Photography',
                'description': 'Comprehensive documentation of Bengali wedding rituals with artistic storytelling. From Gaye Holud to Bou Bhaat, we capture every sacred moment with cultural authenticity.',
                'price': 'Starting from ₹45,000',
                'duration': '10-12 Hours',
                'deliverables': '500+ Photos, Custom Album, Digital Gallery',
                'features': [
                    'Complete ritual coverage (Ashirbaad, Shubho Drishti, Saat Paak)',
                    '500+ high-resolution edited photos',
                    'Traditional Bengali album with custom design',
                    'Candid & posed photography blend',
                    'Family portraits & group photos',
                    'Digital gallery with download access'
                ],
                'inclusions': [
                    '2 Professional Photographers',
                    'Full Day Coverage (10-12 hrs)',
                    'Same Day Highlights',
                    'USB Drive'
                ],
                'alt_text': 'Bengali traditional wedding photography',
                'order': 1,
                'is_featured': True,
            },
            {
                'title': 'Pre-Wedding Cinematic Storytelling',
                'description': 'Romantic pre-wedding sessions that narrate your love story through stunning visuals. Multiple locations, outfit changes, and creative concepts tailored to your personality.',
                'price': 'Starting from ₹25,000',
                'duration': '6-8 Hours',
                'deliverables': '200+ Photos, Cinematic Video, Online Gallery',
                'features': [
                    'Concept development & location scouting',
                    '3-4 outfit changes with styling consultation',
                    'Outdoor & studio combination shots',
                    'Cinematic video highlights (2-3 minutes)',
                    'Professional makeup artist coordination',
                    'Golden hour & blue hour photography'
                ],
                'inclusions': [
                    'Pre-shoot Consultation',
                    'Multiple Locations',
                    'Styling Guide',
                    'Quick Preview'
                ],
                'alt_text': 'Pre-wedding photography session',
                'order': 2,
                'is_featured': True,
            },
            {
                'title': 'Professional Portrait & Headshot Studio',
                'description': 'Studio-quality portraits for professionals, families, and personal branding. Corporate headshots, LinkedIn profiles, and artistic portraits with professional lighting setup.',
                'price': 'Starting from ₹12,000',
                'duration': '2-3 Hours',
                'deliverables': '50+ Photos, Retouched Images, Print Files',
                'features': [
                    'Professional studio lighting setup',
                    'Multiple background options',
                    'Wardrobe consultation & styling',
                    'High-end retouching & color correction',
                    'LinkedIn-optimized headshots',
                    'Print-ready high-resolution files'
                ],
                'inclusions': [
                    'Studio Session',
                    'Lighting Setup',
                    'Basic Retouching',
                    'Digital Files'
                ],
                'alt_text': 'Professional portrait photography',
                'order': 3,
                'is_featured': False,
            },
            {
                'title': 'Cultural Events & Celebrations',
                'description': 'Specialized photography for Bengali cultural events, pujas, anniversaries, and family celebrations. We understand the significance of each ritual and moment.',
                'price': 'Starting from ₹18,000',
                'duration': '4-8 Hours',
                'deliverables': '300+ Photos, Event Album, Social Media Pack',
                'features': [
                    'Cultural event expertise (Durga Puja, Kali Puja, etc.)',
                    'Candid family moments & interactions',
                    'Ritual documentation with respect',
                    'Group photography coordination',
                    'Traditional decoration coverage',
                    'Fast delivery for social sharing'
                ],
                'inclusions': [
                    'Event Coverage',
                    'Family Portraits',
                    'Ritual Documentation',
                    'Quick Edits'
                ],
                'alt_text': 'Cultural event photography',
                'order': 4,
                'is_featured': False,
            },
            {
                'title': 'Fashion & Lifestyle Photography',
                'description': 'Creative fashion shoots for models, influencers, and brands. Portfolio development, product photography, and lifestyle content creation with professional styling.',
                'price': 'Starting from ₹22,000',
                'duration': '4-6 Hours',
                'deliverables': '100+ Photos, Portfolio Set, Usage Rights',
                'features': [
                    'Creative concept development',
                    'Professional styling consultation',
                    'Studio & outdoor location shoots',
                    'High-fashion retouching',
                    'Portfolio-ready images',
                    'Commercial usage rights'
                ],
                'inclusions': [
                    'Creative Direction',
                    'Professional Styling',
                    'Multiple Looks',
                    'High-End Retouching'
                ],
                'alt_text': 'Fashion photography shoot',
                'order': 5,
                'is_featured': False,
            },
            {
                'title': 'Corporate & Business Photography',
                'description': 'Professional business photography including team photos, office spaces, corporate events, and executive portraits. Brand-consistent imagery for your business needs.',
                'price': 'Starting from ₹15,000',
                'duration': '3-5 Hours',
                'deliverables': '150+ Photos, Team Gallery, Marketing Assets',
                'features': [
                    'Executive headshots & team photography',
                    'Office environment & workspace shots',
                    'Corporate event documentation',
                    'Brand-consistent editing style',
                    'Professional LinkedIn profiles',
                    'Marketing material ready images'
                ],
                'inclusions': [
                    'Team Coordination',
                    'Multiple Setups',
                    'Professional Editing',
                    'Brand Guidelines'
                ],
                'alt_text': 'Corporate photography session',
                'order': 6,
                'is_featured': False,
            }
        ]

        for i, service_data in enumerate(services_data, 1):
            service, created = PhotoshootService.objects.update_or_create(
                id=i,
                defaults=service_data
            )
            
            action = "Created" if created else "Updated"
            self.stdout.write(f'{action} PhotoshootService: {service.title}')

        self.stdout.write(
            self.style.SUCCESS('Successfully set up photoshoot page data!')
        )