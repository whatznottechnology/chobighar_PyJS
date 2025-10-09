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
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <PhotoIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{portfolio.image_count} Photos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Content Section - Story & Form Side by Side */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Story Content - 2/3 Width */}
            <div className="lg:col-span-2">
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
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Highlights
                    </h3>
                    <ul className="space-y-2">
                      {portfolio.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <svg className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{highlight.highlight_text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Services */}
                {portfolio.services && portfolio.services.length > 0 && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CameraIcon className="w-5 h-5 text-blue-600" />
                      Services
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {portfolio.services.map((service, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1.5 bg-white rounded-full text-xs font-medium text-blue-700 border border-blue-200 shadow-sm"
                        >
                          {service.service_name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky CTA Sidebar - 1/3 Width */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Compact CTA Card */}
                <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-2xl p-6 shadow-xl">
                  <div className="text-center mb-5">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <HeartIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Love This Style?</h3>
                    <p className="text-red-100 text-sm">Get your personalized quote</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg text-sm border-0 focus:ring-2 focus:ring-white/50 transition-all"
                      placeholder="Your Name"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg text-sm border-0 focus:ring-2 focus:ring-white/50 transition-all"
                      placeholder="Phone Number"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg text-sm border-0 focus:ring-2 focus:ring-white/50 transition-all"
                      placeholder="Email Address"
                    />

                    <input
                      type="date"
                      name="event_date"
                      value={formData.event_date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg text-sm border-0 focus:ring-2 focus:ring-white/50 transition-all"
                    />

                    <button
                      type="submit"
                      disabled={submitLoading}
                      className="w-full bg-white text-red-600 font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitLoading ? 'Sending...' : 'Get Quote →'}
                    </button>
                    
                    <p className="text-red-100 text-xs text-center mt-2">
                      ⚡ Response within 2 hours
                    </p>
                  </form>
                </div>

                {/* Quick Info Card */}
                <div className="bg-white rounded-2xl p-5 shadow-sm mt-4">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm">Event Details</h4>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium text-gray-900">{portfolio.duration}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Guests</span>
                      <span className="font-medium text-gray-900">{portfolio.guests}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Photos</span>
                      <span className="font-medium text-gray-900">{portfolio.image_count}</span>
                    </div>
                  </div>
                </div>
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
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                activeTab === 'photos'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Photos ({portfolio.images?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                activeTab === 'videos'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
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
                  className="break-inside-avoid relative rounded-xl overflow-hidden cursor-pointer group bg-gray-100"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.image}
                    alt={`${portfolio.title} ${index + 1}`}
                    width={300}
                    height={400}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  
                  {/* Simple Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 p-2 rounded-full">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="relative rounded-xl overflow-hidden cursor-pointer group bg-gray-900 shadow-lg hover:shadow-xl transition-all"
                    onClick={() => openVideoModal(video.video_id)}
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={video.thumbnail_url}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                        <div className="bg-white/90 p-4 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all">
                          <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{video.title}</h3>
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
                    
                    {/* Photo Count */}
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2.5 py-1 rounded-full text-xs">
                      {album.image_count} photos
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