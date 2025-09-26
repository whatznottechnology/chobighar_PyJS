'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  PhotoIcon, 
  HeartIcon, 
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  MapPinIcon,
  CameraIcon,
  UserGroupIcon,
  ArrowLeftIcon,
  ClockIcon,
  TagIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';

// Portfolio data (same as in portfolio page)
const portfolioData = [
  {
    id: 'priya-arjun-wedding',
    title: 'Priya & Arjun Wedding',
    subtitle: 'Traditional Bengali Wedding',
    category: 'wedding',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&auto=format',
    imageCount: 85,
    date: 'December 15, 2024',
    location: 'ITC Sonar, Kolkata',
    duration: '2 Days',
    guests: '300+',
    description: 'A beautiful traditional Bengali wedding celebration filled with rituals, colors, and joy. This two-day celebration showcased the rich cultural heritage of Bengal with traditional ceremonies including Gaye Holud, Bor Jatri, and the main wedding ceremony.',
    story: 'Priya and Arjun\'s love story began in college, and after 8 years of being together, they decided to tie the knot in a grand Bengali wedding. The celebration was a perfect blend of tradition and modernity, with beautiful decorations featuring marigold flowers, traditional Bengali sweets, and heartfelt moments shared between two families.',
    highlights: [
      'Traditional Gaye Holud ceremony with turmeric rituals',
      'Grand Bor Jatri procession with dhol and music',
      'Beautiful mandap decoration with fresh flowers',
      'Emotional bidaai ceremony',
      'Reception party with contemporary music and dance'
    ],
    services: ['Full Wedding Photography', 'Videography', 'Same Day Edit', 'Drone Coverage', 'Photo Albums'],
    videos: [
      'dQw4w9WgXcQ', // Sample YouTube video IDs
      'jNQXAC9IVRw',
      'ScMzIvxBSi4',
      'ZZ5LpwO-An4'
    ],
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=800&fit=crop&auto=format'
    ]
  },
  {
    id: 'sneha-rahul-prewedding',
    title: 'Sneha & Rahul',
    subtitle: 'Pre-Wedding Shoot',
    category: 'prewedding',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop&auto=format',
    imageCount: 45,
    date: 'November 20, 2024',
    location: 'Darjeeling Hills',
    duration: '1 Day',
    guests: '2',
    description: 'Romantic pre-wedding session in the beautiful hills of Darjeeling with stunning mountain views and tea gardens.',
    story: 'Sneha and Rahul wanted their pre-wedding shoot to reflect their love for nature and adventure. We chose Darjeeling for its breathtaking landscapes, misty mornings, and romantic tea gardens. The shoot captured their playful chemistry against the backdrop of the majestic Himalayas.',
    highlights: [
      'Sunrise shoot at Tiger Hill viewpoint',
      'Romantic walk through tea gardens',
      'Vintage train ride photography',
      'Cozy moments at a hillside café',
      'Golden hour shots with mountain backdrop'
    ],
    services: ['Pre-Wedding Photography', 'Location Scouting', 'Styling Consultation', 'Digital Gallery'],
    videos: [
      'M7lc1UVf-VE',
      'hT_nvWreIhg'
    ],
    images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&h=800&fit=crop&auto=format'
    ]
  },
  {
    id: 'kavya-portrait',
    title: 'Kavya Portrait Session',
    subtitle: 'Individual Portraits',
    category: 'portrait',
    coverImage: 'https://images.unsplash.com/photo-1494790108755-2616c31b7a63?w=600&h=400&fit=crop&auto=format',
    imageCount: 25,
    date: 'October 10, 2024',
    location: 'Studio & Outdoor',
    duration: '3 Hours',
    guests: '1',
    description: 'Professional portrait session showcasing elegance and personality with both studio and outdoor setups.',
    story: 'Kavya, a classical dancer, wanted portraits that captured both her professional artistic side and her natural personality. We created a diverse portfolio with studio shots highlighting her dance poses and outdoor shots showcasing her everyday elegance.',
    highlights: [
      'Classical dance poses in traditional attire',
      'Modern professional headshots',
      'Outdoor natural light portraits',
      'Creative artistic compositions',
      'Variety of outfits and moods'
    ],
    services: ['Portrait Photography', 'Studio Setup', 'Professional Lighting', 'Retouching', 'Print Ready Files'],
    videos: [
      'YQHsXMglC9A'
    ],
    images: [
      'https://images.unsplash.com/photo-1494790108755-2616c31b7a63?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&h=800&fit=crop&auto=format'
    ]
  },
  {
    id: 'corporate-event',
    title: 'Corporate Annual Meet',
    subtitle: 'Event Photography',
    category: 'event',
    coverImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop&auto=format',
    imageCount: 60,
    date: 'September 25, 2024',
    location: 'Hyatt Regency, Kolkata',
    duration: '8 Hours',
    guests: '500+',
    description: 'Professional coverage of corporate annual meeting and celebrations with keynote speeches, awards, and networking.',
    story: 'TechCorp\'s annual meet was a grand celebration of their achievements and future vision. The event featured keynote speakers, award ceremonies, team building activities, and a gala dinner. Our team captured the professional atmosphere while highlighting the human connections and celebrations.',
    highlights: [
      'Keynote speaker presentations',
      'Award ceremony moments',
      'Team building activities',
      'Networking sessions',
      'Gala dinner and entertainment'
    ],
    services: ['Event Photography', 'Corporate Videography', 'Live Photo Sharing', 'Same Day Delivery'],
    videos: [
      'dQw4w9WgXcQ',
      'jNQXAC9IVRw'
    ],
    images: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&auto=format'
    ]
  },
  {
    id: 'ananya-wedding',
    title: 'Ananya & Dev Wedding',
    subtitle: 'Destination Wedding',
    category: 'wedding',
    coverImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&h=400&fit=crop&auto=format',
    imageCount: 120,
    date: 'January 12, 2025',
    location: 'The Leela, Goa',
    duration: '3 Days',
    guests: '150',
    description: 'Beautiful destination wedding by the beach with Bengali traditions blended with tropical vibes.',
    story: 'Ananya and Dev chose Goa for their wedding to combine their love for the beach with traditional Bengali ceremonies. The three-day celebration included beachside ceremonies, traditional rituals, and a sunset reception by the ocean.',
    highlights: [
      'Beachside Gaye Holud ceremony',
      'Traditional Bengali wedding by the sea',
      'Sunset couple portraits on the beach',
      'Beach party reception',
      'Drone footage of coastal ceremonies'
    ],
    services: ['Destination Wedding Photography', 'Videography', 'Drone Coverage', 'Multi-day Coverage', 'Travel Documentation'],
    videos: [
      'ScMzIvxBSi4',
      'ZZ5LpwO-An4',
      'M7lc1UVf-VE'
    ],
    images: [
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=800&fit=crop&auto=format'
    ]
  },
  {
    id: 'family-portrait',
    title: 'The Sharma Family',
    subtitle: 'Family Portraits',
    category: 'portrait',
    coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop&auto=format',
    imageCount: 30,
    date: 'August 15, 2024',
    location: 'Central Park, Kolkata',
    duration: '2 Hours',
    guests: '6',
    description: 'Warm and loving family portrait session in natural outdoor setting with three generations.',
    story: 'The Sharma family wanted to create lasting memories with their grandparents visiting from Delhi. We chose Central Park for its beautiful natural setting and conducted a heartwarming session capturing the love and bonds between three generations.',
    highlights: [
      'Three generation family portraits',
      'Candid moments between grandparents and grandchildren',
      'Natural outdoor lighting',
      'Various family combinations',
      'Playful children photography'
    ],
    services: ['Family Photography', 'Outdoor Session', 'Multiple Setups', 'Digital Gallery', 'Print Packages'],
    videos: [
      'hT_nvWreIhg'
    ],
    images: [
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&h=800&fit=crop&auto=format'
    ]
  }
];

