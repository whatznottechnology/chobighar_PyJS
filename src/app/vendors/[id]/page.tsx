'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  CameraIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  PlayIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Extended vendor data with portfolio
const vendorsData = [
  {
    id: 'moments-photography',
    name: 'Moments Photography',
    tagline: 'Capturing Life\'s Beautiful Moments',
    category: 'photographers',
    type: 'Wedding Photography',
    location: 'Park Street, Kolkata',
    rating: 4.9,
    reviews: 189,
    priceRange: '₹25,000 - ₹1,50,000',
    experience: '8+ Years',
    events: '200+ Weddings',
    coverImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=600&fit=crop&auto=format',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format',
    description: 'Award-winning photographers specializing in candid wedding moments and cinematic storytelling. We believe every wedding has a unique story, and our passion lies in capturing those fleeting moments that make your special day unforgettable.',
    about: 'Founded in 2015, Moments Photography has been at the forefront of wedding photography in Kolkata. Our team of skilled photographers combines traditional techniques with modern aesthetics to create timeless memories. We specialize in candid photography, pre-wedding shoots, and cinematic videography.',
    services: [
      { name: 'Wedding Photography', price: '₹50,000+', description: 'Complete wedding day coverage with candid moments' },
      { name: 'Pre-wedding Shoots', price: '₹25,000+', description: 'Romantic pre-wedding photography sessions' },
      { name: 'Videography', price: '₹40,000+', description: 'Cinematic wedding films and same-day edits' },
      { name: 'Drone Coverage', price: '₹15,000+', description: 'Aerial photography and videography' },
      { name: 'Photo Albums', price: '₹8,000+', description: 'Premium quality photo albums and prints' },
      { name: 'Same Day Edit', price: '₹20,000+', description: 'Highlight reel delivered on wedding day' }
    ],
    packages: [
      {
        name: 'Essential',
        price: '₹35,000',
        duration: '6 hours',
        features: ['1 Photographer', '300+ Photos', 'Online Gallery', 'Basic Editing']
      },
      {
        name: 'Premium',
        price: '₹65,000',
        duration: '8 hours',
        features: ['2 Photographers', '500+ Photos', 'Online Gallery', 'Advanced Editing', 'USB Drive'],
        popular: true
      },
      {
        name: 'Luxury',
        price: '₹1,25,000',
        duration: '10 hours',
        features: ['3 Photographers', '800+ Photos', 'Videography', 'Drone Coverage', 'Same Day Edit', 'Photo Album']
      }
    ],
    portfolio: [
      {
        id: 1,
        title: 'Priya & Arjun Wedding',
        category: 'Wedding',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&auto=format',
        description: 'Traditional Bengali wedding with modern touches'
      },
      {
        id: 2,
        title: 'Sneha & Rahul Pre-Wedding',
        category: 'Pre-Wedding',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop&auto=format',
        description: 'Romantic shoot in Darjeeling hills'
      },
      {
        id: 3,
        title: 'Kavya & Dev Reception',
        category: 'Reception',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop&auto=format',
        description: 'Elegant evening reception celebration'
      },
      {
        id: 4,
        title: 'Ananya Bridal Portraits',
        category: 'Bridal',
        image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop&auto=format',
        description: 'Beautiful bridal portrait session'
      },
      {
        id: 5,
        title: 'Corporate Event Coverage',
        category: 'Events',
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop&auto=format',
        description: 'Professional corporate event photography'
      },
      {
        id: 6,
        title: 'Family Portraits',
        category: 'Family',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop&auto=format',
        description: 'Warm family portrait session'
      }
    ],
    testimonials: [
      {
        name: 'Priya Sharma',
        event: 'Wedding Photography',
        rating: 5,
        comment: 'Moments Photography captured our wedding beautifully! Every candid moment was perfect.',
        image: 'https://images.unsplash.com/photo-1494790108755-2616c31b7a63?w=100&h=100&fit=crop&auto=format'
      },
      {
        name: 'Rahul Gupta',
        event: 'Pre-Wedding Shoot',
        rating: 5,
        comment: 'Professional team with creative vision. Our pre-wedding photos exceeded expectations.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format'
      },
      {
        name: 'Ananya Das',
        event: 'Wedding & Reception',
        rating: 5,
        comment: 'Amazing work! They made us feel comfortable and captured every emotion perfectly.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format'
      }
    ],
    contact: {
      phone: '+91 98765 43210',
      email: 'hello@momentsphotography.com',
      website: 'www.momentsphotography.com',
      address: '123 Park Street, Kolkata - 700017',
      social: {
        instagram: '@momentsphotography',
        facebook: '/momentsphotographykolkata'
      }
    },
    awards: [
      'Best Wedding Photographer 2023 - Kolkata',
      'WeddingWire Couples Choice Award',
      'Featured in Wedding Magazine India'
    ]
  }
  // Add more vendors here as needed
];

