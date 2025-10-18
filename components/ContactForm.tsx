'use client';

import { useState, useEffect } from 'react';
import { useHeaderData } from '../hooks/useHeaderData';
import { useWhatsAppIntegration } from '../hooks/useWhatsAppIntegration';
import { getApiUrl, API_ENDPOINTS } from '@/config/api';

interface FormData {
  shootType: string;
  date: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const { headerData } = useHeaderData();
  const { sendContactFormToWhatsApp } = useWhatsAppIntegration();
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    shootType: '',
    date: '',
    phone: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Prevent hydration mismatch by only setting date constraint after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shootTypes = [
    'Wedding Photography',
    'Pre-Wedding Shoot',
    'Engagement Photography',
    'Portrait Session',
    'Event Coverage',
    'Birthday Party',
    'Anniversary Celebration',
    'Family Portrait',
    'Corporate Event',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, save the inquiry to the database
      const response = await fetch(getApiUrl(API_ENDPOINTS.INQUIRY_CREATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inquiry_type: 'photoshoot',
          name: 'Photography Client', // Placeholder since no name field exists
          email: formData.email,
          phone: formData.phone,
          subject: `${formData.shootType} - Photography Inquiry`,
          message: `${formData.message}\n\nEvent Date: ${formData.date}\nType: ${formData.shootType}`,
          service_name: formData.shootType,
          event_date: formData.date || null,
          source: 'contact_form'
        })
      });

      if (response.ok) {
        // Data saved successfully, now open WhatsApp
        sendContactFormToWhatsApp({
          name: 'Photography Client',
          email: formData.email,
          phone: formData.phone,
          service: formData.shootType,
          message: formData.message,
          eventDate: formData.date
        });
        
        // Show success message
        setSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            shootType: '',
            date: '',
            phone: '',
            email: '',
            message: ''
          });
        }, 3000);
      } else {
        console.error('Failed to submit inquiry');
        alert('Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-12 md:py-16 relative overflow-hidden" style={{ backgroundColor: '#B22222' }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 lg:w-2/5">
            <img
              src="/img/62569719_9509225.png"
              alt="Background decoration"
              className="w-full h-full object-contain object-right opacity-20"
            />
          </div>
          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#B22222] via-[#B22222]/95 to-[#B22222]/80"></div>
        </div>
        
        <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/30">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 
                className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Thank You!
              </h3>
              <p 
                className="text-white text-base md:text-lg drop-shadow-md" 
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                We've received your inquiry and will contact you within 24 hours to discuss your photography needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 relative overflow-hidden" style={{ backgroundColor: '#B22222' }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 lg:w-2/5">
          <img
            src="/img/62569719_9509225.png"
            alt="Background decoration"
            className="w-full h-full object-contain object-right opacity-20"
          />
        </div>
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#B22222] via-[#B22222]/95 to-[#B22222]/80"></div>
      </div>
      
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - More Compact */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300 border border-white/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            LET'S PLAN YOUR <span className="text-yellow-300 drop-shadow-lg">MARRIAGE PHOTOGRAPHY</span>
          </h2>
          <p 
            className="text-white text-lg max-w-2xl mx-auto font-semibold drop-shadow-md" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            IN KOLKATA NOW!
          </p>
        </div>

        {/* Contact Form - More Professional & Compact */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white/20 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/30">
            {/* Main Form Fields - Compact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Type of Shoot */}
              <div className="space-y-2">
                <label className="text-white text-sm font-semibold block drop-shadow-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Type of Shoot
                </label>
                <select
                  name="shootType"
                  value={formData.shootType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-white/40 rounded-xl bg-white/95 text-gray-900 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition-all backdrop-blur-sm text-sm font-medium focus:bg-white shadow-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <option value="" className="text-gray-500 bg-white">Select type</option>
                  {shootTypes.map((type) => (
                    <option key={type} value={type} className="text-gray-900 bg-white">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-white text-sm font-semibold block drop-shadow-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-white/40 rounded-xl bg-white/95 text-gray-900 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition-all backdrop-blur-sm text-sm font-medium focus:bg-white shadow-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  {...(isMounted && { min: new Date().toISOString().split('T')[0] })}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-white text-sm font-semibold block drop-shadow-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-white/40 rounded-xl bg-white/95 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition-all backdrop-blur-sm text-sm font-medium focus:bg-white shadow-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-white text-sm font-semibold block drop-shadow-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border border-white/40 rounded-xl bg-white/95 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition-all backdrop-blur-sm text-sm font-medium focus:bg-white shadow-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            {/* Message Field - Compact */}
            <div className="space-y-2 mb-6">
              <label className="text-white text-sm font-semibold block drop-shadow-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your Requirements
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                placeholder="Tell us about your requirements, budget, venue details, or any special requests..."
                className="w-full px-4 py-3 border border-white/40 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition-all resize-none backdrop-blur-sm text-sm font-medium focus:bg-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              ></textarea>
            </div>

            {/* Submit Button - Red Design */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-red-800 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SENDING...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    SEND MESSAGE
                  </div>
                )}
              </button>
            </div>

            {/* Contact Info - Compact */}
            <div className="mt-8 pt-6 border-t border-white/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-white text-sm font-medium drop-shadow-sm">
                    {headerData?.contact_info?.phone || '+91 96479 66765'}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white text-sm font-medium drop-shadow-sm">
                    {headerData?.contact_info?.email || 'info@chobighar.com'}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white text-sm font-medium drop-shadow-sm">24/7 Response</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}