'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  CheckIcon,
  ArrowRightIcon,
  CameraIcon,
  HeartIcon,
  UserGroupIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { usePhotoshootPageData, PhotoshootService, PortfolioAlbum } from '../../../hooks/usePhotoshootData';
import { useHeaderData } from '../../../hooks/useHeaderData';
import InquiryModal from '../../../components/InquiryModal';

export default function PhotoshootPage() {
  const { data, loading, error } = usePhotoshootPageData();
  const { headerData } = useHeaderData();
  const router = useRouter();
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<PhotoshootService | null>(null);

  const handleBookService = (service: PhotoshootService) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleAlbumClick = (albumId: string) => {
    router.push(`/portfolio/${albumId}`);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {data.hero?.image_url && (
            <Image
              src={data.hero.image_url}
              alt={data.hero.alt_text || "Photography Hero"}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {data.hero?.title && (
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif', color: '#FFFFFF' }}
            >
              {data.hero.title}
            </h1>
          )}
          {data.hero?.subtitle && (
            <p 
              className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto"
              style={{ color: '#F5F5F5' }}
            >
              {data.hero.subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all inline-flex items-center justify-center gap-2 shadow-lg"
              style={{ backgroundColor: '#B22222' }}
              onClick={() => {
                setSelectedService(null);
                setIsModalOpen(true);
              }}
            >
              {data.hero?.primary_button_text || "Book Now"}
              <ArrowRightIcon className="w-5 h-5" />
            </button>
            <button 
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-black transition-all"
            >
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 left-5 opacity-25 z-0">
          <Image
            src="/img/12873194_7666-removebg-preview.png"
            alt="Decoration"
            width={320}
            height={320}
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-10 right-5 opacity-25 z-0">
          <Image
            src="/img/62569719_9509225.png"
            alt="Decoration"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#B22222'
              }}
            >
              {data.settings?.services_section_title || "Our Services"}
            </h2>
            {data.settings?.services_section_description && (
              <p 
                className="text-lg max-w-3xl mx-auto"
                style={{ color: '#666666' }}
              >
                {data.settings.services_section_description}
              </p>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {(data.services || []).map((service: PhotoshootService, index: number) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                onClick={() => handleBookService(service)}
              >
                <div className="relative h-80">
                  {service.image_url && (
                    <Image
                      src={service.image_url}
                      alt={service.alt_text}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 mb-4 inline-block">
                      <span 
                        className="font-bold text-lg"
                        style={{ color: '#B22222' }}
                      >
                        {service.price}
                      </span>
                    </div>
                    <h3 
                      className="text-2xl font-bold text-white mb-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>
                
                <div className="p-8">
                  <p 
                    className="mb-6 leading-relaxed text-lg"
                    style={{ color: '#333333' }}
                  >
                    {service.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 
                        className="font-semibold mb-3 flex items-center gap-2"
                        style={{ color: '#333333' }}
                      >
                        <CheckIcon className="w-5 h-5 text-green-500" />
                        What's Included
                      </h4>
                      <ul className="space-y-2">
                        {service.inclusions.map((inclusion: string, idx: number) => (
                          <li key={idx} className="text-sm flex items-start gap-2" style={{ color: '#333333' }}>
                            <div 
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: '#B22222' }}
                            ></div>
                            {inclusion}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div 
                          className="text-2xl font-bold"
                          style={{ color: '#B22222' }}
                        >
                          {service.duration}
                        </div>
                        <div className="text-sm" style={{ color: '#666666' }}>Duration</div>
                      </div>
                      <div>
                        <div 
                          className="text-2xl font-bold"
                          style={{ color: '#B22222' }}
                        >
                          {service.deliverables.split(',')[0]}
                        </div>
                        <div className="text-sm" style={{ color: '#666666' }}>Photos</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      className="flex-1 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all inline-flex items-center justify-center gap-2"
                      style={{ backgroundColor: '#B22222' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookService(service);
                      }}
                    >
                      Book This Package
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                    <button 
                      className="px-6 py-4 border-2 rounded-xl font-semibold hover:text-white transition-all"
                      style={{ 
                        borderColor: '#B22222',
                        color: '#B22222'
                      }}
                      onClick={(e) => e.stopPropagation()}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#B22222'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      View Samples
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Albums Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 left-8 opacity-20 z-0 rotate-12">
          <Image
            src="/img/12873194_7666-removebg-preview.png"
            alt="Decoration"
            width={280}
            height={280}
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-20 right-8 opacity-20 z-0 -rotate-12">
          <Image
            src="/img/62569719_9509225.png"
            alt="Decoration"
            width={310}
            height={310}
            className="object-contain"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#B22222'
              }}
            >
              Our Photography Portfolio
            </h2>
            <p 
              className="text-lg max-w-3xl mx-auto"
              style={{ color: '#666666' }}
            >
              Explore our collection of beautiful moments captured with artistic excellence
            </p>
          </div>

          {data.portfolios && data.portfolios.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.portfolios.map((album: PortfolioAlbum, index: number) => (
              <div 
                key={album.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
                onClick={() => handleAlbumClick(album.id)}
              >
                {/* Album Cover */}
                <div className="relative h-64 overflow-hidden">
                  {album.cover_image && (
                    <Image
                      src={album.cover_image}
                      alt={album.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-semibold" style={{ color: '#B22222' }}>
                        {album.image_count} Photos
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-1">{album.title}</h3>
                    <p className="text-white/80 text-sm">{album.category}</p>
                    {album.subtitle && (
                      <p className="text-white/70 text-xs mt-1">{album.subtitle}</p>
                    )}
                  </div>
                </div>
                
                {/* Album Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>📍 {album.location}</span>
                    <span>📅 {new Date(album.date).toLocaleDateString()}</span>
                  </div>
                  
                  <button 
                    className="w-full text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    style={{ background: 'linear-gradient(to right, #B22222, #DC143C)' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAlbumClick(album.id);
                    }}
                  >
                    View Full Album
                  </button>
                </div>
              </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p 
                className="text-lg"
                style={{ color: '#666666' }}
              >
                No portfolio albums available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-16 left-12 opacity-20 z-0">
          <Image
            src="/img/12873194_7666-removebg-preview.png"
            alt="Decoration"
            width={290}
            height={290}
            className="object-contain rotate-45"
          />
        </div>
        <div className="absolute bottom-16 right-12 opacity-20 z-0">
          <Image
            src="/img/62569719_9509225.png"
            alt="Decoration"
            width={270}
            height={270}
            className="object-contain -rotate-45"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#B22222'
              }}
            >
              What Our Clients Say
            </h2>
            <p 
              className="text-lg max-w-3xl mx-auto"
              style={{ color: '#666666' }}
            >
              Don't just take our word for it - hear from our happy clients about their photography experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(data.testimonials || []).map((testimonial: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i: number) => (
                    <svg key={i} className="w-5 h-5 fill-current text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p 
                  className="mb-6 italic leading-relaxed"
                  style={{ color: '#333333' }}
                >
                  "{testimonial.testimonial_text}"
                </p>
                <div className="flex items-center gap-3">
                  {testimonial.client_image_url && (
                    <Image
                      src={testimonial.client_image_url}
                      alt={testimonial.client_name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h4 
                      className="font-semibold"
                      style={{ color: '#333333' }}
                    >
                      {testimonial.client_name}
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: '#666666' }}
                    >
                      {testimonial.service_type}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 text-white" style={{ background: 'linear-gradient(to bottom right, #B22222, #8B0000, #800000)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#FFFFFF'
              }}
            >
              Why Choose Chabighar?
            </h2>
            <p 
              className="text-lg max-w-3xl mx-auto"
              style={{ color: '#F5F5F5' }}
            >
              We combine technical expertise with artistic vision to create timeless memories that celebrate your heritage and personality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CameraIcon,
                title: 'Professional Equipment',
                description: 'State-of-the-art cameras and lighting equipment for superior quality'
              },
              {
                icon: HeartIcon,
                title: 'Cultural Understanding',
                description: 'Deep appreciation for Bengali traditions and cultural nuances'
              },
              {
                icon: UserGroupIcon,
                title: 'Experienced Team',
                description: 'Skilled photographers with years of experience in diverse photography styles'
              },
              {
                icon: SparklesIcon,
                title: 'Artistic Vision',
                description: 'Creative approach that transforms ordinary moments into extraordinary memories'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ color: '#FFFFFF' }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="leading-relaxed"
                  style={{ color: '#F5F5F5' }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              color: '#B22222'
            }}
          >
            Ready to Create Beautiful Memories?
          </h2>
          <p 
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: '#666666' }}
          >
            Let's discuss your photography needs and create a customized package that perfectly captures your vision and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
              style={{ backgroundColor: '#B22222' }}
              onClick={() => {
                setSelectedService(null);
                setIsModalOpen(true);
              }}
            >
              Get Quote
              <ArrowRightIcon className="w-5 h-5" />
            </button>
            <a
              href={`tel:${headerData?.contact_info?.phone || '+919647966765'}`}
              className="border-2 px-8 py-4 rounded-xl font-semibold hover:text-white transition-colors inline-flex items-center justify-center gap-2"
              style={{ 
                borderColor: '#B22222',
                color: '#B22222'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#B22222';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#B22222';
              }}
            >
              Call Now
              <CameraIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType="photoshoot"
        serviceName={selectedService?.title || ''}
        serviceId={selectedService?.id?.toString() || ''}
        prefilledData={{
          subject: selectedService 
            ? `Inquiry about ${selectedService.title}` 
            : 'Photography Service Inquiry',
          message: selectedService 
            ? `I'm interested in your ${selectedService.title} package. Please provide more details about availability and pricing.`
            : 'I would like to know more about your photography services.'
        }}
      />
    </main>
  );
}