from django.core.management.base import BaseCommand
from blog.models import BlogCategory, BlogPost
from django.utils import timezone
from datetime import timedelta


class Command(BaseCommand):
    help = 'Add sample blog posts for testing'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Creating sample blog categories and posts...'))

        # Create Categories
        categories_data = [
            {
                'name': 'Wedding Photography',
                'description': 'Tips and insights about wedding photography',
                'icon': '💒',
                'meta_title': 'Wedding Photography Tips & Ideas | chobighar Blog',
                'meta_description': 'Discover expert wedding photography tips, trends, and inspiration for your special day.'
            },
            {
                'name': 'Photography Tips',
                'description': 'Professional photography tips and techniques',
                'icon': '📸',
                'meta_title': 'Photography Tips & Techniques | chobighar Blog',
                'meta_description': 'Learn professional photography tips and techniques to capture stunning photos.'
            },
            {
                'name': 'Behind the Scenes',
                'description': 'Behind the scenes of our photoshoots',
                'icon': '🎬',
                'meta_title': 'Behind the Scenes | chobighar Blog',
                'meta_description': 'Go behind the scenes of our photoshoots and see how we create magic.'
            },
            {
                'name': 'Real Weddings',
                'description': 'Stories from real weddings we have covered',
                'icon': '💍',
                'meta_title': 'Real Wedding Stories | chobighar Blog',
                'meta_description': 'Explore beautiful real wedding stories and ceremonies captured by chobighar.'
            },
        ]

        categories = {}
        for cat_data in categories_data:
            category, created = BlogCategory.objects.get_or_create(
                name=cat_data['name'],
                defaults=cat_data
            )
            categories[cat_data['name']] = category
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created category: {category.name}'))
            else:
                self.stdout.write(f'Category already exists: {category.name}')

        # Create Blog Posts
        blog_posts_data = [
            {
                'title': '10 Essential Tips for Perfect Wedding Photography',
                'category': categories['Wedding Photography'],
                'excerpt': 'Wedding photography is an art that requires skill, patience, and creativity. Here are our top 10 tips to capture those magical moments perfectly.',
                'content': '''<h2>Introduction</h2>
<p>Wedding photography is one of the most challenging yet rewarding forms of photography. Every moment is precious, and there's no room for retakes. Here are our top 10 essential tips to help you capture those magical moments perfectly.</p>

<h3>1. Scout the Venue Beforehand</h3>
<p>Always visit the wedding venue before the big day. This helps you identify the best spots for photos, understand the lighting conditions, and plan your shots accordingly.</p>

<h3>2. Create a Shot List</h3>
<p>Work with the couple to create a comprehensive shot list. This ensures you don't miss any important moments or family combinations they want captured.</p>

<h3>3. Prepare for All Lighting Conditions</h3>
<p>Weddings happen in various lighting conditions - bright outdoor sunlight, dimly lit churches, or evening receptions. Always carry the right equipment and be prepared to adapt.</p>

<h3>4. Capture Candid Moments</h3>
<p>While posed photos are important, the candid moments often tell the best stories. Keep your camera ready to capture genuine emotions and spontaneous interactions.</p>

<h3>5. Pay Attention to Details</h3>
<p>Don't forget to photograph the small details - the rings, decorations, flowers, and other elements that the couple has carefully chosen. These shots add depth to the wedding album.</p>

<h3>6. Work with the Timeline</h3>
<p>Understand the wedding timeline and position yourself strategically for key moments like the first kiss, cake cutting, and first dance.</p>

<h3>7. Direct with Confidence</h3>
<p>Sometimes you need to take charge and direct people, especially during group photos. Be confident but friendly in your instructions.</p>

<h3>8. Have Backup Equipment</h3>
<p>Always bring backup cameras, lenses, batteries, and memory cards. You can't afford technical failures on a wedding day.</p>

<h3>9. Build Rapport with the Couple</h3>
<p>The more comfortable the couple is with you, the better your photos will be. Take time to build a connection and make them feel at ease.</p>

<h3>10. Edit Thoughtfully</h3>
<p>Post-processing is crucial. Develop a consistent editing style that enhances the photos while maintaining a natural look.</p>

<h2>Conclusion</h2>
<p>Wedding photography is a beautiful journey that allows you to be part of one of the most important days in people's lives. With these tips and continuous practice, you'll be able to capture stunning wedding memories that couples will treasure forever.</p>''',
                'tags': 'wedding, photography, tips, professional, guide',
                'author': 'chobighar Team',
                'reading_time': 8,
                'is_featured': True,
                'status': 'published',
                'meta_title': '10 Essential Wedding Photography Tips | chobighar Blog',
                'meta_description': 'Master wedding photography with these 10 essential tips from professional photographers. Learn how to capture perfect wedding moments.',
                'meta_keywords': 'wedding photography, photography tips, wedding photographer, professional photography',
            },
            {
                'title': 'How to Choose the Perfect Wedding Photographer',
                'category': categories['Wedding Photography'],
                'excerpt': 'Choosing the right wedding photographer is one of the most important decisions you\'ll make. Here\'s our guide to finding the perfect match for your special day.',
                'content': '''<h2>Why Your Wedding Photographer Matters</h2>
<p>Your wedding photos will be the lasting memories of your special day. Long after the flowers have wilted and the cake has been eaten, your photos will remain to tell your love story.</p>

<h3>Start Your Search Early</h3>
<p>The best wedding photographers book up quickly, sometimes a year or more in advance. Start your search as soon as you've set your wedding date.</p>

<h3>Review Their Portfolio</h3>
<p>Look at complete wedding albums, not just highlight reels. This gives you a true sense of their work throughout an entire event.</p>

<h3>Check Their Style</h3>
<p>Different photographers have different styles - traditional, photojournalistic, artistic, or vintage. Choose someone whose style matches your vision.</p>

<h3>Meet in Person</h3>
<p>Schedule meetings with your top choices. You'll be spending your entire wedding day with this person, so personality fit is crucial.</p>

<h3>Understand the Packages</h3>
<p>Review what's included: hours of coverage, number of photographers, engagement session, albums, prints, and digital files.</p>

<h3>Read Reviews and References</h3>
<p>Check online reviews and ask for references from recent clients. This provides insights into their professionalism and reliability.</p>

<h3>Discuss Your Vision</h3>
<p>Share your Pinterest boards, must-have shots, and any specific requests. A good photographer will listen and incorporate your ideas.</p>

<h2>Final Thoughts</h2>
<p>Choosing a wedding photographer is about finding someone who understands your vision, fits your budget, and makes you feel comfortable. Trust your instincts and choose someone who excites you about your wedding photos!</p>''',
                'tags': 'wedding, photographer, guide, tips, planning',
                'author': 'chobighar Team',
                'reading_time': 6,
                'is_featured': True,
                'status': 'published',
                'meta_title': 'How to Choose the Perfect Wedding Photographer | Guide',
                'meta_description': 'Complete guide to choosing the right wedding photographer for your special day. Tips on style, budget, and what to look for.',
                'meta_keywords': 'wedding photographer, choose photographer, wedding planning, photography guide',
            },
            {
                'title': 'Understanding Natural Light in Photography',
                'category': categories['Photography Tips'],
                'excerpt': 'Natural light can make or break a photograph. Learn how to use it to your advantage and create stunning images in any situation.',
                'content': '''<h2>The Power of Natural Light</h2>
<p>Natural light is one of the most beautiful and versatile tools in photography. Understanding how to work with it can transform your images from ordinary to extraordinary.</p>

<h3>Golden Hour Magic</h3>
<p>The hour after sunrise and before sunset provides the most flattering light for portraits. The warm, soft glow creates beautiful skin tones and long, dramatic shadows.</p>

<h3>Blue Hour Beauty</h3>
<p>The period just before sunrise and after sunset offers a magical blue light that's perfect for atmospheric shots and cityscapes.</p>

<h3>Overcast Days Are Your Friend</h3>
<p>Don't pack away your camera on cloudy days! Overcast skies act as a giant softbox, providing even, flattering light perfect for portraits.</p>

<h3>Window Light Techniques</h3>
<p>Window light is incredibly versatile for indoor photography. Position your subject at different angles to the window for various effects - from dramatic side lighting to soft, wraparound light.</p>

<h3>Harsh Midday Sun</h3>
<p>While challenging, midday sun can create bold, dramatic images. Use it for high-contrast black and white photography or find creative ways to use the strong shadows.</p>

<h3>Backlighting for Drama</h3>
<p>Positioning your subject between you and the light source creates a beautiful rim light effect and can produce stunning silhouettes.</p>

<h2>Practice and Experiment</h2>
<p>The best way to master natural light is through practice. Observe how light changes throughout the day and in different weather conditions. Soon, you'll instinctively know the best light for any situation.</p>''',
                'tags': 'photography, lighting, natural light, tips, techniques',
                'author': 'chobighar Team',
                'reading_time': 5,
                'is_featured': True,
                'status': 'published',
                'meta_title': 'Understanding Natural Light in Photography | Tips & Techniques',
                'meta_description': 'Master natural light photography with our comprehensive guide. Learn golden hour, window light, and more techniques.',
                'meta_keywords': 'natural light, photography techniques, lighting tips, golden hour',
            },
            {
                'title': 'Behind the Lens: A Day in Wedding Photography',
                'category': categories['Behind the Scenes'],
                'excerpt': 'Ever wondered what goes on behind the scenes during a wedding shoot? Join us for a day in the life of a wedding photographer.',
                'content': '''<h2>The Wedding Day Begins</h2>
<p>A wedding photographer's day starts long before the ceremony. Here's a glimpse into what really happens behind the lens.</p>

<h3>5:00 AM - Preparation</h3>
<p>The alarm rings early. We check all equipment, pack backup gear, charge batteries, and format memory cards. Preparation is everything.</p>

<h3>7:00 AM - Bridal Prep</h3>
<p>Capturing the bride getting ready is magical. The excitement, nervous laughter, and emotional moments with bridesmaids create beautiful candid shots.</p>

<h3>9:00 AM - Detail Shots</h3>
<p>While hair and makeup continue, we photograph the dress, shoes, jewelry, and other carefully chosen details. These shots set the scene for the wedding album.</p>

<h3>11:00 AM - First Look</h3>
<p>If the couple chooses to do a first look, this is one of the most emotional moments. We position ourselves to capture the pure, genuine reaction.</p>

<h3>1:00 PM - Ceremony Time</h3>
<p>This is it - the main event. We're constantly moving, anticipating moments, and capturing every precious second while staying invisible.</p>

<h3>3:00 PM - Group Photos</h3>
<p>Family photos require organization and patience. We work efficiently to get everyone through quickly while ensuring great shots.</p>

<h3>5:00 PM - Couple Portraits</h3>
<p>Finally, time alone with the couple. We find beautiful locations and help them relax to capture natural, romantic moments.</p>

<h3>7:00 PM - Reception</h3>
<p>The energy is high! We capture speeches, dancing, cake cutting, and all the joy and celebration.</p>

<h3>11:00 PM - Day's End</h3>
<p>As the reception winds down, we pack up exhausted but happy, knowing we've captured memories that will last a lifetime.</p>

<h2>The Real Work Begins</h2>
<p>Back home, we backup all files immediately. Then comes the editing process - selecting the best shots and enhancing them to perfection. A single wedding day results in weeks of work, but seeing the couple's joy when they receive their photos makes it all worthwhile.</p>''',
                'tags': 'behind the scenes, wedding, photography, workflow, day in life',
                'author': 'chobighar Team',
                'reading_time': 7,
                'is_featured': False,
                'status': 'published',
                'meta_title': 'Behind the Scenes: A Day in Wedding Photography',
                'meta_description': 'Go behind the scenes and experience a full day of wedding photography from preparation to final shots.',
                'meta_keywords': 'wedding photography, behind the scenes, photographer life, wedding day',
            },
            {
                'title': 'Priya & Rahul: A Beautiful Bengali Wedding Story',
                'category': categories['Real Weddings'],
                'excerpt': 'A gorgeous celebration of love, culture, and tradition. Follow Priya and Rahul\'s beautiful Bengali wedding journey through our lens.',
                'content': '''<h2>A Love Story Begins</h2>
<p>Priya and Rahul's wedding was a beautiful celebration of Bengali culture and tradition. From the vibrant colors to the emotional rituals, every moment was filled with love and joy.</p>

<h3>The Gaye Holud</h3>
<p>The pre-wedding ceremony was a riot of colors. Priya looked radiant in her yellow saree as family and friends applied turmeric paste, blessing her for the upcoming wedding.</p>

<h3>The Wedding Day</h3>
<p>The morning began with the traditional rituals. Priya's shankha pola ceremony was deeply emotional, with her mother and aunts blessing her as she prepared to start her new life.</p>

<h3>The Baarat</h3>
<p>Rahul arrived with his family in a grand procession. The energy was infectious as everyone danced to dhol beats and welcomed the groom with traditional aarti.</p>

<h3>Subho Drishti</h3>
<p>The moment Priya and Rahul first saw each other, covered by betel leaves, was pure magic. The anticipation, then the joy and tears - we captured every emotion.</p>

<h3>The Pheras</h3>
<p>As they walked around the sacred fire, promising to be together through life's journey, there wasn't a dry eye in the venue. The love and commitment were palpable.</p>

<h3>The Reception</h3>
<p>The evening celebration was grand and joyful. Priya looked stunning in her reception outfit, and the couple's first dance as husband and wife was magical.</p>

<h2>Memories to Treasure</h2>
<p>Priya and Rahul's wedding reminded us why we love what we do. Being part of such beautiful celebrations and preserving these precious memories is truly an honor.</p>

<blockquote>
"chobighar didn't just photograph our wedding; they captured our emotions, our joy, and our love story. Every photo takes us back to that magical day." - Priya & Rahul
</blockquote>''',
                'tags': 'real wedding, Bengali wedding, wedding story, tradition, culture',
                'author': 'chobighar Team',
                'reading_time': 6,
                'is_featured': False,
                'status': 'published',
                'meta_title': 'Priya & Rahul: A Beautiful Bengali Wedding Story',
                'meta_description': 'Experience Priya and Rahul\'s gorgeous Bengali wedding celebration captured by chobighar. A story of love, culture, and tradition.',
                'meta_keywords': 'Bengali wedding, real wedding, wedding story, traditional wedding',
            },
            {
                'title': '5 Pose Ideas for Couple Photography',
                'category': categories['Photography Tips'],
                'excerpt': 'Make your couple portraits stand out with these creative and natural pose ideas that work for any couple.',
                'content': '''<h2>Natural Posing for Couples</h2>
<p>Great couple photography is about capturing genuine connection, not stiff, awkward poses. Here are five pose ideas that feel natural and look beautiful.</p>

<h3>1. The Walking Shot</h3>
<p>Have the couple walk towards you, hand in hand. This creates natural movement and conversation, resulting in candid, joyful expressions. Ask them to whisper sweet nothings or share a private joke.</p>

<h3>2. The Embrace from Behind</h3>
<p>One partner stands behind the other, arms wrapped around their waist. This intimate pose works beautifully in any location and always looks romantic and natural.</p>

<h3>3. Forehead Touch</h3>
<p>Ask the couple to close their eyes and touch foreheads. This creates an incredibly intimate moment that photographs beautifully from multiple angles.</p>

<h3>4. The Twirl</h3>
<p>Perfect for capturing movement and joy! Have one partner twirl the other. The resulting smiles and laughter are always genuine and beautiful.</p>

<h3>5. The Quiet Moment</h3>
<p>Sometimes the best photos come from stillness. Ask the couple to simply be together, looking at each other or the scenery. These quiet moments often capture the deepest emotions.</p>

<h2>The Key to Great Poses</h2>
<p>Remember, the best poses don't feel like poses at all. Encourage interaction, conversation, and genuine emotion. Your job is to create situations where authentic moments can happen, then capture them beautifully.</p>

<h3>Pro Tips</h3>
<ul>
<li>Give couples something to do rather than "pose"</li>
<li>Keep them talking and laughing</li>
<li>Demonstrate poses yourself</li>
<li>Shoot continuously to capture in-between moments</li>
<li>Always adjust for the couple's comfort level</li>
</ul>''',
                'tags': 'couple photography, poses, tips, portrait, techniques',
                'author': 'chobighar Team',
                'reading_time': 4,
                'is_featured': False,
                'status': 'published',
                'meta_title': '5 Natural Pose Ideas for Couple Photography',
                'meta_description': 'Discover creative and natural couple photography pose ideas that capture genuine connection and emotion.',
                'meta_keywords': 'couple poses, photography poses, portrait photography, couple photography',
            },
        ]

        for i, post_data in enumerate(blog_posts_data, 1):
            # Set published_date with different dates
            published_date = timezone.now() - timedelta(days=len(blog_posts_data) - i)
            post_data['published_date'] = published_date

            post, created = BlogPost.objects.get_or_create(
                title=post_data['title'],
                defaults=post_data
            )
            
            if created:
                self.stdout.write(self.style.SUCCESS(f'✓ Created blog post: {post.title}'))
            else:
                self.stdout.write(f'  Blog post already exists: {post.title}')

        self.stdout.write(self.style.SUCCESS('\n✅ Sample blog data creation complete!'))
        self.stdout.write(self.style.SUCCESS(f'Created {len(categories_data)} categories'))
        self.stdout.write(self.style.SUCCESS(f'Created {len(blog_posts_data)} blog posts'))
        self.stdout.write(self.style.WARNING('\n📝 Note: You can add images to blog posts through the Django admin panel.'))
