'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface VideoTestimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  videoUrl: string;
  rating: number;
  event: string;
  date: string;
  thumbnail: string;
}

interface TextTestimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
  event: string;
  date: string;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: 1,
    name: 'Dr. Rahman Ahmed',
    location: 'Kolkata',
    image: '/img/1.jpg',
    videoUrl: '/videos/testimonial-1.mp4',
    rating: 5,
    event: 'Wedding Photography',
    date: 'December 2024',
    thumbnail: '/img/1.jpg'
  },
  {
    id: 2,
    name: 'Nasir Uddin',
    location: 'Delhi',
    image: '/img/2.jpg',
    videoUrl: '/videos/testimonial-2.mp4',
    rating: 5,
    event: 'Pre-Wedding Shoot',
    date: 'November 2024',
    thumbnail: '/img/2.jpg'
  },
  {
    id: 3,
    name: 'Mrs. Fatima Begum',
    location: 'Mumbai',
    image: '/img/venues.jpg',
    videoUrl: '/videos/testimonial-3.mp4',
    rating: 5,
    event: 'Wedding & Reception',
    date: 'October 2024',
    thumbnail: '/img/venues.jpg'
  },
  {
    id: 4,
    name: 'Mohammad Karim',
    location: 'Pune',
    image: '/img/photographers.jpg',
    videoUrl: '/videos/testimonial-4.mp4',
    rating: 5,
    event: 'Traditional Wedding',
    date: 'September 2024',
    thumbnail: '/img/photographers.jpg'
  },
  {
    id: 5,
    name: 'Ayesha & Farhan',
    location: 'Kolkata',
    image: '/img/prewedding.jpg',
    videoUrl: '/videos/testimonial-5.mp4',
    rating: 5,
    event: 'Complete Wedding Package',
    date: 'August 2024',
    thumbnail: '/img/prewedding.jpg'
  },
  {
    id: 6,
    name: 'Sadia & Imran',
    location: 'Hyderabad',
    image: '/img/bridalwear.jpg',
    videoUrl: '/videos/testimonial-6.mp4',
    rating: 5,
    event: 'Destination Wedding',
    date: 'July 2024',
    thumbnail: '/img/bridalwear.jpg'
  },
  {
    id: 7,
    name: 'Rahul & Priya',
    location: 'Chennai',
    image: '/img/makeup.jpg',
    videoUrl: '/videos/testimonial-7.mp4',
    rating: 5,
    event: 'Engagement Ceremony',
    date: 'June 2024',
    thumbnail: '/img/makeup.jpg'
  },
  {
    id: 8,
    name: 'Amit & Kavya',
    location: 'Bangalore',
    image: '/img/jewellery.jpg',
    videoUrl: '/videos/testimonial-8.mp4',
    rating: 5,
    event: 'Reception Party',
    date: 'May 2024',
    thumbnail: '/img/jewellery.jpg'
  }
];

