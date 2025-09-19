'use client';

import { useEffect, useState, useRef } from 'react';

interface CounterData {
  number: string;
  label: string;
  description: string;
  icon: React.ReactElement;
}

const CounterSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animatedNumbers, setAnimatedNumbers] = useState<number[]>([0, 0, 0, 0]);

  const counters: CounterData[] = [
    { 
      number: '500+', 
      label: 'Happy Couples',
      description: 'Beautiful love stories captured',
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
      )
    },
    { 
      number: '50+', 
      label: 'Video Reviews',
      description: 'Authentic client testimonials',
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      )
    },
    { 
      number: '5.0', 
      label: 'Average Rating',
      description: 'Consistently excellent service',
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    },
    { 
      number: '98%', 
      label: 'Client Satisfaction',
      description: 'Exceeding expectations always',
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  // Animated number counting effect
  useEffect(() => {
    if (isVisible) {
      const targets = [500, 50, 5.0, 98];
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedNumbers(targets.map((target, index) => {
          if (index === 2) { // Rating (5.0)
            return Math.min(target, progress * target);
          }
          return Math.min(target, Math.floor(progress * target));
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, increment);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  // Parallax and sticky scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + currentScrollY;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Check if section is visible for animation
        if (rect.top < windowHeight && rect.bottom > 0) {
          setIsVisible(true);
        }

        // Sticky behavior - section stays fixed during scroll
        const startSticky = sectionTop - windowHeight * 0.2;
        const endSticky = sectionTop + sectionHeight + windowHeight;
        
        if (currentScrollY >= startSticky && currentScrollY <= endSticky) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 py-16 md:py-24 lg:py-32 ${
        isSticky ? 'fixed inset-0 z-10' : 'relative'
      }`}
    >
      {/* Parallax Background Images */}
      <div className="absolute inset-0">
        {/* Base background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed transition-transform duration-75"
          style={{ 
            backgroundImage: `url('/img/venues.jpg')`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        {/* Overlay backgrounds for depth */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-75"
          style={{ 
            backgroundImage: `url('/img/bridalwear.jpg')`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-75"
          style={{ 
            backgroundImage: `url('/img/jewellery.jpg')`,
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        
        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-royal-red/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400">Achievements</span>
          </h2>
          <div className="w-20 md:w-32 h-1 bg-gradient-to-r from-royal-red to-yellow-400 mx-auto mb-4 md:mb-6 rounded-full" />
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
            Capturing precious moments and creating lasting memories for hundreds of families across India
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {counters.map((counter, index) => (
            <div 
              key={index}
              className={`text-center group transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Icon Container */}
              <div className="relative mb-4 md:mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-royal-red to-red-700 rounded-full shadow-2xl group-hover:shadow-royal-red/50 group-hover:scale-110 transition-all duration-500">
                  <div className="text-white group-hover:scale-110 transition-transform duration-300 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                    {counter.icon}
                  </div>
                </div>
                {/* Floating ring effect */}
                <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto border-2 border-white/30 rounded-full animate-ping" />
              </div>

              {/* Number */}
              <div 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 group-hover:text-yellow-400 transition-colors duration-500"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {index === 2 
                  ? animatedNumbers[index].toFixed(1) 
                  : index === 3 
                    ? `${Math.round(animatedNumbers[index])}%`
                    : `${Math.round(animatedNumbers[index])}+`
                }
              </div>

              {/* Label */}
              <h3 
                className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mb-1 md:mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {counter.label}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-white transition-colors duration-300 px-2">
                {counter.description}
              </p>

              {/* Decorative line */}
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-royal-red to-transparent mx-auto mt-3 md:mt-4 group-hover:via-yellow-400 transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 hover:bg-white/20 transition-all duration-300">
            <span className="text-white font-medium text-sm sm:text-base">Scroll to continue</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
