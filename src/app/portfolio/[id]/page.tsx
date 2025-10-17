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
  ArrowUpIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { usePortfolio, useRelatedPortfolios } from '@/hooks/usePortfolio';
import { portfolioAPI } from '@/services/portfolioAPI';
import { useWhatsAppIntegration } from '../../../../hooks/useWhatsAppIntegration';
import { getApiUrl, API_ENDPOINTS } from '@/config/api';
import ImageLightbox from '../../../../components/ImageLightbox';
import LoveButton from '../../../../components/LoveButton';
import ShareButton from '../../../../components/ShareButton';

export default function PortfolioDetails() {
  const params = useParams();
  const router = useRouter();
  const portfolioId = params.id as string;
  
  // API hooks
  const { portfolio, loading, error } = usePortfolio(portfolioId);
  const { portfolios: relatedPortfolios } = useRelatedPortfolios(portfolioId);
  const { sendInquiryToWhatsApp } = useWhatsAppIntegration();

  // Debug: Log portfolio data
  useEffect(() => {
    if (portfolio) {
      console.log('Portfolio Data:', portfolio);
      console.log('Promotional Video ID:', portfolio.promotional_video_id);
    }
  }, [portfolio]);

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
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

  // Show loading state
  if (loading || !portfolio) {
    if (loading) {
      return (
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-red-600 mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading Portfolio...</h1>
            <p className="text-gray-600">Please wait while we fetch the details</p>
          </div>
        </main>
      );
    }
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Same size as Homepage Slider */}
      <section className="relative w-full 
        h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[65vh] xl:h-[70vh]
        min-h-[250px] sm:min-h-[350px] md:min-h-[400px] 
        max-h-[400px] sm:max-h-[500px] md:max-h-[700px]
        overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={portfolio.cover_image}
            alt={portfolio.title}
            fill
            className="object-cover object-center w-full h-full"
            priority
            quality={95}
            sizes="100vw"
          />
          {/* Simplified Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80"></div>
        </div>

        {/* Content - Positioned at bottom */}
        <div className="relative h-full flex items-end pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Breadcrumb & Category */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Link href="/portfolio" className="text-white/70 hover:text-white text-xs sm:text-sm transition-colors">
                Portfolio
              </Link>
              <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white/50" />
              <span className="text-white/90 text-xs sm:text-sm font-medium">{portfolio.category.name}</span>
            </div>

            {/* Title & Metadata */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {portfolio.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-2 sm:mb-4">{portfolio.subtitle}</p>

            {/* Compact Info Bar */}
            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-white/70">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{new Date(portfolio.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{portfolio.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Love and Share Buttons - Mobile: Top Right, Desktop: Bottom Right */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:bottom-6 md:right-6 md:top-auto flex gap-2 sm:gap-3 z-30">
          <LoveButton 
            portfolioId={portfolioId}
            initialLoveCount={portfolio.love_count || 0}
            className="backdrop-blur-md bg-black/30 border border-white/30 hover:bg-black/40 text-white hover:text-white shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 text-xs sm:text-sm"
          />
          <ShareButton 
            portfolioId={portfolioId}
            portfolioTitle={portfolio.title}
            className="backdrop-blur-md bg-black/30 border border-white/30 hover:bg-black/40 text-white hover:text-white shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 text-xs sm:text-sm"
          />
        </div>
      </section>

      {/* Compact Content Section - Story & Form Side by Side */}
      <section className="py-12 relative overflow-hidden bg-gray-50">
        {/* Decorative Background Images */}
        <div className="absolute top-0 left-0 w-1/5 lg:w-1/6 pointer-events-none">
          <img
            src="/img/12873194_7666-removebg-preview.png"
            alt="Background decoration"
            className="w-full h-auto object-contain opacity-10"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-1/4 lg:w-1/5 pointer-events-none">
          <img
            src="/img/62569719_9509225.png"
            alt="Background decoration"
            className="w-full h-auto object-contain opacity-10"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Main Story Content - 60% Width */}
            <div className="lg:col-span-3">
              {/* Description Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <p className="text-gray-700 leading-relaxed text-base">
                  {portfolio.description}
                </p>
              </div>

              {/* Story Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <HeartIcon className="w-6 h-6 text-red-600" />
                  Our Story
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {portfolio.story}
                </p>
              </div>

              {/* Highlights & Services - Compact Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Highlights */}
                {portfolio.highlights && portfolio.highlights.length > 0 && (
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Highlights
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {portfolio.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700 hover:text-gray-900 transition-colors group">
                          <div className="mt-1">
                            <svg className="w-5 h-5 text-amber-500 group-hover:text-amber-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="leading-relaxed">{highlight.highlight_text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Services */}
                {portfolio.services && portfolio.services.length > 0 && (
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <CameraIcon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Services
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {portfolio.services.map((service, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg text-sm font-medium text-blue-900 border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                        >
                          {service.service_name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Event Details Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 mt-6">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Event Details
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:border-blue-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">Guests</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{portfolio.guests}</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100 hover:border-amber-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <CameraIcon className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">Photos</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{portfolio.image_count}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Info Sidebar - 40% Width */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-4">
                {/* CTA Images Card - Vendor Style Grid (Moved Up) */}
                {(portfolio?.cta_image_1_url || portfolio?.cta_image_2_url || portfolio?.cta_image_3_url || portfolio?.cta_image_4_url) && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden">
                    {/* Decorative Background Images */}
                    <div className="absolute top-0 right-0 w-1/4 pointer-events-none opacity-5 rotate-180">
                      <img
                        src="/img/12873194_7666-removebg-preview.png"
                        alt="Background decoration"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 w-1/3 pointer-events-none opacity-5 -scale-x-100">
                      <img
                        src="/img/62569719_9509225.png"
                        alt="Background decoration"
                        className="w-full h-auto object-contain"
                      />
                    </div>

                    <h4 className="font-bold text-gray-900 mb-6 text-xl flex items-center gap-2 relative z-10">
                      <HeartIcon className="w-6 h-6 text-red-600" />
                      Memories
                    </h4>
                    
                    {/* 2 Column Grid with Rotated Images (Vendor Hero Style) */}
                    <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                      {/* Left Column */}
                      <div className="space-y-4">
                        {portfolio.cta_image_1_url && (
                          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transform rotate-3 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-500 z-10">
                            <Image
                              src={portfolio.cta_image_1_url}
                              alt={`${portfolio.title} - Style 1`}
                              fill
                              sizes="(max-width: 768px) 50vw, 300px"
                              className="object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        {portfolio.cta_image_2_url && (
                          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl transform -rotate-2 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-500 z-10">
                            <Image
                              src={portfolio.cta_image_2_url}
                              alt={`${portfolio.title} - Style 2`}
                              fill
                              sizes="(max-width: 768px) 50vw, 300px"
                              className="object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Right Column with Top Padding */}
                      <div className="space-y-4 pt-8">
                        {portfolio.cta_image_3_url && (
                          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-500 z-10">
                            <Image
                              src={portfolio.cta_image_3_url}
                              alt={`${portfolio.title} - Style 3`}
                              fill
                              sizes="(max-width: 768px) 50vw, 300px"
                              className="object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        {portfolio.cta_image_4_url && (
                          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transform -rotate-1 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-500 z-10">
                            <Image
                              src={portfolio.cta_image_4_url}
                              alt={`${portfolio.title} - Style 4`}
                              fill
                              sizes="(max-width: 768px) 50vw, 300px"
                              className="object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA Text */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-3">
                        Get your personalized quote for this photography style
                      </p>
                      <button 
                        onClick={() => scrollToSection('quote-form')}
                        className="flex items-center justify-center gap-2 text-red-600 text-sm font-medium hover:text-red-700 transition-colors cursor-pointer mx-auto"
                      >
                        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        Scroll for Quote Form
                      </button>
                    </div>
                  </div>
                )}

                {/* Promotional Video Frame - Mobile Mockup (Moved Down) */}
                {portfolio?.promotional_video_id && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden">
                    {/* Decorative Background Images */}
                    <div className="absolute top-0 left-0 w-1/4 pointer-events-none opacity-5">
                      <img
                        src="/img/12873194_7666-removebg-preview.png"
                        alt="Background decoration"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-1/3 pointer-events-none opacity-5">
                      <img
                        src="/img/62569719_9509225.png"
                        alt="Background decoration"
                        className="w-full h-auto object-contain"
                      />
                    </div>

                    
                    {/* HTML/CSS Mobile Phone Mockup */}
                    <div className="relative mx-auto z-10" style={{ maxWidth: '280px' }}>
                      {/* Phone Container */}
                      <div 
                        className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-[3rem] p-3 shadow-2xl"
                        style={{ 
                          aspectRatio: '9 / 19',
                          border: '3px solid #1a1a1a'
                        }}
                      >
                        {/* Phone Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 bg-black rounded-b-2xl px-8 py-2 flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                          <div className="w-12 h-1 bg-gray-800 rounded-full"></div>
                          <div className="w-2 h-2 bg-blue-900 rounded-full opacity-40 ring-2 ring-blue-800"></div>
                        </div>

                        {/* Side Buttons */}
                        <div className="absolute -left-1 top-32 w-1 h-12 bg-gray-700 rounded-l"></div>
                        <div className="absolute -left-1 top-48 w-1 h-8 bg-gray-700 rounded-l"></div>
                        <div className="absolute -right-1 top-40 w-1 h-16 bg-gray-700 rounded-r"></div>

                        {/* Screen Container */}
                        <div 
                          className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden"
                          style={{ 
                            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
                          }}
                        >
                          {/* Video */}
                          <iframe
                            src={`https://www.youtube.com/embed/${portfolio.promotional_video_id}?autoplay=1&mute=1&loop=1&playlist=${portfolio.promotional_video_id}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            title="Promotional Video"
                            style={{ border: 'none' }}
                          />
                        </div>
                      </div>

                      {/* Phone Reflection Effect */}
                      <div 
                        className="absolute inset-0 rounded-[3rem] pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                          mixBlendMode: 'overlay'
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Gallery Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Simple Tabs */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'photos'
                  ? 'text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
              style={{
                backgroundColor: activeTab === 'photos' ? '#B22222' : ''
              }}
            >
              Photos ({portfolio.images?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'videos'
                  ? 'text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
              style={{
                backgroundColor: activeTab === 'videos' ? '#B22222' : ''
              }}
            >
              Videos ({portfolio.videos?.length || 0})
            </button>
          </div>

          {/* Photos Grid - Compact Masonry */}
          {activeTab === 'photos' && (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {portfolio.images?.map((image, index) => (
                  <div
                    key={index}
                    className="break-inside-avoid relative rounded-xl overflow-hidden cursor-pointer group bg-gray-100 hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      console.log('Image clicked:', index);
                      openLightbox(index);
                    }}
                  >
                    <Image
                      src={image.image}
                      alt={`${portfolio.title} ${index + 1}`}
                      width={300}
                      height={400}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    
                    {/* Hover Overlay with Magnifying Glass */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full transform group-hover:scale-110 transition-transform duration-200">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          )}

          {/* Videos Grid - Compact */}
          {activeTab === 'videos' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.videos && portfolio.videos.length > 0 ? (
                portfolio.videos.map((video, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl overflow-hidden cursor-pointer group bg-black shadow-lg hover:shadow-xl transition-all"
                    onClick={() => openVideoModal(video.video_id)}
                  >
                    {/* YouTube Embed Preview - Fixed 4:3 Aspect Ratio */}
                    <div className="relative aspect-[4/3]">
                      <iframe
                        className="w-full h-full pointer-events-none"
                        src={`https://www.youtube.com/embed/${video.video_id}`}
                        title={video.title}
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

                      {/* Duration Badge */}
                      {video.duration && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{video.title}</h3>
                      {video.description && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{video.description}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">No videos available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Compact Related Albums */}
      {relatedPortfolios && relatedPortfolios.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                More Albums
              </h2>
              <Link
                href="/portfolio"
                className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1 transition-colors"
              >
                View All
                <ChevronRightIcon className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedPortfolios.slice(0, 4).map((album) => (
                <div
                  key={album.id}
                  className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  onClick={() => router.push(`/portfolio/${album.id}`)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={album.cover_image}
                      alt={album.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded-full text-xs font-bold">
                      {album.category.name}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors line-clamp-1">
                      {album.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-1 mb-2">{album.subtitle}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPinIcon className="w-3.5 h-3.5" />
                      <span className="line-clamp-1">{album.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote Form Section - After More Albums */}
      <section id="quote-form" className="py-16 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 relative overflow-hidden">
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="portfolio-jamdani-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.4"/>
                  <path d="M10,5 Q15,10 10,15 Q5,10 10,5 Z" fill="currentColor" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#portfolio-jamdani-pattern)"/>
            </svg>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Love This Style?
            </h2>
            <p className="text-xl text-gray-600">
              Get your personalized quote and let's create magic together
            </p>
          </div>

          {/* Enhanced Quote Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 placeholder-gray-400"
                  placeholder="Your Name"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 placeholder-gray-400"
                  placeholder="Phone Number"
                />
              </div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 placeholder-gray-400"
                placeholder="Email Address"
              />

              <input
                type="date"
                name="event_date"
                value={formData.event_date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 placeholder-gray-400"
              />

              <button
                type="submit"
                disabled={submitLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {submitLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Get Your Quote →'
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Response within 2 hours</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Image Lightbox - Full Screen Modal */}
      {selectedImage !== null && portfolio?.images && portfolio.images.length > 0 && (
        <ImageLightbox
          images={portfolio.images.map(img => img.image)}
          currentIndex={selectedImage}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={prevImage}
          alt={portfolio.title}
        />
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
          className="fixed bottom-6 right-24 z-[9000] bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </main>
  );
}