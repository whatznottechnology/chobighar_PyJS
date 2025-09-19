'use client';

import { useState } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: "What photography packages do you offer for weddings?",
    answer: "We offer comprehensive wedding photography packages including pre-wedding shoots, ceremony coverage, reception photography, and post-processing. Our packages range from basic coverage to premium all-day experiences with multiple photographers, videography, and same-day editing."
  },
  {
    id: 'faq-2',
    question: "How far in advance should we book your services?",
    answer: "We recommend booking our services 6-12 months in advance, especially for peak wedding seasons (October-March). This ensures your preferred date is available and gives us ample time to plan and prepare for your special day."
  },
  {
    id: 'faq-3',
    question: "Do you provide services outside of Kolkata?",
    answer: "Yes, we provide destination wedding photography services across India and internationally. Travel charges may apply for locations outside our base city. We're experienced in capturing weddings in various cultural settings and locations."
  },
  {
    id: 'faq-4',
    question: "What is included in your wedding photography service?",
    answer: "Our wedding photography service includes professional photographers, high-resolution edited images, online gallery access, USB/DVD delivery, and basic photo editing. Premium packages also include videography, same-day highlights, and photo albums."
  },
  {
    id: 'faq-5',
    question: "Can we customize our photography package?",
    answer: "Absolutely! We understand every wedding is unique. We offer customizable packages where you can add or remove services based on your needs and budget. This includes additional photographers, extended hours, or special artistic requests."
  },
  {
    id: 'faq-6',
    question: "How long does it take to receive our wedding photos?",
    answer: "You'll receive a preview gallery with 30-50 edited highlights within 48-72 hours after your wedding. The complete edited gallery with 300-800 high-resolution images is typically delivered within 3-4 weeks."
  }
];

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Enhanced Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-royal-red/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-royal-red/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-royal-red/2 rounded-full blur-3xl"></div>
      
      {/* Subtle gradient overlay at bottom to match footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-royal-red/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-royal-red to-royal-red-light rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-red to-royal-red-light">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-royal-red to-royal-red-light mx-auto mb-6 rounded-full"></div>
          <p 
            className="text-lg text-elegant-gray leading-relaxed max-w-2xl mx-auto" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Everything you need to know about our wedding photography services
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          
          {/* Video Section - Left Side on Desktop */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <div className="relative">
              {/* Video Container */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50 border-2 border-royal-red/10">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/homefaq.mp4" type="video/mp4" />
                  <div className="w-full h-full bg-gradient-to-br from-royal-red/10 to-royal-red-light/10 flex items-center justify-center">
                    <div className="text-center text-charcoal">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm opacity-60">Video preview not available</p>
                    </div>
                  </div>
                </video>
                
                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white/90 hover:bg-white text-royal-red p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-royal-red rounded-full blur-sm opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-royal-red-light rounded-full blur-sm opacity-60"></div>
              <div className="absolute top-1/4 -left-2 w-4 h-4 bg-royal-red/30 rounded-full opacity-40"></div>
            </div>
          </div>

          {/* FAQ Section - Right Side on Desktop */}
          <div className="lg:col-span-3 space-y-6">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="group">
                <div className="relative bg-white border-2 border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:border-royal-red/20 hover:bg-gradient-to-br hover:from-white hover:to-royal-red/5">
                  
                  {/* FAQ Header Button */}
                  <button
                    className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-royal-red/20 focus:ring-offset-2 rounded-2xl transition-all duration-300"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Number Badge */}
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-royal-red to-royal-red-light rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300">
                          <span className="font-bold text-white text-sm">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        
                        {/* Question */}
                        <div className="flex-1">
                          <h3 
                            className="text-lg font-bold text-charcoal group-hover:text-royal-red transition-colors duration-300 leading-tight pr-4" 
                            style={{ fontFamily: 'Playfair Display, serif' }}
                          >
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Toggle Icon */}
                      <div className="flex-shrink-0">
                        <div 
                          className={`w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-royal-red group-hover:to-royal-red-light group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm ${
                            openFAQ === faq.id ? 'rotate-180 bg-gradient-to-br from-royal-red to-royal-red-light text-white' : 'rotate-0'
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
                      <div className="ml-14 pt-2 border-t border-gray-200/60">
                        <p 
                          className="text-elegant-gray leading-relaxed pt-4" 
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-royal-red via-royal-red-light to-royal-red opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}