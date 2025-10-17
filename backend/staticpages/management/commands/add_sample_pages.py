from django.core.management.base import BaseCommand
from staticpages.models import StaticPage


class Command(BaseCommand):
    help = 'Creates sample static pages for legal/policy content'

    def handle(self, *args, **kwargs):
        pages_data = [
            {
                'title': 'Terms & Conditions',
                'slug': 'terms-and-conditions',
                'content': '''
                    <h2>Terms and Conditions</h2>
                    <p>Welcome to chobighar! These terms and conditions outline the rules and regulations for the use of our services.</p>
                    
                    <h3>1. Services</h3>
                    <p>chobighar provides photography, videography, and event management services for weddings and special occasions.</p>
                    
                    <h3>2. Booking and Payment</h3>
                    <p>All bookings require an advance payment of 50% of the total package cost. The remaining balance must be paid before or on the event day.</p>
                    
                    <h3>3. Cancellation Policy</h3>
                    <p>Cancellations made 30 days prior to the event will receive a 75% refund. Cancellations within 30 days are non-refundable.</p>
                    
                    <h3>4. Copyright and Ownership</h3>
                    <p>All photographs and videos remain the intellectual property of chobighar. Clients receive usage rights for personal use only.</p>
                    
                    <h3>5. Liability</h3>
                    <p>chobighar is not liable for circumstances beyond our control, including but not limited to natural disasters, venue restrictions, or equipment failure due to external factors.</p>
                ''',
                'meta_keywords': 'terms, conditions, chobighar, photography, booking',
                'display_order': 1
            },
            {
                'title': 'Privacy Policy',
                'slug': 'privacy-policy',
                'content': '''
                    <h2>Privacy Policy</h2>
                    <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.</p>
                    
                    <h3>Information We Collect</h3>
                    <p>We collect information you provide when booking our services, including name, contact details, event information, and payment details.</p>
                    
                    <h3>How We Use Your Information</h3>
                    <ul>
                        <li>To provide and manage our services</li>
                        <li>To communicate with you about your booking</li>
                        <li>To process payments</li>
                        <li>To improve our services</li>
                        <li>To send promotional materials (with your consent)</li>
                    </ul>
                    
                    <h3>Data Security</h3>
                    <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
                    
                    <h3>Third-Party Sharing</h3>
                    <p>We do not sell or rent your personal information to third parties. We may share information with service providers who assist us in our operations.</p>
                    
                    <h3>Your Rights</h3>
                    <p>You have the right to access, correct, or delete your personal information. Contact us at privacy@chobighar.com for any requests.</p>
                ''',
                'meta_keywords': 'privacy, policy, data protection, chobighar',
                'display_order': 2
            },
            {
                'title': 'Refund & Cancellation Policy',
                'slug': 'refund-policy',
                'content': '''
                    <h2>Refund & Cancellation Policy</h2>
                    
                    <h3>Cancellation by Client</h3>
                    <ul>
                        <li><strong>More than 60 days before event:</strong> 90% refund of advance paid</li>
                        <li><strong>30-60 days before event:</strong> 75% refund of advance paid</li>
                        <li><strong>15-30 days before event:</strong> 50% refund of advance paid</li>
                        <li><strong>Less than 15 days before event:</strong> No refund</li>
                    </ul>
                    
                    <h3>Cancellation by chobighar</h3>
                    <p>In the unlikely event that chobighar needs to cancel your booking, you will receive a full refund of all payments made.</p>
                    
                    <h3>Refund Process</h3>
                    <p>Approved refunds will be processed within 7-10 business days to the original payment method.</p>
                    
                    <h3>Rescheduling</h3>
                    <p>Events can be rescheduled once without penalty if done at least 30 days before the original date, subject to photographer availability.</p>
                ''',
                'meta_keywords': 'refund, cancellation, policy, chobighar',
                'display_order': 3
            },
            {
                'title': 'Shipping & Delivery Policy',
                'slug': 'shipping-policy',
                'content': '''
                    <h2>Shipping & Delivery Policy</h2>
                    
                    <h3>Digital Deliverables</h3>
                    <p>All edited photos and videos are delivered digitally through a secure online gallery or cloud storage link within the specified timeline mentioned in your package.</p>
                    
                    <h3>Delivery Timeline</h3>
                    <ul>
                        <li><strong>Wedding Photography:</strong> 30-45 days from event date</li>
                        <li><strong>Wedding Videography:</strong> 60-90 days from event date</li>
                        <li><strong>Pre-wedding Shoots:</strong> 15-20 days from shoot date</li>
                        <li><strong>Portrait Sessions:</strong> 10-15 days from shoot date</li>
                    </ul>
                    
                    <h3>Physical Products</h3>
                    <p>If your package includes physical albums, prints, or other products:</p>
                    <ul>
                        <li><strong>Albums:</strong> 60-90 days from design approval</li>
                        <li><strong>Prints & Frames:</strong> 15-20 days from order placement</li>
                        <li><strong>USB/Pen Drive:</strong> Delivered with album or within 45 days</li>
                    </ul>
                    
                    <h3>Shipping</h3>
                    <p>Physical products are shipped via courier to your registered address. Shipping charges may apply for locations outside Kolkata.</p>
                ''',
                'meta_keywords': 'shipping, delivery, photos, videos, chobighar',
                'display_order': 4
            },
        ]
        
        created_count = 0
        updated_count = 0
        
        for page_data in pages_data:
            page, created = StaticPage.objects.update_or_create(
                slug=page_data['slug'],
                defaults=page_data
            )
            
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'✓ Created: {page.title}'))
            else:
                updated_count += 1
                self.stdout.write(self.style.WARNING(f'↻ Updated: {page.title}'))
        
        self.stdout.write(self.style.SUCCESS(f'\n📄 Summary: {created_count} created, {updated_count} updated'))
        self.stdout.write(self.style.SUCCESS('✅ Sample static pages setup complete!'))
