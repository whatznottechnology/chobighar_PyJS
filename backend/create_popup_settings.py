#!/usr/bin/env python
"""Script to create popup settings for the website"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chabighar_backend.settings')
django.setup()

from blog.models import PopupSettings

# Create or update popup settings
popup, created = PopupSettings.objects.get_or_create(
    pk=1,
    defaults={
        'is_active': True,
        'popup_title': 'Plan Your Dream Event!',
        'popup_subtitle': 'Fill in the details and we\'ll get back to you soon',
        'show_delay': 5000,  # 5 seconds
        'cookie_duration_days': 7
    }
)

if not created:
    # Update existing settings
    popup.is_active = True
    popup.popup_title = 'Plan Your Dream Event!'
    popup.popup_subtitle = 'Fill in the details and we\'ll get back to you soon'
    popup.show_delay = 5000  # 5 seconds
    popup.cookie_duration_days = 7
    popup.save()
    print("✅ Popup settings updated successfully!")
else:
    print("✅ Popup settings created successfully!")

print(f"""
📋 Popup Settings:
- Active: {popup.is_active}
- Title: {popup.popup_title}
- Subtitle: {popup.popup_subtitle}
- Show Delay: {popup.show_delay}ms ({popup.show_delay/1000} seconds)
- Cookie Duration: {popup.cookie_duration_days} days
- Has Image: {bool(popup.popup_image)}

⚠️  IMPORTANT: Please upload an image at:
   👉 http://127.0.0.1:8000/admin/blog/popupsettings/1/change/
   
   Upload a romantic couple photo in the "Popup Image" field.
""")
