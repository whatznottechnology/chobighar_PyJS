'use client';

import Image from 'next/image';
import { 
  CameraIcon, 
  HeartIcon, 
  StarIcon,
  UserGroupIcon,
  TrophyIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-royal-red via-red-800 to-red-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            About Chabighar
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
            Art Direction and Design Studio capturing life's most precious moments with 
            cultural authenticity and artistic excellence since 2020.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in the heart of Kolkata, Chabighar began as a passion project to preserve 
                and celebrate the rich cultural heritage of Bengal through visual storytelling. 
                What started as a small photography studio has grown into a comprehensive creative 
                agency specializing in weddings, portraits, and cultural events.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our name "Chabighar" reflects our philosophy - we are the keepers of your visual 
                memories, just as keys keep treasures safe. Every photograph we capture is a key 
                to a moment in time, a gateway to emotions and memories that last forever.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-royal-red">500+</div>
                  <div className="text-sm text-gray-600">Happy Couples</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-royal-red">5</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-royal-red">50k+</div>
                  <div className="text-sm text-gray-600">Photos Captured</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&auto=format"
                  alt="Chabighar Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Our Mission & Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe every moment tells a story, and every story deserves to be told beautifully.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-royal-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CameraIcon className="w-8 h-8 text-royal-red" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for perfection in every shot, ensuring each moment is captured with artistic precision.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-royal-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-8 h-8 text-royal-red" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Passion</h3>
              <p className="text-gray-600">
                Our love for photography drives us to create emotional connections through visual storytelling.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-royal-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-8 h-8 text-royal-red" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trust</h3>
              <p className="text-gray-600">
                We build lasting relationships with our clients based on reliability and mutual respect.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-royal-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-royal-red" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality</h3>
              <p className="text-gray-600">
                We deliver high-quality images and services that exceed expectations every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our talented team of photographers and creative professionals are passionate about capturing your special moments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format"
                  alt="Founder"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rajesh Kumar</h3>
              <p className="text-royal-red font-semibold mb-2">Founder & Lead Photographer</p>
              <p className="text-gray-600 text-sm">
                With 8+ years of experience in wedding photography, Rajesh brings artistic vision and technical expertise to every project.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616c31b7a63?w=400&h=400&fit=crop&auto=format"
                  alt="Creative Director"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Priya Sharma</h3>
              <p className="text-royal-red font-semibold mb-2">Creative Director</p>
              <p className="text-gray-600 text-sm">
                Priya oversees the creative direction and ensures every project reflects our brand's artistic standards and client vision.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format"
                  alt="Videographer"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Amit Roy</h3>
              <p className="text-royal-red font-semibold mb-2">Lead Videographer</p>
              <p className="text-gray-600 text-sm">
                Amit specializes in cinematic wedding films and creates beautiful video narratives that complement our photography.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-royal-red via-red-800 to-red-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to Work Together?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your photography needs and create something beautiful together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="bg-white text-royal-red font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get in Touch
            </a>
            <a 
              href="/portfolio"
              className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white hover:text-royal-red"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}