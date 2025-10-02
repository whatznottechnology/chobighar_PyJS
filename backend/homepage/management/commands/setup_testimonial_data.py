from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from homepage.models import VideoTestimonial, TextTestimonial
import os

class Command(BaseCommand):
    help = 'Setup demo testimonial data for testing'

    def handle(self, *args, **options):
        self.stdout.write('Setting up demo testimonial data...')
        
        # Create some demo video testimonials (without actual video files for now)
        video_testimonials_data = [
            {
                'name': 'Dr. Rahman Ahmed',
                'location': 'Kolkata',
                'event': 'Wedding Photography',
                'date': 'December 2024',
                'rating': 5,
                'description': 'Amazing wedding photography experience',
                'order': 1
            },
            {
                'name': 'Nasir Uddin',
                'location': 'Delhi',
                'event': 'Pre-Wedding Shoot',
                'date': 'November 2024',
                'rating': 5,
                'description': 'Beautiful pre-wedding photography',
                'order': 2
            },
            {
                'name': 'Mrs. Fatima Begum',
                'location': 'Mumbai',
                'event': 'Wedding & Reception',
                'date': 'October 2024',
                'rating': 5,
                'description': 'Complete wedding coverage',
                'order': 3
            }
        ]
        
        for data in video_testimonials_data:
            video_testimonial, created = VideoTestimonial.objects.get_or_create(
                name=data['name'],
                defaults=data
            )
            if created:
                self.stdout.write(f'Created video testimonial: {video_testimonial.name}')
            else:
                self.stdout.write(f'Video testimonial already exists: {video_testimonial.name}')
        
        # Create some demo text testimonials
        text_testimonials_data = [
            {
                'name': 'Priya & Arjun Sharma',
                'location': 'Kolkata',
                'event': 'Wedding Photography',
                'date': 'December 2024',
                'rating': 5,
                'text': 'chobighar captured our wedding day with such artistry and emotion. Every photo tells our love story beautifully. Their attention to detail and professional approach made our special day even more memorable.',
                'order': 1
            },
            {
                'name': 'Sneha & Rohit Gupta',
                'location': 'Delhi',
                'event': 'Pre-Wedding Shoot',
                'date': 'November 2024',
                'rating': 5,
                'text': 'Outstanding pre-wedding shoot experience! The team made us feel so comfortable and natural. The photos exceeded our expectations and perfectly captured our personalities and love for each other.',
                'order': 2
            },
            {
                'name': 'Ananya & Vikash Roy',
                'location': 'Mumbai',
                'event': 'Wedding & Reception',
                'date': 'October 2024',
                'rating': 5,
                'text': 'Professional, creative, and absolutely wonderful to work with. They captured not just moments but emotions. Our families were so impressed with the quality and creativity of the photographs.',
                'order': 3
            },
            {
                'name': 'Ritu & Sameer Jain',
                'location': 'Pune',
                'event': 'Traditional Wedding',
                'date': 'September 2024',
                'rating': 5,
                'text': 'The team at chobighar is simply amazing! They were patient, professional, and captured every special moment of our mehendi and wedding ceremonies. Highly recommended for any special occasion.',
                'order': 4
            }
        ]
        
        for data in text_testimonials_data:
            text_testimonial, created = TextTestimonial.objects.get_or_create(
                name=data['name'],
                defaults=data
            )
            if created:
                self.stdout.write(f'Created text testimonial: {text_testimonial.name}')
            else:
                self.stdout.write(f'Text testimonial already exists: {text_testimonial.name}')
        
        self.stdout.write(self.style.SUCCESS('Demo testimonial data setup complete!'))
        self.stdout.write('Note: You can upload video files and images through the Django admin panel.')