'use client';

import { useState } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  CheckCircleIcon,
  CameraIcon,
  FilmIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    event_date: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const services = [
    { name: 'Wedding Photography', icon: HeartIcon },
    { name: 'Pre-Wedding Shoot', icon: CameraIcon },
    { name: 'Portrait Photography', icon: CameraIcon },
    { name: 'Cinematic Films', icon: FilmIcon },
    { name: 'Event Documentation', icon: CameraIcon },
    { name: 'Commercial Photography', icon: CameraIcon }
  ];

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Call Us',
      primary: '+91 96479 66765',
      secondary: '+91 98765 43210',
      href: 'tel:+919647966765',
      description: 'Available 9 AM - 9 PM'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      primary: 'booking@chabighar.com',
      secondary: 'info@chabighar.com',
      href: 'mailto:booking@chabighar.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: MapPinIcon,
      title: 'Visit Us',
      primary: 'Sector 5, Salt Lake City',
      secondary: 'Kolkata, West Bengal 700091',
      href: '#',
      description: 'By appointment only'
    },
    {
      icon: ClockIcon,
      title: 'Office Hours',
      primary: 'Mon - Sat: 10 AM - 7 PM',
      secondary: 'Sun: 11 AM - 5 PM',
      href: '#',
      description: 'Emergency shoots available'
    }
  ];

  const testimonials = [
    {
      name: 'Priya & Arjun',
      service: 'Wedding Photography',
      rating: 5,
      comment: 'Chabighar captured our special day beautifully! Their Bengali traditional touch made our photos truly memorable.'
    },
    {
      name: 'Rohan Das',
      service: 'Portrait Session',
      rating: 5,
      comment: 'Professional, creative, and understanding. They knew exactly how to bring out the best in every shot.'
    },
    {
      name: 'Anita Sharma',
      service: 'Pre-Wedding Shoot',
      rating: 5,
      comment: 'The team is incredibly talented. Our pre-wedding photos exceeded all expectations!'
    }
  ];

  return (
    <main className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-b from-white to-soft-white">
        <div className="absolute inset-0 bg-gradient-to-br from-royal-red/3 via-transparent to-golden/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-100 shadow-sm">
              <CameraIcon className="w-6 h-6 text-royal-red" />
              <span className="text-sm font-medium text-charcoal">Contact Chabighar</span>
            </div>
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-bold text-royal-red mb-8 tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Let's Create
            <span className="block text-golden"> Something Beautiful</span>
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-elegant-gray mb-12 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Ready to capture your precious moments? Get in touch with our creative team 
            and let's discuss how we can bring your vision to life with our signature Bengali artistry.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 hover:border-royal-red transition-colors shadow-sm">
                <service.icon className="w-4 h-4 text-royal-red" />
                <span className="text-sm font-medium text-charcoal">{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section - Moved to be second */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
                <div className="mb-8">
                  <h2 
                    className="text-3xl md:text-4xl font-bold text-royal-red mb-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Start Your Journey
                  </h2>
                  <p className="text-lg text-elegant-gray">
                    Tell us about your vision, and we'll create a personalized experience just for you.
                  </p>
                </div>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    <span className="text-green-800 font-medium">Thank you! We'll get back to you within 24 hours.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-red focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-red focus:border-transparent transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-red focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">Service Interested In</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-red focus:border-transparent transition-all"
                      >
                        <option value="">Select a service</option>
                        <option value="wedding">Wedding Photography</option>
                        <option value="pre-wedding">Pre-Wedding Shoot</option>
                        <option value="portrait">Portrait Photography</option>
                        <option value="cinematic">Cinematic Films</option>
                        <option value="event">Event Documentation</option>
                        <option value="commercial">Commercial Photography</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">Event Date</label>
                      <input
                        type="date"
                        name="event_date"
                        value={formData.event_date}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-red focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Tell Us About Your Vision</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-red focus:border-transparent transition-all resize-none"
                      placeholder="Describe your event, preferred style, special requirements, or any questions you have..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-royal-red text-white py-4 px-8 rounded-xl hover:bg-royal-red-hover font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                  >
                    Send Message & Get Quote
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar with Why Choose Us */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-royal-red to-royal-red-hover rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Why Choose Chabighar?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-golden mt-0.5 flex-shrink-0" />
                    <span>5+ years of professional experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-golden mt-0.5 flex-shrink-0" />
                    <span>Bengali traditional artistry with modern techniques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-golden mt-0.5 flex-shrink-0" />
                    <span>Personalized packages for every budget</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-golden mt-0.5 flex-shrink-0" />
                    <span>Quick turnaround with high-quality results</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-golden mt-0.5 flex-shrink-0" />
                    <span>500+ happy clients across Bengal</span>
                  </li>
                </ul>
              </div>

              {/* Quick Contact Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-royal-red mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Need Immediate Help?
                </h3>
                <div className="space-y-3">
                  <a href="tel:+919647966765" className="flex items-center gap-3 p-3 bg-royal-red/5 rounded-lg hover:bg-royal-red/10 transition-colors">
                    <PhoneIcon className="w-5 h-5 text-royal-red" />
                    <div>
                      <p className="font-medium text-charcoal">Call Us Now</p>
                      <p className="text-sm text-elegant-gray">+91 96479 66765</p>
                    </div>
                  </a>
                  <a href="mailto:booking@chabighar.com" className="flex items-center gap-3 p-3 bg-royal-red/5 rounded-lg hover:bg-royal-red/10 transition-colors">
                    <EnvelopeIcon className="w-5 h-5 text-royal-red" />
                    <div>
                      <p className="font-medium text-charcoal">Email Us</p>
                      <p className="text-sm text-elegant-gray">booking@chabighar.com</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-royal-red mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Get In Touch
            </h2>
            <p className="text-lg text-elegant-gray max-w-2xl mx-auto">
              Multiple ways to reach us. Choose what's most convenient for you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-royal-red hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-royal-red/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-royal-red/20 transition-colors">
                  <info.icon className="w-8 h-8 text-royal-red" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {info.title}
                </h3>
                <p className="text-lg font-medium text-royal-red mb-1">{info.primary}</p>
                <p className="text-md text-elegant-gray mb-3">{info.secondary}</p>
                <p className="text-sm text-elegant-gray">{info.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-royal-red mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              What Our Clients Say
            </h2>
            <p className="text-lg text-elegant-gray max-w-2xl mx-auto">
              Real stories from couples and families who trusted us with their precious moments.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 text-golden fill-current" />
                      ))}
                    </div>
                    <p className="text-charcoal mb-4 italic">"{testimonial.comment}"</p>
                    <div>
                      <p className="font-semibold text-royal-red">{testimonial.name}</p>
                      <p className="text-sm text-elegant-gray">{testimonial.service}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-royal-red to-royal-red-hover text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to Begin Your Story?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Don't wait – your perfect moments are just a call away!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919647966765"
              className="bg-white text-royal-red px-8 py-4 rounded-xl font-semibold hover:bg-golden-light transition-colors inline-flex items-center justify-center gap-2"
            >
              <PhoneIcon className="w-5 h-5" />
              Call Now: +91 96479 66765
            </a>
            <a
              href="mailto:booking@chabighar.com"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-royal-red transition-colors inline-flex items-center justify-center gap-2"
            >
              <EnvelopeIcon className="w-5 h-5" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
