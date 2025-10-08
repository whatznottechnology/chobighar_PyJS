#!/usr/bin/env python
"""
Setup Popup Settings
Run this script on your production server after deployment to ensure popup works
"""

import os
import sys
import django

# Setup Django
sys.path.insert(0, os.path.dirname(__file__))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chobighar_backend.settings')
django.setup()

from blog.models import PopupSettings


def setup_popup():
    """Create or update popup settings"""
    print("=" * 70)
    print("🎨 SETTING UP POPUP CONFIGURATION")
    print("=" * 70)
    
    # Check if settings already exist
    settings = PopupSettings.objects.first()
    
    if settings:
        print(f"\n⚠️  Popup settings already exist (ID: {settings.id})")
        print(f"   - Active: {settings.is_active}")
        print(f"   - Show Delay: {settings.show_delay}ms ({settings.show_delay/1000}s)")
        print(f"   - Title: {settings.popup_title}")
        
        # Update to ensure correct settings
        settings.is_active = True
        settings.show_delay = 5000
        if not settings.popup_title:
            settings.popup_title = 'Book Your Dream Photography Session!'
        if not settings.popup_subtitle:
            settings.popup_subtitle = 'Fill out the form below and we will contact you soon'
        settings.save()
        
        print("\n✅ Popup settings updated successfully!")
    else:
        # Create new settings
        settings = PopupSettings.objects.create(
            is_active=True,
            popup_title='Book Your Dream Photography Session!',
            popup_subtitle='Fill out the form below and we will contact you soon',
            show_delay=5000,  # 5 seconds
            cookie_duration_days=7
        )
        
        print("\n✅ Popup settings created successfully!")
        print(f"   - ID: {settings.id}")
        print(f"   - Active: {settings.is_active}")
        print(f"   - Show Delay: {settings.show_delay}ms ({settings.show_delay/1000}s)")
        print(f"   - Title: {settings.popup_title}")
    
    print("\n" + "=" * 70)
    print("🎉 POPUP IS NOW CONFIGURED!")
    print("=" * 70)
    print("\nWhat happens now:")
    print("  ✓ Popup will show on homepage ONLY")
    print("  ✓ Appears automatically after 5 seconds")
    print("  ✓ Shows every time (no cookie tracking)")
    print("  ✓ Check browser console (F12) for debug logs")
    print("\n" + "=" * 70)


if __name__ == '__main__':
    setup_popup()
