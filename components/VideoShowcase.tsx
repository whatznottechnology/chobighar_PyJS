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
    <section className="py-20 bg-charcoal">
      <div className="w-full mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Experience Our Artistry
          </h2>
          <p 
            className="text-lg text-gray-300 max-w-2xl mx-auto" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Watch how we capture the essence of your special moments with cinematic excellence
          </p>
        </div>

        {/* Video Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            {/* Placeholder Background (shown when no video) */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/img/1.jpg)' }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Wedding Showcase Video
                  </h3>
                  <p className="text-sm opacity-90" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Coming Soon - Preview our cinematic wedding films
                  </p>
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
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center video-controls hidden">
              <button
                onClick={togglePlay}
                className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="text-white">
                <h3 
                  className="text-2xl font-bold mb-2" 
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Wedding Cinematic Reel
                </h3>
                <p 
                  className="text-sm opacity-90" 
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  A glimpse into our wedding photography and videography excellence
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-royal-red rounded-full opacity-20"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold rounded-full opacity-10"></div>
        </div>

        {/* Video Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
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
            }
          ].map((feature, index) => (
            <div key={index} className="text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-royal-red rounded-full mb-4 text-white">
                {feature.icon}
              </div>
              <h3 
                className="text-xl font-semibold mb-2" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {feature.title}
              </h3>
              <p 
                className="text-gray-300 text-sm" 
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}