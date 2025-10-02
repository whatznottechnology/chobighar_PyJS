from django.core.management.base import BaseCommand
from contact.models import ContactUsHero, ContactUsInfo, WhyChooseUs, ContactTestimonial

class Command(BaseCommand):
    help = 'Setup demo contact page data'

    def handle(self, *args, **options):
        # Create Hero Data
        hero, created = ContactUsHero.objects.get_or_create(
            defaults={
                'main_title': "Let's Create Something Beautiful",
                'subtitle': 'Ready to capture your precious moments?',
                'description': 'Ready to capture your precious moments? Get in touch with our creative team and let\'s discuss how we can bring your vision to life with our signature Bengali artistry.',
                'is_active': True
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS('Created hero section data'))
        else:
            self.stdout.write(self.style.WARNING('Hero section data already exists'))

        # Create Contact Info
        contact_info, created = ContactUsInfo.objects.get_or_create(
            defaults={
                'primary_phone': '+91 96479 66765',
                'secondary_phone': '+91 98765 43210',
                'primary_email': 'booking@chobighar.com',
                'secondary_email': 'info@chobighar.com',
                'whatsapp_number': '+91 96479 66765',
                'address_line1': 'Sector 5, Salt Lake City',
                'address_line2': 'Kolkata, West Bengal 700091',
                'city': 'Kolkata',
                'state': 'West Bengal',
                'postal_code': '700091',
                'country': 'India',
                'weekday_hours': 'Mon - Sat: 10 AM - 7 PM',
                'weekend_hours': 'Sun: 11 AM - 5 PM',
                'emergency_note': 'Emergency shoots available',
                'phone_label': 'Call Us',
                'email_label': 'Email Us',
                'address_label': 'Visit Us',
                'hours_label': 'Office Hours',
                'phone_description': 'Available 9 AM - 9 PM',
                'email_description': 'We respond within 24 hours',
                'address_description': 'By appointment only',
                'google_map_url': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0929455463855!2d88.36320731495713!3d22.576484185188667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027579f4b6c5e3%3A0x5d9f4a1a5d9e8a1a!2sSector%20V%2C%20Bidhannagar%2C%20Kolkata%2C%20West%20Bengal%20700091!5e0!3m2!1sen!2sin!4v1635746400000!5m2!1sen!2sin',
                'map_height': 400,
                'is_active': True
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS('Created contact info data'))
        else:
            self.stdout.write(self.style.WARNING('Contact info data already exists'))

        # Create Why Choose Us Points
        why_choose_us_points = [
            {'point': '5+ years of professional experience', 'order': 1},
            {'point': 'Bengali traditional artistry with modern techniques', 'order': 2},
            {'point': 'Personalized packages for every budget', 'order': 3},
            {'point': 'Quick turnaround with high-quality results', 'order': 4},
            {'point': '500+ happy clients across Bengal', 'order': 5}
        ]

        created_count = 0
        for point_data in why_choose_us_points:
            point, created = WhyChooseUs.objects.get_or_create(
                point=point_data['point'],
                defaults={
                    'order': point_data['order'],
                    'is_active': True
                }
            )
            if created:
                created_count += 1

        if created_count > 0:
            self.stdout.write(self.style.SUCCESS(f'Created {created_count} why choose us points'))
        else:
            self.stdout.write(self.style.WARNING('Why choose us points already exist'))

        # Create Testimonials
        testimonials = [
            {
                'name': 'Priya & Arjun',
                'service': 'Wedding Photography',
                'rating': 5,
                'comment': 'chobighar captured our special day beautifully! Their Bengali traditional touch made our photos truly memorable.',
                'order': 1
            },
            {
                'name': 'Rohan Das',
                'service': 'Portrait Session',
                'rating': 5,
                'comment': 'Professional, creative, and understanding. They knew exactly how to bring out the best in every shot.',
                'order': 2
            },
            {
                'name': 'Anita Sharma',
                'service': 'Pre-Wedding Shoot',
                'rating': 5,
                'comment': 'The team is incredibly talented. Our pre-wedding photos exceeded all expectations!',
                'order': 3
            }
        ]

        created_count = 0
        for testimonial_data in testimonials:
            testimonial, created = ContactTestimonial.objects.get_or_create(
                name=testimonial_data['name'],
                defaults={
                    'service': testimonial_data['service'],
                    'rating': testimonial_data['rating'],
                    'comment': testimonial_data['comment'],
                    'order': testimonial_data['order'],
                    'is_active': True
                }
            )
            if created:
                created_count += 1

        if created_count > 0:
            self.stdout.write(self.style.SUCCESS(f'Created {created_count} testimonials'))
        else:
            self.stdout.write(self.style.WARNING('Testimonials already exist'))

        self.stdout.write(self.style.SUCCESS('Contact page demo data setup complete!'))