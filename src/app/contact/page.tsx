'use client';

import { useState } from 'react';
import { useContactData } from '../../../hooks/useContactData';
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
import { getApiUrl, API_ENDPOINTS } from '@/config/api';

export default function Contact() {
  const { contactData, loading, error } = useContactData();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    event_date: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.INQUIRY_CREATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inquiry_type: 'general',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Contact Form - ${formData.service}`,
          message: formData.message,
          service_name: formData.service,
          event_date: formData.event_date || null,
          source: 'contact_page'
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            service: '',
            event_date: '',
            message: ''
          });
        }, 3000);
      } else {
        console.error('Failed to submit inquiry');
        // You might want to show an error message here
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      // You might want to show an error message here
    }
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

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden min-h-[80vh] flex items-center">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          {contactData?.hero?.hero_image_url && (
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url('${contactData.hero.hero_image_url}')`
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-red-600/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg">
              <CameraIcon className="w-6 h-6 text-golden" />
              <span className="text-sm font-medium text-white">Contact Chabighar</span>
            </div>
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight drop-shadow-lg"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {loading ? 'Loading...' : contactData?.hero?.main_title}
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-md"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {loading ? 'Loading...' : contactData?.hero?.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:border-golden transition-colors shadow-lg hover:bg-white/20">
                <service.icon className="w-4 h-4 text-golden" />
                <span className="text-sm font-medium text-white">{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/img/12873194_7666-removebg-preview.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 to-red-700/90" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-xl">
                <div className="mb-8">
                  <h2 
                    className="text-3xl md:text-4xl font-bold text-red-600 mb-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Start Your Journey
                  </h2>
                  <p className="text-lg text-gray-700">
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
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Service Interested In</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-gray-900"
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
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Event Date</label>
                      <input
                        type="date"
                        name="event_date"
                        value={formData.event_date}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Tell Us About Your Vision</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none bg-white text-gray-900"
                      placeholder="Describe your event, preferred style, special requirements, or any questions you have..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-4 px-8 rounded-xl hover:bg-red-700 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                  >
                    Send Message & Get Quote
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar with Why Choose Us */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-red-600" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Why Choose Chabighar?
                </h3>
                <ul className="space-y-4">
                  {contactData?.why_choose_us?.map((point) => (
                    <li key={point.id} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">{point.point}</span>
                    </li>
                  ))}
                  {!contactData?.why_choose_us && (
                    <li className="text-gray-500 italic">Loading benefits...</li>
                  )}
                </ul>
              </div>

              {/* Quick Contact Card */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-red-600 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Need Immediate Help?
                </h3>
                <div className="space-y-3">
                  {contactData?.contact_info?.primary_phone && (
                    <a 
                      href={`tel:${contactData.contact_info.primary_phone}`} 
                      className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <PhoneIcon className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">Call Us Now</p>
                        <p className="text-sm text-gray-700">
                          {contactData.contact_info.primary_phone}
                        </p>
                      </div>
                    </a>
                  )}
                  {contactData?.contact_info?.primary_email && (
                    <a 
                      href={`mailto:${contactData.contact_info.primary_email}`} 
                      className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <EnvelopeIcon className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">Email Us</p>
                        <p className="text-sm text-gray-700">
                          {contactData.contact_info.primary_email}
                        </p>
                      </div>
                    </a>
                  )}
                  {!contactData?.contact_info && (
                    <p className="text-gray-500 text-sm italic">Loading contact info...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="relative py-0 overflow-hidden">
        <div className="w-full">
          <div 
            className="w-full bg-gray-200 rounded-none"
            style={{ height: '300px' }}
          >
            {contactData?.contact_info?.google_map_url ? (
              <iframe
                src={contactData.contact_info.google_map_url}
                className="w-full h-full rounded-none border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Chabighar Location"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <p className="text-gray-600">Map loading...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="relative py-20 overflow-hidden bg-gray-100">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-10"
            style={{ backgroundImage: `url('/img/62569719_9509225.png')` }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Get In Touch
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Multiple ways to reach us. Choose what's most convenient for you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Phone Contact */}
            {contactData?.contact_info?.primary_phone && (
              <a
                href={`tel:${contactData.contact_info.primary_phone}`}
                className="group bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-royal-red hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg"
              >
                <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                  <PhoneIcon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {contactData.contact_info.phone_label}
                </h3>
                <p className="text-lg font-medium text-red-600 mb-1">
                  {contactData.contact_info.primary_phone}
                </p>
                {contactData.contact_info.secondary_phone && (
                  <p className="text-md text-gray-700 mb-3">
                    {contactData.contact_info.secondary_phone}
                  </p>
                )}
                <p className="text-sm text-gray-700">
                  {contactData.contact_info.phone_description}
                </p>
              </a>
            )}

            {/* Email Contact */}
            {contactData?.contact_info?.primary_email && (
              <a
                href={`mailto:${contactData.contact_info.primary_email}`}
                className="group bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-royal-red hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg"
              >
                <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                  <EnvelopeIcon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {contactData.contact_info.email_label}
                </h3>
                <p className="text-lg font-medium text-red-600 mb-1">
                  {contactData.contact_info.primary_email}
                </p>
                {contactData.contact_info.secondary_email && (
                  <p className="text-md text-gray-700 mb-3">
                    {contactData.contact_info.secondary_email}
                  </p>
                )}
                <p className="text-sm text-gray-700">
                  {contactData.contact_info.email_description}
                </p>
              </a>
            )}

            {/* Address Contact */}
            {contactData?.contact_info?.address_line1 && (
              <div className="group bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-royal-red hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg">
                <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                  <MapPinIcon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {contactData.contact_info.address_label}
                </h3>
                <p className="text-lg font-medium text-red-600 mb-1">
                  {contactData.contact_info.address_line1}
                </p>
                <p className="text-md text-gray-700 mb-3">
                  {contactData.contact_info.address_line2}
                </p>
                <p className="text-sm text-gray-700">
                  {contactData.contact_info.address_description}
                </p>
              </div>
            )}

            {/* Office Hours */}
            {contactData?.contact_info?.weekday_hours && (
              <div className="group bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-royal-red hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg">
                <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                  <ClockIcon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {contactData.contact_info.hours_label}
                </h3>
                <p className="text-lg font-medium text-red-600 mb-1">
                  {contactData.contact_info.weekday_hours}
                </p>
                <p className="text-md text-gray-700 mb-3">
                  {contactData.contact_info.weekend_hours}
                </p>
                <p className="text-sm text-gray-700">
                  {contactData.contact_info.emergency_note}
                </p>
              </div>
            )}
            
            {/* Loading State */}
            {!contactData?.contact_info && (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Loading contact information...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="relative py-20 overflow-hidden bg-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-5"
            style={{ backgroundImage: `url('/img/12873194_7666-removebg-preview.png')` }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from couples and families who trusted us with their precious moments.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {contactData?.testimonials && contactData.testimonials.length > 0 ? (
              contactData.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-800 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold text-red-600">{testimonial.name}</p>
                    <p className="text-sm text-gray-700">{testimonial.service}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Loading testimonials...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
