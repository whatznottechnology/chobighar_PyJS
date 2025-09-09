'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  PhotoIcon, 
  HeartIcon, 
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentAlbum, setCurrentAlbum] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Work', count: 45 },
    { id: 'wedding', name: 'Weddings', count: 18 },
    { id: 'prewedding', name: 'Pre-Wedding', count: 12 },
    { id: 'portrait', name: 'Portraits', count: 8 },
    { id: 'event', name: 'Events', count: 7 }
  ];

  const albums = [
    {
      id: 'priya-arjun-wedding',
      title: 'Priya & Arjun Wedding',
      subtitle: 'Traditional Bengali Wedding',
      category: 'wedding',
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&auto=format',
      imageCount: 85,
      date: 'December 2024',
      location: 'Kolkata',
      description: 'A beautiful traditional Bengali wedding celebration filled with rituals, colors, and joy.',
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop&auto=format'
      ]
    },
    {
      id: 'sneha-rahul-prewedding',
      title: 'Sneha & Rahul',
      subtitle: 'Pre-Wedding Shoot',
      category: 'prewedding',
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop&auto=format',
      imageCount: 45,
      date: 'November 2024',
      location: 'Darjeeling',
      description: 'Romantic pre-wedding session in the beautiful hills of Darjeeling.',
      images: [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&h=600&fit=crop&auto=format'
      ]
    },
    {
      id: 'kavya-portrait',
      title: 'Kavya Portrait Session',
      subtitle: 'Individual Portraits',
      category: 'portrait',
      coverImage: 'https://images.unsplash.com/photo-1494790108755-2616c31b7a63?w=600&h=400&fit=crop&auto=format',
      imageCount: 25,
      date: 'October 2024',
      location: 'Studio',
      description: 'Professional portrait session showcasing elegance and personality.',
      images: [
        'https://images.unsplash.com/photo-1494790108755-2616c31b7a63?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop&auto=format'
      ]
    },
    {
      id: 'corporate-event',
      title: 'Corporate Annual Meet',
      subtitle: 'Event Photography',
      category: 'event',
      coverImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop&auto=format',
      imageCount: 60,
      date: 'September 2024',
      location: 'Kolkata',
      description: 'Professional coverage of corporate annual meeting and celebrations.',
      images: [
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format'
      ]
    },
    {
      id: 'ananya-wedding',
      title: 'Ananya & Dev Wedding',
      subtitle: 'Destination Wedding',
      category: 'wedding',
      coverImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&h=400&fit=crop&auto=format',
      imageCount: 120,
      date: 'January 2025',
      location: 'Goa',
      description: 'Beautiful destination wedding by the beach with Bengali traditions.',
      images: [
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop&auto=format'
      ]
    },
    {
      id: 'family-portrait',
      title: 'The Sharma Family',
      subtitle: 'Family Portraits',
      category: 'portrait',
      coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop&auto=format',
      imageCount: 30,
      date: 'August 2024',
      location: 'Park',
      description: 'Warm and loving family portrait session in natural outdoor setting.',
      images: [
        'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=600&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop&auto=format'
      ]
    }
  ];

  const filteredAlbums = selectedCategory === 'all' 
    ? albums 
    : albums.filter(album => album.category === selectedCategory);

  const openLightbox = (albumId: string, imageIndex: number) => {
    setCurrentAlbum(albumId);
    setSelectedImage(imageIndex);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentAlbum(null);
  };

  const nextImage = () => {
    if (currentAlbum && selectedImage !== null) {
      const album = albums.find(a => a.id === currentAlbum);
      if (album) {
        setSelectedImage((selectedImage + 1) % album.images.length);
      }
    }
  };

  const prevImage = () => {
    if (currentAlbum && selectedImage !== null) {
      const album = albums.find(a => a.id === currentAlbum);
      if (album) {
        setSelectedImage(selectedImage === 0 ? album.images.length - 1 : selectedImage - 1);
      }
    }
  };

  const currentAlbumData = currentAlbum ? albums.find(a => a.id === currentAlbum) : null;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 
              className="text-4xl md:text-6xl font-bold text-royal-red mb-6 tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Our Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our collection of beautiful moments captured through the lens. Each album tells a unique story of love, celebration, and life's precious memories.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-royal-red text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-royal-red'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-70">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Albums Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map((album) => (
              <div key={album.id} className="group">
                {/* Album Cover */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg mb-4 aspect-[4/3]">
                  <Image
                    src={album.coverImage}
                    alt={album.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                            {album.imageCount} Photos
                          </span>
                        </div>
                        <button
                          onClick={() => openLightbox(album.id, 0)}
                          className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          <MagnifyingGlassIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Album Info */}
                <div className="space-y-3">
                  <div>
                    <h3 
                      className="text-xl font-bold text-gray-900 group-hover:text-royal-red transition-colors"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {album.title}
                    </h3>
                    <p className="text-royal-red font-medium text-sm">{album.subtitle}</p>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {album.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{album.date}</span>
                    <span>{album.location}</span>
                  </div>

                  {/* Photo Preview Grid */}
                  <div className="grid grid-cols-4 gap-1 mt-4">
                    {album.images.slice(0, 4).map((image, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group/img"
                        onClick={() => openLightbox(album.id, idx)}
                      >
                        <Image
                          src={image}
                          alt={`${album.title} ${idx + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover/img:scale-110"
                          sizes="(max-width: 768px) 25vw, (max-width: 1200px) 16vw, 12vw"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200"></div>
                      </div>
                    ))}
                  </div>

                  {/* View Album Button */}
                  <button
                    onClick={() => openLightbox(album.id, 0)}
                    className="w-full mt-4 bg-gray-100 hover:bg-royal-red hover:text-white text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg"
                  >
                    View Full Album
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredAlbums.length === 0 && (
            <div className="text-center py-16">
              <PhotoIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No albums found</h3>
              <p className="text-gray-400">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && currentAlbumData && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="relative max-w-5xl max-h-[80vh] w-full mx-4">
              <Image
                src={currentAlbumData.images[selectedImage]}
                alt={`${currentAlbumData.title} ${selectedImage + 1}`}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
                <h3 className="text-white font-semibold text-lg">{currentAlbumData.title}</h3>
                <p className="text-white/80 text-sm">
                  {selectedImage + 1} of {currentAlbumData.images.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-royal-red via-red-800 to-red-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HeartIcon className="w-16 h-16 text-red-200 mx-auto mb-6" />
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to Create Your Own Album?
          </h2>
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
            Let's capture your special moments and create beautiful memories that will last a lifetime. Get in touch with us to discuss your photography needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-royal-red px-8 py-4 rounded-xl font-semibold hover:bg-red-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
            >
              Book a Session
            </a>
            <a
              href="/photoshoot"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-royal-red transition-colors inline-flex items-center justify-center gap-2"
            >
              View Services
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
