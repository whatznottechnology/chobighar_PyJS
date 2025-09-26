'use client';

import { useEffect, useState, useRef } from 'react';
import { useAchievements } from '../hooks/useHomepageData';

interface CounterData {
  id: number;
  title: string;
  count_value: number;
  suffix: string;
  description: string;
  icon_type: string;
}

// Function to get icon based on type
const getIcon = (iconType: string): React.ReactElement => {
  switch (iconType) {
    case 'heart':
      return (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
      );
    case 'video':
      return (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      );
    case 'star':
      return (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    case 'check':
      return (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    case 'camera':
      return (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      );
    case 'award':
      return (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    case 'users':
      return (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      );
    case 'calendar':
      return (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      );
    default:
      return (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
  }
};

const CounterSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animatedNumbers, setAnimatedNumbers] = useState<number[]>([]);
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  // Fetch achievements data from backend
  const { achievements, loading, error } = useAchievements();

  // Fallback data if backend is not available
  const fallbackCounters: CounterData[] = [
    { 
      id: 1,
      title: 'Happy Couples',
      count_value: 500,
      suffix: '+',
      description: 'Beautiful love stories captured',
      icon_type: 'heart'
    },
    { 
      id: 2,
      title: 'Video Reviews',
      count_value: 50,
      suffix: '+',
      description: 'Authentic client testimonials',
      icon_type: 'video'
    },
    { 
      id: 3,
      title: 'Average Rating',
      count_value: 5.0,
      suffix: '',
      description: 'Consistently excellent service',
      icon_type: 'star'
    },
    { 
      id: 4,
      title: 'Client Satisfaction',
      count_value: 98,
      suffix: '%',
      description: 'Exceeding expectations always',
      icon_type: 'check'
    }
  ];

  // Use backend data if available, otherwise fall back to hardcoded data
  const displayCounters = achievements || fallbackCounters;

  // Initialize particles on client side only
  useEffect(() => {
    const particleArray = Array.from({ length: 20 }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2
    }));
    setParticles(particleArray);
    setIsMounted(true);
  }, []);

  // Initialize animated numbers array based on displayCounters length
  useEffect(() => {
    if (displayCounters) {
      setAnimatedNumbers(new Array(displayCounters.length).fill(0));
    }
  }, [displayCounters]);

  // Animated number counting effect
  useEffect(() => {
    if (isVisible && displayCounters) {
      const targets = displayCounters.map(counter => counter.count_value);
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedNumbers(targets.map((target) => {
          return Math.min(target, progress * target);
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, increment);

      return () => clearInterval(timer);
    }
  }, [isVisible, displayCounters]);

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
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 py-12 md:py-16 lg:py-20 ${
        isSticky ? 'fixed inset-0 z-10' : 'relative'
      }`}
    >
      {/* Background Images */}
      <div className="absolute top-0 left-0 w-1/4 lg:w-1/5 z-5">
        <img
          src="/img/12873194_7666-removebg-preview.png"
          alt="Background decoration"
          className="w-full h-auto object-contain opacity-20"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 lg:w-2/5 z-5">
        <img
          src="/img/62569719_9509225.png"
          alt="Background decoration"
          className="w-full h-auto object-contain opacity-15"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
      </div>

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

      {/* Floating particles effect - Only render on client side */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>
      )}

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
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
              <p className="mt-4 text-white">Loading achievements...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-8">
              <p className="text-red-400">Error loading achievements: {error}</p>
              <p className="text-gray-300 mt-2">Showing fallback content</p>
            </div>
          ) : null}
          
          {displayCounters.map((counter, index) => (
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
                    {getIcon(counter.icon_type)}
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
                {animatedNumbers[index] !== undefined 
                  ? counter.suffix === '' && counter.count_value % 1 !== 0
                    ? animatedNumbers[index].toFixed(1)
                    : `${Math.round(animatedNumbers[index])}${counter.suffix}`
                  : `${counter.count_value}${counter.suffix}`
                }
              </div>

              {/* Label */}
              <h3 
                className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mb-1 md:mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {counter.title}
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
