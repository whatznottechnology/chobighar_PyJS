'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  AdjustmentsHorizontalIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface Params {
  category: string;
}

interface CategoryPageProps {
  params: Params;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: ''
  });
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Decode category name from URL
  const categoryName = decodeURIComponent(params.category).replace(/-/g, ' ');

  // Category data mapping
  const categoryData: { [key: string]: any } = {
    'banquet halls': {
      title: 'Banquet Halls',
      description: 'Premium banquet halls for your dream wedding celebration',
      heroImage: 'https://images.unsplash.com/photo-1519167758481-83f29c8e8f35?w=1200&h=600&fit=crop&auto=format',
      icon: '🏛️',
      totalCount: 85
    },
    'marriage garden lawns': {
      title: 'Marriage Garden / Lawns',
      description: 'Beautiful outdoor venues for garden weddings',
      heroImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=600&fit=crop&auto=format',
      icon: '🌿',
      totalCount: 62
    },
    'wedding photography': {
      title: 'Wedding Photography',
      description: 'Professional photographers to capture your special moments',
      heroImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=600&fit=crop&auto=format',
      icon: '📸',
      totalCount: 95
    },
    'bridal makeup': {
      title: 'Bridal Makeup',
      description: 'Expert makeup artists for your perfect bridal look',
      heroImage: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&h=600&fit=crop&auto=format',
      icon: '💄',
      totalCount: 85
    },
    'wedding planners': {
      title: 'Wedding Planners',
      description: 'Professional planners to make your wedding stress-free',
      heroImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=600&fit=crop&auto=format',
      icon: '📋',
      totalCount: 65
    },
    'mehndi artists': {
      title: 'Mehndi Artists',
      description: 'Traditional and modern mehndi designs for all occasions',
      heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&h=600&fit=crop&auto=format',
      icon: '🎨',
      totalCount: 50
    }
  };

  // Sample vendor data for the category
  const vendorData = [
    {
      id: 1,
      name: 'Royal Palace Banquets',
      location: 'Salt Lake, Kolkata',
      rating: 4.8,
      reviews: 156,
      priceRange: '₹50,000 - ₹2,00,000',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29c8e8f35?w=400&h=600&fit=crop&auto=format',
      capacity: '200-800 guests',
      featured: true,
      services: ['AC Banquet Hall', 'Catering', 'Decoration', 'Parking'],
      description: 'Luxury banquet hall with modern amenities and traditional Bengali hospitality.',
      phone: '+91 98765 43210',
      email: 'info@royalpalace.com'
    },
    {
      id: 2,
      name: 'Golden Garden Resort',
      location: 'New Town, Kolkata',
      rating: 4.9,
      reviews: 92,
      priceRange: '₹1,00,000 - ₹5,00,000',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=600&fit=crop&auto=format',
      capacity: '100-500 guests',
      featured: false,
      services: ['Garden Venue', 'Accommodation', 'Catering', 'Event Management'],
      description: 'Luxury resort with beautiful gardens and modern amenities.',
      phone: '+91 32109 87654',
      email: 'events@goldengarden.com'
    },
    {
      id: 3,
      name: 'Elegant Events Hall',
      location: 'Park Street, Kolkata',
      rating: 4.7,
      reviews: 128,
      priceRange: '₹75,000 - ₹3,00,000',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop&auto=format',
      capacity: '150-600 guests',
      featured: true,
      services: ['Modern Hall', 'Audio/Visual', 'Catering', 'Valet Parking'],
      description: 'Contemporary venue with state-of-the-art facilities in the heart of the city.',
      phone: '+91 87654 32109',
      email: 'bookings@eleganteventshall.com'
    },
    {
      id: 4,
      name: 'Heritage Banquet',
      location: 'Ballygunge, Kolkata',
      rating: 4.6,
      reviews: 89,
      priceRange: '₹40,000 - ₹1,50,000',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=600&fit=crop&auto=format',
      capacity: '100-400 guests',
      featured: false,
      services: ['Traditional Decor', 'Catering', 'Photography', 'Coordination'],
      description: 'Classic venue with traditional Bengali architecture and modern facilities.',
      phone: '+91 76543 21098',
      email: 'info@heritagebanquet.com'
    },
    {
      id: 5,
      name: 'Crystal Palace',
      location: 'Gariahat, Kolkata',
      rating: 4.8,
      reviews: 203,
      priceRange: '₹60,000 - ₹2,50,000',
      image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400&h=600&fit=crop&auto=format',
      capacity: '250-1000 guests',
      featured: true,
      services: ['Grand Hall', 'Premium Catering', 'Decoration', 'Bridal Suite'],
      description: 'Magnificent venue with crystal chandeliers and luxurious ambiance.',
      phone: '+91 65432 10987',
      email: 'events@crystalpalace.com'
    },
    {
      id: 6,
      name: 'Garden View Banquet',
      location: 'Jadavpur, Kolkata',
      rating: 4.5,
      reviews: 156,
      priceRange: '₹35,000 - ₹1,20,000',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&h=600&fit=crop&auto=format',
      capacity: '80-350 guests',
      featured: false,
      services: ['Garden Setting', 'Indoor/Outdoor', 'Catering', 'Music System'],
      description: 'Charming venue with beautiful garden views and flexible arrangements.',
      phone: '+91 54321 09876',
      email: 'bookings@gardenviewbanquet.com'
    }
  ];

  const currentCategory = categoryData[categoryName.toLowerCase()] || {
    title: categoryName,
    description: `Professional ${categoryName} services for your wedding`,
    heroImage: 'https://images.unsplash.com/photo-1519167758481-83f29c8e8f35?w=1200&h=600&fit=crop&auto=format',
    icon: '🎉',
    totalCount: 50
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Quick inquiry submitted:', formData);
  };

  const sortedVendors = [...vendorData].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return parseInt(a.priceRange.split('-')[0].replace(/[₹,]/g, '')) - 
               parseInt(b.priceRange.split('-')[0].replace(/[₹,]/g, ''));
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
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

      {/* Hero Section with Contact Form */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src={currentCategory.heroImage}
            alt={currentCategory.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-red-800/70 to-red-900/80"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Hero Content */}
            <div className="lg:col-span-2 text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{currentCategory.icon}</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {currentCategory.totalCount}+ vendors
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {currentCategory.title}
              </h1>
              
              <p className="text-xl text-gray-200 mb-6 leading-relaxed">
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

            {/* Compact Quick Inquiry Form */}
            <div className="lg:col-span-1">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Quick Inquiry</h3>
                  <p className="text-gray-600 text-sm">Get instant quotes</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <UserIcon className="w-4 h-4 inline mr-1" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <PhoneIcon className="w-4 h-4 inline mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CalendarIcon className="w-4 h-4 inline mr-1" />
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Free Quotes
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  💯 100% Free • 🔒 Secure • ⚡ Instant Response
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {sortedVendors.length} {currentCategory.title} in Kolkata
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FunnelIcon className="w-4 h-4" />
                Filters
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <AdjustmentsHorizontalIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="price">Price: Low to High</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedVendors.map((vendor) => (
            <div 
              key={vendor.id} 
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-[1.02]"
            >
              {/* Vendor Image - 2:3 Ratio */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={vendor.image}
                  alt={vendor.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Featured Badge */}
                {vendor.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </span>
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center gap-1">
                    <StarIconSolid className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">{vendor.rating}</span>
                  </div>
                </div>

                {/* Quick Action Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-3">
                    <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
                      <PhoneIcon className="w-5 h-5 text-purple-600" />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
                      <EnvelopeIcon className="w-5 h-5 text-purple-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Vendor Info */}
              <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                    {vendor.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{vendor.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {vendor.description}
                  </p>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIconSolid
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(vendor.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm font-semibold text-gray-900 ml-2">
                      {vendor.rating} ({vendor.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {vendor.services.slice(0, 3).map((service, idx) => (
                      <span 
                        key={idx}
                        className="bg-purple-50 text-purple-600 px-2 py-1 rounded text-xs font-medium"
                      >
                        {service}
                      </span>
                    ))}
                    {vendor.services.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{vendor.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Price & Capacity */}
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Price Range:</span>
                    <span className="font-bold text-green-600">{vendor.priceRange}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Capacity:</span>
                    <span className="font-semibold text-gray-900">{vendor.capacity}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                    View Details & Gallery
                  </button>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white border-2 border-purple-200 text-purple-600 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
                      <PhoneIcon className="w-4 h-4" />
                      Call Now
                    </button>
                    <button className="flex-1 bg-white border-2 border-purple-200 text-purple-600 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
                      <EnvelopeIcon className="w-4 h-4" />
                      Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-white border-2 border-purple-200 text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl">
            Load More Vendors
          </button>
        </div>
      </div>
    </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Finding the Right Vendor?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Our wedding experts are here to help you find the perfect {currentCategory.title.toLowerCase()} for your special day.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Talk to Our Experts
          </button>
        </div>
      </div>
    </main>
  );
}