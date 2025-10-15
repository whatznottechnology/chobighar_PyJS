'use client';

import { useState } from 'react';
import { useFAQs } from '../hooks/useHomepageData';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
  keywords: string;
  is_active: boolean;
}

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { faqs: backendFaqs, loading, error } = useFAQs();

  // Use only backend data
  const displayFaqs = backendFaqs || [];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-12 lg:py-16 bg-white relative">
      {/* Background Images */}
      <div className="absolute top-4 left-4 w-1/4 lg:w-1/5 pointer-events-none">
        <img
          src="/img/12873194_7666-removebg-preview.png"
          alt="Background decoration"
          className="w-full h-auto object-contain opacity-10"
        />
      </div>
      <div className="absolute bottom-4 right-4 w-1/3 lg:w-1/4 pointer-events-none">
        <img
          src="/img/62569719_9509225.png"
          alt="Background decoration"
          className="w-full h-auto object-contain opacity-10"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-4" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-700 mx-auto mb-6 rounded-full"></div>
          <p 
            className="text-lg text-gray-800 font-medium leading-relaxed max-w-2xl mx-auto" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Everything you need to know about our wedding photography services
          </p>
        </div>

        {/* Main Content Layout - Video on RIGHT, FAQs on LEFT */}
        <div className="lg:grid lg:grid-cols-5 lg:gap-12">
          
          {/* FAQ Section - LEFT Side - Scrollable Content */}
          <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading FAQs...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600">Error loading FAQs: {error}</p>
              </div>
            ) : displayFaqs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No FAQs available at the moment.</p>
              </div>
            ) : null}
            
            {displayFaqs && displayFaqs.map((faq, index) => (
              <div key={faq.id} className="group mb-8">
                <div className="relative bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-red-300 hover:bg-gradient-to-br hover:from-white hover:to-red-50">
                  
                  {/* FAQ Header Button */}
                  <button
                    className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-2 rounded-2xl transition-all duration-300"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Number Badge */}
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300">
                          <span className="font-bold text-white text-sm">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        
                        {/* Question */}
                        <div className="flex-1">
                          <h3 
                            className="text-lg font-bold text-red-600 group-hover:text-red-700 transition-colors duration-300 leading-tight pr-4" 
                            style={{ fontFamily: 'Playfair Display, serif' }}
                          >
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Toggle Icon */}
                      <div className="flex-shrink-0">
                        <div 
                          className={`w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-700 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm ${
                            openFAQ === faq.id ? 'rotate-180 bg-gradient-to-br from-red-600 to-red-700 text-white' : 'rotate-0 text-gray-600'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  {/* FAQ Answer */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="ml-14 pt-2 border-t border-red-200">
                        <p 
                          className="text-gray-700 font-medium leading-relaxed pt-4" 
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-red-500 via-red-600 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            ))}
            
            {/* Extra space to ensure proper sticky behavior */}
            <div className="lg:h-96"></div>
          </div>

          {/* Video Section - RIGHT Side - Sticky */}
          <div className="lg:col-span-2 mb-8 lg:mb-0 order-1 lg:order-2">
            <div className="sticky top-8 will-change-transform">
              {/* Video Container */}
              <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50 border-2 border-red-100">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/homefaq.mp4" type="video/mp4" />
                  <div className="w-full h-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                    <div className="text-center text-gray-700">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm opacity-60">Video preview not available</p>
                    </div>
                  </div>
                </video>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-600 rounded-full blur-sm opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-500 rounded-full blur-sm opacity-60"></div>
              <div className="absolute top-1/4 -left-2 w-4 h-4 bg-red-400 rounded-full opacity-40"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}