const textTestimonials: TextTestimonial[] = [
  {
    id: 1,
    name: 'Priya & Arjun Sharma',
    location: 'Kolkata',
    image: '/img/1.jpg',
    rating: 5,
    text: 'Chabighar captured our wedding day with such artistry and emotion. Every photo tells our love story beautifully. Their attention to detail and professional approach made our special day even more memorable.',
    event: 'Wedding Photography',
    date: 'December 2024'
  },
  {
    id: 2,
    name: 'Sneha & Rohit Gupta',
    location: 'Delhi',
    image: '/img/2.jpg',
    rating: 5,
    text: 'Outstanding pre-wedding shoot experience! The team made us feel so comfortable and natural. The photos exceeded our expectations and perfectly captured our personalities and love for each other.',
    event: 'Pre-Wedding Shoot',
    date: 'November 2024'
  },
  {
    id: 3,
    name: 'Ananya & Vikash Roy',
    location: 'Mumbai',
    image: '/img/prewedding.jpg',
    rating: 5,
    text: 'Professional, creative, and absolutely wonderful to work with. They captured not just moments but emotions. Our families were so impressed with the quality and creativity of the photographs.',
    event: 'Wedding & Reception',
    date: 'October 2024'
  },
  {
    id: 4,
    name: 'Ritu & Sameer Jain',
    location: 'Pune',
    image: '/img/bridalwear.jpg',
    rating: 5,
    text: 'The team at Chabighar is simply amazing! They were patient, professional, and captured every special moment of our mehendi and wedding ceremonies. Highly recommended for any special occasion.',
    event: 'Traditional Wedding',
    date: 'September 2024'
  },
  {
    id: 5,
    name: 'Deepika & Rahul Singh',
    location: 'Kolkata',
    image: '/img/venues.jpg',
    rating: 5,
    text: 'From engagement to wedding, Chabighar has been our photography partner throughout. Their consistency, quality, and dedication to perfection is unmatched. Thank you for preserving our memories so beautifully.',
    event: 'Complete Wedding Package',
    date: 'August 2024'
  },
  {
    id: 6,
    name: 'Kavita & Abhishek Das',
    location: 'Hyderabad',
    image: '/img/jewellery.jpg',
    rating: 5,
    text: 'Incredible experience from start to finish! The photographers understood our vision perfectly and delivered beyond expectations. The candid shots and traditional portraits are absolutely stunning.',
    event: 'Destination Wedding',
    date: 'July 2024'
  },
  {
    id: 7,
    name: 'Meera & Karan Saxena',
    location: 'Jaipur',
    image: '/img/makeup.jpg',
    rating: 5,
    text: 'We chose Chabighar for our royal Rajasthani wedding and they delivered magnificently. Every shot captured the grandeur and tradition beautifully. The team was incredibly professional and creative.',
    event: 'Royal Wedding',
    date: 'June 2024'
  },
  {
    id: 8,
    name: 'Sonia & Raj Mehta',
    location: 'Ahmedabad',
    image: '/img/planning.jpg',
    rating: 5,
    text: 'Amazing work by Chabighar! They made our engagement ceremony so memorable with their artistic photography. The attention to detail and the way they captured emotions is simply outstanding.',
    event: 'Engagement Ceremony',
    date: 'May 2024'
  },
  {
    id: 9,
    name: 'Divya & Arun Patel',
    location: 'Surat',
    image: '/img/venues.jpg',
    rating: 5,
    text: 'Perfect choice for our wedding photography! The team was punctual, professional, and incredibly talented. They captured all the precious moments that we will cherish forever.',
    event: 'Gujarati Wedding',
    date: 'April 2024'
  },
  {
    id: 10,
    name: 'Neha & Vikram Reddy',
    location: 'Bangalore',
    image: '/img/photographers.jpg',
    rating: 5,
    text: 'Exceptional service and breathtaking photography! Chabighar exceeded all our expectations. The pre-wedding and wedding shots are like pieces of art. Highly recommend to every couple.',
    event: 'South Indian Wedding',
    date: 'March 2024'
  },
  {
    id: 11,
    name: 'Pooja & Manish Kumar',
    location: 'Lucknow',
    image: '/img/bridalwear.jpg',
    rating: 5,
    text: 'Beautiful memories captured beautifully! The team understood our traditional values and modern preferences perfectly. Every photograph tells a story and brings back wonderful memories.',
    event: 'Traditional Ceremony',
    date: 'February 2024'
  },
  {
    id: 12,
    name: 'Asha & Sunil Agarwal',
    location: 'Indore',
    image: '/img/mehndi.jpg',
    rating: 5,
    text: 'Outstanding work by the Chabighar team! They made our mehendi ceremony so vibrant and colorful through their lens. The candid shots are our absolute favorites.',
    event: 'Mehendi Ceremony',
    date: 'January 2024'
  },
  {
    id: 13,
    name: 'Rashika & Dev Sharma',
    location: 'Chandigarh',
    image: '/img/jewellery.jpg',
    rating: 5,
    text: 'Truly professional and creative team! They captured our Punjabi wedding with such energy and enthusiasm. Every shot reflects the joy and celebration of our special day.',
    event: 'Punjabi Wedding',
    date: 'December 2023'
  },
  {
    id: 14,
    name: 'Simran & Rohit Khanna',
    location: 'Gurgaon',
    image: '/img/food.jpg',
    rating: 5,
    text: 'Amazing experience with Chabighar! They captured not just our wedding but also the beautiful food and decorations. Their attention to detail is remarkable and the final album is stunning.',
    event: 'Wedding Reception',
    date: 'November 2023'
  },
  {
    id: 15,
    name: 'Tanya & Arpit Joshi',
    location: 'Nashik',
    image: '/img/invites.jpg',
    rating: 5,
    text: 'Perfect photography for our intimate wedding! The team was respectful of our privacy while capturing all the important moments. The quality of work is exceptional and very artistic.',
    event: 'Intimate Wedding',
    date: 'October 2023'
  },
  {
    id: 16,
    name: 'Nidhi & Gaurav Singhal',
    location: 'Faridabad',
    image: '/img/prewedding.jpg',
    rating: 5,
    text: 'Wonderful pre-wedding shoot experience! The photographers were patient and helped us get comfortable. The locations they suggested were perfect and the final photos are magazine-worthy.',
    event: 'Pre-Wedding Photography',
    date: 'September 2023'
  },
  {
    id: 17,
    name: 'Kritika & Rohan Bhatia',
    location: 'Amritsar',
    image: '/img/grooming.jpg',
    rating: 5,
    text: 'Excellent service from start to finish! They covered our entire wedding weekend including the groom\'s preparations. Every moment was captured with such precision and creativity.',
    event: 'Wedding Weekend',
    date: 'August 2023'
  },
  {
    id: 18,
    name: 'Aditi & Harsh Malhotra',
    location: 'Shimla',
    image: '/img/venues.jpg',
    rating: 5,
    text: 'Destination wedding photography at its best! Chabighar team traveled to Shimla for our mountain wedding and the results were breathtaking. They captured the scenic beauty perfectly.',
    event: 'Destination Wedding',
    date: 'July 2023'
  }
];

