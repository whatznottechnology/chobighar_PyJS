'use client';

import { useRef, useEffect, useState } from 'react';

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
        
        // Only try to play if video has actual sources
        if (entry.isIntersecting && video.children.length > 0) {
          video.play().then(() => {
            setIsPlaying(true);
            // Show video controls when video is playing
            const controls = video.parentElement?.querySelector('.video-controls') as HTMLElement;
            if (controls) controls.classList.remove('hidden');
          }).catch((error) => {
            console.log('Auto-play prevented:', error);
          });
        } else if (video.children.length > 0) {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative bg-charcoal overflow-hidden">
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
            {/* Placeholder Background (shown when no video) */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/img/1.jpg)' }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-300 cursor-pointer transform hover:scale-110">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Wedding Cinematic Showcase
                  </h3>
                  <p className="text-lg opacity-90 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Coming Soon - Preview our wedding films
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
                    <span className="bg-white/10 px-3 py-1 rounded-full">4K Quality</span>
                    <span className="bg-white/10 px-3 py-1 rounded-full">Cinematic</span>
                    <span className="bg-white/10 px-3 py-1 rounded-full">Professional</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Element (hidden by default until video is available) */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover hidden"
              muted
              loop
              playsInline
              poster="/img/1.jpg"
              onLoadedData={() => {
                // Show video when it loads successfully
                const video = videoRef.current;
                if (video) {
                  video.classList.remove('hidden');
                  const placeholder = video.parentElement?.querySelector('.absolute.inset-0.bg-cover') as HTMLElement;
                  if (placeholder) placeholder.style.display = 'none';
                }
              }}
            >
              {/* Add your video source here when available */}
              {/* <source src="/videos/wedding-showcase.mp4" type="video/mp4" /> */}
              {/* <source src="/videos/wedding-showcase.webm" type="video/webm" /> */}
            </video>

            {/* Video Overlay Controls - Only show when video is available */}
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 video-controls hidden">
              <div className="flex items-center justify-center h-full">
                <button
                  onClick={togglePlay}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Gradient Overlays for better text readability */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>

            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-4xl mx-auto text-white">
                <div className="grid md:grid-cols-2 gap-8 items-end">
                  <div>
                    <h3 
                      className="text-2xl md:text-3xl font-bold mb-3" 
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Wedding Cinematic Reel
                    </h3>
                    <p 
                      className="text-lg opacity-90 leading-relaxed" 
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      A glimpse into our wedding photography and videography excellence, capturing emotions that last forever
                    </p>
                  </div>
                  <div className="text-right">
                    <button className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 font-semibold">
                      Watch Full Reel
                    </button>
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
                <div key={index} className="text-center text-white group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-royal-red rounded-full mb-6 text-white group-hover:bg-white group-hover:text-royal-red transition-all duration-300 transform group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 
                    className="text-xl font-semibold mb-3 group-hover:text-gold transition-colors duration-300" 
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-gray-300 leading-relaxed" 
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {feature.description}
                  </p>
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
                <button className="bg-royal-red hover:bg-royal-red-hover text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Book Video Package
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-charcoal px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                  View Our Work
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-royal-red rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute top-1/2 right-10 w-32 h-32 bg-gold rounded-full opacity-5 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-royal-red rounded-full opacity-10 animate-pulse delay-500"></div>
    </section>
  );
}