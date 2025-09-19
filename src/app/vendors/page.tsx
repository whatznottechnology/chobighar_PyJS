'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ArrowRightIcon, MapPinIcon, CameraIcon, SparklesIcon, PaintBrushIcon, ComputerDesktopIcon, HandRaisedIcon, StarIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';

export default function Vendors() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(prev => prev === categoryId ? null : categoryId);
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
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isExpanded = expandedCategory === category.id;
              
              return (
                <div 
                  key={category.id} 
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                    isExpanded ? 'md:col-span-2 transform scale-[1.02]' : 'hover:scale-[1.02]'
                  }`}
                >
                  {/* Card Header with Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={600}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-80`}></div>
                    
                    {/* Overlay Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                      <div className="flex items-start justify-between">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <button 
                          onClick={() => toggleCategory(category.id)}
                          className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                        >
                          {isExpanded ? 
                            <ChevronUpIcon className="w-6 h-6" /> : 
                            <ChevronDownIcon className="w-6 h-6" />
                          }
                        </button>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                        <p className="text-white/90 mb-3">{category.description}</p>
                        <div className="flex items-center gap-3">
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                            {category.vendorCount} vendors
                          </span>
                          <ArrowRightIcon className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                      <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <IconComponent className="w-6 h-6 text-purple-600" />
                        Explore {category.title}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.subcategories.map((sub, idx) => (
                          <div 
                            key={idx} 
                            className="group/sub bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-purple-300 hover:border-purple-500 cursor-pointer"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-semibold text-gray-800 group-hover/sub:text-purple-600 transition-colors">
                                {sub.name}
                              </h5>
                              <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover/sub:text-purple-500 group-hover/sub:translate-x-1 transition-all" />
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">{sub.count} vendors</span>
                              <span className="font-semibold text-green-600">{sub.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 text-center">
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                          View All {category.title}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Featured Vendors Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Featured Vendors
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Handpicked professionals who have consistently delivered exceptional services for weddings.
              </p>
            </div>

            {/* Category Filter for Vendors */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { id: 'all', name: 'All Vendors', icon: ArrowRightIcon },
                { id: 'venues', name: 'Venues', icon: MapPinIcon },
                { id: 'photographers', name: 'Photographers', icon: CameraIcon },
                { id: 'makeup', name: 'Makeup Artists', icon: SparklesIcon },
                { id: 'planning', name: 'Planners', icon: PaintBrushIcon },
                { id: 'virtual', name: 'Virtual Services', icon: ComputerDesktopIcon },
                { id: 'mehndi', name: 'Mehndi Artists', icon: HandRaisedIcon }
              ].map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Vendor Profiles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          
          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Can&apos;t find what you&apos;re looking for?</h2>
            <p className="text-lg mb-8 opacity-90">
              Our wedding experts are here to help you find the perfect vendors for your special day.
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
