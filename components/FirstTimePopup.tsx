'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { usePopupSettings } from '../hooks/useBlogData';
import { getApiUrl, getMediaUrl, API_ENDPOINTS } from '@/config/api';
import { useWhatsAppIntegration } from '../hooks/useWhatsAppIntegration';

const COOKIE_NAME = 'chobighar_popup_seen';

export default function FirstTimePopup() {
  const { settings, loading } = usePopupSettings();
  const { sendToWhatsApp } = useWhatsAppIntegration();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    event_date: '',
    event_type: '',
    location: '',
    whatsapp_number: '',
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const eventTypes = [
    'Wedding Photography',
    'Pre-Wedding Shoot',
    'Engagement',
    'Birthday Party',
    'Anniversary',
    'Corporate Event',
    'Other'
  ];

  useEffect(() => {
    if (!loading && settings?.is_active) {
      // Always show popup after delay (removed cookie check)
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, settings.show_delay || 2000);

      return () => clearTimeout(timer);
    }
  }, [loading, settings]);

  const handleClose = () => {
    setIsOpen(false);
    // Cookie removed - popup will show every time
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      // Step 1: Save to inquiry database
      const inquiryResponse = await fetch(getApiUrl(API_ENDPOINTS.INQUIRY_CREATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inquiry_type: 'general',
          name: formData.name,
          email: formData.email,
          phone: formData.whatsapp_number.replace(/\s+/g, ''), // Remove spaces
          subject: `Popup Inquiry - ${formData.event_type}`,
          message: `Event Type: ${formData.event_type}\nLocation: ${formData.location}\nEvent Date: ${formData.event_date}`,
          service_name: formData.event_type,
          event_date: formData.event_date || null,
          event_location: formData.location,
          source: 'popup_modal'
        })
      });

      console.log('Inquiry response status:', inquiryResponse.status);

      if (inquiryResponse.ok) {
        const inquiryData = await inquiryResponse.json();
        console.log('Inquiry saved:', inquiryData);

        // Step 2: Also save to popup-specific endpoint (for backward compatibility)
        try {
          await fetch(getApiUrl(API_ENDPOINTS.POPUP_INQUIRY), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });
        } catch (err) {
          console.log('Popup endpoint not available, using main inquiry only');
        }

        // Step 3: Open WhatsApp with the data
        sendToWhatsApp({
          name: formData.name,
          email: formData.email,
          phone: formData.whatsapp_number,
          service: formData.event_type,
          eventDate: formData.event_date,
          location: formData.location,
          message: `I'm interested in ${formData.event_type} services for my event on ${formData.event_date} at ${formData.location}`
        });

        // Step 4: Show success and close
        setSubmitSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        const errorText = await inquiryResponse.text();
        console.error('Failed to save inquiry:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = {};
        }
        
        if (errorData.details) {
          console.error('Validation errors:', errorData.details);
        }
        alert('Failed to submit inquiry. Please check your information and try again.');
      }
    } catch (error) {
      console.error('Error submitting popup inquiry:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!settings || !isOpen) return null;

  const popupImageUrl = settings.popup_image ? getMediaUrl(settings.popup_image) : null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative w-full max-w-2xl bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg hover:scale-110 group"
          aria-label="Close popup"
        >
          <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-gray-900" />
        </button>

        {/* Main Image - Full Width */}
        {popupImageUrl && (
          <div className="relative w-full h-48 sm:h-56 md:h-64">
            <Image
              src={popupImageUrl}
              alt={settings.popup_title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 768px"
              priority
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30"></div>
          </div>
        )}

        {submitSuccess ? (
          <div className="p-6 sm:p-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 text-sm sm:text-base">We'll contact you soon.</p>
          </div>
        ) : (
          <div className="p-4 sm:p-6 bg-white">
            {/* Header */}
            <div className="text-center mb-4 sm:mb-5">
              <h2 
                className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {settings.popup_title}
              </h2>
              {settings.popup_subtitle && (
                <p className="text-gray-600 text-xs sm:text-sm">{settings.popup_subtitle}</p>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
              {/* Row 1: Event Date, Event Type, Location */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
                {/* Event Date */}
                <input
                  type="date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm text-gray-700 bg-white placeholder:text-gray-400"
                  min={new Date().toISOString().split('T')[0]}
                />

                {/* Event Type */}
                <select
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm text-gray-700 bg-white"
                >
                  <option value="" className="text-gray-400">Select Event Type</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type} className="text-gray-700">{type}</option>
                  ))}
                </select>

                {/* Location */}
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm text-gray-700 bg-white placeholder:text-gray-400"
                  placeholder="Your Location"
                />
              </div>

              {/* Row 2: WhatsApp, Name, Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
                {/* WhatsApp Number */}
                <input
                  type="tel"
                  name="whatsapp_number"
                  value={formData.whatsapp_number}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm text-gray-700 bg-white placeholder:text-gray-400"
                  placeholder="Your WhatsApp No."
                />

                {/* Name */}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm text-gray-700 bg-white placeholder:text-gray-400"
                  placeholder="Your Name"
                />

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm text-gray-700 bg-white placeholder:text-gray-400"
                  placeholder="Your Email"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:from-red-700 hover:via-red-800 hover:to-red-900 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : 'Submit'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