export default function TestimonialsSection() {
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set(videoTestimonials.map(v => v.id)));
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  const handleVideoClick = (videoId: number) => {
    const video = videoRefs.current.get(videoId);
    if (!video) return;

    const newMutedVideos = new Set(mutedVideos);
    if (mutedVideos.has(videoId)) {
      newMutedVideos.delete(videoId);
      video.muted = false;
    } else {
      newMutedVideos.add(videoId);
      video.muted = true;
    }
    setMutedVideos(newMutedVideos);
  };

  const setVideoRef = (videoId: number, element: HTMLVideoElement | null) => {
    if (element) {
      videoRefs.current.set(videoId, element);
    } else {
      videoRefs.current.delete(videoId);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-royal-red"></div>
            <span 
              className="text-royal-red font-medium tracking-wider uppercase text-sm"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Client Stories
            </span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-royal-red"></div>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Video <span className="text-royal-red">Testimonials</span>
          </h2>
          <p 
            className="text-xl text-gray-600 leading-relaxed" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Hear directly from our couples about their amazing experience with Chabighar Photography
          </p>
        </div>

        {/* Video Testimonials - Horizontal Scroll with Navigation Arrows */}
        <div className="relative mb-12">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-black/20"
          >
            <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-black/20"
          >
            <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
          >
            {videoTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="group flex-shrink-0">
                {/* Video Card - 2:3 Aspect Ratio */}
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-64">
                  {/* Video Container - 2:3 Ratio (height = width * 1.5) */}
                  <div className="relative h-96 overflow-hidden bg-black rounded-2xl">
                    <video
                      ref={(el) => setVideoRef(testimonial.id, el)}
                      className="w-full h-full object-cover cursor-pointer"
                      autoPlay
                      loop
                      muted={mutedVideos.has(testimonial.id)}
                      playsInline
                      poster={testimonial.thumbnail}
                      onClick={() => handleVideoClick(testimonial.id)}
                    >
                      <source src={testimonial.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video Overlay - Minimal */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                    
                    {/* Mute/Unmute Button - Top Right */}
                    <button
                      onClick={() => handleVideoClick(testimonial.id)}
                      className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm"
                    >
                      {mutedVideos.has(testimonial.id) ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.797L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.797A1 1 0 019.383 3.076zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.797L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.797A1 1 0 019.383 3.076zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>

                    {/* Client Name & Rating - Bottom Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 
                        className="text-white font-bold text-lg mb-1"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {testimonial.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {renderStars(testimonial.rating)}
                        </div>
                        <span className="text-white/90 text-sm font-medium">
                          "{testimonial.event}"
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text Testimonials - Same Section */}
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Masonry Grid Text Reviews */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {textTestimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="break-inside-avoid mb-6">
                {/* Enhanced Text Review Card */}
                <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group transform hover:-translate-y-2 hover:scale-[1.02]">
                  {/* Decorative Top Border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-royal-red via-pink-400 to-yellow-400"></div>
                  
                  {/* Floating Quote Icon */}
                  <div className="absolute top-4 right-4 text-royal-red/20 group-hover:text-royal-red/40 transition-colors duration-300">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>

                  <div className="p-6">
                    {/* Header with Enhanced Avatar */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-gradient-to-r from-royal-red to-pink-400 flex-shrink-0 shadow-lg">
                          <div 
                            className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                            style={{ backgroundImage: `url(${testimonial.image})` }}
                          ></div>
                        </div>
                        {/* Verified Badge */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 
                          className="font-bold text-gray-900 text-base mb-1 group-hover:text-royal-red transition-colors duration-300"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          {testimonial.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(testimonial.rating)}</div>
                          <span className="text-xs text-gray-500 font-medium">({testimonial.rating}.0)</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{testimonial.location}</div>
                      </div>
                    </div>

                    {/* Enhanced Review Text */}
                    <div className="mb-5">
                      <p className="text-gray-700 text-sm leading-relaxed relative">
                        <span className="text-royal-red text-2xl absolute -top-2 -left-1 font-serif">"</span>
                        <span className="ml-3">{testimonial.text}</span>
                        <span className="text-royal-red text-2xl font-serif">"</span>
                      </p>
                    </div>

                    {/* Enhanced Footer */}
                    <div className="border-t border-gradient-to-r from-transparent via-gray-200 to-transparent pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-royal-red rounded-full"></div>
                          <span className="font-semibold text-royal-red text-xs uppercase tracking-wide">
                            {testimonial.event}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                          {testimonial.date}
                        </span>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-royal-red/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
                  </div>

                  {/* Animated Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-royal-red via-pink-400 to-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}