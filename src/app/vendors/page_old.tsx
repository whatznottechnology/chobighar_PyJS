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
    router.push(`/${categorySlug}`);
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
      priceRange: '₹50,000 - ₹2,00,000',
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
      priceRange: '₹25,000 - ₹1,50,000',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop&auto=format',
      description: 'Award-winning photographers specializing in candid wedding moments.',
      services: ['Wedding Photography', 'Pre-wedding Shoots', 'Videography', 'Drone Coverage'],
      capacity: 'All event sizes',
      phone: '+91 87654 32109',
      email: 'hello@momentsphotography.com',
      featured: true
    },
    {
      id: 'beauty-bliss-makeup',
      name: 'Beauty Bliss Makeup Studio',
      category: 'makeup',
      type: 'Bridal Makeup',
      location: 'Camac Street, Kolkata',
      rating: 4.7,
      reviews: 234,
      priceRange: '₹15,000 - ₹50,000',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop&auto=format',
      description: 'Professional bridal makeup with premium products and latest techniques.',
      services: ['Bridal Makeup', 'Hair Styling', 'Draping', 'Trial Session'],
      capacity: 'Individual & Groups',
      phone: '+91 76543 21098',
      email: 'bookings@beautybliss.com',
      featured: true
    },
    {
      id: 'elegant-events',
      name: 'Elegant Events & Decor',
      category: 'planning',
      type: 'Wedding Planner',
      location: 'Ballygunge, Kolkata',
      rating: 4.6,
      reviews: 145,
      priceRange: '₹50,000 - ₹5,00,000',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop&auto=format',
      description: 'Complete wedding planning and decoration services for your dream wedding.',
      services: ['Wedding Planning', 'Decoration', 'Coordination', 'Vendor Management'],
      capacity: 'All event sizes',
      phone: '+91 65432 10987',
      email: 'contact@elegantevents.in',
      featured: true
    },
    {
      id: 'virtual-weddings-pro',
      name: 'Virtual Weddings Pro',
      category: 'virtual',
      type: 'Virtual Planning',
      location: 'Online Services',
      rating: 4.5,
      reviews: 67,
      priceRange: '₹10,000 - ₹50,000',
      image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400&h=300&fit=crop&auto=format',
      description: 'Expert virtual wedding planning and live streaming services.',
      services: ['Virtual Planning', 'Live Streaming', 'Digital Invitations', 'Remote Coordination'],
      capacity: 'Unlimited online guests',
      phone: '+91 54321 09876',
      email: 'hello@virtualweddingspro.com',
      featured: false
    },
    {
      id: 'artistic-mehndi',
      name: 'Artistic Mehndi Designs',
      category: 'mehndi',
      type: 'Mehndi Artist',
      location: 'Gariahat, Kolkata',
      rating: 4.8,
      reviews: 178,
      priceRange: '₹5,000 - ₹25,000',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop&auto=format',
      description: 'Traditional and modern mehndi designs for all occasions.',
      services: ['Bridal Mehndi', 'Arabic Designs', 'Traditional Patterns', 'Quick Designs'],
      capacity: 'Individual & Groups',
      phone: '+91 43210 98765',
      email: 'book@artisticmehndi.com',
      featured: true
    },
    {
      id: 'golden-garden-venue',
      name: 'Golden Garden Resort',
      category: 'venues',
      type: 'Wedding Resort',
      location: 'New Town, Kolkata',
      rating: 4.9,
      reviews: 92,
      priceRange: '₹1,00,000 - ₹5,00,000',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29c8e8f35?w=400&h=300&fit=crop&auto=format',
      description: 'Luxury resort with beautiful gardens and modern amenities.',
      services: ['Garden Venue', 'Accommodation', 'Catering', 'Event Management'],
      capacity: '100-500 guests',
      phone: '+91 32109 87654',
      email: 'events@goldengarden.com',
      featured: false
    },
    {
      id: 'candid-captures',
      name: 'Candid Captures Studio',
      category: 'photographers',
      type: 'Candid Photography',
      location: 'Esplanade, Kolkata',
      rating: 4.7,
      reviews: 123,
      priceRange: '₹20,000 - ₹1,00,000',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&auto=format',
      description: 'Specialists in capturing natural, candid moments of your special day.',
      services: ['Candid Photography', 'Cinematic Videos', 'Same Day Edit', 'Photo Albums'],
      capacity: 'All event sizes',
      phone: '+91 21098 76543',
      email: 'info@candidcaptures.in',
      featured: false
    }
  ];

  const filteredVendors = selectedCategory === 'all' 
    ? featuredVendors 
    : featuredVendors.filter(vendor => vendor.category === selectedCategory);

  const categories = [
    {
      id: 'venues',
      title: 'Venues',
      description: 'Banquet Halls, Marriage Garden / Lawns...',
      image: '/img/venues.jpg',
      vendorCount: '250+',
      icon: MapPinIcon,
      gradient: 'from-blue-400 to-purple-600',
      subcategories: [
        { name: 'View All Venues', count: 250, price: 'Starting ₹25,000' },
        { name: 'Banquet Halls', count: 85, price: '₹50,000+' },
        { name: 'Marriage Garden / Lawns', count: 62, price: '₹30,000+' },
        { name: 'Small Function / Party Halls', count: 45, price: '₹15,000+' },
        { name: 'Kalyana Mandapams', count: 38, price: '₹40,000+' },
        { name: 'Wedding Resorts', count: 25, price: '₹1,00,000+' },
        { name: 'Destination Wedding Venues', count: 18, price: '₹2,00,000+' },
        { name: '4 Star & Above Wedding Hotels', count: 12, price: '₹1,50,000+' }
      ]
    },
    {
      id: 'photographers',
      title: 'Photographers',
      description: 'Photographers',
      image: '/img/photographers.jpg',
      vendorCount: '180+',
      icon: CameraIcon,
      gradient: 'from-pink-400 to-orange-400',
      subcategories: [
        { name: 'Wedding Photography', count: 95, price: '₹25,000+' },
        { name: 'Pre Wedding Shoots', count: 48, price: '₹15,000+' },
        { name: 'Candid Photography', count: 62, price: '₹20,000+' },
        { name: 'Traditional Photography', count: 35, price: '₹18,000+' },
        { name: 'Drone Photography', count: 22, price: '₹30,000+' }
      ]
    },
    {
      id: 'makeup',
      title: 'Makeup',
      description: 'Bridal Makeup, Family Makeup',
      image: '/img/makeup.jpg',
      vendorCount: '150+',
      icon: SparklesIcon,
      gradient: 'from-rose-400 to-pink-500',
      subcategories: [
        { name: 'Bridal Makeup', count: 85, price: '₹15,000+' },
        { name: 'Family Makeup', count: 65, price: '₹3,000+' },
        { name: 'Engagement Makeup', count: 45, price: '₹8,000+' },
        { name: 'Party Makeup', count: 55, price: '₹2,500+' }
      ]
    },
    {
      id: 'planning',
      title: 'Planning & Decor',
      description: 'Wedding Planners, Decorators',
      image: '/img/planning.jpg',
      vendorCount: '120+',
      icon: PaintBrushIcon,
      gradient: 'from-orange-400 to-red-500',
      subcategories: [
        { name: 'Wedding Planners', count: 65, price: '₹50,000+' },
        { name: 'Wedding Decorators', count: 55, price: '₹25,000+' },
        { name: 'Flower Decorators', count: 40, price: '₹15,000+' },
        { name: 'Lighting Decorators', count: 30, price: '₹20,000+' }
      ]
    },
    {
      id: 'virtual',
      title: 'Virtual Planning',
      description: 'Virtual planning',
      image: '/img/virtual.jpg',
      vendorCount: '50+',
      icon: ComputerDesktopIcon,
      gradient: 'from-teal-400 to-blue-500',
      subcategories: [
        { name: 'Virtual Wedding Planning', count: 25, price: '₹10,000+' },
        { name: 'Online Consultations', count: 20, price: '₹2,000+' },
        { name: 'Digital Invitations', count: 15, price: '₹5,000+' }
      ]
    },
    {
      id: 'mehndi',
      title: 'Mehndi',
      description: 'Mehendi Artist',
      image: '/img/mehndi.jpg',
      vendorCount: '80+',
      icon: HandRaisedIcon,
      gradient: 'from-amber-400 to-orange-500',
      subcategories: [
        { name: 'Bridal Mehndi', count: 50, price: '₹8,000+' },
        { name: 'Family Mehndi', count: 30, price: '₹500+' },
        { name: 'Arabic Mehndi', count: 25, price: '₹3,000+' },
        { name: 'Traditional Mehndi', count: 20, price: '₹2,000+' }
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
                        <div className="flex items-center gap-2">
                          <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium">
                            {category.vendorCount} vendors
                          </span>
                        </div>
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
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {category.subcategories.map((sub, idx) => (
                          <div 
                            key={idx} 
                            className="group/sub bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-purple-200 cursor-pointer transform hover:scale-105"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSubcategoryClick(sub.name);
                            }}
                          >
                            <div className="text-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-2 mx-auto group-hover/sub:from-purple-200 group-hover/sub:to-pink-200 transition-colors">
                                <IconComponent className="w-5 h-5 text-purple-600" />
                              </div>
                              <h5 className="font-medium text-gray-800 text-sm group-hover/sub:text-purple-600 transition-colors mb-1">
                                {sub.name}
                              </h5>
                              <span className="text-xs text-gray-500">{sub.count} options</span>
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
          
          {/* Featured Vendors Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Featured Vendors
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Handpicked professionals who deliver exceptional wedding services.
              </p>
            </div>

            {/* Category Filter for Vendors */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { id: 'all', name: 'All', icon: ArrowRightIcon },
                { id: 'venues', name: 'Venues', icon: MapPinIcon },
                { id: 'photographers', name: 'Photos', icon: CameraIcon },
                { id: 'makeup', name: 'Makeup', icon: SparklesIcon },
                { id: 'planning', name: 'Planning', icon: PaintBrushIcon },
                { id: 'virtual', name: 'Virtual', icon: ComputerDesktopIcon },
                { id: 'mehndi', name: 'Mehndi', icon: HandRaisedIcon }
              ].map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600 shadow-sm border border-gray-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Vendor Profiles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVendors.map((vendor) => (
                <div key={vendor.id} className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200">
                  {/* Vendor Image */}
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
                    <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1 text-sm">
                      {vendor.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                      <MapPinIcon className="w-3 h-3" />
                      <span>{vendor.location}</span>
                    </div>
                    
                    {/* Services */}
                    <div className="mb-3">
                      <span className="inline-block bg-purple-50 text-purple-600 px-2 py-1 rounded-md text-xs font-medium">
                        {vendor.type}
                      </span>
                    </div>

                    {/* Price & Contact */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-green-600">
                        {vendor.priceRange}
                      </span>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <PhoneIcon className="w-3 h-3 text-purple-600" />
                        </button>
                        <button className="p-1.5 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <EnvelopeIcon className="w-3 h-3 text-purple-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              {filteredVendors.map((vendor) => (
                <div key={vendor.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Vendor Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={vendor.image}
                      alt={vendor.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                      <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                        <StarIconSolid className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-semibold text-gray-900">{vendor.rating}</span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                        {vendor.type}
                      </span>
                    </div>
                  </div>

                  {/* Vendor Info */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 
                        className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {vendor.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{vendor.location}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {vendor.description}
                      </p>
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <StarIconSolid
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(vendor.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm font-semibold text-gray-900 ml-1">
                          {vendor.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({vendor.reviews} reviews)
                      </span>
                    </div>

                    {/* Services */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Services:</h4>
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
                    <div className="flex justify-between items-center mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Price: </span>
                        <span className="font-semibold text-green-600">{vendor.priceRange}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Capacity: </span>
                        <span className="font-semibold text-gray-900">{vendor.capacity}</span>
                      </div>
                    </div>

                    {/* Contact Actions */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                        View Details
                      </button>
                      <button className="bg-white border-2 border-purple-200 text-purple-600 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                        <PhoneIcon className="w-4 h-4" />
                      </button>
                      <button className="bg-white border-2 border-purple-200 text-purple-600 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                        <EnvelopeIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-white border-2 border-purple-200 text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                Load More Vendors
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