export default function VendorProfile() {
  const params = useParams();
  const router = useRouter();
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<number | null>(null);
  const [portfolioFilter, setPortfolioFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    budget: '',
    message: ''
  });

  const vendorId = params.id as string;
  const vendor = vendorsData.find(v => v.id === vendorId);

  if (!vendor) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <CameraIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Vendor Not Found</h1>
          <p className="text-gray-600 mb-6">The vendor profile you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/vendors')}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            Back to Vendors
          </button>
        </div>
      </main>
    );
  }

  const filteredPortfolio = portfolioFilter === 'all' 
    ? vendor.portfolio 
    : vendor.portfolio.filter(item => item.category.toLowerCase() === portfolioFilter);

  const portfolioCategories = ['all', ...Array.from(new Set(vendor.portfolio.map(item => item.category.toLowerCase())))];

  const openLightbox = (index: number) => {
    setSelectedPortfolioItem(index);
  };

  const closeLightbox = () => {
    setSelectedPortfolioItem(null);
  };

  const nextImage = () => {
    if (selectedPortfolioItem !== null) {
      setSelectedPortfolioItem((selectedPortfolioItem + 1) % filteredPortfolio.length);
    }
  };

  const prevImage = () => {
    if (selectedPortfolioItem !== null) {
      setSelectedPortfolioItem(selectedPortfolioItem === 0 ? filteredPortfolio.length - 1 : selectedPortfolioItem - 1);
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
    console.log('Inquiry submitted:', formData);
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventDate: '',
      eventType: '',
      budget: '',
      message: ''
    });
  };

  // Sub-navigation items
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'services', label: 'Services' },
    { id: 'packages', label: 'Packages' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={vendor.coverImage}
            alt={vendor.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-end px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full pb-16">
            <div className="flex flex-col md:flex-row md:items-end gap-8">
              {/* Profile Image */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src={vendor.profileImage}
                  alt={vendor.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Vendor Info */}
              <div className="flex-1 text-white">
                <h1 
                  className="text-4xl md:text-6xl font-bold mb-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {vendor.name}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-4">{vendor.tagline}</p>
                
                <div className="flex flex-wrap gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarIconSolid className="w-5 h-5 text-yellow-400" />
                    <span>{vendor.rating} ({vendor.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5" />
                    <span>{vendor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CameraIcon className="w-5 h-5" />
                    <span>{vendor.events}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-3">
                <a 
                  href="#contact"
                  className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg text-center"
                >
                  Get Quote
                </a>
                <div className="flex gap-3">
                  <a 
                    href={`tel:${vendor.contact.phone}`}
                    className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-colors"
                  >
                    <PhoneIcon className="w-5 h-5" />
                  </a>
                  <a 
                    href={`mailto:${vendor.contact.email}`}
                    className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-colors"
                  >
                    <EnvelopeIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                About {vendor.name}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {vendor.about}
              </p>
              
              {/* Awards */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Awards & Recognition</h3>
                <div className="space-y-3">
                  {vendor.awards.map((award, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold">{vendor.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Events Covered</span>
                    <span className="font-semibold">{vendor.events}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating</span>
                    <span className="font-semibold">{vendor.rating}/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price Range</span>
                    <span className="font-semibold text-green-600">{vendor.priceRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our Portfolio
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our collection of beautiful moments and exceptional work across various events and celebrations.
            </p>
          </div>

          {/* Portfolio Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => setPortfolioFilter(category)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  portfolioFilter === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item, index) => (
              <div
                key={item.id}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-white/90 text-sm">{item.description}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CameraIcon className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive photography and videography services tailored to make your special day unforgettable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendor.services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                  <span className="text-purple-600 font-bold">{service.price}</span>
                </div>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Client Reviews
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what our clients say about their experience working with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendor.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.event}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIconSolid
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to capture your special moments? Send us an inquiry and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Inquiry</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your phone"
                    />
                  </div>

                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type *
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="prewedding">Pre-Wedding Shoot</option>
                      <option value="reception">Reception</option>
                      <option value="engagement">Engagement</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select budget</option>
                      <option value="25000-50000">₹25,000 - ₹50,000</option>
                      <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                      <option value="100000-150000">₹1,00,000 - ₹1,50,000</option>
                      <option value="150000+">₹1,50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us more about your event, specific requirements, or any questions..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Send Inquiry
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <PhoneIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-900">{vendor.contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <EnvelopeIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-gray-900">{vendor.contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <GlobeAltIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <p className="font-semibold text-gray-900">{vendor.contact.website}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <MapPinIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-semibold text-gray-900">{vendor.contact.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Why Choose Us?</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{vendor.events.split('+')[0]}+</div>
                    <div className="text-purple-100 text-sm">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{vendor.experience.split('+')[0]}+</div>
                    <div className="text-purple-100 text-sm">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{vendor.rating}</div>
                    <div className="text-purple-100 text-sm">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{vendor.reviews}</div>
                    <div className="text-purple-100 text-sm">Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Lightbox */}
      {selectedPortfolioItem !== null && (
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
              className="absolute left-4 z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="relative max-w-6xl max-h-[85vh] w-full mx-4">
              <Image
                src={filteredPortfolio[selectedPortfolioItem].image}
                alt={filteredPortfolio[selectedPortfolioItem].title}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
                <h3 className="text-white font-semibold text-lg">{filteredPortfolio[selectedPortfolioItem].title}</h3>
                <p className="text-white/80 text-sm">
                  {selectedPortfolioItem + 1} of {filteredPortfolio.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}