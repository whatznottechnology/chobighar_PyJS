from django.core.management.base import BaseCommand
from header.models import SocialMedia, ContactInfo, BrandInfo

class Command(BaseCommand):
    help = 'Populate header data with default values'

    def handle(self, *args, **options):
        # Create social media data
        social_media_data = [
            {'name': 'instagram', 'url': 'https://instagram.com/chabighar', 'order': 1},
            {'name': 'facebook', 'url': 'https://facebook.com/chabighar', 'order': 2},
            {'name': 'youtube', 'url': 'https://youtube.com/chabighar', 'order': 3},
            {'name': 'x', 'url': 'https://x.com/chabighar', 'order': 4},
            {'name': 'pinterest', 'url': 'https://pinterest.com/chabighar', 'order': 5},
            {'name': 'linkedin', 'url': 'https://linkedin.com/company/chabighar', 'order': 6},
        ]

        for data in social_media_data:
            social_media, created = SocialMedia.objects.get_or_create(
                name=data['name'],
                defaults={
                    'url': data['url'],
                    'order': data['order'],
                    'is_active': True
                }
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created social media: {social_media.get_name_display()}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Social media already exists: {social_media.get_name_display()}')
                )

        # Create contact info
        contact_info, created = ContactInfo.objects.get_or_create(
            defaults={
                'phone': '+91 96479 66765',
                'email': 'booking@chabighar.com',
                'is_active': True
            }
        )
        if created:
            self.stdout.write(
                self.style.SUCCESS('Successfully created contact info')
            )
        else:
            self.stdout.write(
                self.style.WARNING('Contact info already exists')
            )

        # Create brand info
        brand_info, created = BrandInfo.objects.get_or_create(
            defaults={
                'main_text': 'Chabighar',
                'sub_text': '(Art Direction and Design Studio)',
                'is_active': True
            }
        )
        if created:
            self.stdout.write(
                self.style.SUCCESS('Successfully created brand info')
            )
        else:
            self.stdout.write(
                self.style.WARNING('Brand info already exists')
            )

        self.stdout.write(
            self.style.SUCCESS('Header data population completed!')
        )