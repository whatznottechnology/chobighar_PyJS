'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ArrowRightIcon, MapPinIcon, CameraIcon, SparklesIcon, PaintBrushIcon, ComputerDesktopIcon, HandRaisedIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Vendors() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(prev => prev === categoryId ? null : categoryId);
  };

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
