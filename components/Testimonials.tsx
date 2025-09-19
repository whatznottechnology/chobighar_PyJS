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
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-royal-red rounded-full"></div>
        <div className="absolute top-1/2 right-20 w-20 h-20 bg-gold rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-royal-red rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold text-royal-red mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Love Stories From Our Couples
          </h2>
          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Read heartfelt testimonials from couples who trusted us to capture their most precious moments and create lasting memories
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="mb-16">
          <div className="relative">
            {/* Large Quote Mark */}
            <div className="absolute -top-8 -left-6 text-8xl text-royal-red opacity-10 font-serif z-0">"</div>
            
            {/* Current Testimonial */}
            <div className="relative z-10">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-t-4 border-royal-red">
                <div className="grid lg:grid-cols-5 gap-8 items-center">
                  {/* Testimonial Content */}
                  <div className="lg:col-span-3">
                    {/* Rating */}
                    <div className="flex items-center mb-6">
                      <div className="flex">{renderStars(testimonials[currentTestimonial].rating)}</div>
                      <span 
                        className="ml-3 text-sm text-gray-500 font-medium" 
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Perfect Rating ({testimonials[currentTestimonial].rating}.0/5)
                      </span>
                    </div>

                    {/* Testimonial Text */}
                    <blockquote 
                      className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8 italic" 
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      "{testimonials[currentTestimonial].text}"
                    </blockquote>

                    {/* Client Info */}
                    <div className="border-t border-gray-100 pt-6">
                      <h4 
                        className="text-xl font-bold text-gray-900 mb-2" 
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1 text-royal-red" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {testimonials[currentTestimonial].location}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1 text-royal-red" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {testimonials[currentTestimonial].event}
                        </span>
                        <span className="text-royal-red font-medium">
                          {testimonials[currentTestimonial].date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Client Image */}
                  <div className="lg:col-span-2 relative">
                    <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        fill
                        className="object-cover"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    {/* Decorative border with gradient */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-royal-red via-gold to-royal-red rounded-2xl -z-10 opacity-20"></div>
                    {/* Floating badge */}
                    <div className="absolute -top-4 -right-4 bg-royal-red text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ {testimonials[currentTestimonial].rating}.0
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-6">
            {/* Previous Button */}
            <button
              onClick={prevTestimonial}
              className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-royal-red hover:text-white group border-2 border-gray-100 hover:border-royal-red"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots Indicators */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'w-12 h-4 bg-royal-red rounded-full' 
                      : 'w-4 h-4 bg-gray-300 hover:bg-gray-400 rounded-full'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-royal-red hover:text-white group border-2 border-gray-100 hover:border-royal-red"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial Grid - Preview of other testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                index === currentTestimonial ? 'ring-2 ring-royal-red ring-opacity-50' : ''
              }`}
              onClick={() => goToTestimonial(index)}
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h5>
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <div className="bg-gradient-to-r from-royal-red via-red-800 to-red-900 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                number: '500+', 
                label: 'Happy Couples',
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                )
              },
              { 
                number: '1000+', 
                label: 'Events Covered',
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                )
              },
              { 
                number: '5.0', 
                label: 'Average Rating',
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )
              },
              { 
                number: '98%', 
                label: 'Client Satisfaction',
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )
              }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 group-hover:bg-white/30 transition-colors duration-300">
                  {stat.icon}
                </div>
                <div 
                  className="text-3xl md:text-4xl font-bold mb-2" 
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {stat.number}
                </div>
                <p 
                  className="text-red-100 font-medium" 
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}