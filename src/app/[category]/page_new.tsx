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
      description: 'Beautiful outdoor venues with lush green gardens',
      heroImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=600&fit=crop&auto=format',
      icon: '🌿',
      totalCount: 62
    },
    'wedding photographers': {
      title: 'Wedding Photographers',
      description: 'Professional photographers to capture your special moments',
      heroImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&h=600&fit=crop&auto=format',
      icon: '📸',
      totalCount: 150
    }
  };

  // Sample vendor data
  const vendorData = [
    {
      id: 1,
      name: 'Royal Banquet Palace',
      location: 'Salt Lake, Kolkata',
      rating: 4.8,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1519167758481-83f29c8e8f35?w=400&h=300&fit=crop&auto=format',
      capacity: '200-800 guests',
      featured: true,
      services: ['AC Hall', 'Catering', 'Decoration', 'Parking'],
      description: 'Luxury banquet hall with traditional Bengali hospitality.',
      phone: '+91 98765 43210',
      email: 'info@royalbanquet.com'
    },
    {
      id: 2,
      name: 'Grand Wedding Hall',
      location: 'Park Street, Kolkata',
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400&h=300&fit=crop&auto=format',
      capacity: '150-600 guests',
      featured: false,
      services: ['Modern Hall', 'Premium Catering', 'Live Music', 'Valet'],
      description: 'Contemporary venue with state-of-the-art facilities.',
      phone: '+91 87654 32109',
      email: 'bookings@grandwedding.com'
    },
    {
      id: 3,
      name: 'Heritage Palace',
      location: 'Ballygunge, Kolkata',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&auto=format',
      capacity: '100-400 guests',
      featured: true,
      services: ['Traditional Decor', 'Authentic Cuisine', 'Cultural Shows'],
      description: 'Classic venue with heritage architecture.',
      phone: '+91 76543 21098',
      email: 'events@heritagepalace.com'
    },
    {
      id: 4,
      name: 'Crystal Gardens',
      location: 'New Town, Kolkata',
      rating: 4.6,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&h=300&fit=crop&auto=format',
      capacity: '250-1000 guests',
      featured: false,
      services: ['Garden Setting', 'Indoor/Outdoor', 'Premium Service'],
      description: 'Beautiful garden venue with flexible arrangements.',
      phone: '+91 65432 10987',
      email: 'info@crystalgardens.com'
    },
    {
      id: 5,
      name: 'Elegance Banquets',
      location: 'Gariahat, Kolkata',
      rating: 4.5,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop&auto=format',
      capacity: '80-350 guests',
      featured: false,
      services: ['Elegant Decor', 'Multi-Cuisine', 'Entertainment'],
      description: 'Sophisticated venue for intimate celebrations.',
      phone: '+91 54321 09876',
      email: 'bookings@elegancebanquets.com'
    },
    {
      id: 6,
      name: 'Royal Garden Resort',
      location: 'Rajarhat, Kolkata',
      rating: 4.7,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop&auto=format',
      capacity: '300-1200 guests',
      featured: true,
      services: ['Resort Setting', 'Accommodation', 'Spa Services'],
      description: 'Complete destination wedding venue.',
      phone: '+91 43210 98765',
      email: 'weddings@royalgarden.com'
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
    console.log('Quick inquiry submitted:', formData);
  };

  const sortedVendors = [...vendorData].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
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
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      placeholder="Phone number"
                    />
                  </div>

                  <div>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
                  >
                    Get Quotes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Sort */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium"
              >
                <FunnelIcon className="w-4 h-4" />
                Filters
              </button>
              <span className="text-sm text-gray-600">
                Showing {sortedVendors.length} {currentCategory.title.toLowerCase()}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <AdjustmentsHorizontalIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedVendors.map((vendor) => (
            <div 
              key={vendor.id} 
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200 cursor-pointer"
              onClick={() => {
                // Navigate to vendor profile - will implement later
                console.log(`Navigate to vendor: ${vendor.name}`);
              }}
            >
              {/* Vendor Image - 4:3 Ratio */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={vendor.image}
                  alt={vendor.name}
                  width={300}
                  height={225}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Featured Badge */}
                {vendor.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                      FEATURED
                    </span>
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                    <StarIconSolid className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs font-semibold text-gray-900">{vendor.rating}</span>
                  </div>
                </div>
              </div>

              {/* Vendor Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-1 text-sm">
                  {vendor.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <MapPinIcon className="w-3 h-3" />
                  <span>{vendor.location}</span>
                </div>
                
                {/* Capacity */}
                <div className="mb-3">
                  <span className="inline-block bg-red-50 text-red-600 px-2 py-1 rounded-md text-xs font-medium">
                    {vendor.capacity}
                  </span>
                </div>

                {/* Contact Actions */}
                <div className="flex items-center justify-between">
                  <button className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                    View Profile
                  </button>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                      <PhoneIcon className="w-3 h-3 text-red-600" />
                    </button>
                    <button className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                      <EnvelopeIcon className="w-3 h-3 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}