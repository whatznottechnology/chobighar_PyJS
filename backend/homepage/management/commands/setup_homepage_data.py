from django.core.management.base import BaseCommand
from homepage.models import HeroSlide, ShowcaseImage

class Command(BaseCommand):
    help = 'Setup demo homepage data including hero slides and showcase images'

    def handle(self, *args, **options):
        # Create Demo Hero Slides (without actual images, admin will upload them)
        demo_slides = [
            {
                'title': 'Wedding Photography Slide',
                'alt_text': 'Beautiful wedding photography by chobighar',
                'order': 1,
                'caption': 'Capturing your special moments with traditional Bengali artistry'
            },
            {
                'title': 'Portrait Photography Slide', 
                'alt_text': 'Professional portrait photography',
                'order': 2,
                'caption': 'Professional portraits that tell your story'
            },
            {
                'title': 'Events Photography Slide',
                'alt_text': 'Event and celebration photography',
                'order': 3,
                'caption': 'Preserving memories of your celebrations'
            }
        ]

        created_count = 0
        for slide_data in demo_slides:
            slide, created = HeroSlide.objects.get_or_create(
                title=slide_data['title'],
                defaults={
                    'alt_text': slide_data['alt_text'],
                    'order': slide_data['order'],
                    'caption': slide_data['caption'],
                    'is_active': False,  # Set to False until admin uploads images
                }
            )
            if created:
                created_count += 1

        if created_count > 0:
            self.stdout.write(self.style.SUCCESS(f'Created {created_count} demo hero slides'))
            self.stdout.write(self.style.WARNING('Note: Slides are inactive until images are uploaded via admin'))
        else:
            self.stdout.write(self.style.WARNING('Demo hero slides already exist'))

        # Create Demo Showcase Images (without actual images, admin will upload them)
        demo_showcase = [
            {'alt_text': 'Wedding photography showcase - Traditional Bengali bride', 'order': 1},
            {'alt_text': 'Groom portrait - Traditional Bengali wedding attire', 'order': 2},
            {'alt_text': 'Wedding ceremony moments - Bengali rituals', 'order': 3},
            {'alt_text': 'Bridal portrait - Traditional Bengali jewelry', 'order': 4},
            {'alt_text': 'Pre-wedding couple shoot', 'order': 5},
            {'alt_text': 'Wedding celebration - Family moments', 'order': 6}
        ]

        showcase_created_count = 0
        for showcase_data in demo_showcase:
            image, created = ShowcaseImage.objects.get_or_create(
                alt_text=showcase_data['alt_text'],
                defaults={
                    'order': showcase_data['order'],
                    'is_active': False,  # Set to False until admin uploads images
                }
            )
            if created:
                showcase_created_count += 1

        if showcase_created_count > 0:
            self.stdout.write(self.style.SUCCESS(f'Created {showcase_created_count} demo showcase images'))
            self.stdout.write(self.style.WARNING('Note: Showcase images are inactive until images are uploaded via admin'))
        else:
            self.stdout.write(self.style.WARNING('Demo showcase images already exist'))

        self.stdout.write(self.style.SUCCESS('Homepage demo data setup complete!'))
        self.stdout.write(self.style.WARNING('Remember to:'))
        self.stdout.write('1. Upload slider images via Django admin (/admin/homepage/heroslide/)')
        self.stdout.write('2. Upload showcase images via Django admin (/admin/homepage/showcaseimage/)')
        self.stdout.write('3. Activate slides and images by setting is_active=True')
        self.stdout.write('4. Adjust order as needed')
