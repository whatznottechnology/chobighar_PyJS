'use client';

import Image from 'next/image';
import { useState } from 'react';
import { HeartIcon, ShareIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  likes: number;
  views: string;
  photographer: string;
  aspect: 'portrait' | 'landscape' | 'square';
  featured: boolean;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop',
    alt: 'Traditional Wedding Ceremony',
    category: 'Wedding',
    likes: 156,
    views: '2.3K',
    photographer: 'Arjun Photography',
    aspect: 'portrait',
    featured: true
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop',
    alt: 'Bridal Portrait',
    category: 'Portrait',
    likes: 234,
    views: '4.1K',
    photographer: 'Priya Lens',
    aspect: 'landscape',
    featured: false
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1594736797933-d0b8c3ba4389?w=600&h=900&fit=crop',
    alt: 'Mehendi Celebration',
    category: 'Ceremony',
    likes: 89,
    views: '1.8K',
    photographer: 'Ravi Studios',
    aspect: 'portrait',
    featured: false
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=600&fit=crop',
    alt: 'Wedding Rings Detail',
    category: 'Details',
    likes: 178,
    views: '3.2K',
    photographer: 'Detail Masters',
    aspect: 'square',
    featured: true
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1000&fit=crop',
    alt: 'Couple Pre-Wedding',
    category: 'Pre-Wedding',
    likes: 312,
    views: '5.7K',
    photographer: 'Love Stories',
    aspect: 'portrait',
    featured: true
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=700&h=500&fit=crop',
    alt: 'Wedding Venue Decoration',
    category: 'Venue',
    likes: 145,
    views: '2.9K',
    photographer: 'Venue Visions',
    aspect: 'landscape',
    featured: false
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&h=800&fit=crop',
    alt: 'Bridal Jewelry',
    category: 'Details',
    likes: 203,
    views: '3.8K',
    photographer: 'Golden Frames',
    aspect: 'portrait',
    featured: false
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
    alt: 'Wedding Reception',
    category: 'Reception',
    likes: 267,
    views: '4.5K',
    photographer: 'Night Captures',
    aspect: 'landscape',
    featured: true
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?w=600&h=900&fit=crop',
    alt: 'Groom Portrait',
    category: 'Portrait',
    likes: 134,
    views: '2.1K',
    photographer: 'Gentleman Shots',
    aspect: 'portrait',
    featured: false
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=700&h=700&fit=crop',
    alt: 'Wedding Cake',
    category: 'Details',
    likes: 98,
    views: '1.6K',
    photographer: 'Sweet Moments',
    aspect: 'square',
    featured: false
  }
];

const categories = ['All', 'Wedding', 'Portrait', 'Pre-Wedding', 'Ceremony', 'Details', 'Venue', 'Reception'];

export default function MasonryGallery() {
  const [likedImages, setLikedImages] = useState<number[]>([]);

  // Show all images without filtering for seamless integration
  const filteredImages = galleryImages;

  const toggleLike = (imageId: number) => {
    setLikedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const getAspectClass = (aspect: string) => {
    switch (aspect) {
      case 'portrait': return 'aspect-[3/4]';
      case 'landscape': return 'aspect-[4/3]';
      case 'square': return 'aspect-square';
      default: return 'aspect-[3/4]';
    }
  };

  return (
    <div className="mt-16">
      {/* Masonry Gallery Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {filteredImages.map((image) => (
          <div 
            key={image.id} 
            className="break-inside-avoid group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
          >
            {/* Featured Badge */}
            {image.featured && (
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-gradient-to-r from-gold to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  FEATURED
                </span>
              </div>
            )}

            {/* Image Container */}
            <div className={`relative overflow-hidden ${getAspectClass(image.aspect)}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Interaction Buttons */}
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
                <button
                  onClick={() => toggleLike(image.id)}
                  className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  {likedImages.includes(image.id) ? (
                    <HeartSolidIcon className="w-4 h-4 text-red-500" />
                  ) : (
                    <HeartIcon className="w-4 h-4 text-white" />
                  )}
                </button>
                <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all duration-300">
                  <ShareIcon className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Bottom Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <div className="text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-royal-red/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                      {image.category}
                    </span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <EyeIcon className="w-3 h-3" />
                        {image.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <HeartIcon className="w-3 h-3" />
                        {image.likes + (likedImages.includes(image.id) ? 1 : 0)}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{image.alt}</h3>
                  <p className="text-xs text-gray-300">by {image.photographer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}