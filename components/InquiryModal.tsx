'use client';

import React, { useState, useEffect } from 'react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { getApiUrl, API_ENDPOINTS } from '@/config/api';
import { useWhatsAppIntegration } from '../hooks/useWhatsAppIntegration';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiryType?: string;
  serviceName?: string;
  serviceId?: string;
  prefilledData?: {
    subject?: string;
    message?: string;
  };
}

export default function InquiryModal({ 
  isOpen, 
  onClose, 
  inquiryType = 'general',
  serviceName = '',
  serviceId = '',
  prefilledData = {}
}: InquiryModalProps) {
  const { sendInquiryToWhatsApp } = useWhatsAppIntegration();
  const [formData, setFormData] = useState({
    inquiry_type: inquiryType,
    name: '',
    email: '',
    phone: '',
    subject: prefilledData.subject || '',
    message: prefilledData.message || '',
    service_name: serviceName,
    service_id: serviceId,
    event_date: '',
    event_location: '',
    budget_range: '',
    source: 'website'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        inquiry_type: inquiryType,
        service_name: serviceName,
        service_id: serviceId,
        subject: prefilledData.subject || (serviceName ? `Inquiry about ${serviceName}` : 'Photography Service Inquiry'),
        message: prefilledData.message || (serviceName ? `I'm interested in your ${serviceName} package.` : 'I would like to know more about your photography services.')
      }));
      setSubmitStatus('idle');
      setErrors({});
    }
  }, [isOpen, inquiryType, serviceName, serviceId, prefilledData]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare request body with cleaned phone number
      const requestBody = {
        ...formData,
        phone: formData.phone.replace(/\s+/g, '') // Remove spaces from phone
      };
      
      console.log('Sending inquiry:', requestBody);
      
      // Step 1: Save inquiry to database
      const response = await fetch(getApiUrl(API_ENDPOINTS.INQUIRY_CREATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('Success response:', responseData);
        
        // Step 2: Data saved successfully, now open WhatsApp
        sendInquiryToWhatsApp({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service_name || 'General Inquiry',
          message: formData.message,
          eventDate: formData.event_date || undefined,
          location: formData.event_location || undefined,
          budget: formData.budget_range || undefined
        });
        
        // Step 3: Show success message
        setSubmitStatus('success');
        
        // Step 4: Auto close after 3 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
          setFormData({
            inquiry_type: 'general',
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            service_name: '',
            service_id: '',
            event_date: '',
            event_location: '',
            budget_range: '',
            source: 'website'
          });
        }, 3000);
        
      } else {
        // Failed to save to database
        const responseText = await response.text();
        console.error('Response text:', responseText);
        
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          data = {};
        }
        
        setSubmitStatus('error');
        if (data.details) {
          setErrors(data.details);
        }
        console.error('Failed to submit inquiry:', data);
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div 
          className="relative w-full max-w-md transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 text-center border-b border-gray-100">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 hover:bg-gray-100/80 rounded-full transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
            <h2 
              className="text-xl font-bold mb-1"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#B22222'
              }}
            >
              Quick Inquiry
            </h2>
            <p className="text-sm text-gray-600">
              {serviceName ? `${serviceName}` : 'Get in touch with us'}
            </p>
          </div>

          {/* Success State */}
          {submitStatus === 'success' && (
            <div className="p-8 text-center">
              <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Thank You!
              </h3>
              <p className="text-sm text-gray-600">
                We'll get back to you within 24 hours.
              </p>
            </div>
          )}

          {/* Form */}
          {submitStatus !== 'success' && (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Essential Fields Only */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-opacity-50 transition-colors bg-white text-gray-900 placeholder:text-gray-400 ${
                    errors.name ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
                  }`}
                  placeholder="Your Name *"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-opacity-50 transition-colors bg-white text-gray-900 placeholder:text-gray-400 ${
                    errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
                  }`}
                  placeholder="Phone Number *"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-opacity-50 transition-colors bg-white text-gray-900 placeholder:text-gray-400 ${
                    errors.email ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
                  }`}
                  placeholder="Email Address *"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Event Date for photoshoot services */}
              {(inquiryType === 'photoshoot' || serviceName) && (
                <div>
                  <input
                    type="date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors bg-white text-gray-900"
                  />
                </div>
              )}

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-opacity-50 transition-colors resize-none bg-white text-gray-900 placeholder:text-gray-400 ${
                    errors.message ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
                  }`}
                  placeholder="Your message or requirements *"
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Status */}
              {submitStatus === 'error' && (
                <div className="bg-red-50/80 border border-red-200 rounded-xl p-3">
                  <p className="text-red-800 text-xs">
                    Error submitting inquiry. Please try again.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{ backgroundColor: '#B22222' }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}