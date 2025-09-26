from django.core.management.base import BaseCommand
from homepage.models import VideoShowcase

class Command(BaseCommand):
    help = 'Create sample video showcase data for development and testing'

    def handle(self, *args, **options):
        # Clear existing video showcase data
        VideoShowcase.objects.all().delete()
        
        # Sample video showcase data with YouTube video IDs
        video_data = {
            'title': 'Wedding Cinematic Reel',
            'description': 'A glimpse into our wedding photography and videography excellence, capturing emotions that last forever',
            'youtube_video_id': 'dQw4w9WgXcQ',  # Sample YouTube video ID
            'alt_text': 'Wedding video showcase - cinematic reel',
            'is_active': True,
            'autoplay': True,
            'loop_video': True,
            'show_controls': False,
            'mute_audio': True,
        }
        
        # Create video showcase
        video_showcase = VideoShowcase.objects.create(**video_data)
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created video showcase: {video_showcase.title}'
            )
        )
        
        # Display created data
        self.stdout.write('\nVideo Showcase Details:')
        self.stdout.write(f'- Title: {video_showcase.title}')
        self.stdout.write(f'- YouTube Video ID: {video_showcase.youtube_video_id}')
        self.stdout.write(f'- YouTube Embed URL: {video_showcase.youtube_embed_url}')
        self.stdout.write(f'- YouTube Thumbnail URL: {video_showcase.youtube_thumbnail_url}')
        self.stdout.write(f'- Autoplay: {video_showcase.autoplay}')
        self.stdout.write(f'- Loop: {video_showcase.loop_video}')
        self.stdout.write(f'- Muted: {video_showcase.mute_audio}')
        self.stdout.write(f'- Show Controls: {video_showcase.show_controls}')
        
        self.stdout.write(
            self.style.SUCCESS(
                '\nSample video showcase data created successfully!'
                '\nYou can now access the video showcase API at /api/homepage/video-showcase/'
                '\nTo change the YouTube video, update the youtube_video_id in Django admin.'
            )
        )
