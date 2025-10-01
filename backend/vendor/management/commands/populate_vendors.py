from django.core.management.base import BaseCommand
from vendor.models import VendorCategory, VendorSubCategory


class Command(BaseCommand):
    help = 'Populate vendor categories and subcategories with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Creating vendor categories and subcategories...')
        
        # Create sample categories
        categories_data = [
            {
                'name': 'Venues & Spaces',
                'description': 'Find the perfect venue for your special occasion',
                'icon_emoji': '🏛️',
                'gradient_from': 'from-purple-600',
                'gradient_to': 'to-pink-600',
                'display_order': 1,
                'subcategories': [
                    {
                        'name': 'Banquet Halls',
                        'description': 'Elegant banquet halls for weddings and celebrations with modern amenities and catering services.',
                        'vendor_count': 25,
                        'display_order': 1
                    },
                    {
                        'name': 'Marriage Garden / Lawns',
                        'description': 'Beautiful outdoor venues with lush gardens and open spaces for traditional and modern weddings.',
                        'vendor_count': 18,
                        'display_order': 2
                    },
                    {
                        'name': 'Resorts',
                        'description': 'Luxury resort venues offering complete wedding packages with accommodation and recreational facilities.',
                        'vendor_count': 12,
                        'display_order': 3
                    },
                    {
                        'name': 'Hotels',
                        'description': 'Premium hotel venues with professional event management and hospitality services.',
                        'vendor_count': 30,
                        'display_order': 4
                    }
                ]
            },
            {
                'name': 'Photography',
                'description': 'Capture your precious moments with professional photographers',
                'icon_emoji': '📸',
                'gradient_from': 'from-blue-600',
                'gradient_to': 'to-purple-600',
                'display_order': 2,
                'subcategories': [
                    {
                        'name': 'Wedding Photography',
                        'description': 'Professional wedding photographers specializing in capturing your special day with artistic excellence.',
                        'vendor_count': 45,
                        'display_order': 1
                    },
                    {
                        'name': 'Pre-Wedding Shoot',
                        'description': 'Creative pre-wedding photography sessions in stunning locations with cinematic storytelling.',
                        'vendor_count': 32,
                        'display_order': 2
                    },
                    {
                        'name': 'Candid Photography',
                        'description': 'Natural and spontaneous photography capturing genuine emotions and moments.',
                        'vendor_count': 28,
                        'display_order': 3
                    }
                ]
            },
            {
                'name': 'Decoration',
                'description': 'Transform your venue with beautiful decorations and themes',
                'icon_emoji': '🎨',
                'gradient_from': 'from-green-600',
                'gradient_to': 'to-blue-600',
                'display_order': 3,
                'subcategories': [
                    {
                        'name': 'Flower Decoration',
                        'description': 'Exquisite floral arrangements and decorations using fresh flowers and creative designs.',
                        'vendor_count': 22,
                        'display_order': 1
                    },
                    {
                        'name': 'Stage Decoration',
                        'description': 'Stunning stage setups with lighting, backdrops, and thematic decorations.',
                        'vendor_count': 15,
                        'display_order': 2
                    },
                    {
                        'name': 'Theme Decoration',
                        'description': 'Complete theme-based decoration services for weddings and events.',
                        'vendor_count': 18,
                        'display_order': 3
                    }
                ]
            },
            {
                'name': 'Catering',
                'description': 'Delicious food and catering services for your events',
                'icon_emoji': '🍽️',
                'gradient_from': 'from-orange-600',
                'gradient_to': 'to-red-600',
                'display_order': 4,
                'subcategories': [
                    {
                        'name': 'Wedding Catering',
                        'description': 'Complete wedding catering services with traditional and contemporary cuisine options.',
                        'vendor_count': 35,
                        'display_order': 1
                    },
                    {
                        'name': 'Live Counters',
                        'description': 'Interactive live cooking counters with chefs preparing fresh food on-site.',
                        'vendor_count': 20,
                        'display_order': 2
                    },
                    {
                        'name': 'Dessert Catering',
                        'description': 'Specialized dessert catering with cakes, sweets, and innovative dessert stations.',
                        'vendor_count': 15,
                        'display_order': 3
                    }
                ]
            },
            {
                'name': 'Entertainment',
                'description': 'Make your event memorable with professional entertainment',
                'icon_emoji': '🎭',
                'gradient_from': 'from-indigo-600',
                'gradient_to': 'to-purple-600',
                'display_order': 5,
                'subcategories': [
                    {
                        'name': 'DJ Services',
                        'description': 'Professional DJ services with modern sound systems and diverse music collections.',
                        'vendor_count': 40,
                        'display_order': 1
                    },
                    {
                        'name': 'Live Band',
                        'description': 'Live musical performances by talented bands for weddings and celebrations.',
                        'vendor_count': 25,
                        'display_order': 2
                    },
                    {
                        'name': 'Dance Performers',
                        'description': 'Professional dance troupes and choreographers for cultural and modern performances.',
                        'vendor_count': 18,
                        'display_order': 3
                    }
                ]
            },
            {
                'name': 'Transportation',
                'description': 'Luxury transportation for weddings and special occasions',
                'icon_emoji': '🚗',
                'gradient_from': 'from-gray-600',
                'gradient_to': 'to-blue-600',
                'display_order': 6,
                'subcategories': [
                    {
                        'name': 'Wedding Cars',
                        'description': 'Luxury and vintage cars for wedding ceremonies with professional chauffeur services.',
                        'vendor_count': 30,
                        'display_order': 1
                    },
                    {
                        'name': 'Horse & Carriage',
                        'description': 'Traditional horse-drawn carriages for royal wedding entrances and ceremonies.',
                        'vendor_count': 8,
                        'display_order': 2
                    },
                    {
                        'name': 'Guest Transportation',
                        'description': 'Comfortable bus and van services for guest transportation and logistics.',
                        'vendor_count': 15,
                        'display_order': 3
                    }
                ]
            }
        ]

        for category_data in categories_data:
            subcategories_data = category_data.pop('subcategories', [])
            
            # Create or update category
            category, created = VendorCategory.objects.get_or_create(
                name=category_data['name'],
                defaults=category_data
            )
            
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Created category: {category.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Category already exists: {category.name}')
                )
            
            # Create subcategories
            for sub_data in subcategories_data:
                sub_data['category'] = category
                subcategory, sub_created = VendorSubCategory.objects.get_or_create(
                    category=category,
                    name=sub_data['name'],
                    defaults=sub_data
                )
                
                if sub_created:
                    self.stdout.write(
                        self.style.SUCCESS(f'  Created subcategory: {subcategory.name}')
                    )
                else:
                    self.stdout.write(
                        self.style.WARNING(f'  Subcategory already exists: {subcategory.name}')
                    )

        self.stdout.write(
            self.style.SUCCESS('Successfully populated vendor categories and subcategories!')
        )