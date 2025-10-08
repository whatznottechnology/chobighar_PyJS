#!/usr/bin/env python
"""
Test Automatic Watermark System
Upload a test image through Django admin to verify watermarking works
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chobighar_backend.settings')
django.setup()

from blog.models import PopupSettings
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
from io import BytesIO

def create_test_image():
    """Create a simple test image"""
    # Create a 800x600 red image
    img = Image.new('RGB', (800, 600), color='red')
    
    # Add some text
    from PIL import ImageDraw, ImageFont
    draw = ImageDraw.Draw(img)
    draw.text((350, 280), "TEST IMAGE", fill='white')
    
    # Save to BytesIO
    output = BytesIO()
    img.save(output, format='JPEG')
    output.seek(0)
    
    return output

def test_watermark():
    """Test watermark by creating/updating popup settings"""
    print("=" * 70)
    print("🧪 TESTING AUTOMATIC WATERMARK SYSTEM")
    print("=" * 70)
    
    # Check if watermark file exists
    watermark_path = 'static/admin/img/chobighar.png'
    if os.path.exists(watermark_path):
        print(f"✅ Watermark file found: {watermark_path}")
    else:
        print(f"❌ Watermark file NOT found: {watermark_path}")
        print("   Please ensure the file exists before testing")
        return
    
    # Create test image
    print("\n📸 Creating test image (800x600)...")
    test_image = create_test_image()
    
    # Get or create popup settings
    popup, created = PopupSettings.objects.get_or_create(
        pk=1,
        defaults={
            'is_active': True,
            'popup_title': 'Test Popup',
            'popup_subtitle': 'Testing watermark system',
            'show_delay': 5000,
            'cookie_duration_days': 7
        }
    )
    
    print(f"\n{'✅ Created' if created else '📝 Updated'} PopupSettings instance")
    
    # Upload test image
    print("\n📤 Uploading test image to popup_image field...")
    print("   🎨 Watermark should be added automatically via signal...")
    
    popup.popup_image.save(
        'test_watermark.jpg',
        SimpleUploadedFile('test_watermark.jpg', test_image.getvalue()),
        save=True
    )
    
    print(f"\n✅ Image uploaded to: {popup.popup_image.path if popup.popup_image else 'N/A'}")
    print(f"   URL: /media/{popup.popup_image.name if popup.popup_image else 'N/A'}")
    
    # Verify file exists
    if popup.popup_image and os.path.exists(popup.popup_image.path):
        file_size = os.path.getsize(popup.popup_image.path)
        print(f"   Size: {file_size / 1024:.2f} KB")
        
        # Check if watermark was added
        img = Image.open(popup.popup_image.path)
        print(f"   Dimensions: {img.size[0]}x{img.size[1]}")
        print(f"   Format: {img.format}")
        
        print("\n" + "=" * 70)
        print("✅ TEST COMPLETED!")
        print("=" * 70)
        print("\n📋 NEXT STEPS:")
        print("1. Open the image file to verify watermark:")
        print(f"   {popup.popup_image.path}")
        print("\n2. Or view in admin:")
        print("   http://127.0.0.1:8000/admin/blog/popupsettings/1/change/")
        print("\n3. Check bottom-right corner for chobighar logo watermark")
        print("=" * 70)
    else:
        print("❌ Image file not found after upload")

if __name__ == '__main__':
    test_watermark()
