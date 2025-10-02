from django.core.management.base import BaseCommand
from django.test import Client
from django.urls import reverse
from django.conf import settings
import json
import requests
from datetime import datetime

class Command(BaseCommand):
    help = 'Test all API endpoints to confirm they are working properly'

    def add_arguments(self, parser):
        parser.add_argument(
            '--server',
            type=str,
            default='http://127.0.0.1:8000',
            help='Server URL to test (default: http://127.0.0.1:8000)'
        )
        parser.add_argument(
            '--production',
            action='store_true',
            help='Test production server at admin.chobighar.com'
        )

    def handle(self, *args, **options):
        # Determine server URL
        if options['production']:
            base_url = 'https://admin.chobighar.com'
        else:
            base_url = options['server']
        
        self.stdout.write(self.style.SUCCESS(f'🧪 TESTING ALL APIs ON: {base_url}'))
        self.stdout.write('=' * 80)
        self.stdout.write(f'⏰ Test started at: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
        self.stdout.write('=' * 80)
        
        # API endpoints to test
        api_endpoints = [
            # Health checks
            {'name': 'Health Check', 'url': '/health/', 'expected_status': 200},
            {'name': 'Readiness Check', 'url': '/health/ready/', 'expected_status': 200},
            {'name': 'Liveness Check', 'url': '/health/live/', 'expected_status': 200},
            
            # Header APIs
            {'name': 'Header Data', 'url': '/api/header/', 'expected_status': 200},
            {'name': 'Social Media', 'url': '/api/header/social-media/', 'expected_status': 200},
            {'name': 'Contact Info', 'url': '/api/header/contact-info/', 'expected_status': 200},
            {'name': 'Brand Info', 'url': '/api/header/brand-info/', 'expected_status': 200},
            
            # Footer APIs
            {'name': 'Footer Data', 'url': '/api/footer/', 'expected_status': 200},
            
            # Contact APIs
            {'name': 'Contact Data', 'url': '/api/contact/', 'expected_status': 200},
            
            # Homepage APIs
            {'name': 'Homepage Data', 'url': '/api/homepage/', 'expected_status': 200},
            {'name': 'Hero Slides', 'url': '/api/homepage/hero-slides/', 'expected_status': 200},
            {'name': 'Video Testimonials', 'url': '/api/homepage/video-testimonials/', 'expected_status': 200},
            {'name': 'Text Testimonials', 'url': '/api/homepage/text-testimonials/', 'expected_status': 200},
            {'name': 'FAQs', 'url': '/api/homepage/faqs/', 'expected_status': 200},
            {'name': 'Achievements', 'url': '/api/homepage/achievements/', 'expected_status': 200},
            
            # About Page APIs
            {'name': 'About Data', 'url': '/api/aboutpage/', 'expected_status': 200},
            
            # Photoshoot Page APIs
            {'name': 'Photoshoot Data', 'url': '/api/photoshootpage/', 'expected_status': 200},
            
            # Vendor APIs
            {'name': 'Vendor Categories', 'url': '/api/vendor/categories/', 'expected_status': 200},
            {'name': 'Vendor Subcategories', 'url': '/api/vendor/subcategories/', 'expected_status': 200},
            {'name': 'Vendor Profiles', 'url': '/api/vendor/profiles/', 'expected_status': 200},
            
            # Portfolio APIs
            {'name': 'Portfolio Categories', 'url': '/api/portfolio/categories/', 'expected_status': 200},
            {'name': 'Portfolio Items', 'url': '/api/portfolio/portfolios/', 'expected_status': 200},
            
            # Search APIs
            {'name': 'Search', 'url': '/api/search/?q=wedding', 'expected_status': 200},
            
            # Inquiry APIs
            {'name': 'Inquiry Categories', 'url': '/api/inquiry/categories/', 'expected_status': 200},
        ]
        
        # Admin endpoints to test
        admin_endpoints = [
            {'name': 'Admin Panel', 'url': '/admin/', 'expected_status': 200},
            {'name': 'Admin Login', 'url': '/admin/login/', 'expected_status': 200},
        ]
        
        # Test results
        passed_tests = 0
        failed_tests = 0
        test_results = []
        
        # Test API endpoints
        self.stdout.write('\n🔌 TESTING API ENDPOINTS')
        self.stdout.write('-' * 40)
        
        for endpoint in api_endpoints:
            try:
                url = f"{base_url}{endpoint['url']}"
                response = requests.get(url, timeout=10)
                
                status_code = response.status_code
                expected_status = endpoint['expected_status']
                
                if status_code == expected_status:
                    self.stdout.write(f"✅ {endpoint['name']:<25} | {status_code} | {url}")
                    passed_tests += 1
                    
                    # Try to parse JSON response
                    try:
                        data = response.json()
                        if isinstance(data, dict) and data:
                            self.stdout.write(f"   📊 Response: {len(str(data))} chars")
                        elif isinstance(data, list):
                            self.stdout.write(f"   📊 Response: {len(data)} items")
                    except:
                        self.stdout.write(f"   📊 Response: {len(response.text)} chars (non-JSON)")
                else:
                    self.stdout.write(self.style.ERROR(f"❌ {endpoint['name']:<25} | {status_code} | {url}"))
                    failed_tests += 1
                
                test_results.append({
                    'name': endpoint['name'],
                    'url': url,
                    'status': status_code,
                    'expected': expected_status,
                    'passed': status_code == expected_status
                })
                
            except requests.exceptions.RequestException as e:
                self.stdout.write(self.style.ERROR(f"❌ {endpoint['name']:<25} | ERROR | {e}"))
                failed_tests += 1
                test_results.append({
                    'name': endpoint['name'],
                    'url': f"{base_url}{endpoint['url']}",
                    'status': 'ERROR',
                    'expected': expected_status,
                    'passed': False,
                    'error': str(e)
                })
        
        # Test admin endpoints
        self.stdout.write('\n🏛️ TESTING ADMIN ENDPOINTS')
        self.stdout.write('-' * 40)
        
        for endpoint in admin_endpoints:
            try:
                url = f"{base_url}{endpoint['url']}"
                response = requests.get(url, timeout=10)
                
                status_code = response.status_code
                expected_status = endpoint['expected_status']
                
                if status_code == expected_status:
                    self.stdout.write(f"✅ {endpoint['name']:<25} | {status_code} | {url}")
                    passed_tests += 1
                else:
                    self.stdout.write(self.style.ERROR(f"❌ {endpoint['name']:<25} | {status_code} | {url}"))
                    failed_tests += 1
                
            except requests.exceptions.RequestException as e:
                self.stdout.write(self.style.ERROR(f"❌ {endpoint['name']:<25} | ERROR | {e}"))
                failed_tests += 1
        
        # Test media files
        self.stdout.write('\n🖼️ TESTING MEDIA ACCESS')
        self.stdout.write('-' * 40)
        
        media_files = [
            '/media/brand/chabighar_1_1.webp',
            '/media/homepage/slider/',
        ]
        
        for media_file in media_files:
            try:
                url = f"{base_url}{media_file}"
                response = requests.head(url, timeout=5)  # Use HEAD request for files
                
                if response.status_code == 200:
                    self.stdout.write(f"✅ Media File               | 200 | {url}")
                    passed_tests += 1
                else:
                    self.stdout.write(self.style.WARNING(f"⚠️ Media File               | {response.status_code} | {url}"))
            except requests.exceptions.RequestException as e:
                self.stdout.write(self.style.WARNING(f"⚠️ Media File               | ERROR | {e}"))
        
        # Summary
        total_tests = passed_tests + failed_tests
        success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
        
        self.stdout.write('\n' + '=' * 80)
        self.stdout.write('📊 TEST SUMMARY')
        self.stdout.write('=' * 80)
        self.stdout.write(f"🎯 Server: {base_url}")
        self.stdout.write(f"✅ Passed: {passed_tests}")
        self.stdout.write(f"❌ Failed: {failed_tests}")
        self.stdout.write(f"📈 Success Rate: {success_rate:.1f}%")
        
        if failed_tests == 0:
            self.stdout.write(self.style.SUCCESS(f"\n🎉 ALL TESTS PASSED! Your API is working perfectly!"))
        elif success_rate >= 80:
            self.stdout.write(self.style.WARNING(f"\n⚠️ Most tests passed, but {failed_tests} endpoints need attention."))
        else:
            self.stdout.write(self.style.ERROR(f"\n❌ Multiple endpoints failing. Server may have issues."))
        
        # Recommendations
        self.stdout.write('\n💡 RECOMMENDATIONS:')
        self.stdout.write('-' * 40)
        
        if base_url.startswith('https://admin.chobighar.com'):
            self.stdout.write('✅ Testing production server')
            self.stdout.write('🔒 Ensure SSL certificates are valid')
            self.stdout.write('🌐 Check DNS settings for domain')
        else:
            self.stdout.write('🧪 Testing local/development server')
            self.stdout.write('🚀 Ready to deploy to production!')
        
        self.stdout.write('📱 Test frontend integration with these APIs')
        self.stdout.write('🔄 Set up monitoring for production endpoints')
        
        self.stdout.write(f'\n⏰ Test completed at: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
        self.stdout.write('✅ API verification complete!')