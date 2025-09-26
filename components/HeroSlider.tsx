'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useHeroSlides } from '../hooks/useHomepageData';

export default function HeroSlider() {
  const { slides: backendSlides, loading, error } = useHeroSlides();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Use backend slides if available, otherwise show blank black fallback
  const slides = backendSlides && backendSlides.length > 0 ? backendSlides : [];
  const hasSlides = slides.length > 0;

  // Auto-advance slides
  useEffect(() => {
    if (!hasSlides) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length, hasSlides]);

  const nextSlide = () => {
    if (!hasSlides) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (!hasSlides) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section className="relative w-full">
        <div className="relative w-full 
          h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[65vh] xl:h-[70vh]
          min-h-[250px] sm:min-h-[350px] md:min-h-[400px] 
          max-h-[400px] sm:max-h-[500px] md:max-h-[700px]
          overflow-hidden bg-gray-900 flex items-center justify-center"
        >
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading slider...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full">
      {/* Mobile-optimized height container - full width responsive */}
      <div className="relative w-full 
        h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[65vh] xl:h-[70vh]
        min-h-[250px] sm:min-h-[350px] md:min-h-[400px] 
        max-h-[400px] sm:max-h-[500px] md:max-h-[700px]
        overflow-hidden"
      >
        {hasSlides ? (
          <>
            {/* Background Images */}
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {slide.image_url && (
                  <Image
                    src={slide.image_url}
                    alt={slide.alt_text}
                    fill
                    className="object-cover object-center w-full h-full"
                    priority={index === 0}
                    quality={95}
                    sizes="100vw"
                  />
                )}
                {/* Caption overlay if available */}
                {slide.caption && (
                  <div className="absolute bottom-20 left-4 right-4 text-center z-10">
                    <p className="text-white text-lg md:text-xl lg:text-2xl font-light bg-black/40 backdrop-blur-sm px-6 py-3 rounded-lg inline-block">
                      {slide.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 sm:left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 
                bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white 
                p-2 sm:p-3 md:p-4 rounded-full 
                transition-all duration-300 hover:scale-110 group
                focus:outline-none shadow-lg border border-white/20"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-300" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-3 sm:right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 
                bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white 
                p-2 sm:p-3 md:p-4 rounded-full 
                transition-all duration-300 hover:scale-110 group
                focus:outline-none shadow-lg border border-white/20"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-300" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-1/2 transform -translate-x-1/2 z-20">
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 shadow-md ${
                      index === currentSlide 
                        ? 'bg-white scale-125 shadow-lg' 
                        : 'bg-white/60 hover:bg-white/80 hover:scale-110'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 z-20">
              <div 
                className="h-full bg-[#D4AF37] transition-all duration-100 ease-linear"
                style={{ 
                  width: `${((currentSlide + 1) / slides.length) * 100}%`
                }}
              ></div>
            </div>
          </>
        ) : (
          /* Blank Black Fallback */
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="text-center text-white/60">
              {error ? (
                <div>
                  <p className="text-lg mb-2">Unable to load slider images</p>
                  <p className="text-sm">{error}</p>
                </div>
              ) : (
                <div>
                  <p className="text-lg mb-2">No slider images available</p>
                  <p className="text-sm">Upload images via admin panel</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
