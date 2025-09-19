'use client';

import { useState } from 'react';

interface FormData {
  shootType: string;
  date: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    shootType: '',
    date: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          shootType: '',
          date: '',
          phone: '',
          message: ''
        });
      }, 3000);
    }, 1000);
  };

  if (submitted) {
    return (
      <section className="py-20 bg-charcoal relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-bengali-pattern opacity-30"></div>
        
        <div className="relative w-full mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-12 shadow-2xl">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 
                className="text-3xl font-bold text-text mb-4" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Thank You!
              </h3>
              <p 
                className="text-muted text-lg" 
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
    <section className="py-20 bg-charcoal relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-bengali-pattern opacity-30"></div>
      
      <div className="relative w-full mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            LET'S PLAN YOUR MARRIAGE PHOTOGRAPHY IN KOLKATA NOW!
          </h2>
          <p 
            className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            We offer a range of photography with different price segments. Let us know your 
            requirements and budget and discuss everything to get you the Best!
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Shoot Type */}
                <div>
                  <label 
                    htmlFor="shootType" 
                    className="block text-sm font-semibold text-text mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Type of Shoot
                  </label>
                  <select
                    id="shootType"
                    name="shootType"
                    value={formData.shootType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-red focus:border-royal-red transition-colors bg-white text-text"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <option value="">Select type of shoot</option>
                    {shootTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label 
                    htmlFor="date" 
                    className="block text-sm font-semibold text-text mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-red focus:border-royal-red transition-colors text-text"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label 
                    htmlFor="phone" 
                    className="block text-sm font-semibold text-text mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-red focus:border-royal-red transition-colors text-text"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Message */}
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-semibold text-text mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Additional Requirements
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={8}
                    placeholder="Tell us about your requirements, budget, venue details, or any special requests..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-red focus:border-royal-red transition-colors resize-none text-text"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-royal-red text-white font-bold py-4 px-8 rounded-lg hover:bg-royal-red-hover transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>SEND</span>
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p 
                className="text-muted mb-4" 
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                You can also reach us directly:
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
                <a 
                  href="tel:+919876543210" 
                  className="flex items-center text-royal-red hover:text-royal-red-hover transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 98765 43210
                </a>
                <a 
                  href="mailto:info@chabighar.com" 
                  className="flex items-center text-royal-red hover:text-royal-red-hover transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@chabighar.com
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}