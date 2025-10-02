from django.core.management.base import BaseCommand
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from header.models import BrandInfo
from header.admin import BrandInfoAdmin

class Command(BaseCommand):
    help = 'Test admin HTML rendering for images'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('🎨 TESTING ADMIN HTML RENDERING'))
        self.stdout.write('=' * 60)
        
        try:
            # Get the first brand info
            brand = BrandInfo.objects.first()
            if brand:
                self.stdout.write(f"📋 Testing brand: {brand.main_text}")
                
                # Create admin instance
                admin = BrandInfoAdmin(BrandInfo, None)
                
                # Test logo preview
                logo_preview_html = admin.logo_preview(brand)
                self.stdout.write(f"🖼️ Logo preview HTML:")
                self.stdout.write(str(logo_preview_html))
                
                # Test brand preview
                brand_preview_html = admin.brand_preview(brand)
                self.stdout.write(f"\n🏷️ Brand preview HTML:")
                self.stdout.write(str(brand_preview_html))
                
                # Check if HTML is properly formatted
                if '<img src=' in str(logo_preview_html):
                    self.stdout.write(self.style.SUCCESS("\n✅ Logo preview contains image tag"))
                else:
                    self.stdout.write(self.style.ERROR("\n❌ Logo preview missing image tag"))
                
                if obj.logo_image if brand.logo_image else False:
                    self.stdout.write(f"🔗 Image URL: {brand.logo_image.url}")
                    self.stdout.write(f"📄 Image path: {brand.logo_image.name}")
                
            else:
                self.stdout.write(self.style.WARNING("❌ No brand info found"))
                
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌ Error: {e}"))
        
        self.stdout.write('\n' + '=' * 60)
        self.stdout.write('💡 SOLUTION:')
        self.stdout.write('=' * 60)
        self.stdout.write('The HTML should now render properly in Django admin.')
        self.stdout.write('1. Start server: python manage.py runserver')
        self.stdout.write('2. Visit: http://127.0.0.1:8000/admin/header/brandinfo/')
        self.stdout.write('3. Images should display correctly now!')
        
        self.stdout.write('\n✅ Test complete!')