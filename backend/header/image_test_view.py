from django.http import HttpResponse
from django.views import View
from header.models import BrandInfo
from homepage.models import HeroSlide

class ImageTestView(View):
    """Simple HTML page to test image display"""
    
    def get(self, request):
        html = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Chabighar - Image Test</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
                .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; }
                .section { margin: 30px 0; padding: 20px; border: 2px solid #B22222; border-radius: 10px; }
                .section h2 { color: #B22222; margin-top: 0; }
                .image-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
                .image-item { text-align: center; padding: 15px; background: #f9f9f9; border-radius: 8px; }
                .image-item img { max-width: 100%; height: 200px; object-fit: cover; border-radius: 8px; border: 2px solid #ddd; }
                .image-item h3 { color: #333; }
                .image-item p { color: #666; font-size: 14px; word-break: break-all; }
                .status { padding: 5px 10px; border-radius: 15px; font-size: 12px; font-weight: bold; }
                .status.success { background: #e8f5e8; color: #2e7d32; }
                .status.error { background: #ffebee; color: #d32f2f; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1 style="color: #B22222; text-align: center;">🖼️ Chabighar Image Test</h1>
                <p style="text-align: center; color: #666;">Testing image upload and display functionality</p>
        """
        
        # Test Brand Logo
        html += """
                <div class="section">
                    <h2>🏷️ Brand Logo Test</h2>
                    <div class="image-grid">
        """
        
        try:
            brand_info = BrandInfo.objects.first()
            if brand_info and brand_info.logo_image:
                html += f"""
                        <div class="image-item">
                            <h3>{brand_info.main_text}</h3>
                            <img src="{brand_info.logo_image.url}" alt="Brand Logo" />
                            <p><strong>URL:</strong> {brand_info.logo_image.url}</p>
                            <p><strong>File:</strong> {brand_info.logo_image.name}</p>
                            <span class="status success">✅ Loaded Successfully</span>
                        </div>
                """
            else:
                html += """
                        <div class="image-item">
                            <h3>No Brand Logo</h3>
                            <p>No brand logo uploaded yet</p>
                            <span class="status error">❌ No Image</span>
                        </div>
                """
        except Exception as e:
            html += f"""
                    <div class="image-item">
                        <h3>Brand Logo Error</h3>
                        <p>Error: {str(e)}</p>
                        <span class="status error">❌ Error</span>
                    </div>
            """
        
        html += """
                    </div>
                </div>
        """
        
        # Test Hero Slides
        html += """
                <div class="section">
                    <h2>🎭 Hero Slides Test</h2>
                    <div class="image-grid">
        """
        
        try:
            hero_slides = HeroSlide.objects.filter(image__isnull=False)[:4]
            for slide in hero_slides:
                html += f"""
                        <div class="image-item">
                            <h3>{slide.title or f'Slide {slide.id}'}</h3>
                            <img src="{slide.image.url}" alt="{slide.alt_text}" />
                            <p><strong>URL:</strong> {slide.image.url}</p>
                            <p><strong>File:</strong> {slide.image.name}</p>
                            <span class="status success">✅ Loaded Successfully</span>
                        </div>
                """
            
            if not hero_slides:
                html += """
                        <div class="image-item">
                            <h3>No Hero Slides</h3>
                            <p>No hero slide images uploaded yet</p>
                            <span class="status error">❌ No Images</span>
                        </div>
                """
        except Exception as e:
            html += f"""
                    <div class="image-item">
                        <h3>Hero Slides Error</h3>
                        <p>Error: {str(e)}</p>
                        <span class="status error">❌ Error</span>
                    </div>
            """
        
        html += """
                    </div>
                </div>
                
                <div class="section">
                    <h2>🔧 Admin Links</h2>
                    <p><a href="/admin/" target="_blank">🏛️ Django Admin</a></p>
                    <p><a href="/admin/header/brandinfo/" target="_blank">🏷️ Brand Info Admin</a></p>
                    <p><a href="/admin/homepage/heroslide/" target="_blank">🎭 Hero Slides Admin</a></p>
                    <p><a href="/api/header/test-media/" target="_blank">🧪 Media Test API</a></p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; color: #666;">
                    <p>If images are not showing, check:</p>
                    <ul style="text-align: left; display: inline-block;">
                        <li>Django server is running (python manage.py runserver)</li>
                        <li>DEBUG=True in .env file</li>
                        <li>Images are uploaded in Django admin</li>
                        <li>Media files exist in /media/ directory</li>
                    </ul>
                </div>
            </div>
        </body>
        </html>
        """
        
        return HttpResponse(html)