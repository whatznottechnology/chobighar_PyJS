from django.core.management.base import BaseCommand
from django.conf import settings
from header.models import BrandInfo
from homepage.models import HeroSlide
import os

class Command(BaseCommand):
    help = 'Debug media files and image access issues'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('🔍 DEBUGGING MEDIA FILES'))
        self.stdout.write('=' * 60)
        
        # Check Django settings
        self.stdout.write(f"📁 MEDIA_ROOT: {settings.MEDIA_ROOT}")
        self.stdout.write(f"🔗 MEDIA_URL: {settings.MEDIA_URL}")
        self.stdout.write(f"🐛 DEBUG: {settings.DEBUG}")
        
        # Check if media directory exists
        media_root_exists = os.path.exists(settings.MEDIA_ROOT)
        self.stdout.write(f"📂 Media directory exists: {media_root_exists}")
        
        if media_root_exists:
            # List media subdirectories
            try:
                subdirs = [d for d in os.listdir(settings.MEDIA_ROOT) if os.path.isdir(os.path.join(settings.MEDIA_ROOT, d))]
                self.stdout.write(f"📁 Media subdirectories: {subdirs}")
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"❌ Error listing media dir: {e}"))
        
        self.stdout.write('\n' + '=' * 60)
        self.stdout.write('🖼️ CHECKING BRAND IMAGES')
        self.stdout.write('=' * 60)
        
        # Check BrandInfo images
        brand_infos = BrandInfo.objects.all()
        for brand in brand_infos:
            self.stdout.write(f"\n📋 Brand: {brand.main_text}")
            if brand.logo_image:
                self.stdout.write(f"🖼️ Logo field: {brand.logo_image}")
                self.stdout.write(f"🔗 Logo URL: {brand.logo_image.url}")
                
                # Check if file exists
                logo_path = os.path.join(settings.MEDIA_ROOT, str(brand.logo_image))
                file_exists = os.path.exists(logo_path)
                self.stdout.write(f"📄 File exists: {file_exists}")
                self.stdout.write(f"📍 Full path: {logo_path}")
                
                if file_exists:
                    file_size = os.path.getsize(logo_path)
                    self.stdout.write(f"📏 File size: {file_size} bytes")
                else:
                    self.stdout.write(self.style.ERROR("❌ File not found on disk!"))
            else:
                self.stdout.write("❌ No logo image set")
        
        self.stdout.write('\n' + '=' * 60)
        self.stdout.write('🎭 CHECKING HERO SLIDE IMAGES')
        self.stdout.write('=' * 60)
        
        # Check HeroSlide images
        hero_slides = HeroSlide.objects.all()[:3]  # Check first 3
        for slide in hero_slides:
            self.stdout.write(f"\n🎭 Slide: {slide.title or f'Slide {slide.id}'}")
            if slide.image:
                self.stdout.write(f"🖼️ Image field: {slide.image}")
                self.stdout.write(f"🔗 Image URL: {slide.image.url}")
                
                # Check if file exists
                image_path = os.path.join(settings.MEDIA_ROOT, str(slide.image))
                file_exists = os.path.exists(image_path)
                self.stdout.write(f"📄 File exists: {file_exists}")
                self.stdout.write(f"📍 Full path: {image_path}")
                
                if file_exists:
                    file_size = os.path.getsize(image_path)
                    self.stdout.write(f"📏 File size: {file_size} bytes")
                else:
                    self.stdout.write(self.style.ERROR("❌ File not found on disk!"))
            else:
                self.stdout.write("❌ No image set")
        
        self.stdout.write('\n' + '=' * 60)
        self.stdout.write('🔧 RECOMMENDATIONS')
        self.stdout.write('=' * 60)
        
        if not settings.DEBUG:
            self.stdout.write(self.style.WARNING("⚠️ DEBUG is False - media files won't be served by Django"))
            self.stdout.write("💡 Set DJANGO_DEBUG=True in .env for development")
        
        if not media_root_exists:
            self.stdout.write(self.style.ERROR("❌ Media directory doesn't exist"))
            self.stdout.write("💡 Create media directory or upload some files")
        
        self.stdout.write('\n✅ Debug complete!')