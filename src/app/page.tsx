'use client';

import { useState, useEffect } from 'react';
import HeroSlider from '../../components/HeroSlider';
import AlbumsShowcase from '../../components/AlbumsShowcase';
import VideoShowcase from '../../components/VideoShowcase';
import VendorSection from '../../components/VendorSection';
// import ShoppingSection from '../../components/ShoppingSection';
import CounterSection from '../../components/CounterSection';
import ContactForm from '../../components/ContactForm';
import TestimonialsSection from '../../components/TestimonialsSection';
import FAQSection from '../../components/FAQSection';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  return (
    <main>
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Albums Showcase Section - 6 Albums with See More */}
      <AlbumsShowcase />

      {/* Full Width Video Showcase Section */}
      <VideoShowcase />

      {/* Associate Vendors Section - Interactive */}
      <VendorSection />

      {/* Shopping Section - Interactive */}
      {/* <ShoppingSection /> */}

      {/* Enhanced Counter Section with Parallax */}
      <CounterSection />

      {/* Testimonials Section - Video & Text Reviews */}
      <TestimonialsSection />

      {/* Contact Form Section */}
      <ContactForm />

      {/* FAQ Section */}
      <FAQSection />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-24 z-[9000] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 transform hover:opacity-90"
          style={{
            backgroundColor: '#B22222'
          }}
          aria-label="Back to top"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </main>
  );
}
