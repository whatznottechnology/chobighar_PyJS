'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface SlideData {
  id: number;
  image: string;
  alt: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: '/img/1.jpg',
    alt: 'Wedding Photography'
  },
  {
    id: 2,
    image: '/img/2.jpg',
    alt: 'Professional Photography'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full">
      {/* Mobile-optimized height container - full width responsive */}
      <div className="relative w-full 
        h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[65vh] xl:h-[70vh]
        min-h-[250px] sm:min-h-[350px] md:min-h-[400px] 
        max-h-[400px] sm:max-h-[500px] md:max-h-[700px]
        overflow-hidden"
      >
        {/* Background Images */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover object-center w-full h-full"
              priority={index === 0}
              quality={95}
              sizes="100vw"
            />
          </div>
        ))}

        {/* Navigation Arrows - More attractive with background */}
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

        {/* Slide Indicators - Smaller circles */}
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
      </div>
    </section>
  );
}
