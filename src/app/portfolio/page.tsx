'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  PhotoIcon, 
  HeartIcon, 
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentAlbum, setCurrentAlbum] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Back to top visibility handler
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
                  <a
                    href={`/portfolio/${album.id}`}
                    className="block w-full mt-4 bg-royal-red hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg text-center"
                  >
                    View Portfolio Details
                  </a>
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

      {/* Featured Videos Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Featured Wedding Videos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the magic through our cinematic wedding highlights and emotional moments captured on film.
            </p>
          </div>

          {/* Masonry Layout for Videos */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {/* Video 1 */}
            <div className="break-inside-avoid mb-6">
              <div className="relative overflow-hidden rounded-xl shadow-lg group bg-black">
                <div className="relative aspect-video">
                  <Image
                    src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
                    alt="Wedding Highlight Video"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Romantic Wedding Highlights</h3>
                  <p className="text-gray-600 text-sm mb-3">A beautiful cinematic journey of love and celebration</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>December 2024</span>
                    <span>3:45 mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video 2 */}
            <div className="break-inside-avoid mb-6">
              <div className="relative overflow-hidden rounded-xl shadow-lg group bg-black">
                <div className="relative aspect-[9/16]">
                  <Image
                    src="https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg"
                    alt="Pre-Wedding Story"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Pre-Wedding Love Story</h3>
                  <p className="text-gray-600 text-sm mb-3">Capturing the journey before the big day</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>November 2024</span>
                    <span>2:30 mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video 3 */}
            <div className="break-inside-avoid mb-6">
              <div className="relative overflow-hidden rounded-xl shadow-lg group bg-black">
                <div className="relative aspect-video">
                  <Image
                    src="https://img.youtube.com/vi/ZZ5LpwO-An4/maxresdefault.jpg"
                    alt="Wedding Reception"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Wedding Reception Highlights</h3>
                  <p className="text-gray-600 text-sm mb-3">Dancing, joy, and unforgettable moments</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>October 2024</span>
                    <span>4:15 mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video 4 */}
            <div className="break-inside-avoid mb-6">
              <div className="relative overflow-hidden rounded-xl shadow-lg group bg-black">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="https://img.youtube.com/vi/ALZHF5UqnU4/maxresdefault.jpg"
                    alt="Traditional Ceremony"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Traditional Bengali Wedding</h3>
                  <p className="text-gray-600 text-sm mb-3">Cultural rituals and sacred moments</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>September 2024</span>
                    <span>5:20 mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video 5 */}
            <div className="break-inside-avoid mb-6">
              <div className="relative overflow-hidden rounded-xl shadow-lg group bg-black">
                <div className="relative aspect-video">
                  <Image
                    src="https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg"
                    alt="Mehndi Ceremony"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Mehndi Night Celebrations</h3>
                  <p className="text-gray-600 text-sm mb-3">Colorful traditions and joyful moments</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>August 2024</span>
                    <span>3:10 mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video 6 */}
            <div className="break-inside-avoid mb-6">
              <div className="relative overflow-hidden rounded-xl shadow-lg group bg-black">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="https://img.youtube.com/vi/PSH0eRKq1lE/maxresdefault.jpg"
                    alt="Wedding Teaser"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Cinematic Wedding Teaser</h3>
                  <p className="text-gray-600 text-sm mb-3">A glimpse into the perfect wedding day</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>July 2024</span>
                    <span>1:45 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View All Videos Button */}
          <div className="text-center mt-12">
            <a
              href="/portfolio/videos"
              className="bg-royal-red hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              View All Wedding Videos
            </a>
          </div>
        </div>
      </section>

      {/* Individual Photos Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Individual Photos Gallery
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our collection of stunning individual photographs captured across various events and occasions.
            </p>
          </div>

          {/* Masonry Layout for Individual Photos */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {/* First Column Photos */}
            <div className="break-inside-avoid mb-4">
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=600&fit=crop&crop=center"
                  alt="Elegant Wedding Portrait"
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">Wedding Ceremony</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="break-inside-avoid mb-4">
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&crop=center"
                  alt="Romantic Pre-Wedding"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">Pre-Wedding Shoot</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="break-inside-avoid mb-4">
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=700&fit=crop&crop=center"
                  alt="Stunning Bridal Portrait"
                  width={400}
                  height={700}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">Bridal Portrait</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="break-inside-avoid mb-4">
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=450&fit=crop&crop=center"
                  alt="Handsome Groom"
                  width={400}
                  height={450}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">Groom Portrait</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="break-inside-avoid mb-4">
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=320&fit=crop&crop=center"
                  alt="Beautiful Mehndi Art"
                  width={400}
                  height={320}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">Mehndi Celebration</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="break-inside-avoid mb-4">
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=650&fit=crop&crop=center"
                  alt="Professional Bridal Makeup"
                  width={400}
                  height={650}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">Bridal Makeup</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="break-inside-avoid mb-4">
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=380&fit=crop&crop=center"
                  alt="Exquisite Bridal Jewellery"
                  width={400}
                  height={380}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">Bridal Jewellery</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="break-inside-avoid mb-4">
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&h=580&fit=crop&crop=center"
                  alt="Intimate Pre-Wedding Moments"
                  width={400}
                  height={580}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">Pre-Wedding Moments</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="break-inside-avoid mb-4">
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=280&fit=crop&crop=center"
                  alt="Professional Photography Session"
                  width={400}
                  height={280}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">Behind the Scenes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="break-inside-avoid mb-4">
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=720&fit=crop&crop=center"
                  alt="Stunning Wedding Venue"
                  width={400}
                  height={720}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">Venue Details</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="break-inside-avoid mb-4">
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=350&fit=crop&crop=center"
                  alt="Delicious Wedding Cuisine"
                  width={400}
                  height={350}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">Culinary Delights</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="break-inside-avoid mb-4">
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=550&fit=crop&crop=center"
                  alt="Live Wedding Music"
                  width={400}
                  height={550}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">Musical Celebrations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-royal-red hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg inline-flex items-center gap-2 hover:scale-105 transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Load More Photos
            </button>
          </div>
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
              className="absolute left-4 z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full text-yellow-400 hover:bg-white/20 hover:text-yellow-300 active:bg-black active:text-white transition-colors"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 z-10 bg-white/10 backdrop-blur-sm p-3 rounded-full text-yellow-400 hover:bg-white/20 hover:text-yellow-300 active:bg-black active:text-white transition-colors"
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

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-royal-red hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 transform"
          aria-label="Back to top"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </main>
  );
}
