from django.core.management.base import BaseCommand
from aboutpage.models import AboutStory

class Command(BaseCommand):
    help = 'Update AboutStory with proper stats data'

    def handle(self, *args, **options):
        # Update or create AboutStory with stats
        story, created = AboutStory.objects.update_or_create(
            id=1,
            defaults={
                'title': 'Our Story',
                'content': '''<p>Founded with a passion for capturing life's most precious moments, Chabighar has become a trusted name in wedding photography and event management. Our journey began with a simple belief: every love story deserves to be told beautifully.</p>
                
<p>We specialize in blending traditional Bengali culture with contemporary artistry, creating timeless memories that families treasure for generations. From intimate ceremonies to grand celebrations, we bring creativity, professionalism, and cultural authenticity to every project.</p>

<p>Our approach goes beyond just taking photos – we become part of your story, understanding your vision and bringing it to life with artistic excellence and cultural sensitivity.</p>''',
                'happy_couples': 500,
                'years_experience': 5,
                'photos_captured': '50k+',
                'alt_text': 'Chabighar team capturing beautiful wedding moments',
                'is_active': True,
            }
        )
        
        action = "Created" if created else "Updated"
        self.stdout.write(
            self.style.SUCCESS(f'{action} AboutStory: {story.title}')
        )
        self.stdout.write(f'Stats: {story.happy_couples}+ couples, {story.years_experience} years, {story.photos_captured} photos')