from django.core.management.base import BaseCommand
from aboutpage.models import AboutHero, AboutStory, AboutValue, TeamMember, AboutContent

class Command(BaseCommand):
    help = 'Create sample about page data for development and testing'

    def handle(self, *args, **options):
        # Clear existing data
        AboutHero.objects.all().delete()
        AboutStory.objects.all().delete()
        AboutValue.objects.all().delete()
        TeamMember.objects.all().delete()
        AboutContent.objects.all().delete()
        
        # Create Hero Section
        hero_data = {
            'title': 'About chobighar',
            'subtitle': 'Art Direction and Design Studio capturing life\'s most precious moments with cultural authenticity and artistic excellence since 2020.',
            'alt_text': 'chobighar Photography Studio - About Us',
            'is_active': True,
        }
        
        # Note: You'll need to add actual images later
        # For now, we'll create the record without the image
        try:
            hero = AboutHero.objects.create(**hero_data)
            self.stdout.write(f'✅ Created hero section: {hero.title}')
        except Exception as e:
            self.stdout.write(f'❌ Error creating hero: {str(e)}')
        
        # Create Story Section
        story_data = {
            'title': 'Our Story',
            'content': '''<p>Founded in the heart of Kolkata, chobighar began as a passion project to preserve and celebrate the rich cultural heritage of Bengal through visual storytelling. What started as a small photography studio has grown into a comprehensive creative agency specializing in weddings, portraits, and cultural events.</p>

<p>Our name "chobighar" reflects our philosophy - we are the keepers of your visual memories, just as keys keep treasures safe. Every photograph we capture is a key to a moment in time, a gateway to emotions and memories that last forever.</p>''',
            'happy_couples': 500,
            'years_experience': 5,
            'photos_captured': '50k+',
            'alt_text': 'chobighar team at work',
            'is_active': True,
        }
        
        try:
            story = AboutStory.objects.create(**story_data)
            self.stdout.write(f'✅ Created story section: {story.title}')
        except Exception as e:
            self.stdout.write(f'❌ Error creating story: {str(e)}')
        
        # Create Values
        values_data = [
            {
                'title': 'Excellence',
                'description': 'We strive for perfection in every shot, ensuring each moment is captured with artistic precision.',
                'icon_type': 'camera',
                'order': 1,
                'is_active': True,
            },
            {
                'title': 'Passion',
                'description': 'Our love for photography drives us to create emotional connections through visual storytelling.',
                'icon_type': 'heart',
                'order': 2,
                'is_active': True,
            },
            {
                'title': 'Trust',
                'description': 'We build lasting relationships with our clients based on reliability and mutual respect.',
                'icon_type': 'users',
                'order': 3,
                'is_active': True,
            },
            {
                'title': 'Quality',
                'description': 'We deliver high-quality images and services that exceed expectations every time.',
                'icon_type': 'star',
                'order': 4,
                'is_active': True,
            },
        ]
        
        for value_data in values_data:
            try:
                value = AboutValue.objects.create(**value_data)
                self.stdout.write(f'✅ Created value: {value.title}')
            except Exception as e:
                self.stdout.write(f'❌ Error creating value: {str(e)}')
        
        # Create Team Members
        team_data = [
            {
                'name': 'Rajesh Kumar',
                'position': 'Founder & Lead Photographer',
                'bio': 'With 8+ years of experience in wedding photography, Rajesh brings artistic vision and technical expertise to every project.',
                'alt_text': 'Rajesh Kumar - Founder & Lead Photographer',
                'email': 'rajesh@chobighar.com',
                'phone': '+91 98765 43210',
                'order': 1,
                'is_active': True,
            },
            {
                'name': 'Priya Sharma',
                'position': 'Creative Director',
                'bio': 'Priya oversees the creative direction and ensures every project reflects our brand\'s artistic standards and client vision.',
                'alt_text': 'Priya Sharma - Creative Director',
                'email': 'priya@chobighar.com',
                'phone': '+91 98765 43211',
                'order': 2,
                'is_active': True,
            },
            {
                'name': 'Amit Roy',
                'position': 'Lead Videographer',
                'bio': 'Amit specializes in cinematic wedding films and creates beautiful video narratives that complement our photography.',
                'alt_text': 'Amit Roy - Lead Videographer',
                'email': 'amit@chobighar.com',
                'phone': '+91 98765 43212',
                'order': 3,
                'is_active': True,
            },
        ]
        
        for member_data in team_data:
            try:
                member = TeamMember.objects.create(**member_data)
                self.stdout.write(f'✅ Created team member: {member.name}')
            except Exception as e:
                self.stdout.write(f'❌ Error creating team member: {str(e)}')
        
        # Create Additional Content
        content_data = [
            {
                'section_type': 'mission',
                'title': 'Our Mission',
                'content': '<p>To capture and preserve life\'s most precious moments through artistic photography and videography, celebrating cultural heritage while creating timeless memories for our clients.</p>',
                'order': 1,
                'is_active': True,
            },
            {
                'section_type': 'vision',
                'title': 'Our Vision',
                'content': '<p>To be the premier photography studio in Bengal, known for our artistic excellence, cultural authenticity, and ability to tell beautiful stories through visual media.</p>',
                'order': 2,
                'is_active': True,
            },
        ]
        
        for content_item in content_data:
            try:
                content = AboutContent.objects.create(**content_item)
                self.stdout.write(f'✅ Created content: {content.title}')
            except Exception as e:
                self.stdout.write(f'❌ Error creating content: {str(e)}')
        
        self.stdout.write(
            self.style.SUCCESS(
                '\n🎉 Sample about page data created successfully!'
                '\n📝 Note: You need to add actual images through Django admin:'
                '\n   - Hero section image (full width, 50vh height)'
                '\n   - Story section image'
                '\n   - Team member profile photos'
                '\n\n🔗 API Endpoints available:'
                '\n   - /api/aboutpage/hero/'
                '\n   - /api/aboutpage/story/'
                '\n   - /api/aboutpage/values/'
                '\n   - /api/aboutpage/team/'
                '\n   - /api/aboutpage/content/'
            )
        )