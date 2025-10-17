import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chobighar_backend.settings')
django.setup()

from portfolio.models import PortfolioVideo

# Mark the first video as featured
video = PortfolioVideo.objects.get(id=5)
video.featured = True
video.save()

print(f'✅ Marked video "{video.title}" (ID: {video.id}) as featured')

# Verify
featured_videos = PortfolioVideo.objects.filter(featured=True, is_active=True)
print(f'\n📊 Featured videos count: {featured_videos.count()}')
for v in featured_videos:
    print(f'   - {v.title} (Video ID: {v.video_id})')
