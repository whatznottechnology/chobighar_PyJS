'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useVideoTestimonials, useTextTestimonials } from '../hooks/useHomepageData';

export default function TestimonialsSection() {
  // Fetch testimonials from backend
  const { testimonials: videoTestimonials, loading: videoLoading, error: videoError } = useVideoTestimonials();
  const { testimonials: textTestimonials, loading: textLoading, error: textError } = useTextTestimonials();
  
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set());
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initialize muted videos set when video testimonials are loaded
  useEffect(() => {
    if (videoTestimonials && videoTestimonials.length > 0) {
      setMutedVideos(new Set(videoTestimonials.map(v => v.id)));
    }
  }, [videoTestimonials]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  const handleVideoClick = (videoId: number) => {
    const video = videoRefs.current.get(videoId);
    if (!video) return;

    const newMutedVideos = new Set(mutedVideos);
    if (mutedVideos.has(videoId)) {
      newMutedVideos.delete(videoId);
      video.muted = false;
    } else {
      newMutedVideos.add(videoId);
      video.muted = true;
    }
    setMutedVideos(newMutedVideos);
  };

  const setVideoRef = (videoId: number, element: HTMLVideoElement | null) => {
    if (element) {
      videoRefs.current.set(videoId, element);
    } else {
      videoRefs.current.delete(videoId);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute top-0 right-0 w-1/3 lg:w-2/5">
        <img
          src="/img/62569719_9509225.png"
          alt="Background decoration"
          className="w-full h-auto object-contain opacity-8"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-1/4 lg:w-1/5">
        <img
          src="/img/12873194_7666-removebg-preview.png"
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
              Client Stories
            </span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-royal-red"></div>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Video <span className="text-royal-red">Testimonials</span>
          </h2>
          <p 
            className="text-xl text-gray-600 leading-relaxed" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Hear directly from our couples about their amazing experience with chobighar Photography
          </p>
        </div>

        {/* Video Testimonials Section */}
        {videoLoading ? (
          <div className="text-center mb-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading video testimonials...</p>
          </div>
        ) : videoError ? (
          <div className="text-center mb-12">
            <p className="text-red-600">Failed to load video testimonials</p>
          </div>
        ) : videoTestimonials && videoTestimonials.length > 0 ? (
          <div className="relative mb-12">
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

            <div 
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
            >
              {videoTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="group flex-shrink-0">
                  {/* Video Card - 2:3 Aspect Ratio */}
                  <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-64">
                    {/* Video Container - 2:3 Ratio (height = width * 1.5) */}
                    <div className="relative h-96 overflow-hidden bg-black rounded-2xl">
                      {testimonial.video_url ? (
                        <video
                          ref={(el) => setVideoRef(testimonial.id, el)}
                          className="w-full h-full object-cover cursor-pointer"
                          autoPlay
                          loop
                          muted={mutedVideos.has(testimonial.id)}
                          playsInline
                          poster={testimonial.thumbnail_url || '/img/placeholder.jpg'}
                          onClick={() => handleVideoClick(testimonial.id)}
                        >
                          <source src={testimonial.video_url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <p className="text-gray-500">No video available</p>
                        </div>
                      )}
                      
                      {/* Video Overlay - Minimal */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                      
                      {/* Mute/Unmute Button - Top Right */}
                      {testimonial.video_url && (
                        <button
                          onClick={() => handleVideoClick(testimonial.id)}
                          className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm"
                        >
                          {mutedVideos.has(testimonial.id) ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.797L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.797A1 1 0 019.383 3.076zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.797L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.797A1 1 0 019.383 3.076zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      )}

                      {/* Client Name & Rating - Bottom Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 
                          className="text-white font-bold text-lg mb-1"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          {testimonial.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {renderStars(testimonial.rating)}
                          </div>
                          <span className="text-white/90 text-sm font-medium">
                            "{testimonial.event}"
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Text Testimonials Section */}
        {textLoading ? (
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        ) : textError ? (
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <p className="text-red-600">Failed to load testimonials</p>
          </div>
        ) : textTestimonials && textTestimonials.length > 0 ? (
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Masonry Grid Text Reviews */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {textTestimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="break-inside-avoid mb-6">
                  {/* Enhanced Text Review Card */}
                  <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group transform hover:-translate-y-2 hover:scale-[1.02]">
                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-royal-red via-pink-400 to-yellow-400"></div>
                    
                    {/* Floating Quote Icon */}
                    <div className="absolute top-4 right-4 text-royal-red/20 group-hover:text-royal-red/40 transition-colors duration-300">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                      </svg>
                    </div>

                    <div className="p-6">
                      {/* Header with Enhanced Avatar */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-gradient-to-r from-royal-red to-pink-400 flex-shrink-0 shadow-lg">
                            {testimonial.image_url ? (
                              <Image
                                src={testimonial.image_url}
                                alt={testimonial.name}
                                width={56}
                                height={56}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">No image</span>
                              </div>
                            )}
                          </div>
                          {/* Verified Badge */}
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 
                            className="font-bold text-gray-900 text-base mb-1 group-hover:text-royal-red transition-colors duration-300"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                          >
                            {testimonial.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="flex">{renderStars(testimonial.rating)}</div>
                            <span className="text-xs text-gray-500 font-medium">({testimonial.rating}.0)</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{testimonial.location}</div>
                        </div>
                      </div>

                      {/* Enhanced Review Text */}
                      <div className="mb-5">
                        <p className="text-gray-700 text-sm leading-relaxed relative">
                          <span className="text-royal-red text-2xl absolute -top-2 -left-1 font-serif">"</span>
                          <span className="ml-3">{testimonial.text}</span>
                          <span className="text-royal-red text-2xl font-serif">"</span>
                        </p>
                      </div>

                      {/* Enhanced Footer */}
                      <div className="border-t border-gradient-to-r from-transparent via-gray-200 to-transparent pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-royal-red rounded-full"></div>
                            <span className="font-semibold text-royal-red text-xs uppercase tracking-wide">
                              {testimonial.event}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            {testimonial.date}
                          </span>
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-royal-red/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
                    </div>

                    {/* Animated Border Effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-royal-red via-pink-400 to-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}