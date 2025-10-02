from django.core.management.base import BaseCommand
from django.test import Client
from django.conf import settings
import requests
import json

class Command(BaseCommand):
    help = 'Test media access and image display issues'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('🧪 TESTING MEDIA ACCESS'))
        self.stdout.write('=' * 60)
        
        # Test the media test endpoint
        try:
            client = Client()
            response = client.get('/api/header/test-media/')
            
            if response.status_code == 200:
                data = response.json()
                self.stdout.write(self.style.SUCCESS('✅ Media test endpoint accessible'))
                
                self.stdout.write(f"📁 Media Root: {data['media_root']}")
                self.stdout.write(f"🔗 Media URL: {data['media_url']}")
                self.stdout.write(f"🐛 Debug Mode: {data['debug']}")
                
                # Check brand images
                if data['brand_images']:
                    self.stdout.write('\n🏷️ Brand Images:')
                    for brand in data['brand_images']:
                        self.stdout.write(f"  📄 File: {brand['field_value']}")
                        self.stdout.write(f"  🔗 URL: {brand['url']}")
                        self.stdout.write(f"  ✅ Exists: {brand['file_exists']}")
                else:
                    self.stdout.write('❌ No brand images found')
                
                # Check hero images
                if data['hero_images']:
                    self.stdout.write('\n🎭 Hero Images:')
                    for hero in data['hero_images']:
                        self.stdout.write(f"  📄 {hero['title']}: {hero['field_value']}")
                        self.stdout.write(f"  🔗 URL: {hero['url']}")
                        self.stdout.write(f"  ✅ Exists: {hero['file_exists']}")
                else:
                    self.stdout.write('❌ No hero images found')
                
                if data['errors']:
                    self.stdout.write('\n❌ Errors:')
                    for error in data['errors']:
                        self.stdout.write(f"  {error}")
                        
            else:
                self.stdout.write(self.style.ERROR(f'❌ Test endpoint failed: {response.status_code}'))
                
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error testing endpoint: {e}'))
        
        self.stdout.write('\n' + '=' * 60)
        self.stdout.write('💡 QUICK FIXES TO TRY:')
        self.stdout.write('=' * 60)
        
        self.stdout.write('1. Start Django server: python manage.py runserver')
        self.stdout.write('2. Visit admin: http://127.0.0.1:8000/admin/')
        self.stdout.write('3. Test media endpoint: http://127.0.0.1:8000/api/header/test-media/')
        self.stdout.write('4. Check brand info: http://127.0.0.1:8000/admin/header/brandinfo/1/change/')
        self.stdout.write('5. Test direct media URL: http://127.0.0.1:8000/media/brand/download.png')
        
        self.stdout.write('\n✅ Test complete!')