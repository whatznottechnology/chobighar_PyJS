'use client';

import Image from 'next/image';
import { useShowcaseImages } from '../hooks/useHomepageData';

export default function PhotoShowcase() {
  const { images, loading, error } = useShowcaseImages();

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading showcase images...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !images || images.length === 0) {
    return null; // Don't show anything if there's an error or no images
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Photography
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Capturing moments that tell your unique story with traditional Bengali artistry and modern techniques.
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : 
                index % 3 === 0 ? 'lg:row-span-2' : ''
              }`}
              style={{
                height: index % 5 === 0 ? '400px' : index % 3 === 0 ? '320px' : '250px'
              }}
            >
              {image.image_url && (
                <Image
                  src={image.image_url}
                  alt={image.alt_text}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={
                    index % 5 === 0 
                      ? "(min-width: 768px) 50vw, 100vw"
                      : "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  }
                />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <p className="text-white text-sm font-medium">
                      {image.alt_text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}