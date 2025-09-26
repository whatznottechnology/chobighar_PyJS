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
            {loading ? "Let's Create Something Beautiful" : contactData?.hero?.main_title || "Let's Create Something Beautiful"}
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-md"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {loading ? "Ready to capture your precious moments? Get in touch with our creative team and let's discuss how we can bring your vision to life with our signature Bengali artistry." : contactData?.hero?.description || "Ready to capture your precious moments? Get in touch with our creative team and let's discuss how we can bring your vision to life with our signature Bengali artistry."}
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
                  {(contactData?.why_choose_us || [
                    { id: 1, point: "5+ years of professional experience", order: 1, is_active: true },
                    { id: 2, point: "Bengali traditional artistry with modern techniques", order: 2, is_active: true },
                    { id: 3, point: "Personalized packages for every budget", order: 3, is_active: true },
                    { id: 4, point: "Quick turnaround with high-quality results", order: 4, is_active: true },
                    { id: 5, point: "500+ happy clients across Bengal", order: 5, is_active: true }
                  ]).map((point) => (
                    <li key={point.id} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">{point.point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Contact Card */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-red-600 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Need Immediate Help?
                </h3>
                <div className="space-y-3">
                  <a 
                    href={`tel:${contactData?.contact_info?.primary_phone || "+919647966765"}`} 
                    className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <PhoneIcon className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium text-gray-900">Call Us Now</p>
                      <p className="text-sm text-gray-700">
                        {contactData?.contact_info?.primary_phone || "+91 96479 66765"}
                      </p>
                    </div>
                  </a>
                  <a 
                    href={`mailto:${contactData?.contact_info?.primary_email || "booking@chabighar.com"}`} 
                    className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <EnvelopeIcon className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email Us</p>
                      <p className="text-sm text-gray-700">
                        {contactData?.contact_info?.primary_email || "booking@chabighar.com"}
                      </p>
                    </div>
                  </a>
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
            <iframe
              src={contactData?.contact_info?.google_map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0929455463855!2d88.36320731495713!3d22.576484185188667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027579f4b6c5e3%3A0x5d9f4a1a5d9e8a1a!2sSector%20V%2C%20Bidhannagar%2C%20Kolkata%2C%20West%20Bengal%20700091!5e0!3m2!1sen!2sin!4v1635746400000!5m2!1sen!2sin"}
              className="w-full h-full rounded-none border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chabighar Location"
            />
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
            <a
              href={`tel:${contactData?.contact_info?.primary_phone || "+919647966765"}`}
              className="group bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-royal-red hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg"
            >
              <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                <PhoneIcon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                {contactData?.contact_info?.phone_label || "Call Us"}
              </h3>
              <p className="text-lg font-medium text-red-600 mb-1">
                {contactData?.contact_info?.primary_phone || "+91 96479 66765"}
              </p>
              {contactData?.contact_info?.secondary_phone && (
                <p className="text-md text-gray-700 mb-3">
                  {contactData.contact_info.secondary_phone}
                </p>
              )}
              <p className="text-sm text-gray-700">
                {contactData?.contact_info?.phone_description || "Available 9 AM - 9 PM"}
              </p>
            </a>

            {/* Email Contact */}
            <a
              href={`mailto:${contactData?.contact_info?.primary_email || "booking@chabighar.com"}`}
              className="group bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-royal-red hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg"
            >
              <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                <EnvelopeIcon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                {contactData?.contact_info?.email_label || "Email Us"}
              </h3>
              <p className="text-lg font-medium text-red-600 mb-1">
                {contactData?.contact_info?.primary_email || "booking@chabighar.com"}
              </p>
              {contactData?.contact_info?.secondary_email && (
                <p className="text-md text-gray-700 mb-3">
                  {contactData.contact_info.secondary_email}
                </p>
              )}
              <p className="text-sm text-gray-700">
                {contactData?.contact_info?.email_description || "We respond within 24 hours"}
              </p>
            </a>

            {/* Address Contact */}
            <div className="group bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-royal-red hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg">
              <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                <MapPinIcon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                {contactData?.contact_info?.address_label || "Visit Us"}
              </h3>
              <p className="text-lg font-medium text-red-600 mb-1">
                {contactData?.contact_info?.address_line1 || "Sector 5, Salt Lake City"}
              </p>
              <p className="text-md text-gray-700 mb-3">
                {contactData?.contact_info?.address_line2 || "Kolkata, West Bengal 700091"}
              </p>
              <p className="text-sm text-gray-700">
                {contactData?.contact_info?.address_description || "By appointment only"}
              </p>
            </div>

            {/* Office Hours */}
            <div className="group bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-royal-red hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg">
              <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                <ClockIcon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                {contactData?.contact_info?.hours_label || "Office Hours"}
              </h3>
              <p className="text-lg font-medium text-red-600 mb-1">
                {contactData?.contact_info?.weekday_hours || "Mon - Sat: 10 AM - 7 PM"}
              </p>
              <p className="text-md text-gray-700 mb-3">
                {contactData?.contact_info?.weekend_hours || "Sun: 11 AM - 5 PM"}
              </p>
              <p className="text-sm text-gray-700">
                {contactData?.contact_info?.emergency_note || "Emergency shoots available"}
              </p>
            </div>
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
            {(contactData?.testimonials || [
              {
                id: 1,
                name: 'Priya & Arjun',
                service: 'Wedding Photography',
                rating: 5,
                comment: 'Chabighar captured our special day beautifully! Their Bengali traditional touch made our photos truly memorable.',
                order: 1,
                is_active: true
              },
              {
                id: 2,
                name: 'Rohan Das',
                service: 'Portrait Session',
                rating: 5,
                comment: 'Professional, creative, and understanding. They knew exactly how to bring out the best in every shot.',
                order: 2,
                is_active: true
              },
              {
                id: 3,
                name: 'Anita Sharma',
                service: 'Pre-Wedding Shoot',
                rating: 5,
                comment: 'The team is incredibly talented. Our pre-wedding photos exceeded all expectations!',
                order: 3,
                is_active: true
              }
            ]).map((testimonial) => (
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
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
