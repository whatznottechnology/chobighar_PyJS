from django.core.management.base import BaseCommand
from vendor.models import VendorCategory, VendorSubCategory, VendorProfile


class Command(BaseCommand):
    help = 'Update vendor counts for categories and subcategories'

    def handle(self, *args, **options):
        self.stdout.write('Updating vendor counts...')
        
        # Update subcategory counts
        subcategories = VendorSubCategory.objects.all()
        for subcategory in subcategories:
            count = VendorProfile.objects.filter(
                subcategory=subcategory,
                is_active=True
            ).count()
            subcategory.vendor_count = count
            subcategory.save(update_fields=['vendor_count'])
            self.stdout.write(f'  {subcategory.name}: {count} vendors')
        
        # Category counts are calculated via property, so just display them
        categories = VendorCategory.objects.all()
        for category in categories:
            self.stdout.write(f'{category.name}: {category.vendor_count} vendors')
        
        self.stdout.write(self.style.SUCCESS('Successfully updated vendor counts!'))
