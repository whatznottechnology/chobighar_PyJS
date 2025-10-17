'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Script from 'next/script';
import { getApiUrl, getMediaUrl, API_ENDPOINTS } from '@/config/api';
import { 
  MapPinIcon, 
  StarIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ChevronRightIcon,
  HomeIcon,
  CameraIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  TagIcon,
  ShareIcon,
  HeartIcon,
  PlayIcon,
  XMarkIcon,
  ArrowUpIcon,
  CalendarIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useVendorProfile } from '../../hooks/useVendorData';
import { useWhatsAppIntegration } from '../../../hooks/useWhatsAppIntegration';
import { useHeaderData } from '../../../hooks/useHeaderData';
import InquiryModal from '../../../components/InquiryModal';
import ImageLightbox from '../../../components/ImageLightbox';

export default function VendorProfile() {
  const params = useParams();
  const router = useRouter();
  const vendorSlug = params.vendorId as string;
  
  // Use the API hook to fetch vendor data
  const { vendor, loading, error } = useVendorProfile(vendorSlug);
  const { headerData } = useHeaderData();
  const { sendVendorInquiryToWhatsApp } = useWhatsAppIntegration();
  
  const [activeSection, setActiveSection] = useState('about');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'photos' | 'videos'>('photos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loveCount, setLoveCount] = useState(0);
  const [isLoved, setIsLoved] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    message: ''
  });

  // Refs for scroll navigation
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // All hooks must be called before any conditional returns
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      
      // Update active section based on scroll position
      const sections = ['about', 'services', 'portfolio', 'reviews', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize love count from vendor data
  useEffect(() => {
    if (vendor?.love_count !== undefined) {
      setLoveCount(vendor.love_count);
    }
  }, [vendor]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lightbox functions
  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null && vendor?.images) {
      const galleryImages = vendor.images.filter(img => img.image_type === 'gallery').map(img => img.image);
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null && vendor?.images) {
      const galleryImages = vendor.images.filter(img => img.image_type === 'gallery').map(img => img.image);
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  // Video modal functions
  const openVideo = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  // Handle love button click
  const handleLove = async () => {
    if (isLoved || !vendor) return; // Prevent multiple clicks
    
    try {
      const response = await fetch(getApiUrl(`/api/vendor/profiles/${vendorSlug}/love/`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setLoveCount(data.love_count);
        setIsLoved(true);
        // Store in localStorage to persist across page reloads
        localStorage.setItem(`loved_${vendorSlug}`, 'true');
      }
    } catch (error) {
      console.error('Error incrementing love count:', error);
    }
  };

  // Handle share button click
  const handleShare = async () => {
    const shareData = {
      title: vendor?.name || 'Vendor Profile',
      text: vendor?.tagline || 'Check out this vendor on chobighar!',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Check if user has already loved this vendor
  useEffect(() => {
    const hasLoved = localStorage.getItem(`loved_${vendorSlug}`);
    if (hasLoved === 'true') {
      setIsLoved(true);
    }
  }, [vendorSlug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vendor) return;
    
    try {
      const requestBody = {
        inquiry_type: 'vendor',
        name: formData.name,
        email: formData.email,
        phone: formData.phone.replace(/\s+/g, ''), // Remove spaces
        subject: `Vendor Inquiry - ${vendor.name}`,
        message: formData.message || `I am interested in your services for my event on ${formData.eventDate}`,
        service_name: vendor.name,
        service_id: vendor.id?.toString() || vendor.slug,
        event_date: formData.eventDate || null,
        source: 'vendor_detail_page'
      };
      
      console.log('Sending inquiry request:', requestBody);
      console.log('API URL:', getApiUrl(API_ENDPOINTS.INQUIRY_CREATE));
      
      // First, save the inquiry to the database
      const response = await fetch(getApiUrl(API_ENDPOINTS.INQUIRY_CREATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      console.log('Response ok?:', response.ok);
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('Success response:', responseData);
        
        // Data saved successfully, now open WhatsApp
        sendVendorInquiryToWhatsApp({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vendorName: vendor.name,
          service: vendor.subcategory_name || 'Vendor Service',
          message: formData.message,
          eventDate: formData.eventDate
        });
        
        // Show success and reset form
        alert('Thank you for your inquiry! We will get back to you soon.');
        setFormData({ name: '', phone: '', email: '', eventDate: '', message: '' });
      } else {
        const responseText = await response.text();
        console.error('Response text:', responseText);
        
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { error: 'Invalid response from server' };
        }
        
        console.error('Failed to submit inquiry:', errorData);
        console.error('Response status:', response.status);
        
        // Show detailed error if available
        if (errorData.details) {
          console.error('Validation errors:', errorData.details);
          const errorMessages = Object.entries(errorData.details)
            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
            .join('\n');
          alert(`Validation errors:\n${errorMessages}`);
        } else {
          alert(`Sorry, something went wrong: ${errorData.error || 'Please try again.'}`);
        }
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Sorry, something went wrong. Please check your internet connection and try again.');
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900">Loading vendor profile...</h1>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || !vendor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Vendor Not Found'}
          </h1>
          <button 
            onClick={() => router.push('/vendors')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Vendors
          </button>
        </div>
      </div>
    );
  }

  // Debug logging for backend data
  console.log('Vendor data from backend:', vendor);
  console.log('Hero images from backend:', vendor.hero_images);
  console.log('Gallery images from backend:', vendor.gallery_images);
  console.log('Cover image from backend:', vendor.cover_image);
  console.log('Profile image from backend:', vendor.profile_image);
  console.log('All images from backend:', vendor.images);

  // Data transformation helpers - Use images field for better URLs
  let displayGallery: string[] = [];
  
  if (vendor.gallery_images && vendor.gallery_images.length > 0) {
    // If gallery_images exist, use them (convert paths to full URLs)
    displayGallery = vendor.gallery_images
      .map(imagePath => getMediaUrl(imagePath))
      .filter(url => url !== null) as string[];
  } else if (vendor.images && vendor.images.length > 0) {
    // Use images field which has full URLs already
    displayGallery = vendor.images.map(img => img.image);
  } else if (vendor.portfolio_items && vendor.portfolio_items.length > 0) {
    // Use portfolio items images
    displayGallery = vendor.portfolio_items.map(item => item.image);
  } else if (vendor.hero_images && vendor.hero_images.length > 0) {
    // Fallback to hero_images (convert paths to full URLs)
    displayGallery = vendor.hero_images
      .map(imagePath => getMediaUrl(imagePath))
      .filter(url => url !== null) as string[];
  }

  console.log('Display gallery (processed):', displayGallery);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Modern Design */}
      <div className="relative bg-white">
        {/* Breadcrumb - Minimalist */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              <button 
                onClick={() => router.push('/')}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <HomeIcon className="w-4 h-4 mr-1" />
                Home
              </button>
              <ChevronRightIcon className="w-4 h-4 text-gray-300" />
              <button 
                onClick={() => router.push('/vendors')}
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                Vendors
              </button>
              <ChevronRightIcon className="w-4 h-4 text-gray-300" />
              <span className="text-red-600 font-medium">{vendor.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50"></div>
          <div className="relative container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                      {vendor.type}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{vendor.location}</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {vendor.name}
                  </h1>
                  <p className="text-xl text-gray-600 font-light">
                    {vendor.tagline}
                  </p>
                </div>

                {/* Rating & Stats */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <StarIconSolid key={i} className="w-5 h-5 text-yellow-400" />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">{vendor.rating}</span>
                    <span className="text-gray-500">({vendor.reviews_count} reviews)</span>
                  </div>
                  <div className="text-gray-300">|</div>
                  <div className="text-gray-600">
                    <span className="font-medium">{vendor.experience}</span> Experience
                  </div>
                  {vendor.stats_count && vendor.stats_label && (
                    <>
                      <div className="text-gray-300">|</div>
                      <div className="text-gray-600">
                        <span className="font-medium text-red-600">{vendor.stats_count}</span> {vendor.stats_label}
                      </div>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed text-lg">
                  {vendor.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Get Quote
                  </button>
                  <a
                    href={`tel:${vendor.phone}`}
                    className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <PhoneIcon className="w-5 h-5" />
                    Call Now
                  </a>
                  <button 
                    onClick={handleLove}
                    disabled={isLoved}
                    className={`bg-white px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all flex items-center gap-2 ${
                      isLoved ? 'text-red-600 border-red-200' : 'text-gray-700'
                    }`}
                  >
                    <HeartIcon className={`w-5 h-5 ${isLoved ? 'fill-red-600' : ''}`} />
                    {loveCount > 0 && <span className="text-sm font-medium">{loveCount}</span>}
                  </button>
                  <button 
                    onClick={handleShare}
                    className="bg-white text-gray-700 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <ShareIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Content - Images */}
              <div className="relative">
                {displayGallery && displayGallery.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      {displayGallery[0] && (
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transform rotate-3 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-500 z-10">
                          <Image
                            src={displayGallery[0]}
                            alt={`${vendor.name} - Image 1`}
                            fill
                            sizes="(max-width: 768px) 50vw, 300px"
                            className="object-cover hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              console.error('Hero image 1 failed to load:', displayGallery[0]);
                            }}
                          />
                        </div>
                      )}
                      {displayGallery[1] && (
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl transform -rotate-2 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-500 z-10">
                          <Image
                            src={displayGallery[1]}
                            alt={`${vendor.name} - Image 2`}
                            fill
                            sizes="(max-width: 768px) 50vw, 300px"
                            className="object-cover hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              console.error('Hero image 2 failed to load:', displayGallery[1]);
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="space-y-4 pt-8">
                      {displayGallery[2] && (
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-500 z-10">
                          <Image
                            src={displayGallery[2]}
                            alt={`${vendor.name} - Image 3`}
                            fill
                            sizes="(max-width: 768px) 50vw, 300px"
                            className="object-cover hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              console.error('Hero image 3 failed to load:', displayGallery[2]);
                            }}
                          />
                        </div>
                      )}
                      {displayGallery[3] && (
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transform -rotate-1 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-500 z-10">
                          <Image
                            src={displayGallery[3]}
                            alt={`${vendor.name} - Image 4`}
                            fill
                            sizes="(max-width: 768px) 50vw, 300px"
                            className="object-cover hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              console.error('Hero image 4 failed to load:', displayGallery[3]);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <CameraIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No hero images available</p>
                  </div>
                )}
                {/* Floating Stats - Only show if backend data exists */}
                {vendor.stats_count && vendor.stats_label && (
                  <div className="absolute -bottom-6 left-6 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 z-30 hover:z-40 hover:scale-105 hover:shadow-3xl transition-all duration-300 cursor-pointer">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors">{vendor.stats_count}</div>
                      <div className="text-sm text-gray-600">{vendor.stats_label}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Sticky Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center">
            <div className="inline-flex bg-gray-100 rounded-full p-1 my-4">
              {[
                { id: 'about', label: 'Overview', icon: SparklesIcon, show: true },
                { id: 'services', label: 'Services', icon: CheckCircleIcon, show: vendor.services && vendor.services.length > 0 },
                { id: 'portfolio', label: 'Gallery', icon: CameraIcon, show: displayGallery && displayGallery.length > 0 },
                { id: 'reviews', label: 'Reviews', icon: StarIcon, show: vendor.testimonials && vendor.testimonials.length > 0 },
                { id: 'contact', label: 'Contact', icon: PhoneIcon, show: true }
              ].filter(item => item.show).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-red-600 hover:bg-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Overview Section */}
            <section ref={aboutRef} id="about" className="scroll-mt-24">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                      <SparklesIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                      <p className="text-gray-600">About {vendor.name}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Story */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Our Story</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {vendor.story}
                      </p>
                    </div>

                    {/* Highlights - Only show if data exists */}
                    {vendor.highlights && vendor.highlights.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Why Choose Us</h3>
                        <div className="space-y-3">
                          {vendor.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{highlight.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Specialties - Only show if data exists */}
                  {vendor.specialties && vendor.specialties.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h3>
                      <div className="flex flex-wrap gap-3">
                        {vendor.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-gradient-to-r from-red-50 to-pink-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium border border-red-100"
                          >
                            {specialty.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Services Section - Only show if data exists */}
            {vendor.services && vendor.services.length > 0 && (
              <section ref={servicesRef} id="services" className="scroll-mt-24">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Services</h2>
                        <p className="text-gray-600">What we offer</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {vendor.services.map((service, index) => (
                        <div key={index} className="group p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <CheckCircleIcon className="w-8 h-8 text-red-600" />
                            </div>
                            <div className="flex-grow">
                              <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">{service.name}</h3>
                              {service.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {service.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Gallery Section */}
            <section ref={portfolioRef} id="portfolio" className="scroll-mt-24">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                        <CameraIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
                        <p className="text-gray-600">Our beautiful work</p>
                      </div>
                    </div>
                    
                    {/* Gallery Tabs */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveGalleryTab('photos')}
                        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          activeGalleryTab === 'photos'
                            ? 'text-white shadow-lg transform scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                        }`}
                        style={{
                          backgroundColor: activeGalleryTab === 'photos' ? '#B22222' : ''
                        }}
                      >
                        Photos
                      </button>
                      <button
                        onClick={() => setActiveGalleryTab('videos')}
                        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          activeGalleryTab === 'videos'
                            ? 'text-white shadow-lg transform scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                        }`}
                        style={{
                          backgroundColor: activeGalleryTab === 'videos' ? '#B22222' : ''
                        }}
                      >
                        Videos
                      </button>
                    </div>
                  </div>

                  {/* Photos Tab */}
                  {activeGalleryTab === 'photos' && displayGallery && displayGallery.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {displayGallery.map((image: string, index: number) => (
                        <div 
                          key={index} 
                          className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                          onClick={() => openLightbox(index)}
                        >
                          <Image
                            src={image}
                            alt={`${vendor.name} - Gallery ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              console.error('Gallery image failed to load:', image);
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                              <CameraIcon className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Videos Tab */}
                  {activeGalleryTab === 'videos' && vendor.videos && vendor.videos.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {vendor.videos.map((video, index) => (
                        <div key={video.id} className="group">
                          <div 
                            className="relative rounded-2xl overflow-hidden bg-black shadow-lg hover:shadow-xl transition-all cursor-pointer"
                            onClick={() => openVideo(video.youtube_id)}
                          >
                            {/* YouTube Embed Preview - Fixed 4:3 Aspect Ratio */}
                            <div className="relative aspect-[4/3]">
                              <iframe
                                className="w-full h-full pointer-events-none"
                                src={`https://www.youtube.com/embed/${video.youtube_id}`}
                                title={video.title || `${vendor.name} Video ${index + 1}`}
                                frameBorder="0"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              ></iframe>
                              
                              {/* Overlay with Play Button */}
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <div className="w-16 h-16 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-red-600 transition-all duration-300 group-hover:scale-110 shadow-xl">
                                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            
                            {/* Video Info */}
                            <div className="p-4 bg-white">
                              {video.title && (
                                <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{video.title}</h3>
                              )}
                              {video.description && (
                                <p className="mt-1 text-xs text-gray-600 line-clamp-2">{video.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Empty states */}
                  {activeGalleryTab === 'photos' && (!displayGallery || displayGallery.length === 0) && (
                    <div className="text-center py-12">
                      <CameraIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No photos available</p>
                    </div>
                  )}

                  {activeGalleryTab === 'videos' && (!vendor.videos || vendor.videos.length === 0) && (
                    <div className="text-center py-12">
                      <PlayIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No videos available</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Reviews Section - Only show if data exists */}
            {vendor.testimonials && vendor.testimonials.length > 0 && (
              <section ref={reviewsRef} id="reviews" className="scroll-mt-24">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                        <StarIcon className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                        <p className="text-gray-600">What our clients say</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {vendor.testimonials.map((testimonial, index) => (
                      <div key={index} className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-red-600 font-bold text-lg">
                              {testimonial.client_name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">{testimonial.client_name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex">
                                    {Array.from({ length: 5 }, (_, i) => (
                                      <StarIconSolid 
                                        key={i} 
                                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">{testimonial.date_display}</span>
                                </div>
                              </div>
                              <span className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full font-medium">
                                {testimonial.event_type}
                              </span>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                              "{testimonial.review}"
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Review Summary */}
                  <div className="mt-8 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Satisfaction</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-3xl font-bold text-red-600">{vendor.rating}</div>
                          <div className="text-sm text-gray-600">Average Rating</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-red-600">{vendor.reviews_count}</div>
                          <div className="text-sm text-gray-600">Total Reviews</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-red-600">98%</div>
                          <div className="text-sm text-gray-600">Satisfaction Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            )}

            {/* Contact Section */}
            <section ref={contactRef} id="contact" className="scroll-mt-24">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                      <PhoneIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Get In Touch</h2>
                      <p className="text-gray-600">Ready to plan your event?</p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                            placeholder="Your Name"
                          />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                            placeholder="Phone Number"
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                            placeholder="Email Address"
                          />
                          <input
                            type="date"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                          />
                        </div>
                        
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                          placeholder="Tell us about your event requirements..."
                        ></textarea>
                        
                        <button
                          type="submit"
                          className="w-full bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                        >
                          Send Message
                        </button>
                      </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                              <PhoneIcon className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Phone</div>
                              <a href={`tel:${vendor.phone}`} className="text-gray-600 hover:text-red-600">
                                {vendor.phone}
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                              <EnvelopeIcon className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Email</div>
                              <a href={`mailto:${vendor.email}`} className="text-gray-600 hover:text-red-600">
                                {vendor.email}
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                              <MapPinIcon className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Location</div>
                              <div className="text-gray-600">{vendor.location}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white">
                        <h4 className="font-semibold mb-4">Why Choose Us?</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Response Time:</span>
                            <span className="font-medium">Within 2 hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Free Consultation:</span>
                            <span className="font-medium">Yes</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Price Range:</span>
                            <span className="font-medium">{vendor.price_range}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Quick Info Card */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price Range</span>
                    <span className="font-semibold text-gray-900">{vendor.price_range}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold text-gray-900">{vendor.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold text-gray-900">{vendor.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center gap-1">
                      <StarIconSolid className="w-4 h-4 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{vendor.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Events Done</span>
                    <span className="font-semibold text-gray-900">500+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity</span>
                    <span className="font-semibold text-gray-900">{vendor.capacity || "Any size"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-semibold text-green-600">2 Hours</span>
                  </div>
                </div>
              </div>



            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage !== null && displayGallery && displayGallery[selectedImage] && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={displayGallery[selectedImage]}
              alt={`${vendor.name} - Gallery ${selectedImage + 1}`}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                console.error('Lightbox image failed to load:', displayGallery[selectedImage]);
                setSelectedImage(null); // Close lightbox if image fails to load
              }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Contact CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Book {vendor?.name}?
          </h2>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            Get in touch with us to discuss your requirements and get a personalized quote for your special day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <EnvelopeIcon className="w-5 h-5" />
              Send Inquiry
            </button>
            <a
              href={`tel:${vendor?.phone || headerData?.contact_info?.phone || '+919647966765'}`}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              <PhoneIcon className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-40"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType="vendor"
        serviceName={vendor?.name || ''}
        serviceId={vendor?.id?.toString() || ''}
        prefilledData={{
          subject: vendor ? `Inquiry about ${vendor.name}` : 'Vendor Inquiry',
          message: vendor 
            ? `Hi, I'm interested in your ${vendor.subcategory_name} services for my upcoming event. Please provide more details about availability and pricing.`
            : 'I would like to know more about your services.'
        }}
      />

      {/* Image Lightbox */}
      {selectedImage !== null && vendor?.images && (
        <ImageLightbox
          images={vendor.images
            .filter(img => img.image_type === 'gallery')
            .map(img => getMediaUrl(img.image))
            .filter((url): url is string => url !== null)}
          currentIndex={selectedImage}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={prevImage}
          alt={vendor.name}
        />
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <div 
            className="relative w-full max-w-6xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close video"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>

            {/* YouTube Video Player */}
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* JSON-LD Structured Data */}
      {vendor && (
        <Script
          id="vendor-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': `https://chobighar.com/${vendorSlug}`,
              name: vendor.name,
              description: vendor.description || `Professional ${vendor.subcategory_name} services in ${vendor.location}`,
              url: `https://chobighar.com/${vendorSlug}`,
              telephone: vendor.phone,
              email: vendor.email,
              address: {
                '@type': 'PostalAddress',
                addressLocality: vendor.location,
                addressRegion: 'West Bengal',
                addressCountry: 'India'
              },
              aggregateRating: vendor.reviews_count > 0 ? {
                '@type': 'AggregateRating',
                ratingValue: vendor.rating,
                reviewCount: vendor.reviews_count,
                bestRating: 5,
                worstRating: 1
              } : undefined,
              priceRange: vendor.price_range || '$$',
              serviceArea: {
                '@type': 'Place',
                name: vendor.location
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: `${vendor.subcategory_name} Services`,
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: vendor.subcategory_name,
                      category: vendor.category_name,
                      provider: {
                        '@type': 'LocalBusiness',
                        name: vendor.name
                      }
                    }
                  }
                ]
              },
              image: vendor.images.map(img => getMediaUrl(img.image)).filter(Boolean),
              sameAs: [
                vendor.website,
                vendor.social_media?.instagram ? `https://instagram.com/${vendor.social_media.instagram}` : null,
                vendor.social_media?.facebook ? `https://facebook.com/${vendor.social_media.facebook}` : null,
              ].filter(Boolean),
            })
          }}
        />
      )}
    </main>
  );
}