'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { 
  MapPinIcon, 
  StarIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ChevronRightIcon,
  HomeIcon,
  CalendarIcon,
  UserIcon,
  CheckCircleIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface VendorCategoryData {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  totalCount: number;
  icon: string;
}

interface VendorProfile {
  id: string;
  name: string;
  type: string;
  location: string;
  rating: number;
  reviews: number;
  priceRange: string;
  image: string;
  description: string;
  services: string[];
  capacity?: string;
  phone: string;
  email: string;
  featured: boolean;
}

export default function VendorCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categorySlug = params.category as string;
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    message: ''
  });

  // Category data mapping
  const categoryData: { [key: string]: VendorCategoryData } = {
    // Venues & Spaces
    'banquet-halls': {
      id: 'banquet-halls',
      title: 'Banquet Halls',
      description: 'Elegant banquet halls for your perfect wedding celebration with modern amenities and traditional hospitality.',
      heroImage: '/img/1.jpg',
      totalCount: 120,
      icon: '🏛️'
    },
    'marriage-garden---lawns': {
      id: 'marriage-garden---lawns',
      title: 'Marriage Garden / Lawns',
      description: 'Beautiful outdoor venues with lush gardens perfect for traditional wedding ceremonies.',
      heroImage: '/img/1.jpg',
      totalCount: 80,
      icon: '🌸'
    },
    'resorts': {
      id: 'resorts',
      title: 'Resorts',
      description: 'Luxury resorts offering comprehensive wedding packages with scenic locations.',
      heroImage: '/img/1.jpg',
      totalCount: 30,
      icon: '🏖️'
    },
    'hotels': {
      id: 'hotels',
      title: 'Hotels',
      description: 'Premium hotels with elegant banquet facilities and world-class hospitality.',
      heroImage: '/img/1.jpg',
      totalCount: 20,
      icon: '🏨'
    },
    
    // Photography & Videography
    'wedding-photographers': {
      id: 'wedding-photographers',
      title: 'Wedding Photographers',
      description: 'Professional photographers who capture your precious moments with artistic vision.',
      heroImage: '/img/1.jpg',
      totalCount: 100,
      icon: '📸'
    },
    'cinematographers': {
      id: 'cinematographers',
      title: 'Cinematographers',
      description: 'Expert videographers creating cinematic wedding films that tell your love story.',
      heroImage: '/img/1.jpg',
      totalCount: 50,
      icon: '🎬'
    },
    'pre-wedding-specialists': {
      id: 'pre-wedding-specialists',
      title: 'Pre-Wedding Specialists',
      description: 'Specialized photographers for pre-wedding shoots and couple photography sessions.',
      heroImage: '/img/1.jpg',
      totalCount: 30,
      icon: '💕'
    },
    
    // Makeup & Beauty
    'bridal-makeup-artists': {
      id: 'bridal-makeup-artists',
      title: 'Bridal Makeup Artists',
      description: 'Expert makeup artists who make you look stunning on your special day.',
      heroImage: '/img/1.jpg',
      totalCount: 80,
      icon: '💄'
    },
    'hair-stylists': {
      id: 'hair-stylists',
      title: 'Hair Stylists',
      description: 'Professional hair stylists creating beautiful bridal hairstyles and looks.',
      heroImage: '/img/1.jpg',
      totalCount: 40,
      icon: '💇‍♀️'
    },
    'nail-artists': {
      id: 'nail-artists',
      title: 'Nail Artists',
      description: 'Creative nail artists for beautiful bridal nail art and manicures.',
      heroImage: '/img/1.jpg',
      totalCount: 30,
      icon: '💅'
    },
    
    // Planning & Decor
    'wedding-planners': {
      id: 'wedding-planners',
      title: 'Wedding Planners',
      description: 'Expert wedding planners to orchestrate your perfect day with attention to every detail.',
      heroImage: '/img/1.jpg',
      totalCount: 60,
      icon: '📋'
    },
    'decorators': {
      id: 'decorators',
      title: 'Decorators',
      description: 'Creative decorators transforming venues into magical wedding spaces.',
      heroImage: '/img/1.jpg',
      totalCount: 40,
      icon: '🎨'
    },
    'florists': {
      id: 'florists',
      title: 'Florists',
      description: 'Skilled florists creating beautiful floral arrangements and bouquets.',
      heroImage: '/img/1.jpg',
      totalCount: 20,
      icon: '🌺'
    },
    
    // Mehndi Artists
    'bridal-mehndi': {
      id: 'bridal-mehndi',
      title: 'Bridal Mehndi',
      description: 'Expert mehndi artists specializing in intricate bridal henna designs.',
      heroImage: '/img/1.jpg',
      totalCount: 40,
      icon: '🤲'
    },
    'arabic-mehndi': {
      id: 'arabic-mehndi',
      title: 'Arabic Mehndi',
      description: 'Specialists in elegant Arabic mehndi patterns and designs.',
      heroImage: '/img/1.jpg',
      totalCount: 25,
      icon: '✨'
    },
    'traditional-mehndi': {
      id: 'traditional-mehndi',
      title: 'Traditional Mehndi',
      description: 'Artists creating beautiful traditional Indian mehndi designs.',
      heroImage: '/img/1.jpg',
      totalCount: 15,
      icon: '🎭'
    },
    
    // Virtual Services
    'live-streaming-services': {
      id: 'live-streaming-services',
      title: 'Live Streaming Services',
      description: 'Professional live streaming services for virtual wedding ceremonies.',
      heroImage: '/img/1.jpg',
      totalCount: 25,
      icon: '📺'
    },
    'virtual-ceremonies': {
      id: 'virtual-ceremonies',
      title: 'Virtual Ceremonies',
      description: 'Complete virtual ceremony solutions for online wedding celebrations.',
      heroImage: '/img/1.jpg',
      totalCount: 15,
      icon: '💻'
    },
    'online-invitations': {
      id: 'online-invitations',
      title: 'Online Invitations',
      description: 'Beautiful digital wedding invitations and online RSVP systems.',
      heroImage: '/img/1.jpg',
      totalCount: 10,
      icon: '✉️'
    }
  };

  // Sample vendor data for the category
  const vendorsByCategory: { [key: string]: VendorProfile[] } = {
    'banquet-halls': [
      {
        id: 'royal-palace-banquets',
        name: 'Royal Palace Banquets',
        type: 'Banquet Hall',
        location: 'Salt Lake, Kolkata',
        rating: 4.8,
        reviews: 156,
        priceRange: '₹50,000+',
        image: 'https://images.unsplash.com/photo-1519167758481-83f29c8e8f35?w=400&h=300&fit=crop&auto=format',
        description: 'Luxury banquet hall with modern amenities and traditional Bengali hospitality.',
        services: ['AC Banquet Hall', 'Catering', 'Decoration', 'Parking'],
        capacity: '200-800 guests',
        phone: '+91 98765 43210',
        email: 'info@royalpalacebanquets.com',
        featured: true
      },
      {
        id: 'grand-celebration-hall',
        name: 'Grand Celebration Hall',
        type: 'Banquet Hall',
        location: 'New Town, Kolkata',
        rating: 4.7,
        reviews: 98,
        priceRange: '₹45,000+',
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop&auto=format',
        description: 'Spacious banquet hall perfect for grand wedding celebrations.',
        services: ['AC Hall', 'Sound System', 'Catering', 'Valet Parking'],
        capacity: '300-600 guests',
        phone: '+91 98765 43220',
        email: 'info@grandcelebration.com',
        featured: false
      },
      {
        id: 'heritage-banquet',
        name: 'Heritage Banquet',
        type: 'Banquet Hall',
        location: 'Ballygunge, Kolkata',
        rating: 4.6,
        reviews: 134,
        priceRange: '₹40,000+',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&auto=format',
        description: 'Traditional banquet hall with heritage charm and modern facilities.',
        services: ['Heritage Décor', 'Catering', 'Photography Area', 'Parking'],
        capacity: '150-500 guests',
        phone: '+91 98765 43230',
        email: 'info@heritagebanquet.com',
        featured: false
      },
      {
        id: 'crystal-palace-hall',
        name: 'Crystal Palace Hall',
        type: 'Banquet Hall',
        location: 'Park Street, Kolkata',
        rating: 4.9,
        reviews: 201,
        priceRange: '₹60,000+',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format',
        description: 'Premium banquet hall with crystal chandeliers and luxury amenities.',
        services: ['Luxury Décor', 'Premium Catering', 'Bridal Suite', 'Valet Service'],
        capacity: '400-1000 guests',
        phone: '+91 98765 43240',
        email: 'info@crystalpalace.com',
        featured: true
      }
    ],
    'wedding-photographers': [
      {
        id: 'moments-photography',
        name: 'Moments Photography',
        type: 'Wedding Photography',
        location: 'Park Street, Kolkata',
        rating: 4.9,
        reviews: 89,
        priceRange: '₹25,000+',
        image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop&auto=format',
        description: 'Capturing beautiful moments with artistic vision and professional expertise.',
        services: ['Wedding Photography', 'Pre-Wedding', 'Candid', 'Traditional'],
        phone: '+91 98765 43211',
        email: 'info@momentsphotography.com',
        featured: true
      },
      {
        id: 'creative-lens-studio',
        name: 'Creative Lens Studio',
        type: 'Photography & Videography',
        location: 'Salt Lake, Kolkata',
        rating: 4.7,
        reviews: 76,
        priceRange: '₹30,000+',
        image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop&auto=format',
        description: 'Creative photography and videography services for modern couples.',
        services: ['Photography', 'Videography', 'Drone Coverage', 'Album Design'],
        phone: '+91 98765 43251',
        email: 'info@creativelens.com',
        featured: false
      }
    ],
    
    // Marriage Garden / Lawns
    'marriage-garden---lawns': [
      {
        id: 'rose-garden-lawn',
        name: 'Rose Garden Lawn',
        type: 'Marriage Garden',
        location: 'Rajarhat, Kolkata',
        rating: 4.6,
        reviews: 89,
        priceRange: '₹35,000+',
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop&auto=format',
        description: 'Beautiful outdoor garden venue perfect for traditional ceremonies.',
        services: ['Garden Space', 'Mandap Setup', 'Catering', 'Parking'],
        phone: '+91 98765 43260',
        email: 'info@rosegardenlawn.com',
        featured: true
      },
      {
        id: 'green-valley-gardens',
        name: 'Green Valley Gardens',
        type: 'Marriage Garden',
        location: 'Barasat, Kolkata',
        rating: 4.5,
        reviews: 67,
        priceRange: '₹30,000+',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&auto=format',
        description: 'Spacious garden venue with natural beauty and modern facilities.',
        services: ['Lawn Space', 'Decoration', 'Sound System', 'Catering'],
        phone: '+91 98765 43270',
        email: 'info@greenvalleygardens.com',
        featured: false
      }
    ],
    
    // Bridal Makeup Artists
    'bridal-makeup-artists': [
      {
        id: 'glamour-makeup-studio',
        name: 'Glamour Makeup Studio',
        type: 'Bridal Makeup',
        location: 'Ballygunge, Kolkata',
        rating: 4.7,
        reviews: 134,
        priceRange: '₹15,000+',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop&auto=format',
        description: 'Professional bridal makeup with premium products and expert techniques.',
        services: ['Bridal Makeup', 'Hair Styling', 'Saree Draping', 'Nail Art'],
        phone: '+91 98765 43212',
        email: 'info@glamourmakeup.com',
        featured: true
      },
      {
        id: 'beauty-bliss-studio',
        name: 'Beauty Bliss Studio',
        type: 'Bridal Makeup',
        location: 'Park Street, Kolkata',
        rating: 4.8,
        reviews: 156,
        priceRange: '₹18,000+',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop&auto=format',
        description: 'Expert bridal makeup artists creating stunning looks for your special day.',
        services: ['HD Makeup', 'Hair Styling', 'Draping', 'Touch-up'],
        phone: '+91 98765 43280',
        email: 'info@beautybliss.com',
        featured: false
      }
    ],
    
    // Wedding Planners
    'wedding-planners': [
      {
        id: 'elegant-events',
        name: 'Elegant Events & Decor',
        type: 'Wedding Planning',
        location: 'New Town, Kolkata',
        rating: 4.6,
        reviews: 98,
        priceRange: '₹30,000+',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&auto=format',
        description: 'Complete wedding planning and decoration services with attention to detail.',
        services: ['Event Planning', 'Decoration', 'Coordination', 'Vendor Management'],
        phone: '+91 98765 43213',
        email: 'info@elegantevents.com',
        featured: true
      },
      {
        id: 'dream-weddings',
        name: 'Dream Weddings',
        type: 'Wedding Planning',
        location: 'Salt Lake, Kolkata',
        rating: 4.5,
        reviews: 87,
        priceRange: '₹25,000+',
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop&auto=format',
        description: 'Creating dream weddings with personalized planning and execution.',
        services: ['Full Planning', 'Day Coordination', 'Vendor Booking', 'Budget Management'],
        phone: '+91 98765 43290',
        email: 'info@dreamweddings.com',
        featured: false
      }
    ],
    
    // Bridal Mehndi
    'bridal-mehndi': [
      {
        id: 'mehndi-artistry',
        name: 'Mehndi Artistry',
        type: 'Bridal Mehndi',
        location: 'Gariahat, Kolkata',
        rating: 4.8,
        reviews: 76,
        priceRange: '₹8,000+',
        image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop&auto=format',
        description: 'Intricate bridal mehndi designs with traditional and contemporary patterns.',
        services: ['Bridal Mehndi', 'Family Mehndi', 'Floral Designs', 'Arabic Patterns'],
        phone: '+91 98765 43214',
        email: 'info@mehndiartistry.com',
        featured: true
      }
    ],
    
    // Default vendors for other categories
    'resorts': [],
    'hotels': [],
    'cinematographers': [],
    'pre-wedding-specialists': [],
    'hair-stylists': [],
    'nail-artists': [],
    'decorators': [],
    'florists': [],
    'arabic-mehndi': [],
    'traditional-mehndi': [],
    'live-streaming-services': [],
    'virtual-ceremonies': [],
    'online-invitations': []
  };

  const currentCategory = categoryData[categorySlug];
  const categoryVendors = vendorsByCategory[categorySlug] || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
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
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <nav className="flex items-center space-x-2 text-sm">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center text-gray-500 hover:text-red-600 transition-colors"
            >
              <HomeIcon className="w-4 h-4 mr-1" />
              Home
            </button>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            <button 
              onClick={() => router.push('/vendors')}
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              Vendors
            </button>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            <span className="text-red-600 font-medium">{currentCategory.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section - 75% Viewport Height */}
      <div className="relative h-[75vh] min-h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={currentCategory.heroImage}
            alt={currentCategory.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
        
        {/* Content Container */}
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="grid lg:grid-cols-3 gap-8 items-center w-full">
            {/* Hero Content - Left Side */}
            <div className="lg:col-span-2 text-white">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl">{currentCategory.icon}</span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  {currentCategory.totalCount}+ vendors
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                {currentCategory.title}
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                {currentCategory.description}
              </p>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <StarIconSolid className="w-5 h-5 text-yellow-400" />
                  <span>4.8+ Average Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5" />
                  <span>Kolkata & Nearby Areas</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-5 h-5" />
                  <span>Instant Response</span>
                </div>
              </div>
            </div>

            {/* Compact Inquiry Form - Right Side */}
            <div className="lg:col-span-1 flex justify-end">
              <div className="w-80 bg-white rounded-xl p-4 shadow-xl border border-white/20">
                <div className="text-center mb-3">
                  <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Get Free Quotes
                  </h3>
                  <p className="text-gray-600 text-xs">Compare prices from top {currentCategory.title.toLowerCase()}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm text-gray-900 placeholder:text-gray-400 bg-white"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm text-gray-900 placeholder:text-gray-400 bg-white"
                      placeholder="Phone number"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm text-gray-900 placeholder:text-gray-400 bg-white"
                      placeholder="Email address"
                    />
                  </div>

                  <div className="relative mt-4">
                    <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600 font-medium">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm text-gray-900 bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm shadow-lg"
                  >
                    Get Instant Quotes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vendors Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-red-600"></div>
              <span className="text-red-600 font-medium tracking-wider uppercase text-sm">
                Top Rated
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-red-600"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {currentCategory.title} <span className="text-red-600">in Kolkata</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {categoryVendors.length} verified vendors ready to serve you
            </p>
          </div>

          {/* Vendors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {categoryVendors.map((vendor) => (
              <div 
                key={vendor.id} 
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200 cursor-pointer transform hover:-translate-y-1"
                onClick={() => router.push(`/${vendor.id}`)}
              >
                {/* Vendor Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={vendor.image}
                    alt={vendor.name}
                    width={300}
                    height={225}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Featured Badge */}
                  {vendor.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        FEATURED
                      </span>
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <StarIconSolid className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-bold text-gray-900">{vendor.rating}</span>
                    </div>
                  </div>

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <button className="bg-white/90 hover:bg-white p-3 rounded-full transition-colors shadow-lg">
                        <PhoneIcon className="w-5 h-5 text-red-600" />
                      </button>
                      <button className="bg-white/90 hover:bg-white p-3 rounded-full transition-colors shadow-lg">
                        <EnvelopeIcon className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Vendor Info */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-2 text-base line-clamp-1">
                    {vendor.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <MapPinIcon className="w-4 h-4 text-red-600" />
                    <span>{vendor.location}</span>
                  </div>
                  
                  {/* Services */}
                  <div className="mb-4">
                    <span className="inline-block bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                      {vendor.type}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <StarIconSolid
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(vendor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {vendor.rating} ({vendor.reviews} reviews)
                    </span>
                  </div>

                  {/* Contact Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                      View Profile
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-semibold transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-white border-2 border-red-200 text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl">
              Load More {currentCategory.title}
            </button>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Need Help Finding the Right {currentCategory.title}?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Our wedding experts are here to help you find the perfect {currentCategory.title.toLowerCase()} that matches your vision and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2">
              <PhoneIcon className="w-5 h-5" />
              Call Our Experts
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5" />
              Get Consultation
            </button>
          </div>
          <div className="mt-6 text-sm opacity-80">
            ⏰ Available 24/7 • 📞 Free Consultation • 🎯 Expert Guidance
          </div>
        </div>
      </div>
    </main>
  );
}