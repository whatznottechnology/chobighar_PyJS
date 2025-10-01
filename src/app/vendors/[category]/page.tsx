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
  TagIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useVendorSubcategory } from '../../../hooks/useVendorData';

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
  
  const { subcategory, loading, error } = useVendorSubcategory(categorySlug);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    message: ''
  });

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading subcategory...</p>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !subcategory) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'This category does not exist'}</p>
          <button 
            onClick={() => router.push('/vendors')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Vendors
          </button>
        </div>
      </main>
    );
  }

  const defaultImage = '/img/1.jpg';
  const defaultBannerImage = subcategory?.banner_image || defaultImage;

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
            <span className="text-red-600 font-medium">{subcategory.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section - 75% Viewport Height */}
      <div className="relative h-[75vh] min-h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={defaultBannerImage}
            alt={subcategory.name}
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
                <span className="text-5xl">🏛️</span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  {subcategory.vendor_count}+ vendors
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                {subcategory.name}
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                {subcategory.description}
              </p>
              
              <div className="flex flex-wrap gap-6 text-sm items-center">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-400" />
                  <span>Verified Vendors</span>
                </div>
                <button 
                  onClick={() => {
                    const form = document.querySelector('form');
                    form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 text-sm"
                  style={{
                    background: 'linear-gradient(45deg, #B22222, #DC143C)',
                    boxShadow: '0 4px 15px rgba(178, 34, 34, 0.3)'
                  }}
                >
                  <PhoneIcon className="w-5 h-5" />
                  Get Instant Response
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Compact Inquiry Form - Right Side */}
            <div className="lg:col-span-1 flex justify-end">
              <div className="w-80 bg-white rounded-xl p-4 shadow-xl border border-white/20">
                <div className="text-center mb-3">
                  <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Get Free Quotes
                  </h3>
                  <p className="text-gray-600 text-xs">Compare prices from top {subcategory.name.toLowerCase()}</p>
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
              {subcategory.name} <span className="text-red-600">in Kolkata</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subcategory.vendor_count} verified vendors ready to serve you
            </p>
          </div>

          {/* Coming Soon Message */}
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border border-red-200">
                <div className="text-6xl mb-6">🏗️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vendor Profiles Coming Soon!</h3>
                <p className="text-gray-600 mb-6">
                  We're working hard to bring you the best {subcategory.name.toLowerCase()} in your area. 
                  In the meantime, you can submit your requirements and we'll connect you with top-rated vendors.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => {
                      const form = document.querySelector('form');
                      form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Get Free Quotes
                  </button>
                  <button 
                    onClick={() => router.push('/vendors')}
                    className="border border-red-600 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                  >
                    Browse Other Categories
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Need Help Finding the Right {subcategory.name}?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Our wedding experts are here to help you find the perfect {subcategory.name.toLowerCase()} that matches your vision and budget.
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