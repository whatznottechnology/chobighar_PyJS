from django.core.management.base import BaseCommand
from homepage.models import FAQ

class Command(BaseCommand):
    help = 'Create demo FAQ data for chobighar website'

    def handle(self, *args, **options):
        # Clear existing FAQs
        FAQ.objects.all().delete()
        
        # Create demo FAQ data
        faqs_data = [
            {
                'question': "What photography packages do you offer for weddings?",
                'answer': "We offer comprehensive wedding photography packages including pre-wedding shoots, ceremony coverage, reception photography, and post-processing. Our packages range from basic coverage to premium all-day experiences with multiple photographers, videography, and same-day editing.",
                'order': 1,
                'keywords': "wedding photography, packages, pre-wedding, ceremony, reception"
            },
            {
                'question': "How far in advance should we book your services?",
                'answer': "We recommend booking our services 6-12 months in advance, especially for peak wedding seasons (October-March). This ensures your preferred date is available and gives us ample time to plan and prepare for your special day.",
                'order': 2,
                'keywords': "booking, advance, wedding season, availability"
            },
            {
                'question': "Do you provide services outside of Kolkata?",
                'answer': "Yes, we provide destination wedding photography services across India and internationally. Travel charges may apply for locations outside our base city. We're experienced in capturing weddings in various cultural settings and locations.",
                'order': 3,
                'keywords': "destination wedding, travel, Kolkata, international, cultural"
            },
            {
                'question': "What is included in your wedding photography service?",
                'answer': "Our wedding photography service includes professional photographers, high-resolution edited images, online gallery access, USB/DVD delivery, and basic photo editing. Premium packages also include videography, same-day highlights, and photo albums.",
                'order': 4,
                'keywords': "included services, high-resolution, online gallery, editing, videography"
            },
            {
                'question': "Can we customize our photography package?",
                'answer': "Absolutely! We understand every wedding is unique. We offer customizable packages where you can add or remove services based on your needs and budget. This includes additional photographers, extended hours, or special artistic requests.",
                'order': 5,
                'keywords': "customize, unique wedding, budget, additional photographers, artistic"
            },
            {
                'question': "How long does it take to receive our wedding photos?",
                'answer': "You'll receive a preview gallery with 30-50 edited highlights within 48-72 hours after your wedding. The complete edited gallery with 300-800 high-resolution images is typically delivered within 3-4 weeks.",
                'order': 6,
                'keywords': "delivery time, preview gallery, edited highlights, high-resolution, timeline"
            }
        ]
        
        created_count = 0
        for faq_data in faqs_data:
            faq, created = FAQ.objects.get_or_create(
                question=faq_data['question'],
                defaults={
                    'answer': faq_data['answer'],
                    'order': faq_data['order'],
                    'keywords': faq_data['keywords'],
                    'is_active': True
                }
            )
            
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'✓ Created FAQ: {faq.question[:50]}...')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'- FAQ already exists: {faq.question[:50]}...')
                )
        
        self.stdout.write(
            self.style.SUCCESS(f'\n🎉 Successfully created {created_count} FAQ entries!')
        )
        self.stdout.write(
            self.style.SUCCESS('FAQs are now available at: http://127.0.0.1:8000/api/homepage/faqs/')
        )