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
      {/* Hero Image Section - Full Width */}
      <section className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] xl:h-[70vh] min-h-[400px] max-h-[700px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={portfolio.cover_image}
            alt={portfolio.title}
            fill
            className="object-cover"
            priority
          />
          {/* Modern Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Content Over Image */}
        <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TagIcon className="w-4 h-4" />
              {portfolio.category.name}
            </div>

            {/* Main Title */}
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {portfolio.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 font-medium mb-6">
              {portfolio.subtitle}
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{new Date(portfolio.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5" />
                <span>{portfolio.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <CameraIcon className="w-5 h-5" />
                <span>{portfolio.image_count} Photos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="py-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push('/portfolio')}
            className="inline-flex items-center gap-2 font-semibold transition-colors"
            style={{ color: '#B22222' }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#8B0000'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#B22222'}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Portfolio
          </button>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {portfolio.description}
                </p>
                
                <h2 
                  className="text-3xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  The Story
                </h2>
                
                <p className="text-gray-600 leading-relaxed mb-8">
                  {portfolio.story}
                </p>

                {/* Highlights */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">Event Highlights</h3>
                <ul className="space-y-3 mb-8">
                  {portfolio.highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#B22222' }}></div>
                      <span className="text-gray-600">{highlight.highlight_text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar with CTA */}
            <div className="lg:col-span-1">
              {/* Services Section */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <TagIcon className="w-5 h-5" style={{ color: '#B22222' }} />
                  <h3 className="text-lg font-bold" style={{ color: '#B22222' }}>Services Included</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {portfolio.services?.map((service, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-2 rounded-full text-sm font-medium border border-red-300 hover:text-white transition-all duration-300 cursor-default"
                      style={{ 
                        color: '#B22222',
                        backgroundColor: 'rgba(178, 34, 34, 0.1)' 
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = '#B22222';
                        (e.target as HTMLElement).style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'rgba(178, 34, 34, 0.1)';
                        (e.target as HTMLElement).style.color = '#B22222';
                      }}
                    >
                      {service.service_name}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Form */}
              <div className="rounded-2xl p-6" style={{ 
                background: 'linear-gradient(135deg, #B22222 0%, #8B0000 50%, #660000 100%)' 
              }}>
                <div className="text-center mb-6">
                  <HeartIcon className="w-10 h-10 text-red-200 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">Love This Style?</h3>
                  <p className="text-red-100 text-sm">Get a personalized quote</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                      placeholder="Phone number"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                      placeholder="Email address"
                    />
                  </div>

                  <div>
                    <input
                      type="date"
                      name="event_date"
                      value={formData.event_date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="w-full bg-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: '#B22222' }}
                  >
                    {submitLoading ? 'Submitting...' : 'Get Quote'}
                  </button>
                  <p className="text-red-200 text-xs text-center">
                    We'll contact you within 2 hours!
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Gallery
          </h2>
          
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl p-2 border border-gray-200">
              <button
                onClick={() => setActiveTab('photos')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'photos'
                    ? 'text-white transform scale-105'
                    : 'hover:text-white hover:scale-105'
                }`}
                style={{
                  backgroundColor: activeTab === 'photos' ? '#B22222' : 'transparent',
                  color: activeTab === 'photos' ? 'white' : '#B22222'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'photos') {
                    e.currentTarget.style.backgroundColor = '#B22222';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'photos') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#B22222';
                  }
                }}
              >
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Photos ({portfolio.images?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'videos'
                    ? 'text-white transform scale-105'
                    : 'hover:text-white hover:scale-105'
                }`}
                style={{
                  backgroundColor: activeTab === 'videos' ? '#B22222' : 'transparent',
                  color: activeTab === 'videos' ? 'white' : '#B22222'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'videos') {
                    e.currentTarget.style.backgroundColor = '#B22222';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'videos') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#B22222';
                  }
                }}
              >
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Videos ({portfolio.videos?.length || 0})
              </button>
            </div>
          </div>

          {/* Photos Tab Content */}
          {activeTab === 'photos' && (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6">
              {portfolio.images?.map((image, index) => {
                // Create varied heights for better masonry effect
                const heights = [300, 400, 350, 450, 320, 380, 420, 360];
                const randomHeight = heights[index % heights.length];
                
                return (
                  <div
                    key={index}
                    className="break-inside-avoid mb-6 relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative bg-gray-100">
                      <Image
                        src={image.image}
                        alt={`${portfolio.title} ${index + 1}`}
                        width={400}
                        height={randomHeight}
                        style={{
                          width: '100%',
                          height: 'auto',
                          minHeight: `${randomHeight}px`,
                        }}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      />
                      
                      {/* Enhanced Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {/* Zoom Icon */}
                          <div 
                            className="bg-white/90 backdrop-blur-sm p-3 rounded-full transition-all duration-300 shadow-lg"
                            style={{ backgroundColor: 'rgba(178, 34, 34, 0.95)' }}
                          >
                            <svg className="w-6 h-6 text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between text-white">
                            <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                              <span className="text-sm font-medium">Photo {index + 1}</span>
                            </div>
                            <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                              <span className="text-xs">HD</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Videos Tab Content */}
          {activeTab === 'videos' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.videos?.map((video, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-2"
                  onClick={() => openVideoModal(video.video_id)}
                >
                  <div className="relative aspect-video bg-black">
                    {/* YouTube Thumbnail */}
                    <Image
                      src={video.thumbnail_url}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Ripple Effect */}
                        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping group-hover:animate-none"></div>
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse group-hover:animate-none"></div>
                        
                        {/* Play Button */}
                        <div className="relative bg-white/95 backdrop-blur-sm p-5 rounded-full group-hover:bg-royal-red group-hover:text-white transition-all duration-300 shadow-lg">
                          <svg className="w-8 h-8 text-royal-red group-hover:text-white ml-1 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Duration Badge */}
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                      {video.duration}
                    </div>
                    
                    {/* HD Quality Badge */}
                    <div className="absolute top-4 left-4 bg-royal-red text-white text-xs px-2 py-1 rounded font-bold">
                      HD
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-5 bg-white">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-royal-red transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {video.description || 'Beautiful moments captured in this video showcase'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span>HD Quality</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
                        </svg>
                        <span>{Math.floor(Math.random() * 2000) + 500} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              )) || (
                <div className="col-span-full text-center py-12">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">No videos available for this portfolio</p>
                </div>
              )}
            </div>
          )}
          
          {/* Gallery Info */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 text-gray-600">
                <CameraIcon className="w-5 h-5 text-royal-red" />
                <span className="text-sm font-medium">
                  {activeTab === 'photos' ? `${portfolio.images?.length || 0} Photos` : `${portfolio.videos?.length || 0} Videos`}
                </span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <HeartIcon className="w-5 h-5 text-royal-red" />
                <span className="text-sm font-medium">
                  {activeTab === 'photos' ? 'Click to view full size' : 'Click to play video'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Albums Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Related Albums
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore more beautiful moments captured across different categories and events.
            </p>
          </div>

          {/* Horizontal Scrolling Albums */}
          <div className="relative">
            {/* Scroll Left Button */}
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 backdrop-blur-sm p-3 rounded-full transition-colors"
              style={{ 
                backgroundColor: '#B22222',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8B0000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#B22222';
              }}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            
            {/* Scroll Right Button */}
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 backdrop-blur-sm p-3 rounded-full transition-colors"
              style={{ 
                backgroundColor: '#B22222',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8B0000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#B22222';
              }}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>

            {/* Scrollable Container */}
            <div className="overflow-x-auto scrollbar-hide pb-4" style={{ scrollBehavior: 'smooth' }}>
              <div className="flex gap-6 w-max">
                {relatedPortfolios.slice(0, 10).map((relatedPortfolio) => (
                  <div
                    key={relatedPortfolio.id}
                    className="group cursor-pointer w-80 flex-shrink-0"
                    onClick={() => router.push(`/portfolio/${relatedPortfolio.id}`)}
                  >
                    {/* Album Cover */}
                    <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3] bg-gray-100">
                      <Image
                        src={relatedPortfolio.cover_image}
                        alt={relatedPortfolio.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="320px"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-royal-red text-white px-3 py-1 rounded-full text-xs font-bold">
                        {relatedPortfolio.category.name}
                      </div>
                      
                      {/* Photo Count Badge */}
                      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                        {relatedPortfolio.image_count} Photos
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="text-white">
                            <p className="font-semibold text-lg">{relatedPortfolio.title}</p>
                            <p className="text-sm text-white/80">{relatedPortfolio.subtitle}</p>
                          </div>
                        </div>
                        
                        {/* View Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div 
                            className="bg-white/90 backdrop-blur-sm p-3 rounded-full transition-all duration-300 shadow-lg"
                            style={{
                              color: '#B22222'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#B22222';
                              e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                              e.currentTarget.style.color = '#B22222';
                            }}
                          >
                            <svg className="w-6 h-6 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Album Info */}
                    <div className="text-center">
                      <h3 
                        className="text-xl font-bold text-gray-900 mb-2 transition-colors"
                        style={{ color: 'inherit' }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#B22222'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#111827'}
                      >
                        {relatedPortfolio.title}
                      </h3>
                      <p className="text-gray-600 mb-2 text-sm">{relatedPortfolio.subtitle}</p>
                      <div className="flex items-center justify-center gap-3 text-xs text-gray-500 mb-3">
                        <span>{new Date(relatedPortfolio.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        <span>•</span>
                        <span>{relatedPortfolio.location}</span>
                      </div>
                      <span 
                        className="inline-block text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        style={{ backgroundColor: '#B22222' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#8B0000';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#B22222';
                        }}
                      >
                        View Album
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View All Albums Button */}
          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg inline-flex items-center gap-2"
              style={{ backgroundColor: '#B22222' }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#8B0000'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#B22222'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4 4m4-4l-4-4" />
              </svg>
              View All Albums
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors"
              style={{ color: '#B22222' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#8B0000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#B22222';
              }}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors"
              style={{ color: '#B22222' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#8B0000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#B22222';
              }}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="relative max-w-6xl max-h-[85vh] w-full mx-4">
              <Image
                src={portfolio.images![selectedImage].image}
                alt={`${portfolio.title} ${selectedImage + 1}`}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
                <h3 className="text-white font-semibold text-lg">{portfolio.title}</h3>
                <p className="text-white/80 text-sm">
                  {selectedImage + 1} of {portfolio.images?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Video Player */}
            <div className="relative w-full aspect-video mx-4">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&controls=1`}
                className="w-full h-full rounded-xl"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`${portfolio.title} Video`}
              />
            </div>

            {/* Video Info */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
                <h3 className="text-white font-semibold text-lg">{portfolio.title}</h3>
                <p className="text-white/80 text-sm">Video Gallery</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 transform"
          style={{ backgroundColor: '#B22222' }}
          onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#8B0000'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#B22222'}
          aria-label="Back to top"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </main>
  );
}