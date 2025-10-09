'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  PhotoIcon, 
  HeartIcon, 
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  MapPinIcon,
  CameraIcon,
  ArrowLeftIcon,
  TagIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';
import { usePortfolio, useRelatedPortfolios } from '@/hooks/usePortfolio';
import { portfolioAPI } from '@/services/portfolioAPI';
import { useWhatsAppIntegration } from '../../../../hooks/useWhatsAppIntegration';
import { getApiUrl, API_ENDPOINTS } from '@/config/api';

export default function PortfolioDetails() {
  const params = useParams();
  const router = useRouter();
  const portfolioId = params.id as string;
  
  // API hooks
  const { portfolio, loading, error } = usePortfolio(portfolioId);
  const { portfolios: relatedPortfolios } = useRelatedPortfolios(portfolioId);
  const { sendInquiryToWhatsApp } = useWhatsAppIntegration();

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Back to top visibility handler
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    event_date: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!portfolio) return;
    
    setSubmitLoading(true);
    
    try {
      const requestBody = {
        inquiry_type: 'portfolio',
        name: formData.name,
        email: formData.email,
        phone: formData.phone.replace(/\s+/g, ''), // Remove spaces
        subject: `Portfolio Inquiry - ${portfolio.title}`,
        message: `I'm interested in this style of photography for my event. Portfolio: ${portfolio.title}`,
        service_name: portfolio.category.name,
        service_id: portfolioId,
        event_date: formData.event_date || null,
        source: 'portfolio_detail_page'
      };
      
      console.log('Sending portfolio inquiry:', requestBody);
      
      // Step 1: Save inquiry to database
      const response = await fetch(getApiUrl(API_ENDPOINTS.INQUIRY_CREATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('Success response:', responseData);
        
        // Step 2: Data saved successfully, now open WhatsApp
        sendInquiryToWhatsApp({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: `${portfolio.category.name} - ${portfolio.title}`,
          message: `I'm interested in this photography style for my event`,
          eventDate: formData.event_date
        });
        
        // Step 3: Show success and reset form
        alert('Thank you! We will contact you within 2 hours with your personalized quote.');
        setFormData({ name: '', phone: '', email: '', event_date: '' });
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
    } finally {
      setSubmitLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="lg:col-span-1">
                  <div className="h-64 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Show error state
  if (error || !portfolio) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <PhotoIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error ? 'Error Loading Portfolio' : 'Portfolio Not Found'}
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The portfolio you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => router.push('/portfolio')}
            className="bg-royal-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
          >
            Back to Portfolio
          </button>
        </div>
      </main>
    );
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const openVideoModal = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const nextImage = () => {
    if (selectedImage !== null && portfolio?.images?.length) {
      setSelectedImage((selectedImage + 1) % portfolio.images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null && portfolio?.images?.length) {
      setSelectedImage(selectedImage === 0 ? portfolio.images.length - 1 : selectedImage - 1);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Stunning Hero Section - Full Width */}
      <section className="relative w-full 
        h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]
        min-h-[300px] sm:min-h-[400px] md:min-h-[500px] 
        max-h-[500px] sm:max-h-[600px] md:max-h-[800px]
        overflow-hidden"
      >
        {/* Background Image with Ken Burns Effect */}
        <div className="absolute inset-0">
          <Image
            src={portfolio.cover_image}
            alt={portfolio.title}
            fill
            className="object-cover object-center w-full h-full animate-subtle-zoom"
            priority
            quality={95}
            sizes="100vw"
          />
          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"></div>
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Hero Content - Centered & Elegant */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge with Animation */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-medium mb-6 border border-white/30 shadow-lg animate-fade-in">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
              {portfolio.category.name}
            </div>

            {/* Main Title - Elegant Typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight animate-fade-in-up" 
              style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
              {portfolio.title}
            </h1>

            {/* Subtitle with Elegant Underline */}
            <div className="relative inline-block mb-6 animate-fade-in-up animation-delay-200">
              <p className="text-xl sm:text-2xl md:text-3xl text-white/95 font-light">
                {portfolio.subtitle}
              </p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
            </div>

            {/* Elegant Info Cards */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up animation-delay-400">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 shadow-xl">
                <div className="flex items-center gap-2 text-white">
                  <CalendarIcon className="w-5 h-5 text-red-300" />
                  <span className="text-sm font-medium">{new Date(portfolio.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 shadow-xl">
                <div className="flex items-center gap-2 text-white">
                  <MapPinIcon className="w-5 h-5 text-blue-300" />
                  <span className="text-sm font-medium">{portfolio.location}</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 shadow-xl">
                <div className="flex items-center gap-2 text-white">
                  <PhotoIcon className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-medium">{portfolio.image_count} Photos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
              <div className="w-1.5 h-3 bg-white/70 rounded-full animate-scroll"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Details Section - Beautiful Layout */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Story Content - 2 Columns */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description with Decorative Quote */}
              <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
                <div className="absolute -top-4 -left-4 text-6xl text-red-100 font-serif">"</div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic relative z-10">
                  {portfolio.description}
                </p>
                <div className="absolute -bottom-4 -right-4 text-6xl text-red-100 font-serif rotate-180">"</div>
              </div>

              {/* Story Section with Beautiful Design */}
              <div className="bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 rounded-3xl p-8 md:p-10 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-2xl shadow-lg">
                    <HeartIcon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Love Story
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {portfolio.story}
                  </p>
                </div>
              </div>

              {/* Event Details Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 p-2.5 rounded-xl">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">Duration</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{portfolio.duration}</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-100 p-2.5 rounded-xl">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">Guests</h3>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{portfolio.guests}</p>
                </div>
              </div>

              {/* Highlights & Services - Beautiful Grid */}
              {((portfolio.highlights && portfolio.highlights.length > 0) || (portfolio.services && portfolio.services.length > 0)) && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Highlights */}
                  {portfolio.highlights && portfolio.highlights.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-amber-400">
                      <div className="flex items-center gap-2 mb-5">
                        <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <h3 className="text-lg font-bold text-gray-900">Special Moments</h3>
                      </div>
                      <ul className="space-y-3">
                        {portfolio.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-3 group">
                            <div className="mt-1 bg-amber-100 rounded-full p-1 group-hover:bg-amber-200 transition-colors">
                              <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <span className="text-gray-700 leading-relaxed">{highlight.highlight_text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Services */}
                  {portfolio.services && portfolio.services.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-emerald-400">
                      <div className="flex items-center gap-2 mb-5">
                        <CameraIcon className="w-6 h-6 text-emerald-500" />
                        <h3 className="text-lg font-bold text-gray-900">Services Provided</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {portfolio.services.map((service, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-full text-sm font-medium text-emerald-700 hover:from-emerald-100 hover:to-teal-100 transition-all cursor-default shadow-sm"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            {service.service_name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sticky Sidebar - Beautiful CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Beautiful CTA Form */}
                <div className="relative bg-gradient-to-br from-red-600 via-pink-600 to-purple-600 rounded-3xl p-8 shadow-2xl overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <HeartIcon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Love This Style?</h3>
                      <p className="text-white/90 text-sm">Book your dream photoshoot today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/95 backdrop-blur-sm border-2 border-transparent focus:border-white focus:bg-white transition-all text-gray-900 placeholder-gray-500"
                        placeholder="Your Name"
                      />

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/95 backdrop-blur-sm border-2 border-transparent focus:border-white focus:bg-white transition-all text-gray-900 placeholder-gray-500"
                        placeholder="Phone Number"
                      />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/95 backdrop-blur-sm border-2 border-transparent focus:border-white focus:bg-white transition-all text-gray-900 placeholder-gray-500"
                        placeholder="Email Address"
                      />

                      <input
                        type="date"
                        name="event_date"
                        value={formData.event_date}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/95 backdrop-blur-sm border-2 border-transparent focus:border-white focus:bg-white transition-all text-gray-900"
                      />

                      <button
                        type="submit"
                        disabled={submitLoading}
                        className="w-full bg-white text-red-600 font-bold px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {submitLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Get Your Quote
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                          </>
                        )}
                      </button>
                      
                      <div className="flex items-center justify-center gap-2 text-white/90 text-xs">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        <span>Response within 2 hours</span>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Quick Stats Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Quick Info</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600 text-sm flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-red-500" />
                        Event Date
                      </span>
                      <span className="font-semibold text-gray-900 text-sm">{new Date(portfolio.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600 text-sm flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-blue-500" />
                        Location
                      </span>
                      <span className="font-semibold text-gray-900 text-sm">{portfolio.location}</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        Duration
                      </span>
                      <span className="font-semibold text-gray-900 text-sm">{portfolio.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm flex items-center gap-2">
                        <PhotoIcon className="w-4 h-4 text-amber-500" />
                        Total Photos
                      </span>
                      <span className="font-semibold text-gray-900 text-sm">{portfolio.image_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beautiful Photo Gallery - Images First */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Photo Gallery
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <PhotoIcon className="w-5 h-5 text-red-500" />
              <span className="text-lg">{portfolio.images?.length || 0} Beautiful Moments</span>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Stunning Masonry Gallery */}
          {portfolio.images && portfolio.images.length > 0 ? (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {portfolio.images.map((image, index) => (
                <div
                  key={index}
                  className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group bg-gray-100 shadow-md hover:shadow-2xl transition-all duration-500"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.image}
                    alt={`${portfolio.title} - Photo ${index + 1}`}
                    width={400}
                    height={600}
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  
                  {/* Elegant Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {/* Zoom Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Image Number Badge */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                        <p className="text-gray-900 text-sm font-semibold text-center">
                          Photo {index + 1} of {portfolio.images?.length || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <PhotoIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No photos available</p>
            </div>
          )}
        </div>
      </section>

      {/* Beautiful Video Gallery - Videos Second */}
      {portfolio.videos && portfolio.videos.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Video Gallery
              </h2>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                </svg>
                <span className="text-lg">{portfolio.videos.length} Cinematic Moments</span>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Video Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.videos.map((video, index) => (
                <div
                  key={index}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  onClick={() => openVideoModal(video.video_id)}
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gray-900 overflow-hidden">
                    <Image
                      src={video.thumbnail_url}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
                      <div className="relative">
                        {/* Ripple Effect */}
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                        <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                        
                        {/* Play Button */}
                        <div className="relative bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-full group-hover:scale-110 transition-transform shadow-2xl">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                      <svg className="w-3 h-3 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                      </svg>
                      {video.duration}
                    </div>

                    {/* HD Badge */}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded font-bold shadow-lg">
                      HD
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-5 bg-gradient-to-br from-white to-gray-50">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {video.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-medium">Full HD</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-red-600 font-medium">
                        <span>Watch Now</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Albums - Elegant Section */}
      {relatedPortfolios && relatedPortfolios.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                More Beautiful Stories
              </h2>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
                <span className="text-lg">Explore Similar Stories</span>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-red-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Albums Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {relatedPortfolios.slice(0, 4).map((album) => (
                <div
                  key={album.id}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  onClick={() => router.push(`/portfolio/${album.id}`)}
                >
                  {/* Album Cover Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={album.cover_image}
                      alt={album.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        {album.category.name}
                      </div>
                    </div>

                    {/* Photo Count Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                        <PhotoIcon className="w-3.5 h-3.5" />
                        <span>{album.image_count}</span>
                      </div>
                    </div>

                    {/* Bottom Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white text-lg font-bold mb-1 group-hover:text-pink-300 transition-colors line-clamp-1">
                        {album.title}
                      </h3>
                      {album.location && (
                        <div className="flex items-center gap-1.5 text-white/90 text-sm">
                          <MapPinIcon className="w-4 h-4" />
                          <span className="line-clamp-1">{album.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Album Info Footer */}
                  <div className="p-4 bg-gradient-to-br from-white to-gray-50">
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{album.subtitle}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-500 text-xs">View Album</div>
                      <div className="flex items-center gap-1.5 text-red-600 font-medium group-hover:gap-2.5 transition-all">
                        <span>Explore</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-red-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Explore All Portfolio Stories</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Simplified Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm p-2.5 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Main Image */}
          <div className="relative max-w-6xl max-h-[85vh] w-full">
            <Image
              src={portfolio.images![selectedImage].image}
              alt={`${portfolio.title} ${selectedImage + 1}`}
              width={1200}
              height={800}
              className="object-contain w-full h-full"
              priority
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
              {selectedImage + 1} / {portfolio.images?.length || 0}
            </div>
          </div>
        </div>
      )}

      {/* Simplified Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeVideoModal}
            className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm p-2.5 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-6xl aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&controls=1`}
              className="w-full h-full rounded-xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={`${portfolio.title} Video`}
            />
          </div>
        </div>
      )}

      {/* Compact Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 z-40 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all hover:scale-110"
          aria-label="Back to top"
        >
          <ArrowUpIcon className="w-5 h-5" />
        </button>
      )}
    </main>
  );
}