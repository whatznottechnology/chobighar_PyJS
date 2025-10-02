"""
Management command to test and validate image display in admin
"""
from django.core.management.base import BaseCommand
from django.conf import settings
import os

class Command(BaseCommand):
    help = 'Test image display functionality in admin'
    
    def handle(self, *args, **options):
        self.stdout.write("🔍 Testing Image Display Configuration...")
        
        # Test media settings
        self.stdout.write(f"📁 MEDIA_URL: {getattr(settings, 'MEDIA_URL', 'NOT SET')}")
        self.stdout.write(f"📁 MEDIA_ROOT: {getattr(settings, 'MEDIA_ROOT', 'NOT SET')}")
        
        # Check if media directory exists
        media_root = getattr(settings, 'MEDIA_ROOT', None)
        if media_root and os.path.exists(media_root):
            self.stdout.write(self.style.SUCCESS(f"✅ Media directory exists: {media_root}"))
            
            # List subdirectories
            subdirs = []
            for item in os.listdir(media_root):
                item_path = os.path.join(media_root, item)
                if os.path.isdir(item_path):
                    # Count files in subdirectory
                    file_count = 0
                    try:
                        files = os.listdir(item_path)
                        file_count = len([f for f in files if os.path.isfile(os.path.join(item_path, f))])
                    except:
                        file_count = 0
                    subdirs.append(f"  📂 {item}/ ({file_count} files)")
            
            if subdirs:
                self.stdout.write("📂 Media subdirectories:")
                for subdir in subdirs:
                    self.stdout.write(subdir)
            else:
                self.stdout.write("📂 No subdirectories found in media folder")
                
        else:
            self.stdout.write(self.style.ERROR(f"❌ Media directory not found: {media_root}"))
        
        # Test apps with image models
        self.stdout.write("\n🔍 Checking apps with image models...")
        
        apps_to_check = [
            ('header', 'BrandInfo', 'logo_image'),
            ('homepage', 'HeroSlide', 'image'),
            ('homepage', 'ShowcaseImage', 'image'),
            ('homepage', 'TextTestimonial', 'image'),
            ('vendor', 'VendorImage', 'image'),
            ('aboutpage', 'AboutHero', 'hero_image'),
            ('aboutpage', 'TeamMember', 'profile_image'),
            ('portfolio', 'PortfolioImage', 'image_file'),
        ]
        
        for app, model, field in apps_to_check:
            try:
                from django.apps import apps
                model_class = apps.get_model(app, model)
                
                # Count total records
                total_count = model_class.objects.count()
                
                # Count records with images
                filter_kwargs = {f"{field}__isnull": False}
                if hasattr(model_class.objects.first(), field):
                    # Also check for empty strings
                    exclude_kwargs = {field: ''}
                    with_images = model_class.objects.filter(**filter_kwargs).exclude(**exclude_kwargs).count()
                else:
                    with_images = 0
                
                self.stdout.write(f"  📊 {app}.{model}: {total_count} total, {with_images} with images")
                
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"  ❌ Error checking {app}.{model}: {str(e)}"))
        
        # Check URL configuration
        self.stdout.write("\n🔍 Checking URL configuration...")
        try:
            from django.urls import resolve
            from django.conf.urls.static import static
            
            if settings.DEBUG:
                self.stdout.write("✅ DEBUG=True: Media files should be served by Django")
            else:
                self.stdout.write("⚠️  DEBUG=False: Media files should be served by web server")
                
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌ URL configuration error: {str(e)}"))
        
        # Test sample image paths
        self.stdout.write("\n🔍 Testing sample image paths...")
        
        sample_paths = [
            'brand/',
            'homepage/slider/',
            'homepage/showcase/',
            'testimonials/images/',
            'vendor_images/',
            'about/',
        ]
        
        for path in sample_paths:
            full_path = os.path.join(media_root, path) if media_root else None
            if full_path and os.path.exists(full_path):
                file_count = len([f for f in os.listdir(full_path) if os.path.isfile(os.path.join(full_path, f))])
                self.stdout.write(f"  ✅ {path}: {file_count} files")
            else:
                self.stdout.write(f"  📁 {path}: directory not found (will be created when needed)")
        
        self.stdout.write(self.style.SUCCESS("\n🎉 Image display test completed!"))
        self.stdout.write("\n💡 Next steps:")
        self.stdout.write("   1. Visit Django admin at /admin/")
        self.stdout.write("   2. Check header/brandinfo/1/change/ for logo upload")
        self.stdout.write("   3. Check homepage/heroslide/ for slider images")
        self.stdout.write("   4. Verify images display properly in admin interface")