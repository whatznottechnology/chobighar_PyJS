'use client';

import React, { useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useVendorCategories, useFeaturedVendors, useVendorProfiles } from '../src/hooks/useVendorData';
import { getMediaUrl } from '../src/config/api';
import InquiryModal from './InquiryModal';

const VendorSection = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);

  // Fetch data from backend
  const { categories: backendCategories, loading: categoriesLoading } = useVendorCategories();
  const { vendors: featuredVendors, loading: featuredLoading } = useFeaturedVendors();
  const { vendors: categoryVendors, loading: categoryLoading } = useVendorProfiles(
    activeCategory !== 'all' ? { category: activeCategory } : undefined
  );

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Transform backend categories for display
  const categories = useMemo(() => {
    if (!backendCategories) return [{ id: 'all', name: 'All Vendors', count: 0 }];
    
    return [
      { id: 'all', name: 'All Vendors', count: backendCategories.reduce((sum, cat) => sum + cat.vendor_count, 0) },
      ...backendCategories.map(cat => ({
        id: cat.slug,
        name: cat.name,
        count: cat.vendor_count
      }))
    ];
  }, [backendCategories]);

  // Choose vendors based on selection - use featured vendors when 'all' is selected, otherwise filtered vendors
  const displayVendors = useMemo(() => {
    if (activeCategory === 'all') {
      return featuredVendors || [];
    } else {
      return categoryVendors || [];
    }
  }, [activeCategory, featuredVendors, categoryVendors]);

  // Loading state
  const isLoading = categoriesLoading || (activeCategory === 'all' ? featuredLoading : categoryLoading);

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute top-0 right-0 w-1/3 lg:w-2/5">
        <img
          src="/img/62569719_9509225.png"
          alt="Background decoration"
          className="w-full h-auto object-contain opacity-8"
        />
      </div>
      
      <div className="w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-royal-red"></div>
            <span 
              className="text-royal-red font-medium tracking-wider uppercase text-sm"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Trusted Partners
            </span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-royal-red"></div>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our <span className="text-royal-red">Associate</span> Vendors
          </h2>
          <p 
            className="text-xl text-gray-600 leading-relaxed" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            We collaborate with the finest wedding professionals to provide you with comprehensive services for your perfect celebration.
          </p>
        </div>

        {/* Enhanced Category Filter */}
        <div className="mb-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="inline-flex bg-white p-2 rounded-2xl border border-gray-300 shadow-lg overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap min-w-0 ${
                    activeCategory === category.id
                      ? 'bg-white text-red-600 shadow-lg border-2 border-red-600 transform scale-105' 
                      : 'text-gray-800 hover:text-red-600 hover:bg-gray-50 hover:shadow-sm border-2 border-transparent'
                  }`}
                  style={{
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  <span className="font-bold">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Vendors with Navigation Arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-black/20"
          >
            <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-black/20"
          >
            <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
          >
            {isLoading ? (
              // Loading skeleton
              <div className="flex gap-6">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="flex-shrink-0 w-80">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                      <div className="h-40 bg-gray-300"></div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-300 rounded mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                          </div>
                        </div>
                        <div className="h-3 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                        <div className="flex gap-2">
                          <div className="flex-1 h-8 bg-gray-300 rounded-lg"></div>
                          <div className="flex-1 h-8 bg-gray-300 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              displayVendors.map((vendor) => (
                <div key={vendor.id} className="group flex-shrink-0">
                  {/* Compact Profile Card */}
                  <div 
                    className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 w-80 cursor-pointer"
                    onClick={() => router.push(`/${vendor.slug}`)}
                  >
                    {/* Vendor Image */}
                    <div className="relative h-40 overflow-hidden">
                      {getMediaUrl(vendor.main_image) ? (
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url(${getMediaUrl(vendor.main_image)})` }}
                        ></div>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Featured/Verified Badge */}
                      {vendor.is_featured && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-royal-red/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
                          {vendor.subcategory_name}
                        </span>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2.5 py-1 rounded-full text-xs font-bold">
                          {vendor.price_range}
                        </span>
                      </div>
                    </div>

                    {/* Vendor Info */}
                    <div className="p-5">
                      {/* Header with Profile Image */}
                      <div className="mb-3">
                        <div className="flex items-center gap-3 mb-2">
                          {/* Profile Image - use main_image as fallback */}
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-royal-red/20 flex-shrink-0">
                            {getMediaUrl(vendor.main_image) ? (
                              <div 
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${getMediaUrl(vendor.main_image)})` }}
                              ></div>
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-royal-red to-red-600 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  {vendor.name.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Name and Tagline */}
                          <div className="flex-1 min-w-0">
                            <h3 
                              className="text-lg font-bold text-gray-900 group-hover:text-royal-red transition-colors duration-300 line-clamp-1"
                              style={{ fontFamily: 'Playfair Display, serif' }}
                            >
                              {vendor.name}
                            </h3>
                            <p className="text-royal-red/80 font-medium text-sm line-clamp-1">
                              {vendor.tagline || vendor.subcategory_name}
                            </p>
                          </div>
                        </div>
                        
                        {/* Location */}
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <svg className="w-3 h-3 mr-1 text-royal-red" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {vendor.location}
                        </div>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <svg
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(parseFloat(vendor.rating)) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs font-medium text-gray-600">
                            {vendor.rating} ({vendor.reviews_count} reviews)
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/${vendor.slug}`);
                          }}
                          className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 transform hover:scale-105"
                        >
                          View Profile
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVendor(vendor);
                            setIsModalOpen(true);
                          }}
                          className="flex-1 bg-royal-red hover:bg-red-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300"
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* View All Card */}
            <div className="flex-shrink-0 w-80">
              <div 
                className="h-full bg-gradient-to-br from-royal-red via-red-800 to-red-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
                onClick={() => router.push('/vendors')}
              >
                <div className="text-center p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    View All Vendors
                  </h3>
                  <p className="text-white/80 text-xs mb-4">
                    Discover verified professionals
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push('/vendors');
                    }}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                  >
                    Explore More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType="vendor"
        serviceName={selectedVendor?.name || ''}
        serviceId={selectedVendor?.id?.toString() || ''}
        prefilledData={{
          subject: selectedVendor ? `Inquiry about ${selectedVendor.name}` : 'Vendor Inquiry',
          message: selectedVendor 
            ? `Hi, I'm interested in your ${selectedVendor.subcategory_name} services. Please provide more details about availability and pricing.`
            : 'I would like to know more about your services.'
        }}
      />
    </section>
  );
};

export default VendorSection;