export default function PortfolioDetails() {
  const params = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Back to top visibility handler
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventDate: ''
  });

  const portfolioId = params.id as string;
  const portfolio = portfolioData.find(p => p.id === portfolioId);

  if (!portfolio) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <PhotoIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h1>
          <p className="text-gray-600 mb-6">The portfolio you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/portfolio')}
            className="bg-royal-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-royal-red-hover transition-colors"
          >
            Back to Portfolio
          </button>
        </div>
      </main>
    );
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const openVideoModal = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % portfolio.images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? portfolio.images.length - 1 : selectedImage - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({
      name: '',
      phone: '',
      eventDate: ''
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Image Section - Full Width */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={portfolio.coverImage}
            alt={portfolio.title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
        </div>

        {/* Content Over Image */}
        <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TagIcon className="w-4 h-4" />
              {portfolio.category.charAt(0).toUpperCase() + portfolio.category.slice(1)}
            </div>

            {/* Main Title */}
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {portfolio.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 font-medium mb-6">
              {portfolio.subtitle}
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{portfolio.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5" />
                <span>{portfolio.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <CameraIcon className="w-5 h-5" />
                <span>{portfolio.imageCount} Photos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="py-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push('/portfolio')}
            className="inline-flex items-center gap-2 text-royal-red hover:text-royal-red-hover font-semibold transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Portfolio
          </button>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {portfolio.description}
                </p>
                
                <h2 
                  className="text-3xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  The Story
                </h2>
                
                <p className="text-gray-600 leading-relaxed mb-8">
                  {portfolio.story}
                </p>

                {/* Highlights */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">Event Highlights</h3>
                <ul className="space-y-3 mb-8">
                  {portfolio.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-royal-red rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar with CTA */}
            <div className="lg:col-span-1">
              {/* Services Section */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <TagIcon className="w-5 h-5 text-royal-red" />
                  <h3 className="text-lg font-bold" style={{ color: '#B22222' }}>Services Included</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {portfolio.services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-block bg-royal-red/10 px-3 py-2 rounded-full text-sm font-medium border border-royal-red/20 hover:bg-royal-red hover:text-white transition-all duration-300 cursor-default"
                      style={{ color: '#B22222' }}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Form */}
              <div className="bg-gradient-to-br from-royal-red via-red-800 to-red-900 rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <HeartIcon className="w-10 h-10 text-red-200 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">Love This Style?</h3>
                  <p className="text-red-100 text-sm">Get a personalized quote</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                      placeholder="Phone number"
                    />
                  </div>

                  <div>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-royal-red font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Get Quote
                  </button>
                  <p className="text-red-200 text-xs text-center">
                    We'll contact you within 2 hours!
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Gallery
          </h2>
          
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-xl p-1 shadow-lg">
              <button
                onClick={() => setActiveTab('photos')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'photos'
                    ? 'text-white shadow-lg'
                    : 'hover:text-white'
                }`}
                style={{
                  backgroundColor: activeTab === 'photos' ? '#B22222' : 'transparent',
                  color: activeTab === 'photos' ? 'white' : '#B22222'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'photos') {
                    e.currentTarget.style.backgroundColor = '#B22222';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'photos') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#B22222';
                  }
                }}
              >
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Photos ({portfolio.images.length})
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'videos'
                    ? 'text-white shadow-lg'
                    : 'hover:text-white'
                }`}
                style={{
                  backgroundColor: activeTab === 'videos' ? '#B22222' : 'transparent',
                  color: activeTab === 'videos' ? 'white' : '#B22222'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'videos') {
                    e.currentTarget.style.backgroundColor = '#B22222';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'videos') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#B22222';
                  }
                }}
              >
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Videos ({portfolio.videos?.length || 0})
              </button>
            </div>
          </div>

          {/* Photos Tab Content */}
          {activeTab === 'photos' && (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
              {portfolio.images.map((image, index) => {
                // Create varied heights for better masonry effect
                const heights = [300, 400, 350, 450, 320, 380, 420, 360];
                const randomHeight = heights[index % heights.length];
                
                return (
                  <div
                    key={index}
                    className="break-inside-avoid mb-4 relative rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-2"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative bg-gray-100">
                      <Image
                        src={image}
                        alt={`${portfolio.title} ${index + 1}`}
                        width={400}
                        height={randomHeight}
                        style={{
                          width: '100%',
                          height: 'auto',
                          minHeight: `${randomHeight}px`,
                        }}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      />
                      
                      {/* Enhanced Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {/* Zoom Icon */}
                          <div 
                            className="bg-white/90 backdrop-blur-sm p-3 rounded-full transition-all duration-300 shadow-lg"
                            style={{ backgroundColor: 'rgba(178, 34, 34, 0.95)' }}
                          >
                            <svg className="w-6 h-6 text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between text-white">
                            <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                              <span className="text-sm font-medium">Photo {index + 1}</span>
                            </div>
                            <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                              <span className="text-xs">HD</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Videos Tab Content */}
          {activeTab === 'videos' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.videos?.map((videoId, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-2"
                  onClick={() => openVideoModal(videoId)}
                >
                  <div className="relative aspect-video bg-black">
                    {/* YouTube Thumbnail */}
                    <Image
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt={`${portfolio.title} Video ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Ripple Effect */}
                        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping group-hover:animate-none"></div>
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse group-hover:animate-none"></div>
                        
                        {/* Play Button */}
                        <div className="relative bg-white/95 backdrop-blur-sm p-5 rounded-full group-hover:bg-royal-red group-hover:text-white transition-all duration-300 shadow-lg">
                          <svg className="w-8 h-8 text-royal-red group-hover:text-white ml-1 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Duration Badge */}
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                      {index === 0 ? '3:45' : index === 1 ? '2:30' : index === 2 ? '4:15' : '1:45'}
                    </div>
                    
                    {/* HD Quality Badge */}
                    <div className="absolute top-4 left-4 bg-royal-red text-white text-xs px-2 py-1 rounded font-bold">
                      HD
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-5 bg-white">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-royal-red transition-colors duration-300">
                      {index === 0 ? 'Wedding Highlights' : 
                       index === 1 ? 'Ceremony Moments' : 
                       index === 2 ? 'Reception Celebration' : 
                       'Behind the Scenes'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {index === 0 ? 'A cinematic journey capturing the most beautiful moments of your special day' : 
                       index === 1 ? 'Sacred rituals and emotional moments during the wedding ceremony' : 
                       index === 2 ? 'Dancing, laughter, and celebrations with family and friends' : 
                       'Exclusive behind-the-scenes footage of your wedding day preparations'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span>HD Quality</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
                        </svg>
                        <span>{index === 0 ? '1.2K views' : index === 1 ? '850 views' : index === 2 ? '2.1K views' : '650 views'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )) || (
                <div className="col-span-full text-center py-12">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">No videos available for this portfolio</p>
                </div>
              )}
            </div>
          )}
          
          {/* Gallery Info */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 text-gray-600">
                <CameraIcon className="w-5 h-5 text-royal-red" />
                <span className="text-sm font-medium">
                  {activeTab === 'photos' ? `${portfolio.images.length} Photos` : `${portfolio.videos?.length || 0} Videos`}
                </span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <HeartIcon className="w-5 h-5 text-royal-red" />
                <span className="text-sm font-medium">
                  {activeTab === 'photos' ? 'Click to view full size' : 'Click to play video'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Albums Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Related Albums
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore more beautiful moments captured across different categories and events.
            </p>
          </div>

          {/* Categories Display */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="bg-royal-red text-white px-4 py-2 rounded-full text-sm font-medium">
              Weddings (18)
            </div>
            <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
              Pre-Wedding (12)
            </div>
            <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
              Portraits (8)
            </div>
            <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
              Events (7)
            </div>
          </div>

          {/* Horizontal Scrolling Albums */}
          <div className="relative">
            {/* Scroll Left Button */}
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 backdrop-blur-sm p-3 rounded-full shadow-lg transition-colors"
              style={{ 
                backgroundColor: '#B22222',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8B0000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#B22222';
              }}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            
            {/* Scroll Right Button */}
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 backdrop-blur-sm p-3 rounded-full shadow-lg transition-colors"
              style={{ 
                backgroundColor: '#B22222',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8B0000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#B22222';
              }}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>

            {/* Scrollable Container */}
            <div className="overflow-x-auto scrollbar-hide pb-4" style={{ scrollBehavior: 'smooth' }}>
              <div className="flex gap-6 w-max">
                {portfolioData.slice(0, 10).map((relatedPortfolio) => (
                  <div
                    key={relatedPortfolio.id}
                    className="group cursor-pointer w-80 flex-shrink-0"
                    onClick={() => router.push(`/portfolio/${relatedPortfolio.id}`)}
                  >
                    {/* Album Cover */}
                    <div className="relative overflow-hidden rounded-2xl shadow-lg mb-4 aspect-[4/3] bg-gray-100">
                      <Image
                        src={relatedPortfolio.coverImage}
                        alt={relatedPortfolio.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="320px"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-royal-red text-white px-3 py-1 rounded-full text-xs font-bold">
                        {relatedPortfolio.category}
                      </div>
                      
                      {/* Photo Count Badge */}
                      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                        {relatedPortfolio.imageCount} Photos
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="text-white">
                            <p className="font-semibold text-lg">{relatedPortfolio.title}</p>
                            <p className="text-sm text-white/80">{relatedPortfolio.subtitle}</p>
                          </div>
                        </div>
                        
                        {/* View Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full group-hover:bg-royal-red group-hover:text-white transition-all duration-300 shadow-lg">
                            <svg className="w-6 h-6 text-royal-red group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Album Info */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-royal-red transition-colors">
                        {relatedPortfolio.title}
                      </h3>
                      <p className="text-gray-600 mb-2 text-sm">{relatedPortfolio.subtitle}</p>
                      <div className="flex items-center justify-center gap-3 text-xs text-gray-500 mb-3">
                        <span>{relatedPortfolio.date}</span>
                        <span>•</span>
                        <span>{relatedPortfolio.location}</span>
                      </div>
                      <span 
                        className="inline-block text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        style={{ backgroundColor: '#B22222' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#8B0000';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#B22222';
                        }}
                      >
                        View Album
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View All Albums Button */}
          <div className="text-center mt-12">
            <a
              href="/portfolio"
              className="bg-royal-red hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4 4m4-4l-4-4" />
              </svg>
              View All Albums
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors"
              style={{ color: '#B22222' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#8B0000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#B22222';
              }}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors"
              style={{ color: '#B22222' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#8B0000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#B22222';
              }}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="relative max-w-6xl max-h-[85vh] w-full mx-4">
              <Image
                src={portfolio.images[selectedImage]}
                alt={`${portfolio.title} ${selectedImage + 1}`}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
                <h3 className="text-white font-semibold text-lg">{portfolio.title}</h3>
                <p className="text-white/80 text-sm">
                  {selectedImage + 1} of {portfolio.images.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Video Player */}
            <div className="relative w-full aspect-video mx-4">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&controls=1`}
                className="w-full h-full rounded-xl"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`${portfolio.title} Video`}
              />
            </div>

            {/* Video Info */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
                <h3 className="text-white font-semibold text-lg">{portfolio.title}</h3>
                <p className="text-white/80 text-sm">Video Gallery</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-royal-red hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 transform"
          aria-label="Back to top"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </main>
  );
}