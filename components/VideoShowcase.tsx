'use client';

import { useRef, useEffect, useState } from 'react';
import { useVideoShowcase } from '../hooks/useHomepageData';

export default function VideoShowcase() {
  const { videoShowcase, loading, error } = useVideoShowcase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Function to open video in modal
  const openVideoModal = () => {
    setIsModalOpen(true);
  };

  // Function to close video modal
  const closeVideoModal = () => {
    setIsModalOpen(false);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeVideoModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (loading) {
    return (
      <section className="relative bg-charcoal overflow-hidden py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-red"></div>
        </div>
      </section>
    );
  }

  if (error || !videoShowcase) {
    return (
      <section className="relative bg-charcoal overflow-hidden py-20">
        <div className="text-center text-white">
          <p>Video showcase unavailable</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-charcoal overflow-hidden">
      {/* Background Images */}
      <div className="absolute top-0 left-0 w-1/4 lg:w-1/5">
        <img
          src="/img/12873194_7666-removebg-preview.png"
          alt="Background decoration"
          className="w-full h-auto object-contain opacity-20"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 lg:w-2/5">
        <img
          src="/img/62569719_9509225.png"
          alt="Background decoration"
          className="w-full h-auto object-contain opacity-15"
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-gray-900 to-black">
        <div className="absolute inset-0 opacity-10 bg-bengali-pattern"></div>
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center py-20 px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Experience Our Artistry
          </h2>
          <p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Watch how we capture the essence of your special moments with cinematic excellence and artistic vision
          </p>
        </div>

        {/* Full-Width Video Container */}
        <div className="relative w-full">
          <div className="relative aspect-video lg:aspect-[21/9] xl:aspect-[24/10]">
            {/* YouTube Video Embed - Autoplay, Loop, Muted, No Controls */}
            <iframe
              ref={iframeRef}
              src={videoShowcase.youtube_embed_url}
              className="w-full h-full object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={false}
              title={videoShowcase.alt_text}
              style={{
                border: 'none',
                pointerEvents: 'none', // Prevent interaction with iframe
              }}
            />

            {/* Clickable Overlay */}
            <div 
              className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-all duration-500 cursor-pointer group"
              onClick={openVideoModal}
              role="button"
              aria-label="Open video in full screen"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openVideoModal();
                }
              }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/40 transition-all duration-500 transform group-hover:scale-125 group-hover:rotate-12 shadow-lg hover:shadow-2xl border border-white/20 hover:border-white/60">
                  <svg className="w-10 h-10 text-white transition-all duration-300 group-hover:drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>

            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
              <div className="max-w-4xl mx-auto text-white">
                <div className="grid md:grid-cols-2 gap-8 items-end">
                  <div>
                    <h3 
                      className="text-2xl md:text-3xl font-bold mb-3" 
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {videoShowcase.title}
                    </h3>
                    <p 
                      className="text-lg opacity-90 leading-relaxed" 
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {videoShowcase.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Features Section */}
        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: '4K Cinematic Quality',
                  description: 'Ultra-high definition video capture for crystal clear memories'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  ),
                  title: 'Professional Audio',
                  description: 'Crystal clear sound recording with premium equipment'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                  title: 'Artistic Direction',
                  description: 'Creative storytelling that captures the essence of your day'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  ),
                  title: 'Emotional Storytelling',
                  description: 'Capturing authentic moments and genuine emotions'
                }
              ].map((feature, index) => (
                <div key={index} className="text-center text-white group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-royal-red rounded-full mb-6 transition-all duration-500 transform group-hover:scale-125 group-hover:-translate-y-2 shadow-lg group-hover:shadow-2xl group-hover:shadow-royal-red/30 border-2 border-transparent group-hover:border-gold/50 group-hover:bg-white">
                    <div className="text-white group-hover:text-black transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 
                    className="text-xl font-semibold mb-3 group-hover:text-gold transition-all duration-300 transform group-hover:scale-105" 
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-gray-300 leading-relaxed group-hover:text-white transition-all duration-300 transform group-hover:scale-102" 
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {feature.description}
                  </p>
                  {/* Subtle underline animation */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-royal-red to-gold mx-auto mt-4 group-hover:w-16 transition-all duration-500 ease-out"></div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <h4 
                className="text-2xl md:text-3xl font-bold text-white mb-4" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Ready to Create Your Wedding Film?
              </h4>
              <p 
                className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto" 
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Let us capture your love story with our cinematic approach to wedding videography
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/photoshoot?service=videography"
                  className="bg-royal-red text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-royal-red/50 transform hover:scale-105 hover:-translate-y-1 border-2 border-transparent hover:border-gold/30 relative overflow-hidden group inline-flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#B22222' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#8B0000';
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#B22222';
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  }}
                >
                  <span className="relative z-20 text-white transition-colors duration-300">Book Video Package</span>
                  <svg className="w-5 h-5 relative z-20 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                </a>
                <a 
                  href="/portfolio"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-white/30 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group inline-flex items-center justify-center gap-2"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#000000';
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  }}
                >
                  <span className="relative z-20 transition-colors duration-300">View Our Work</span>
                  <svg className="w-5 h-5 relative z-20 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-[9998] flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl aspect-video">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-royal-red transition-all duration-300 z-10 p-2 rounded-full hover:bg-white/10 transform hover:scale-110 hover:rotate-90"
              aria-label="Close video"
            >
              <svg className="w-8 h-8 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Full Video with Controls */}
            <iframe
              src={`https://www.youtube.com/embed/${videoShowcase.youtube_video_id}?autoplay=1&controls=1&modestbranding=1&rel=0`}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${videoShowcase.title} - Full Video`}
            />
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-royal-red rounded-full opacity-10 animate-pulse hover:opacity-20 hover:scale-110 transition-all duration-500"></div>
      <div className="absolute top-1/2 right-10 w-32 h-32 bg-gold rounded-full opacity-5 animate-pulse delay-1000 hover:opacity-15 hover:scale-110 transition-all duration-500"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-royal-red rounded-full opacity-10 animate-pulse delay-500 hover:opacity-20 hover:scale-110 transition-all duration-500"></div>
    </section>
  );
}