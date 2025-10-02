#!/usr/bin/env python
import os
import sys
import django
from pathlib import Path

# Setup Django
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chabighar_backend.settings')
django.setup()

from vendor.models import VendorProfile, VendorSubCategory, VendorCategory

print("=== VENDOR DATA CHECK ===")
print(f"Total vendors: {VendorProfile.objects.count()}")
print(f"Active vendors: {VendorProfile.objects.filter(is_active=True).count()}")

print("\n=== SUBCATEGORIES ===")
subcategories = VendorSubCategory.objects.all()
for sub in subcategories:
    vendor_count = VendorProfile.objects.filter(subcategory=sub).count()
    print(f"{sub.name} ({sub.slug}): {vendor_count} vendors")

print("\n=== BRIDAL MAKEUP ARTISTS ===")
bridal_sub = VendorSubCategory.objects.filter(slug='bridal-makeup-artists').first()
if bridal_sub:
    print(f"Subcategory exists: {bridal_sub.name}")
    vendors = VendorProfile.objects.filter(subcategory=bridal_sub)
    print(f"Vendors count: {vendors.count()}")
    for vendor in vendors:
        print(f"  - {vendor.name} (Active: {vendor.is_active})")
else:
    print("Bridal makeup artists subcategory not found")
    print("Available subcategory slugs:")
    for sub in VendorSubCategory.objects.all():
        print(f"  - {sub.slug}")

print("\n=== ALL VENDORS ===")
for vendor in VendorProfile.objects.all():
    print(f"{vendor.name} - {vendor.subcategory.name if vendor.subcategory else 'No subcategory'} (Active: {vendor.is_active})")