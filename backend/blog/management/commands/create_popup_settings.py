from django.core.management.base import BaseCommand
from blog.models import PopupSettings


class Command(BaseCommand):
    help = 'Create or update popup settings'

    def handle(self, *args, **options):
        # Check if settings already exist
        settings = PopupSettings.objects.first()
        
        if settings:
            self.stdout.write(
                self.style.WARNING(f'Popup settings already exist (ID: {settings.id})')
            )
            self.stdout.write(f'  - Active: {settings.is_active}')
            self.stdout.write(f'  - Show Delay: {settings.show_delay}ms ({settings.show_delay/1000}s)')
            self.stdout.write(f'  - Title: {settings.popup_title}')
            
            # Update to ensure correct settings
            settings.is_active = True
            settings.show_delay = 5000
            if not settings.popup_title:
                settings.popup_title = 'Book Your Dream Photography Session!'
            if not settings.popup_subtitle:
                settings.popup_subtitle = 'Fill out the form below and we will contact you soon'
            settings.save()
            
            self.stdout.write(
                self.style.SUCCESS('✅ Popup settings updated successfully!')
            )
        else:
            # Create new settings
            settings = PopupSettings.objects.create(
                is_active=True,
                popup_title='Book Your Dream Photography Session!',
                popup_subtitle='Fill out the form below and we will contact you soon',
                show_delay=5000,  # 5 seconds
                cookie_duration_days=7
            )
            
            self.stdout.write(
                self.style.SUCCESS('✅ Popup settings created successfully!')
            )
            self.stdout.write(f'  - ID: {settings.id}')
            self.stdout.write(f'  - Active: {settings.is_active}')
            self.stdout.write(f'  - Show Delay: {settings.show_delay}ms ({settings.show_delay/1000}s)')
            self.stdout.write(f'  - Title: {settings.popup_title}')
        
        self.stdout.write(
            self.style.SUCCESS('\n🎉 Popup is now configured to show on homepage after 5 seconds!')
        )
