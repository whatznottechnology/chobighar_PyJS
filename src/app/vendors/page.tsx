'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon, ChevronUpIcon, ArrowRightIcon, MapPinIcon, CameraIcon, SparklesIcon, PaintBrushIcon, ComputerDesktopIcon, HandRaisedIcon, StarIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useVendorCategories, useFeaturedVendors, useVendorProfiles } from '../../hooks/useVendorData';
import { getIconComponent } from '../../../utils/vendorIcons';
import { getMediaUrl } from '../../config/api';
import InquiryModal from '../../../components/InquiryModal';

export default function Vendors() {
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  
  // Load categories and vendors from API
  const { categories, loading: categoriesLoading, error: categoriesError } = useVendorCategories();
  const { vendors: allVendors, loading: allVendorsLoading, error: allVendorsError } = useVendorProfiles();
  const { vendors: categoryVendors, loading: categoryLoading, error: categoryError } = useVendorProfiles(
    selectedCategory !== 'all' ? { category: selectedCategory } : undefined
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(prev => prev === categoryId ? null : categoryId);
  };

  const handleSubcategoryClick = (subcategoryName: string) => {
    // Convert subcategory name to URL-friendly format
    const categorySlug = subcategoryName.toLowerCase().replace(/ /g, '-').replace(/\//g, '-');
    router.push(`/vendors/${categorySlug}`);
  };

  // Choose vendors based on selection - use all vendors when "all" is selected, otherwise use filtered vendors
  const displayVendors = useMemo(() => {
    if (selectedCategory === 'all') {
      return allVendors;
    } else {
      return categoryVendors;
    }
  }, [selectedCategory, allVendors, categoryVendors]);

  // Combined loading and error states
  const loading = categoriesLoading || (selectedCategory === 'all' ? allVendorsLoading : categoryLoading);
  const error = categoriesError || allVendorsError || categoryError;

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        </div>
      </main>
    );
  }

  // Show error state
  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </main>
    );
  }

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
              const IconComponent = getIconComponent(category.icon_emoji);
              const isExpanded = expandedCategory === category.slug;
              return (
                <div 
                  key={category.id} 
                  className={`group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${
                    isExpanded ? 'lg:col-span-3 transform scale-[1.02] z-10' : 'hover:scale-[1.02]'
                  }`}
                  onClick={() => toggleCategory(category.slug)}
                >
                  {/* Card Header with Image */}
                  <div className="relative h-48 overflow-hidden">
                    {category.image && (
                      <>
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient_class} opacity-75`}></div>
                      </>
                    )}
                    
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
                        <h3 className="text-lg font-bold mb-1">{category.name}</h3>
                        <p className="text-white/90 text-sm mb-2 line-clamp-2">{category.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                      <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <IconComponent className="w-5 h-5 text-purple-600" />
                        Explore {category.name}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.subcategories.map((sub) => (
                          <div 
                            key={sub.id} 
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
                    ...categories.map(cat => ({
                      id: cat.slug,
                      name: cat.name,
                      icon: getIconComponent(cat.icon_emoji)
                    }))
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
              {displayVendors && displayVendors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayVendors.map((vendor) => (
                    <div 
                      key={vendor.id} 
                      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200 cursor-pointer transform hover:-translate-y-1"
                      onClick={() => {
                        router.push(`/${vendor.slug}`);
                      }}
                    >
                      {/* Vendor Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {getMediaUrl(vendor.main_image) && (
                          <Image
                            src={getMediaUrl(vendor.main_image)!}
                            alt={vendor.name}
                            width={300}
                            height={225}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        
                        {/* Featured Badge */}
                        {vendor.is_featured && (
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
                            {vendor.subcategory_name}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <StarIconSolid
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(parseFloat(vendor.rating)) ? 'text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            {vendor.rating} ({vendor.reviews_count} reviews)
                          </span>
                        </div>

                        {/* Contact Actions */}
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/${vendor.slug}`);
                            }}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                          >
                            View Profile
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedVendor(vendor);
                              setIsModalOpen(true);
                            }}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-semibold transition-colors"
                          >
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500">
                    {loading ? (
                      <div>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                        <p>Loading vendors...</p>
                      </div>
                    ) : (
                      <p>No vendors found in this category.</p>
                    )}
                  </div>
                </div>
              )}

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
    </main>
  );
}