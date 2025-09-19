'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HeartIcon, XMarkIcon, PlayIcon } from '@heroicons/react/24/outline';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  date: string;
  views: string;
  thumbnail: string;
}

// Sample video data
const videos: Video[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Romantic Wedding Highlights',
    description: 'A beautiful cinematic journey of love and celebration captured in stunning detail',
    duration: '3:45',
    category: 'Wedding',
    date: 'December 2024',
    views: '1.2K',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Pre-Wedding Love Story',
    description: 'Capturing the journey before the big day with intimate moments and beautiful locations',
    duration: '2:30',
    category: 'Pre-Wedding',
    date: 'November 2024',
    views: '850',
    thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg'
  },
  {
    id: 'ZZ5LpwO-An4',
    title: 'Wedding Reception Highlights',
    description: 'Dancing, joy, and unforgettable moments from the wedding reception celebration',
    duration: '4:15',
    category: 'Reception',
    date: 'October 2024',
    views: '2.1K',
    thumbnail: 'https://img.youtube.com/vi/ZZ5LpwO-An4/maxresdefault.jpg'
  },
  {
    id: 'ALZHF5UqnU4',
    title: 'Traditional Bengali Wedding',
    description: 'Cultural rituals and sacred moments beautifully captured in traditional style',
    duration: '5:20',
    category: 'Traditional',
    date: 'September 2024',
    views: '950',
    thumbnail: 'https://img.youtube.com/vi/ALZHF5UqnU4/maxresdefault.jpg'
  },
  {
    id: '9bZkp7q19f0',
    title: 'Mehndi Night Celebrations',
    description: 'Colorful traditions and joyful moments from the mehndi ceremony',
    duration: '3:10',
    category: 'Mehndi',
    date: 'August 2024',
    views: '1.5K',
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg'
  },
  {
    id: 'PSH0eRKq1lE',
    title: 'Cinematic Wedding Teaser',
    description: 'A glimpse into the perfect wedding day with cinematic storytelling',
    duration: '1:45',
    category: 'Teaser',
    date: 'July 2024',
    views: '650',
    thumbnail: 'https://img.youtube.com/vi/PSH0eRKq1lE/maxresdefault.jpg'
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Engagement Ceremony',
    description: 'Beautiful moments from the engagement ceremony with family and friends',
    duration: '2:55',
    category: 'Engagement',
    date: 'June 2024',
    views: '780',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Wedding Photography Behind Scenes',
    description: 'Exclusive behind-the-scenes footage of our wedding photography process',
    duration: '4:30',
    category: 'Behind Scenes',
    date: 'May 2024',
    views: '1.8K',
    thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg'
  }
];

const categories = [
  { name: 'All', count: videos.length },
  { name: 'Wedding', count: videos.filter(v => v.category === 'Wedding').length },
  { name: 'Pre-Wedding', count: videos.filter(v => v.category === 'Pre-Wedding').length },
  { name: 'Reception', count: videos.filter(v => v.category === 'Reception').length },
  { name: 'Traditional', count: videos.filter(v => v.category === 'Traditional').length },
  { name: 'Mehndi', count: videos.filter(v => v.category === 'Mehndi').length }
];

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredVideos = selectedCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const openVideoModal = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-royal-red via-red-800 to-red-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PlayIcon className="w-16 h-16 text-red-200 mx-auto mb-6" />
          <h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Wedding Video Gallery
          </h1>
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
            Experience the magic of weddings through our cinematic storytelling. Watch our collection of beautiful wedding moments captured on film.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-royal-red text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-70">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Masonry Layout for Videos */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredVideos.map((video, index) => (
              <div key={`${video.id}-${index}`} className="break-inside-avoid mb-6">
                <div 
                  className="relative overflow-hidden rounded-2xl shadow-lg group bg-white cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1"
                  onClick={() => openVideoModal(video.id)}
                >
                  <div className={`relative ${
                    index % 4 === 0 ? 'aspect-video' : 
                    index % 4 === 1 ? 'aspect-[9/16]' : 
                    index % 4 === 2 ? 'aspect-[4/5]' : 
                    'aspect-[3/4]'
                  } bg-black`}>
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Ripple Effect */}
                        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping group-hover:animate-none"></div>
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse group-hover:animate-none"></div>
                        
                        {/* Play Button */}
                        <div className="relative bg-white/95 backdrop-blur-sm p-5 rounded-full group-hover:bg-royal-red group-hover:text-white transition-all duration-300 shadow-lg">
                          <svg className="w-8 h-8 text-royal-red group-hover:text-white ml-1 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Duration Badge */}
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                      {video.duration}
                    </div>
                    
                    {/* HD Quality Badge */}
                    <div className="absolute top-4 left-4 bg-royal-red text-white text-xs px-2 py-1 rounded font-bold">
                      HD
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 text-xs px-3 py-1 rounded-full font-medium">
                      {video.category}
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-5 bg-white">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-royal-red transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span>HD Quality</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
                        </svg>
                        <span>{video.views} views</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{video.date}</span>
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <PlayIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No videos found</h3>
              <p className="text-gray-400">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full max-w-6xl max-h-[80vh] mx-4">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Video Player */}
            <div className="relative w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                className="w-full h-full rounded-xl"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
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
            Ready to Create Your Own Wedding Film?
          </h2>
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
            Let's capture your special moments and create a beautiful cinematic story that will last a lifetime. Get in touch with us to discuss your videography needs.
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