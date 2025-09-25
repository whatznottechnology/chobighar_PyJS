'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon, ChevronUpIcon, ArrowRightIcon, MapPinIcon, CameraIcon, SparklesIcon, PaintBrushIcon, ComputerDesktopIcon, HandRaisedIcon, StarIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';

export default function Vendors() {
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(prev => prev === categoryId ? null : categoryId);
  };

  const handleSubcategoryClick = (subcategoryName: string) => {
    // Convert subcategory name to URL-friendly format
    const categorySlug = subcategoryName.toLowerCase().replace(/ /g, '-').replace(/\//g, '-');
    router.push(`/vendors/${categorySlug}`);
  };

  // Featured vendor profiles
  const featuredVendors = [
    {
      id: 'royal-palace-banquets',
      name: 'Royal Palace Banquets',
      category: 'venues',
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
      id: 'moments-photography',
      name: 'Moments Photography',
      category: 'photographers',
      type: 'Wedding Photography',
      location: 'Park Street, Kolkata',
      rating: 4.9,
      reviews: 89,
      priceRange: '₹25,000+',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop&auto=format',
      description: 'Capturing beautiful moments with artistic vision and professional expertise.',
      services: ['Wedding Photography', 'Pre-Wedding', 'Candid', 'Traditional'],
      capacity: null,
      phone: '+91 98765 43211',
      email: 'info@momentsphotography.com',
      featured: true
    },
    {
      id: 'glamour-makeup-studio',
      name: 'Glamour Makeup Studio',
      category: 'makeup',
      type: 'Bridal Makeup',
      location: 'Ballygunge, Kolkata',
      rating: 4.7,
      reviews: 134,
      priceRange: '₹15,000+',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop&auto=format',
      description: 'Professional bridal makeup with premium products and expert techniques.',
      services: ['Bridal Makeup', 'Hair Styling', 'Saree Draping', 'Nail Art'],
      capacity: null,
      phone: '+91 98765 43212',
      email: 'info@glamourmakeup.com',
      featured: false
    },
    {
      id: 'elegant-events',
      name: 'Elegant Events & Decor',
      category: 'planning',
      type: 'Wedding Planning',
      location: 'New Town, Kolkata',
      rating: 4.6,
      reviews: 98,
      priceRange: '₹30,000+',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop&auto=format',
      description: 'Complete wedding planning and decoration services with attention to detail.',
      services: ['Event Planning', 'Decoration', 'Coordination', 'Vendor Management'],
      capacity: null,
      phone: '+91 98765 43213',
      email: 'info@elegantevents.com',
      featured: false
    },
    {
      id: 'mehndi-artistry',
      name: 'Mehndi Artistry',
      category: 'mehndi',
      type: 'Bridal Mehndi',
      location: 'Gariahat, Kolkata',
      rating: 4.8,
      reviews: 76,
      priceRange: '₹8,000+',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop&auto=format',
      description: 'Intricate bridal mehndi designs with traditional and contemporary patterns.',
      services: ['Bridal Mehndi', 'Family Mehndi', 'Floral Designs', 'Arabic Patterns'],
      capacity: null,
      phone: '+91 98765 43214',
      email: 'info@mehndiartistry.com',
      featured: false
    },
    {
      id: 'virtual-ceremonies',
      name: 'Virtual Ceremonies',
      category: 'virtual',
      type: 'Live Streaming',
      location: 'Online Services',
      rating: 4.5,
      reviews: 45,
      priceRange: '₹5,000+',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop&auto=format',
      description: 'Professional live streaming services for virtual wedding ceremonies.',
      services: ['Live Streaming', 'Virtual Ceremonies', 'Recording', 'Multi-Camera Setup'],
      capacity: null,
      phone: '+91 98765 43215',
      email: 'info@virtualceremonies.com',
      featured: false
    }
  ];

  // Filter vendors based on selected category
  const filteredVendors = selectedCategory === 'all' 
    ? featuredVendors 
    : featuredVendors.filter(vendor => vendor.category === selectedCategory);

  // Wedding categories data
  const categories = [
    {
      id: 'venues',
      title: 'Venues & Spaces',
      description: 'Beautiful locations for your special day',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop&auto=format',
      icon: MapPinIcon,
      gradient: 'from-blue-900/80 to-purple-900/80',
      vendorCount: 250,
      subcategories: [
        { name: 'Banquet Halls', count: 120 },
        { name: 'Marriage Garden / Lawns', count: 80 },
        { name: 'Resorts', count: 30 },
        { name: 'Hotels', count: 20 }
      ]
    },
    {
      id: 'photographers',
      title: 'Photography & Videography',
      description: 'Capture your precious moments forever',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=400&fit=crop&auto=format',
      icon: CameraIcon,
      gradient: 'from-green-900/80 to-teal-900/80',
      vendorCount: 180,
      subcategories: [
        { name: 'Wedding Photographers', count: 100 },
        { name: 'Cinematographers', count: 50 },
        { name: 'Pre-Wedding Specialists', count: 30 }
      ]
    },
    {
      id: 'makeup',
      title: 'Makeup & Beauty',
      description: 'Look stunning on your big day',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop&auto=format',
      icon: SparklesIcon,
      gradient: 'from-pink-900/80 to-rose-900/80',
      vendorCount: 150,
      subcategories: [
        { name: 'Bridal Makeup Artists', count: 80 },
        { name: 'Hair Stylists', count: 40 },
        { name: 'Nail Artists', count: 30 }
      ]
    },
    {
      id: 'planning',
      title: 'Planning & Decor',
      description: 'Expert planning for a perfect celebration',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&auto=format',
      icon: PaintBrushIcon,
      gradient: 'from-purple-900/80 to-indigo-900/80',
      vendorCount: 120,
      subcategories: [
        { name: 'Wedding Planners', count: 60 },
        { name: 'Decorators', count: 40 },
        { name: 'Florists', count: 20 }
      ]
    },
    {
      id: 'mehndi',
      title: 'Mehndi Artists',
      description: 'Beautiful henna designs for brides',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=400&fit=crop&auto=format',
      icon: HandRaisedIcon,
      gradient: 'from-orange-900/80 to-red-900/80',
      vendorCount: 80,
      subcategories: [
        { name: 'Bridal Mehndi', count: 40 },
        { name: 'Arabic Mehndi', count: 25 },
        { name: 'Traditional Mehndi', count: 15 }
      ]
    },
    {
      id: 'virtual',
      title: 'Virtual Services',
      description: 'Modern solutions for contemporary weddings',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format',
      icon: ComputerDesktopIcon,
      gradient: 'from-gray-900/80 to-slate-900/80',
      vendorCount: 50,
      subcategories: [
        { name: 'Live Streaming Services', count: 25 },
        { name: 'Virtual Ceremonies', count: 15 },
        { name: 'Online Invitations', count: 10 }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Wedding Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the perfect vendors for your dream wedding. Browse through our curated categories and find trusted professionals.
          </p>
        </div>
        
        {/* Categories Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isExpanded = expandedCategory === category.id;
              
              return (
                <div 
                  key={category.id} 
                  className={`group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${
                    isExpanded ? 'lg:col-span-3 transform scale-[1.02] z-10' : 'hover:scale-[1.02]'
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  {/* Card Header with Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-75`}></div>
                    
                    {/* Overlay Content */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                      <div className="flex items-start justify-between">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5 transform transition-transform group-hover:rotate-180">
                          {isExpanded ? 
                            <ChevronUpIcon className="w-4 h-4" /> : 
                            <ChevronDownIcon className="w-4 h-4" />
                          }
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold mb-1">{category.title}</h3>
                        <p className="text-white/90 text-sm mb-2 line-clamp-2">{category.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <IconComponent className="w-5 h-5 text-purple-600" />
                        Explore {category.title}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.subcategories.map((sub, idx) => (
                          <div 
                            key={idx} 
                            className="group/sub bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-red-200 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSubcategoryClick(sub.name);
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center group-hover/sub:from-red-200 group-hover/sub:to-red-300 transition-colors flex-shrink-0">
                                <IconComponent className="w-4 h-4 text-red-600" />
                              </div>
                              <h5 className="font-medium text-gray-800 text-sm group-hover/sub:text-red-600 transition-colors">
                                {sub.name}
                              </h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
        </div>
      </div>

      {/* Wedding Vendors Section - Full Width */}
      <div className="bg-white py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Wedding Vendors
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Handpicked professionals who deliver exceptional wedding services.
          </p>
        </div>

        {/* Full Width Layout with Left Sidebar Filter */}
        <div className="w-full px-4">
          <div className="flex flex-col lg:flex-row gap-8 max-w-none">
            {/* Left Sidebar - Category Filter */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Filter by Category
                </h3>
                <div className="space-y-3">
                  {[
                    { id: 'all', name: 'All Vendors', icon: ArrowRightIcon },
                    { id: 'venues', name: 'Venues & Spaces', icon: MapPinIcon },
                    { id: 'photographers', name: 'Photography', icon: CameraIcon },
                    { id: 'makeup', name: 'Makeup Artists', icon: SparklesIcon },
                    { id: 'planning', name: 'Event Planning', icon: PaintBrushIcon },
                    { id: 'virtual', name: 'Virtual Services', icon: ComputerDesktopIcon },
                    { id: 'mehndi', name: 'Mehndi Artists', icon: HandRaisedIcon }
                  ].map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-left group ${
                          selectedCategory === category.id
                            ? 'bg-red-600 text-white shadow-lg transform scale-105'
                            : 'text-gray-600 hover:bg-red-50 hover:text-red-600 hover:transform hover:scale-102'
                        }`}
                      >
                        <div className={`p-2 rounded-lg transition-all duration-300 ${
                          selectedCategory === category.id
                            ? 'bg-white/20'
                            : 'bg-gray-100 group-hover:bg-red-100'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="font-semibold">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Content - Vendor Cards */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVendors.map((vendor) => (
                  <div 
                    key={vendor.id} 
                    className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200 cursor-pointer transform hover:-translate-y-1"
                    onClick={() => {
                      router.push(`/${vendor.id}`);
                    }}
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
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/${vendor.id}`);
                          }}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                        >
                          View Profile
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Load More Vendors
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}