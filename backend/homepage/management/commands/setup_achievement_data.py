from django.core.management.base import BaseCommand
from homepage.models import Achievement

class Command(BaseCommand):
    help = 'Create demo achievement data for chobighar website'

    def handle(self, *args, **options):
        # Clear existing achievements
        Achievement.objects.all().delete()
        
        # Create demo achievement data
        achievements_data = [
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
                'count_value': 50,
                'suffix': '+',
                'description': 'Authentic client testimonials',
                'icon_type': 'video',
                'order': 2
            },
            {
                'title': 'Average Rating',
                'count_value': 5.0,
                'suffix': '',
                'description': 'Consistently excellent service',
                'icon_type': 'star',
                'order': 3
            },
            {
                'title': 'Client Satisfaction',
                'count_value': 98,
                'suffix': '%',
                'description': 'Exceeding expectations always',
                'icon_type': 'check',
                'order': 4
            }
        ]
        
        created_count = 0
        for achievement_data in achievements_data:
            achievement, created = Achievement.objects.get_or_create(
                title=achievement_data['title'],
                defaults={
                    'count_value': achievement_data['count_value'],
                    'suffix': achievement_data['suffix'],
                    'description': achievement_data['description'],
                    'icon_type': achievement_data['icon_type'],
                    'order': achievement_data['order'],
                    'is_active': True
                }
            )
            
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'✓ Created Achievement: {achievement.title} - {achievement.count_value}{achievement.suffix}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'- Achievement already exists: {achievement.title}')
                )
        
        self.stdout.write(
            self.style.SUCCESS(f'\n🎉 Successfully created {created_count} achievement entries!')
        )
        self.stdout.write(
            self.style.SUCCESS('Achievements are now available at: http://127.0.0.1:8000/api/homepage/achievements/')
        )