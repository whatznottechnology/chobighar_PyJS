'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
  event: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Priya & Arjun Sharma',
    location: 'Kolkata',
    image: '/img/1.jpg', // You can replace with actual client photos
    rating: 5,
    text: 'Chabighar captured our wedding day with such artistry and emotion. Every photo tells our love story beautifully. Their attention to detail and professional approach made our special day even more memorable.',
    event: 'Wedding Photography',
    date: 'December 2024'
  },
  {
    id: 2,
    name: 'Sneha & Rohit Gupta',
    location: 'Delhi',
    image: '/img/2.jpg',
    rating: 5,
    text: 'Outstanding pre-wedding shoot experience! The team made us feel so comfortable and natural. The photos exceeded our expectations and perfectly captured our personalities and love for each other.',
    event: 'Pre-Wedding Shoot',
    date: 'November 2024'
  },
  {
    id: 3,
    name: 'Ananya & Vikash Roy',
    location: 'Mumbai',
    image: '/img/prewedding.jpg',
    rating: 5,
    text: 'Professional, creative, and absolutely wonderful to work with. They captured not just moments but emotions. Our families were so impressed with the quality and creativity of the photographs.',
    event: 'Wedding & Reception',
    date: 'October 2024'
  },
  {
    id: 4,
    name: 'Ritu & Sameer Jain',
    location: 'Pune',
    image: '/img/bridalwear.jpg',
    rating: 5,
    text: 'The team at Chabighar is simply amazing! They were patient, professional, and captured every special moment of our mehendi and wedding ceremonies. Highly recommended for any special occasion.',
    event: 'Traditional Wedding',
    date: 'September 2024'
  },
  {
    id: 5,
    name: 'Deepika & Rahul Singh',
    location: 'Kolkata',
    image: '/img/venues.jpg',
    rating: 5,
    text: 'From engagement to wedding, Chabighar has been our photography partner throughout. Their consistency, quality, and dedication to perfection is unmatched. Thank you for preserving our memories so beautifully.',
    event: 'Complete Wedding Package',
    date: 'August 2024'
  },
  {
    id: 6,
    name: 'Kavita & Abhishek Das',
    location: 'Hyderabad',
    image: '/img/jewellery.jpg',
    rating: 5,
    text: 'Incredible experience from start to finish! The photographers understood our vision perfectly and delivered beyond expectations. The candid shots and traditional portraits are absolutely stunning.',
    event: 'Destination Wedding',
    date: 'July 2024'
  }
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-gold' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-soft-white">
      <div className="w-full mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold text-text mb-4" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            What Our Couples Say
          </h2>
          <p 
            className="text-lg text-muted max-w-2xl mx-auto" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Read testimonials from our happy couples who trusted us to capture their most precious moments
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            {/* Large Quote Mark */}
            <div className="absolute -top-6 -left-4 text-6xl text-royal-red opacity-20 font-serif">"</div>
            
            {/* Current Testimonial */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl relative">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Testimonial Content */}
                <div className="md:col-span-2">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {renderStars(testimonials[currentTestimonial].rating)}
                    <span 
                      className="ml-2 text-sm text-muted" 
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      ({testimonials[currentTestimonial].rating}.0)
                    </span>
                  </div>

                  {/* Testimonial Text */}
                  <blockquote 
                    className="text-lg md:text-xl text-text leading-relaxed mb-6" 
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {testimonials[currentTestimonial].text}
                  </blockquote>

                  {/* Client Info */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 
                      className="text-xl font-bold text-text mb-1" 
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p 
                      className="text-muted text-sm mb-2" 
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {testimonials[currentTestimonial].location}
                    </p>
                    <div className="flex items-center text-sm text-royal-red">
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>
                        {testimonials[currentTestimonial].event}
                      </span>
                      <span className="mx-2">•</span>
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>
                        {testimonials[currentTestimonial].date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Client Image */}
                <div className="relative">
                  <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Decorative border */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-royal-red to-gold rounded-xl -z-10 opacity-20"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            {/* Previous Button */}
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-royal-red hover:text-white group"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-royal-red scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-royal-red hover:text-white group"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          {[
            { number: '500+', label: 'Happy Couples' },
            { number: '1000+', label: 'Events Covered' },
            { number: '5.0', label: 'Average Rating' },
            { number: '98%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-3xl md:text-4xl font-bold text-royal-red mb-2" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {stat.number}
              </div>
              <p 
                className="text-muted" 
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}