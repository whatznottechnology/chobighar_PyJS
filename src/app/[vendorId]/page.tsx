'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  MapPinIcon, 
  StarIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ChevronRightIcon,
  HomeIcon,
  CameraIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  TagIcon,
  ShareIcon,
  HeartIcon,
  PlayIcon,
  XMarkIcon,
  ArrowUpIcon,
  CalendarIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface VendorData {
  id: string;
  name: string;
  tagline: string;
  category: string;
  type: string;
  location: string;
  rating: number;
  reviews: number;
  priceRange: string;
  coverImage: string;
  profileImage: string;
  description: string;
  story: string;
  experience: string;
  specialties: string[];
  services: string[];
  highlights: string[];
  phone: string;
  email: string;
  website?: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  businessHours: {
    [key: string]: string;
  };
  portfolio: {
    id: string;
    title: string;
    image: string;
    category: string;
  }[];
  testimonials: {
    name: string;
    rating: number;
    review: string;
    date: string;
    event: string;
  }[];
  gallery: string[];
  videos?: string[];
  packages: {
    name: string;
    price: string;
    features: string[];
    popular?: boolean;
  }[];
}

export default function VendorProfile() {
  const params = useParams();
  const router = useRouter();
  const vendorId = params.vendorId as string;
  
  const [activeSection, setActiveSection] = useState('about');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    message: ''
  });

  // Refs for scroll navigation
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Sample vendor data
  const vendorData: { [key: string]: VendorData } = {
    'royal-palace-banquets': {
      id: 'royal-palace-banquets',
      name: 'Royal Palace Banquets',
      tagline: 'Where Dreams Meet Reality',
      category: 'banquet-halls',
      type: 'Banquet Hall',
      location: 'Salt Lake, Kolkata',
      rating: 4.8,
      reviews: 156,
      priceRange: '₹50,000 - ₹1,50,000',
      coverImage: '/img/1.jpg',
      profileImage: '/img/2.jpg',
      description: 'Royal Palace Banquets is Kolkata\'s premier wedding venue, offering luxury banquet facilities with modern amenities and traditional Bengali hospitality. Our elegant spaces are perfect for grand wedding celebrations.',
      story: 'Established in 2010, Royal Palace Banquets has been the preferred choice for over 1000+ couples. We understand that your wedding day is one of the most important days of your life, and we are committed to making it absolutely perfect.',
      experience: '13+ Years',
      specialties: ['Grand Wedding Celebrations', 'Corporate Events', 'Birthday Parties', 'Anniversary Celebrations'],
      services: ['AC Banquet Hall', 'Catering Services', 'Decoration', 'Valet Parking', 'Bridal Suite', 'Sound & Lighting', 'Photography Area', 'Guest Accommodation'],
      highlights: ['Capacity up to 800 guests', 'Fully air-conditioned halls', 'In-house catering team', 'Complimentary decoration', 'Ample parking space', '24/7 event support'],
      phone: '+91 98765 43210',
      email: 'info@royalpalacebanquets.com',
      website: 'www.royalpalacebanquets.com',
      socialMedia: {
        instagram: '@royalpalacebanquets',
        facebook: 'Royal Palace Banquets',
        youtube: 'Royal Palace Events'
      },
      businessHours: {
        'Monday': '9:00 AM - 9:00 PM',
        'Tuesday': '9:00 AM - 9:00 PM',
        'Wednesday': '9:00 AM - 9:00 PM',
        'Thursday': '9:00 AM - 9:00 PM',
        'Friday': '9:00 AM - 9:00 PM',
        'Saturday': '9:00 AM - 10:00 PM',
        'Sunday': '9:00 AM - 10:00 PM'
      },
      portfolio: [
        {
          id: 'priya-arjun-wedding',
          title: 'Priya & Arjun Wedding',
          image: '/img/1.jpg',
          category: 'Wedding'
        },
        {
          id: 'corporate-event-2024',
          title: 'Corporate Gala 2024',
          image: '/img/2.jpg',
          category: 'Corporate'
        },
        {
          id: 'golden-anniversary',
          title: 'Golden Anniversary',
          image: '/img/venues.jpg',
          category: 'Anniversary'
        }
      ],
      testimonials: [
        {
          name: 'Priya & Arjun',
          rating: 5,
          review: 'Royal Palace made our wedding absolutely magical! The staff was incredibly professional and the venue was beautifully decorated. Highly recommend!',
          date: '2 months ago',
          event: 'Wedding Reception'
        },
        {
          name: 'Rohit Sharma',
          rating: 5,
          review: 'Excellent service and beautiful venue. Our corporate event was a huge success thanks to their team.',
          date: '1 month ago',
          event: 'Corporate Event'
        },
        {
          name: 'Meera Devi',
          rating: 4,
          review: 'Great ambiance and good food quality. The hall was perfect for our anniversary celebration.',
          date: '3 weeks ago',
          event: 'Anniversary'
        }
      ],
      gallery: [
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/venues.jpg',
        '/img/food.jpg',
        '/img/photographers.jpg',
        '/img/makeup.jpg'
      ],
      videos: ['hT_nvWreIhg', 'dQw4w9WgXcQ'],
      packages: [
        {
          name: 'Silver Package',
          price: '₹50,000',
          features: ['Hall Rental (6 hours)', 'Basic Decoration', 'Sound System', 'Parking', 'Security']
        },
        {
          name: 'Gold Package',
          price: '₹85,000',
          features: ['Hall Rental (8 hours)', 'Premium Decoration', 'Sound & Lighting', 'Catering (50 pax)', 'Parking', 'Security', 'Bridal Suite'],
          popular: true
        },
        {
          name: 'Platinum Package',
          price: '₹1,50,000',
          features: ['Hall Rental (12 hours)', 'Luxury Decoration', 'Premium Sound & Lighting', 'Full Catering Service', 'Valet Parking', '24/7 Support', 'Bridal Suite', 'Photography Area', 'Guest Coordination']
        }
      ]
    },
    'moments-photography': {
      id: 'moments-photography',
      name: 'Moments Photography',
      tagline: 'Capturing Life\'s Beautiful Moments',
      category: 'photographers',
      type: 'Wedding Photography',
      location: 'Park Street, Kolkata',
      rating: 4.9,
      reviews: 89,
      priceRange: '₹25,000 - ₹75,000',
      coverImage: '/img/photographers.jpg',
      profileImage: '/img/2.jpg',
      description: 'Capturing beautiful moments with artistic vision and professional expertise. We specialize in wedding photography with a blend of traditional and contemporary styles.',
      story: 'Founded by passionate photographers, we have been documenting love stories for over 8 years. Our team believes in capturing not just images, but emotions and memories that last a lifetime.',
      experience: '8+ Years',
      specialties: ['Wedding Photography', 'Pre-Wedding Shoots', 'Candid Photography', 'Traditional Portraits'],
      services: ['Wedding Photography', 'Pre-Wedding Shoots', 'Candid Photography', 'Traditional Photography', 'Album Design', 'Video Coverage'],
      highlights: ['Award-winning photographers', 'Premium equipment', 'Same-day highlights', 'Custom albums', 'Drone photography', 'Professional editing'],
      phone: '+91 98765 43211',
      email: 'info@momentsphotography.com',
      website: 'www.momentsphotography.com',
      socialMedia: {
        instagram: '@momentsphotography',
        facebook: 'Moments Photography',
        youtube: 'Moments Studio'
      },
      businessHours: {
        'Monday': '10:00 AM - 8:00 PM',
        'Tuesday': '10:00 AM - 8:00 PM',
        'Wednesday': '10:00 AM - 8:00 PM',
        'Thursday': '10:00 AM - 8:00 PM',
        'Friday': '10:00 AM - 8:00 PM',
        'Saturday': '9:00 AM - 9:00 PM',
        'Sunday': '9:00 AM - 9:00 PM'
      },
      portfolio: [
        {
          id: 'wedding-shoot-1',
          title: 'Romantic Wedding',
          image: '/img/photographers.jpg',
          category: 'Wedding'
        },
        {
          id: 'prewedding-shoot-1',
          title: 'Pre-Wedding Story',
          image: '/img/prewedding.jpg',
          category: 'Pre-Wedding'
        },
        {
          id: 'candid-moments',
          title: 'Candid Captures',
          image: '/img/1.jpg',
          category: 'Candid'
        }
      ],
      testimonials: [
        {
          name: 'Riya & Aman',
          rating: 5,
          review: 'Absolutely stunning photography! They captured every emotion perfectly. Highly recommend Moments Photography!',
          date: '1 month ago',
          event: 'Wedding Photography'
        },
        {
          name: 'Sneha Gupta',
          rating: 5,
          review: 'Amazing pre-wedding shoot! The team was professional and made us feel comfortable throughout.',
          date: '2 weeks ago',
          event: 'Pre-Wedding'
        }
      ],
      gallery: [
        '/img/photographers.jpg',
        '/img/prewedding.jpg',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/venues.jpg',
        '/img/makeup.jpg'
      ],
      videos: ['hT_nvWreIhg'],
      packages: [
        {
          name: 'Basic Package',
          price: '₹25,000',
          features: ['6 hours coverage', 'Edited photos (200+)', 'Online gallery', 'Basic album']
        },
        {
          name: 'Premium Package',
          price: '₹45,000',
          features: ['8 hours coverage', 'Edited photos (400+)', 'Online gallery', 'Premium album', 'Same day highlights'],
          popular: true
        },
        {
          name: 'Luxury Package',
          price: '₹75,000',
          features: ['Full day coverage', 'Edited photos (600+)', 'Video coverage', 'Premium album', 'Same day highlights', 'Drone shots']
        }
      ]
    },
    'glamour-makeup-studio': {
      id: 'glamour-makeup-studio',
      name: 'Glamour Makeup Studio',
      tagline: 'Enhancing Your Natural Beauty',
      category: 'makeup',
      type: 'Bridal Makeup',
      location: 'Ballygunge, Kolkata',
      rating: 4.7,
      reviews: 134,
      priceRange: '₹15,000 - ₹40,000',
      coverImage: '/img/makeup.jpg',
      profileImage: '/img/2.jpg',
      description: 'Professional bridal makeup with premium products and expert techniques. We specialize in creating stunning bridal looks that enhance your natural beauty.',
      story: 'With over 10 years of experience in the beauty industry, our team of skilled makeup artists has transformed countless brides. We use only premium, long-lasting products to ensure you look perfect throughout your special day.',
      experience: '10+ Years',
      specialties: ['Bridal Makeup', 'Hair Styling', 'Saree Draping', 'Nail Art'],
      services: ['Bridal Makeup', 'Hair Styling', 'Saree Draping', 'Nail Art', 'Pre-Wedding Grooming', 'Family Makeup'],
      highlights: ['Premium makeup brands', 'Skilled artists', 'Trial sessions', 'On-location service', 'Hair styling included', 'Long-lasting finish'],
      phone: '+91 98765 43212',
      email: 'info@glamourmakeup.com',
      website: 'www.glamourmakeup.com',
      socialMedia: {
        instagram: '@glamourmakeup',
        facebook: 'Glamour Makeup Studio'
      },
      businessHours: {
        'Monday': '9:00 AM - 7:00 PM',
        'Tuesday': '9:00 AM - 7:00 PM',
        'Wednesday': '9:00 AM - 7:00 PM',
        'Thursday': '9:00 AM - 7:00 PM',
        'Friday': '9:00 AM - 7:00 PM',
        'Saturday': '8:00 AM - 8:00 PM',
        'Sunday': '8:00 AM - 8:00 PM'
      },
      portfolio: [
        {
          id: 'bridal-look-1',
          title: 'Classic Bridal Look',
          image: '/img/makeup.jpg',
          category: 'Bridal'
        },
        {
          id: 'modern-bride',
          title: 'Modern Bridal Style',
          image: '/img/bridalwear.jpg',
          category: 'Bridal'
        }
      ],
      testimonials: [
        {
          name: 'Priyanka Sharma',
          rating: 5,
          review: 'Amazing makeup! I felt like a princess on my wedding day. The team was professional and skilled.',
          date: '3 weeks ago',
          event: 'Bridal Makeup'
        },
        {
          name: 'Kavita Devi',
          rating: 4,
          review: 'Great service and beautiful results. The makeup lasted the entire day without touch-ups.',
          date: '1 month ago',
          event: 'Wedding Makeup'
        }
      ],
      gallery: [
        '/img/makeup.jpg',
        '/img/bridalwear.jpg',
        '/img/2.jpg',
        '/img/1.jpg'
      ],
      packages: [
        {
          name: 'Basic Bridal',
          price: '₹15,000',
          features: ['Bridal makeup', 'Basic hairstyle', '1 touch-up']
        },
        {
          name: 'Premium Bridal',
          price: '₹25,000',
          features: ['Bridal makeup', 'Hair styling', 'Saree draping', '2 touch-ups', 'Trial session'],
          popular: true
        },
        {
          name: 'Luxury Bridal',
          price: '₹40,000',
          features: ['Bridal makeup', 'Hair styling', 'Saree draping', 'Nail art', '3 touch-ups', 'Trial session', 'Family makeup (2 people)']
        }
      ]
    },
    'elegant-events': {
      id: 'elegant-events',
      name: 'Elegant Events & Decor',
      tagline: 'Creating Unforgettable Celebrations',
      category: 'planning',
      type: 'Wedding Planning',
      location: 'New Town, Kolkata',
      rating: 4.6,
      reviews: 98,
      priceRange: '₹30,000 - ₹2,00,000',
      coverImage: '/img/planning.jpg',
      profileImage: '/img/2.jpg',
      description: 'Complete wedding planning and decoration services with attention to detail. We handle every aspect of your wedding to make it a memorable celebration.',
      story: 'With a passion for creating magical moments, we have been planning dream weddings for over 7 years. Our experienced team ensures that every detail is perfectly executed.',
      experience: '7+ Years',
      specialties: ['Wedding Planning', 'Event Decoration', 'Vendor Coordination', 'Theme Weddings'],
      services: ['Event Planning', 'Decoration', 'Coordination', 'Vendor Management', 'Theme Design', 'Logistics Management'],
      highlights: ['End-to-end planning', 'Experienced team', 'Vendor network', 'Custom themes', '24/7 coordination', 'Budget management'],
      phone: '+91 98765 43213',
      email: 'info@elegantevents.com',
      website: 'www.elegantevents.com',
      socialMedia: {
        instagram: '@elegantevents',
        facebook: 'Elegant Events & Decor'
      },
      businessHours: {
        'Monday': '9:00 AM - 8:00 PM',
        'Tuesday': '9:00 AM - 8:00 PM',
        'Wednesday': '9:00 AM - 8:00 PM',
        'Thursday': '9:00 AM - 8:00 PM',
        'Friday': '9:00 AM - 8:00 PM',
        'Saturday': '9:00 AM - 9:00 PM',
        'Sunday': '10:00 AM - 6:00 PM'
      },
      portfolio: [
        {
          id: 'royal-wedding',
          title: 'Royal Theme Wedding',
          image: '/img/planning.jpg',
          category: 'Wedding'
        },
        {
          id: 'garden-wedding',
          title: 'Garden Wedding Setup',
          image: '/img/venues.jpg',
          category: 'Outdoor'
        }
      ],
      testimonials: [
        {
          name: 'Arjun & Meera',
          rating: 5,
          review: 'Elegant Events made our wedding absolutely perfect! They handled everything flawlessly and we could just enjoy our day.',
          date: '2 months ago',
          event: 'Wedding Planning'
        },
        {
          name: 'Rakesh Kumar',
          rating: 4,
          review: 'Professional team with great attention to detail. The decoration was exactly what we envisioned.',
          date: '1 month ago',
          event: 'Event Planning'
        }
      ],
      gallery: [
        '/img/planning.jpg',
        '/img/venues.jpg',
        '/img/1.jpg',
        '/img/2.jpg'
      ],
      packages: [
        {
          name: 'Basic Planning',
          price: '₹30,000',
          features: ['Event timeline', 'Vendor coordination', 'Basic decoration', 'Day-of coordination']
        },
        {
          name: 'Premium Planning',
          price: '₹75,000',
          features: ['Complete planning', 'Vendor management', 'Custom decoration', 'Full coordination', 'Budget management'],
          popular: true
        },
        {
          name: 'Luxury Planning',
          price: '₹2,00,000',
          features: ['End-to-end planning', 'Premium vendors', 'Luxury decoration', 'Full coordination', 'Guest management', 'Destination wedding support']
        }
      ]
    },
    'mehndi-artistry': {
      id: 'mehndi-artistry',
      name: 'Mehndi Artistry',
      tagline: 'Traditional Art, Modern Designs',
      category: 'mehndi',
      type: 'Bridal Mehndi',
      location: 'Gariahat, Kolkata',
      rating: 4.8,
      reviews: 76,
      priceRange: '₹8,000 - ₹25,000',
      coverImage: '/img/mehndi.jpg',
      profileImage: '/img/2.jpg',
      description: 'Intricate bridal mehndi designs with traditional and contemporary patterns. Our skilled artists create beautiful henna designs that complement your special day.',
      story: 'Specializing in the ancient art of mehndi for over 12 years, we blend traditional techniques with modern designs. Each design is crafted with love and precision.',
      experience: '12+ Years',
      specialties: ['Bridal Mehndi', 'Arabic Patterns', 'Floral Designs', 'Contemporary Art'],
      services: ['Bridal Mehndi', 'Family Mehndi', 'Floral Designs', 'Arabic Patterns', 'Traditional Designs', 'Party Mehndi'],
      highlights: ['Natural henna', 'Intricate designs', 'Quick service', 'Dark stain guaranteed', 'Bridal packages', 'Home service available'],
      phone: '+91 98765 43214',
      email: 'info@mehndiartistry.com',
      socialMedia: {
        instagram: '@mehndiartistry',
        facebook: 'Mehndi Artistry'
      },
      businessHours: {
        'Monday': '10:00 AM - 8:00 PM',
        'Tuesday': '10:00 AM - 8:00 PM',
        'Wednesday': '10:00 AM - 8:00 PM',
        'Thursday': '10:00 AM - 8:00 PM',
        'Friday': '10:00 AM - 8:00 PM',
        'Saturday': '9:00 AM - 9:00 PM',
        'Sunday': '9:00 AM - 9:00 PM'
      },
      portfolio: [
        {
          id: 'bridal-mehndi-1',
          title: 'Intricate Bridal Design',
          image: '/img/mehndi.jpg',
          category: 'Bridal'
        },
        {
          id: 'arabic-design',
          title: 'Arabic Patterns',
          image: '/img/1.jpg',
          category: 'Arabic'
        }
      ],
      testimonials: [
        {
          name: 'Sunita Rani',
          rating: 5,
          review: 'Beautiful mehndi design! The color was perfect and lasted for weeks. Highly recommended!',
          date: '2 weeks ago',
          event: 'Bridal Mehndi'
        },
        {
          name: 'Pooja Sharma',
          rating: 5,
          review: 'Amazing artistry! The design was exactly what I wanted. Very professional service.',
          date: '1 month ago',
          event: 'Wedding Mehndi'
        }
      ],
      gallery: [
        '/img/mehndi.jpg',
        '/img/1.jpg',
        '/img/2.jpg'
      ],
      packages: [
        {
          name: 'Basic Mehndi',
          price: '₹8,000',
          features: ['Simple bridal design', 'Both hands', 'Natural henna']
        },
        {
          name: 'Premium Mehndi',
          price: '₹15,000',
          features: ['Intricate bridal design', 'Hands and feet', 'Natural henna', 'Design consultation'],
          popular: true
        },
        {
          name: 'Luxury Mehndi',
          price: '₹25,000',
          features: ['Elaborate bridal design', 'Hands, feet and arms', 'Premium henna', 'Design consultation', 'Family mehndi (2 people)']
        }
      ]
    },
    'virtual-ceremonies': {
      id: 'virtual-ceremonies',
      name: 'Virtual Ceremonies',
      tagline: 'Connecting Hearts Across Distances',
      category: 'virtual',
      type: 'Live Streaming',
      location: 'Online Services',
      rating: 4.5,
      reviews: 45,
      priceRange: '₹5,000 - ₹20,000',
      coverImage: '/img/virtual.jpg',
      profileImage: '/img/2.jpg',
      description: 'Professional live streaming services for virtual wedding ceremonies. We help you connect with loved ones who cannot attend in person.',
      story: 'In today\'s connected world, we specialize in bringing families together through technology. Our team ensures high-quality streaming so no one misses your special moments.',
      experience: '5+ Years',
      specialties: ['Live Streaming', 'Virtual Ceremonies', 'Multi-Camera Setup', 'Recording Services'],
      services: ['Live Streaming', 'Virtual Ceremonies', 'Recording', 'Multi-Camera Setup', 'Audio Management', 'Online Invitations'],
      highlights: ['HD streaming', 'Multiple camera angles', 'Professional audio', 'Recording included', 'Technical support', 'Platform flexibility'],
      phone: '+91 98765 43215',
      email: 'info@virtualceremonies.com',
      website: 'www.virtualceremonies.com',
      socialMedia: {
        instagram: '@virtualceremonies',
        facebook: 'Virtual Ceremonies'
      },
      businessHours: {
        'Monday': '9:00 AM - 9:00 PM',
        'Tuesday': '9:00 AM - 9:00 PM',
        'Wednesday': '9:00 AM - 9:00 PM',
        'Thursday': '9:00 AM - 9:00 PM',
        'Friday': '9:00 AM - 9:00 PM',
        'Saturday': '8:00 AM - 10:00 PM',
        'Sunday': '8:00 AM - 10:00 PM'
      },
      portfolio: [
        {
          id: 'virtual-wedding-1',
          title: 'Online Wedding Ceremony',
          image: '/img/virtual.jpg',
          category: 'Virtual Wedding'
        },
        {
          id: 'hybrid-event',
          title: 'Hybrid Celebration',
          image: '/img/1.jpg',
          category: 'Hybrid Event'
        }
      ],
      testimonials: [
        {
          name: 'Rohit & Priya',
          rating: 5,
          review: 'Excellent service! Our family members abroad could participate in our wedding through their streaming service.',
          date: '1 month ago',
          event: 'Virtual Wedding'
        },
        {
          name: 'Amit Kumar',
          rating: 4,
          review: 'Professional setup and great quality streaming. Made our celebration truly inclusive.',
          date: '3 weeks ago',
          event: 'Live Streaming'
        }
      ],
      gallery: [
        '/img/virtual.jpg',
        '/img/1.jpg',
        '/img/2.jpg'
      ],
      packages: [
        {
          name: 'Basic Streaming',
          price: '₹5,000',
          features: ['Single camera', '2 hours streaming', 'HD quality', 'Recording included']
        },
        {
          name: 'Premium Streaming',
          price: '₹12,000',
          features: ['Multi-camera setup', '4 hours streaming', 'HD quality', 'Recording included', 'Audio optimization'],
          popular: true
        },
        {
          name: 'Professional Streaming',
          price: '₹20,000',
          features: ['Multi-camera setup', 'Full day streaming', '4K quality', 'Recording included', 'Audio optimization', 'Technical support', 'Live interaction features']
        }
      ]
    }
  };

  const vendor = vendorData[vendorId];

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      
      // Update active section based on scroll position
      const sections = ['about', 'services', 'portfolio', 'reviews', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({ name: '', phone: '', email: '', eventDate: '', message: '' });
  };

  if (!vendor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vendor Not Found</h1>
          <button 
            onClick={() => router.push('/vendors')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Vendors
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Modern Design */}
      <div className="relative bg-white">
        {/* Breadcrumb - Minimalist */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              <button 
                onClick={() => router.push('/')}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <HomeIcon className="w-4 h-4 mr-1" />
                Home
              </button>
              <ChevronRightIcon className="w-4 h-4 text-gray-300" />
              <button 
                onClick={() => router.push('/vendors')}
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                Vendors
              </button>
              <ChevronRightIcon className="w-4 h-4 text-gray-300" />
              <span className="text-red-600 font-medium">{vendor.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50"></div>
          <div className="relative container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                      {vendor.type}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{vendor.location}</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {vendor.name}
                  </h1>
                  <p className="text-xl text-gray-600 font-light">
                    {vendor.tagline}
                  </p>
                </div>

                {/* Rating & Stats */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <StarIconSolid key={i} className="w-5 h-5 text-yellow-400" />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">{vendor.rating}</span>
                    <span className="text-gray-500">({vendor.reviews} reviews)</span>
                  </div>
                  <div className="text-gray-300">|</div>
                  <div className="text-gray-600">
                    <span className="font-medium">{vendor.experience}</span> Experience
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed text-lg">
                  {vendor.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Get Quote
                  </button>
                  <button className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <PhoneIcon className="w-5 h-5" />
                    Call Now
                  </button>
                  <button className="bg-white text-gray-700 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                    <HeartIcon className="w-5 h-5" />
                  </button>
                  <button className="bg-white text-gray-700 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                    <ShareIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Content - Images */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transform rotate-3 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-500 z-10">
                      <Image
                        src={vendor.gallery[0]}
                        alt="Venue 1"
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl transform -rotate-2 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-500 z-10">
                      <Image
                        src={vendor.gallery[1]}
                        alt="Venue 2"
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-500 z-10">
                      <Image
                        src={vendor.gallery[2]}
                        alt="Venue 3"
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transform -rotate-1 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-500 z-10">
                      <Image
                        src={vendor.gallery[3]}
                        alt="Venue 4"
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                {/* Floating Stats */}
                <div className="absolute -bottom-6 left-6 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 z-30 hover:z-40 hover:scale-105 hover:shadow-3xl transition-all duration-300 cursor-pointer">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors">500+</div>
                    <div className="text-sm text-gray-600">Events Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Sticky Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center">
            <div className="inline-flex bg-gray-100 rounded-full p-1 my-4">
              {[
                { id: 'about', label: 'Overview', icon: SparklesIcon },
                { id: 'services', label: 'Services', icon: CheckCircleIcon },
                { id: 'portfolio', label: 'Gallery', icon: CameraIcon },
                { id: 'reviews', label: 'Reviews', icon: StarIcon },
                { id: 'contact', label: 'Contact', icon: PhoneIcon }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-red-600 hover:bg-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Overview Section */}
            <section ref={aboutRef} id="about" className="scroll-mt-24">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                      <SparklesIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                      <p className="text-gray-600">About {vendor.name}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Story */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Our Story</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {vendor.story}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Why Choose Us</h3>
                      <div className="space-y-3">
                        {vendor.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h3>
                    <div className="flex flex-wrap gap-3">
                      {vendor.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-red-50 to-pink-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium border border-red-100"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section ref={servicesRef} id="services" className="scroll-mt-24">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Services</h2>
                      <p className="text-gray-600">What we offer</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {vendor.services.map((service, index) => (
                      <div key={index} className="group p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                              src={
                                index === 0 ? '/img/venues.jpg' :
                                index === 1 ? '/img/food.jpg' :
                                index === 2 ? '/img/makeup.jpg' :
                                index === 3 ? '/img/planning.jpg' :
                                index === 4 ? '/img/photographers.jpg' :
                                index === 5 ? '/img/music.jpg' :
                                index === 6 ? '/img/1.jpg' :
                                '/img/2.jpg'
                              }
                              alt={service}
                              width={56}
                              height={56}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{service}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {index === 0 && "Elegant hall facilities with modern amenities"}
                              {index === 1 && "Professional catering with diverse menu"}
                              {index === 2 && "Complete decoration and styling services"}
                              {index === 3 && "Secure parking with valet services"}
                              {index === 4 && "Luxury bridal suite for preparations"}
                              {index === 5 && "Professional sound and lighting setup"}
                              {index === 6 && "Photography area with perfect lighting"}
                              {index === 7 && "Comfortable guest accommodation"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <section ref={portfolioRef} id="portfolio" className="scroll-mt-24">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                      <CameraIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
                      <p className="text-gray-600">Our beautiful spaces</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {vendor.gallery.map((image, index) => (
                      <div 
                        key={index} 
                        className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                        onClick={() => setSelectedImage(index)}
                      >
                        <Image
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <CameraIcon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section ref={reviewsRef} id="reviews" className="scroll-mt-24">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                      <StarIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                      <p className="text-gray-600">What our clients say</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {vendor.testimonials.map((testimonial, index) => (
                      <div key={index} className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-red-600 font-bold text-lg">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex">
                                    {Array.from({ length: 5 }, (_, i) => (
                                      <StarIconSolid 
                                        key={i} 
                                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">{testimonial.date}</span>
                                </div>
                              </div>
                              <span className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full font-medium">
                                {testimonial.event}
                              </span>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                              "{testimonial.review}"
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Review Summary */}
                  <div className="mt-8 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Satisfaction</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-3xl font-bold text-red-600">{vendor.rating}</div>
                          <div className="text-sm text-gray-600">Average Rating</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-red-600">{vendor.reviews}</div>
                          <div className="text-sm text-gray-600">Total Reviews</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-red-600">98%</div>
                          <div className="text-sm text-gray-600">Satisfaction Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section ref={contactRef} id="contact" className="scroll-mt-24">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                      <PhoneIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Get In Touch</h2>
                      <p className="text-gray-600">Ready to plan your event?</p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                            placeholder="Your Name"
                          />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                            placeholder="Phone Number"
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                            placeholder="Email Address"
                          />
                          <input
                            type="date"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                          />
                        </div>
                        
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                          placeholder="Tell us about your event requirements..."
                        ></textarea>
                        
                        <button
                          type="submit"
                          className="w-full bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                        >
                          Send Message
                        </button>
                      </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                              <PhoneIcon className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Phone</div>
                              <a href={`tel:${vendor.phone}`} className="text-gray-600 hover:text-red-600">
                                {vendor.phone}
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                              <EnvelopeIcon className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Email</div>
                              <a href={`mailto:${vendor.email}`} className="text-gray-600 hover:text-red-600">
                                {vendor.email}
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                              <MapPinIcon className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Location</div>
                              <div className="text-gray-600">{vendor.location}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white">
                        <h4 className="font-semibold mb-4">Why Choose Us?</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Response Time:</span>
                            <span className="font-medium">Within 2 hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Free Consultation:</span>
                            <span className="font-medium">Yes</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Price Range:</span>
                            <span className="font-medium">{vendor.priceRange}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Quick Info Card */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price Range</span>
                    <span className="font-semibold text-gray-900">{vendor.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold text-gray-900">{vendor.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold text-gray-900">{vendor.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center gap-1">
                      <StarIconSolid className="w-4 h-4 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{vendor.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Events Done</span>
                    <span className="font-semibold text-gray-900">500+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity</span>
                    <span className="font-semibold text-gray-900">800 Guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-semibold text-green-600">2 Hours</span>
                  </div>
                </div>
              </div>

              {/* Specialties Card */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl border border-red-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <SparklesIcon className="w-5 h-5 text-red-600" />
                  Specialties
                </h3>
                <div className="space-y-2">
                  {vendor.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={vendor.gallery[selectedImage]}
              alt={`Gallery ${selectedImage + 1}`}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-40"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </main>
  );
}