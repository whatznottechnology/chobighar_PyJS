'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  CameraIcon, 
  HeartIcon, 
  StarIcon, 
  CheckIcon,
  PlayIcon,
  ArrowRightIcon,
  UserGroupIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function Photoshoot() {
  const [activeTab, setActiveTab] = useState('portfolio');

  const services = [
    {
      title: 'Bengali Traditional Wedding Photography',
      description: 'Comprehensive documentation of Bengali wedding rituals with artistic storytelling. From Gaye Holud to Bou Bhaat, we capture every sacred moment with cultural authenticity.',
      image: 'https://images.unsplash.com/photo-1583393762809-2bdf4478e2e6?w=600&h=400&fit=crop&auto=format',
      features: [
        'Complete ritual coverage (Ashirbaad, Shubho Drishti, Saat Paak)',
        '500+ high-resolution edited photos',
        'Traditional Bengali album with custom design',
        'Candid & posed photography blend',
        'Family portraits & group photos',
        'Digital gallery with download access'
      ],
      inclusions: ['2 Professional Photographers', 'Full Day Coverage (10-12 hrs)', 'Same Day Highlights', 'USB Drive'],
      price: 'Starting from ₹45,000',
      duration: '10-12 Hours',
      deliverables: '500+ Photos, Custom Album, Digital Gallery'
    },
    {
      title: 'Pre-Wedding Cinematic Storytelling',
      description: 'Romantic pre-wedding sessions that narrate your love story through stunning visuals. Multiple locations, outfit changes, and creative concepts tailored to your personality.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop&auto=format',
      features: [
        'Concept development & location scouting',
        '3-4 outfit changes with styling consultation',
        'Outdoor & studio combination shots',
        'Cinematic video highlights (2-3 minutes)',
        'Professional makeup artist coordination',
        'Golden hour & blue hour photography'
      ],
      inclusions: ['Pre-shoot Consultation', 'Multiple Locations', 'Styling Guide', 'Quick Preview'],
      price: 'Starting from ₹25,000',
      duration: '6-8 Hours',
      deliverables: '200+ Photos, Cinematic Video, Online Gallery'
    },
    {
      title: 'Professional Portrait & Headshot Studio',
      description: 'Studio-quality portraits for professionals, families, and personal branding. Corporate headshots, LinkedIn profiles, and artistic portraits with professional lighting setup.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format',
      features: [
        'Professional studio lighting setup',
        'Multiple background options',
        'Wardrobe consultation & styling',
        'High-end retouching & color correction',
        'LinkedIn-optimized headshots',
        'Print-ready high-resolution files'
      ],
      inclusions: ['Studio Session', 'Lighting Setup', 'Basic Retouching', 'Digital Files'],
      price: 'Starting from ₹12,000',
      duration: '2-3 Hours',
      deliverables: '50+ Photos, Retouched Images, Print Files'
    },
    {
      title: 'Cultural Events & Celebrations',
      description: 'Specialized photography for Bengali cultural events, pujas, anniversaries, and family celebrations. We understand the significance of each ritual and moment.',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop&auto=format',
      features: [
        'Cultural event expertise (Durga Puja, Kali Puja, etc.)',
        'Candid family moments & interactions',
        'Ritual documentation with respect',
        'Group photography coordination',
        'Traditional decoration coverage',
        'Fast delivery for social sharing'
      ],
      inclusions: ['Event Coverage', 'Family Portraits', 'Ritual Documentation', 'Quick Edits'],
      price: 'Starting from ₹18,000',
      duration: '4-8 Hours',
      deliverables: '300+ Photos, Event Album, Social Media Pack'
    },
    {
      title: 'Fashion & Lifestyle Photography',
      description: 'Creative fashion shoots for models, influencers, and brands. Portfolio development, product photography, and lifestyle content creation with professional styling.',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop&auto=format',
      features: [
        'Creative concept development',
        'Professional styling consultation',
        'Studio & outdoor location shoots',
        'High-fashion retouching',
        'Portfolio-ready images',
        'Commercial usage rights'
      ],
      inclusions: ['Creative Direction', 'Professional Styling', 'Multiple Looks', 'High-End Retouching'],
      price: 'Starting from ₹22,000',
      duration: '4-6 Hours',
      deliverables: '100+ Photos, Portfolio Set, Usage Rights'
    },
    {
      title: 'Corporate & Business Photography',
      description: 'Professional business photography including team photos, office spaces, corporate events, and executive portraits. Brand-consistent imagery for your business needs.',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&auto=format',
      features: [
        'Executive headshots & team photography',
        'Office environment & workspace shots',
        'Corporate event documentation',
        'Brand-consistent editing style',
        'Professional LinkedIn profiles',
        'Marketing material ready images'
      ],
      inclusions: ['Team Coordination', 'Multiple Setups', 'Professional Editing', 'Brand Guidelines'],
      price: 'Starting from ₹15,000',
      duration: '3-5 Hours',
      deliverables: '150+ Photos, Team Gallery, Marketing Assets'
    }
  ];

  const portfolioAlbums = [
    {
      title: 'Bengali Wedding Collection',
      description: 'Traditional Bengali wedding ceremonies captured with cultural authenticity',
      coverImage: 'https://images.unsplash.com/photo-1583393762809-2bdf4478e2e6?w=500&h=600&fit=crop&auto=format',
      images: [
        'https://images.unsplash.com/photo-1583393762809-2bdf4478e2e6?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop&auto=format'
      ],
      count: '25 Photos',
      category: 'Wedding'
    },
    {
      title: 'Pre-Wedding Stories',
      description: 'Romantic love stories told through cinematic photography',
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=600&fit=crop&auto=format',
      images: [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1521499892833-773a6c6ad75e?w=400&h=300&fit=crop&auto=format'
      ],
      count: '18 Photos',
      category: 'Pre-Wedding'
    },
    {
      title: 'Portrait Masterpieces',
      description: 'Professional portraits showcasing personality and elegance',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&auto=format',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1494790108755-2616c31b7a63?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=400&h=300&fit=crop&auto=format'
      ],
      count: '15 Photos',
      category: 'Portrait'
    },
    {
      title: 'Cultural Celebrations',
      description: 'Bengali festivals and cultural events captured with reverence',
      coverImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=600&fit=crop&auto=format',
      images: [
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop&auto=format'
      ],
      count: '22 Photos',
      category: 'Events'
    },
    {
      title: 'Fashion & Lifestyle',
      description: 'Creative fashion photography with modern artistic vision',
      coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=600&fit=crop&auto=format',
      images: [
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=300&fit=crop&auto=format'
      ],
      count: '20 Photos',
      category: 'Fashion'
    },
    {
      title: 'Corporate Excellence',
      description: 'Professional business photography for modern enterprises',
      coverImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=600&fit=crop&auto=format',
      images: [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop&auto=format'
      ],
      count: '12 Photos',
      category: 'Corporate'
    }
  ];

  const testimonials = [
    {
      name: 'Priya & Arjun',
      service: 'Wedding Photography',
      rating: 5,
      comment: 'Absolutely magical! They captured our Bengali wedding traditions beautifully. Every moment was preserved with such artistic excellence.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c31b7a63?w=60&h=60&fit=crop&auto=format'
    },
    {
      name: 'Sneha Sharma',
      service: 'Portrait Session',
      rating: 5,
      comment: 'Professional and creative team. The portrait session exceeded my expectations. Highly recommend for anyone looking for quality photography.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format'
    },
    {
      name: 'Rahul & Kavya',
      service: 'Pre-Wedding Shoot',
      rating: 5,
      comment: 'They made us feel so comfortable during our pre-wedding shoot. The creative locations and poses resulted in stunning photographs.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&auto=format"
            alt="Wedding Photography"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Photography That Tells Your Story
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Professional photography services with a touch of Bengali heritage and modern artistry
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-royal-red text-white px-8 py-4 rounded-xl font-semibold hover:bg-royal-red-hover transition-colors inline-flex items-center justify-center gap-2 shadow-lg">
              <CameraIcon className="w-5 h-5" />
              Book a Session
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-royal-red transition-colors inline-flex items-center justify-center gap-2">
              <PlayIcon className="w-5 h-5" />
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold text-royal-red mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Our Photography Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From intimate portraits to grand celebrations, we specialize in capturing life's most precious moments with artistic excellence and cultural authenticity.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <div className="relative h-80">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 mb-4 inline-block">
                      <span className="text-royal-red font-bold text-lg">{service.price}</span>
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
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {service.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckIcon className="w-5 h-5 text-green-500" />
                        What's Included
                      </h4>
                      <ul className="space-y-2">
                        {service.inclusions.map((inclusion, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-royal-red rounded-full mt-2 flex-shrink-0"></div>
                            {inclusion}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CameraIcon className="w-5 h-5 text-royal-red" />
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {service.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-royal-red">{service.duration}</div>
                        <div className="text-sm text-gray-500">Duration</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-royal-red">{service.deliverables.split(',')[0]}</div>
                        <div className="text-sm text-gray-500">Photos</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 bg-royal-red text-white py-4 rounded-xl font-semibold hover:bg-royal-red-hover transition-colors inline-flex items-center justify-center gap-2">
                      Book This Package
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                    <button className="px-6 py-4 border-2 border-royal-red text-royal-red rounded-xl font-semibold hover:bg-royal-red hover:text-white transition-colors">
                      View Samples
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio & Testimonials Tabs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold text-royal-red mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Our Work & Reviews
            </h2>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-xl p-1 flex">
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === 'portfolio' 
                      ? 'bg-royal-red text-white shadow-md' 
                      : 'text-gray-600 hover:text-royal-red'
                  }`}
                >
                  Portfolio
                </button>
                <button
                  onClick={() => setActiveTab('testimonials')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === 'testimonials' 
                      ? 'bg-royal-red text-white shadow-md' 
                      : 'text-gray-600 hover:text-royal-red'
                  }`}
                >
                  Testimonials
                </button>
              </div>
            </div>
          </div>

          {/* Portfolio Tab Content */}
          {activeTab === 'portfolio' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioAlbums.map((album, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                  {/* Album Cover */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={album.coverImage}
                      alt={album.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-royal-red px-3 py-1 rounded-full text-sm font-semibold">
                        {album.count}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-royal-red/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                        {album.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {album.title}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2">
                        {album.description}
                      </p>
                    </div>
                  </div>

                  {/* Album Preview Grid */}
                  <div className="p-4">
                    <div className="grid grid-cols-4 gap-1 mb-4">
                      {album.images.map((image, imgIndex) => (
                        <div key={imgIndex} className="relative aspect-square rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`${album.title} ${imgIndex + 1}`}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-200"
                          />
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full bg-royal-red text-white py-3 rounded-xl font-semibold hover:bg-royal-red-hover transition-colors inline-flex items-center justify-center gap-2 group">
                      View Full Album
                      <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Testimonials Tab Content */}
          {activeTab === 'testimonials' && (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-royal-red via-red-800 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Why Choose Chabighar?
            </h2>
            <p className="text-lg text-red-100 max-w-3xl mx-auto">
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
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-red-100 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold text-royal-red mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to Create Beautiful Memories?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss your photography needs and create a customized package that perfectly captures your vision and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-royal-red text-white px-8 py-4 rounded-xl font-semibold hover:bg-royal-red-hover transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
            >
              Get Quote
              <ArrowRightIcon className="w-5 h-5" />
            </a>
            <a
              href="tel:+919647966765"
              className="border-2 border-royal-red text-royal-red px-8 py-4 rounded-xl font-semibold hover:bg-royal-red hover:text-white transition-colors inline-flex items-center justify-center gap-2"
            >
              Call Now
              <CameraIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
