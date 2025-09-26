from django.core.management.base import BaseCommand
from photoshootpage.models import PhotoshootTestimonial

class Command(BaseCommand):
    help = 'Set up demo testimonials data for photoshoot page'

    def handle(self, *args, **options):
        self.stdout.write('Setting up photoshoot testimonials demo data...')
        
        # Clear existing testimonials
        PhotoshootTestimonial.objects.all().delete()
        
        # Create demo testimonials
        testimonials = [
            {
                'client_name': 'Priya & Arjun',
                'service_type': 'Bengali Wedding Photography',
                'rating': 5,
                'testimonial_text': 'Absolutely magical! They captured our Bengali wedding traditions beautifully. Every moment was preserved with such artistic excellence. The photographers understood our culture perfectly and made us feel comfortable throughout the ceremony.',
                'order': 1,
                'is_active': True,
                'is_featured': True
            },
            {
                'client_name': 'Sneha Sharma',
                'service_type': 'Portrait Session',
                'rating': 5,
                'testimonial_text': 'Professional and creative team. The portrait session exceeded my expectations. The lighting, poses, and final editing were absolutely stunning. They brought out the best in me and captured my personality perfectly.',
                'order': 2,
                'is_active': True,
                'is_featured': True
            },
            {
                'client_name': 'Rahul & Kavya',
                'service_type': 'Pre-Wedding Shoot',
                'rating': 5,
                'testimonial_text': 'They made us feel so comfortable during our pre-wedding shoot. The creative locations and poses resulted in stunning photographs that tell our love story perfectly. We couldn\'t be happier with the results!',
                'order': 3,
                'is_active': True,
                'is_featured': True
            },
            {
                'client_name': 'Ananya Gupta',
                'service_type': 'Cultural Event Photography',
                'rating': 5,
                'testimonial_text': 'Captured our Durga Puja celebrations with such respect and artistry. Every ritual, every emotion was beautifully documented. They understood the significance of each moment and preserved our traditions with care.',
                'order': 4,
                'is_active': True,
                'is_featured': False
            },
            {
                'client_name': 'Vikram & Ritu',
                'service_type': 'Wedding Photography',
                'rating': 5,
                'testimonial_text': 'From the initial consultation to the final album delivery, everything was perfect. They captured emotions we didn\'t even know existed. Truly professional service with an artistic touch that made our special day unforgettable.',
                'order': 5,
                'is_active': True,
                'is_featured': False
            },
            {
                'client_name': 'Meera Banerjee',
                'service_type': 'Family Portrait',
                'rating': 5,
                'testimonial_text': 'Beautiful family portraits that capture the essence of our family bond. The photographers were patient with our kids and created magical moments. The final images are treasures that we\'ll cherish forever.',
                'order': 6,
                'is_active': True,
                'is_featured': False
            },
            {
                'client_name': 'Suresh & Deepika',
                'service_type': 'Fashion Photography',
                'rating': 5,
                'testimonial_text': 'Outstanding fashion photography session! They understood our vision and delivered beyond expectations. The creative direction, styling suggestions, and post-processing work were all top-notch. Highly professional service.',
                'order': 7,
                'is_active': True,
                'is_featured': False
            },
            {
                'client_name': 'Amit Kumar',
                'service_type': 'Corporate Headshots',
                'rating': 5,
                'testimonial_text': 'Excellent corporate photography service. They made the entire team look professional and confident. The quick turnaround time and quality of editing impressed our entire organization. Perfect for LinkedIn and company profiles.',
                'order': 8,
                'is_active': True,
                'is_featured': False
            }
        ]
        
        created_count = 0
        for testimonial_data in testimonials:
            testimonial, created = PhotoshootTestimonial.objects.get_or_create(
                client_name=testimonial_data['client_name'],
                service_type=testimonial_data['service_type'],
                defaults=testimonial_data
            )
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created testimonial: {testimonial.client_name} - {testimonial.service_type}')
                )
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {created_count} testimonials!')
        )
        self.stdout.write('Photoshoot testimonials demo data setup complete!')