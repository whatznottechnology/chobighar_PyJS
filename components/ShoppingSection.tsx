'use client';

import React, { useState, useRef } from 'react';

const ShoppingSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
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

  const categories = [
    { id: 'all', name: 'All Products', count: 150 },
    { id: 'invitations', name: 'Invitations', count: 35 },
    { id: 'jewelry', name: 'Jewelry', count: 28 },
    { id: 'accessories', name: 'Accessories', count: 42 },
    { id: 'decor', name: 'Decor Items', count: 25 },
    { id: 'gifts', name: 'Gift Sets', count: 20 }
  ];

  const products = [
    {
      id: 1,
      name: 'Elegant Wedding Invitations',
      category: 'invitations',
      price: '₹2,500',
      originalPrice: '₹3,500',
      image: '/img/invites.jpg',
      rating: 4.8,
      reviews: 156,
      discount: '30% OFF',
      featured: true,
      inStock: true
    },
    {
      id: 2,
      name: 'Bridal Jewelry Set',
      category: 'jewelry',
      price: '₹15,000',
      originalPrice: '₹22,000',
      image: '/img/jewellery.jpg',
      rating: 4.9,
      reviews: 89,
      discount: '32% OFF',
      featured: true,
      inStock: true
    },
    {
      id: 3,
      name: 'Wedding Decorative Items',
      category: 'decor',
      price: '₹5,500',
      originalPrice: '₹7,500',
      image: '/img/planning.jpg',
      rating: 4.7,
      reviews: 234,
      discount: '27% OFF',
      featured: false,
      inStock: true
    },
    {
      id: 4,
      name: 'Bridal Accessories Kit',
      category: 'accessories',
      price: '₹3,200',
      originalPrice: '₹4,200',
      image: '/img/makeup.jpg',
      rating: 4.8,
      reviews: 178,
      discount: '24% OFF',
      featured: true,
      inStock: true
    },
    {
      id: 5,
      name: 'Premium Gift Hampers',
      category: 'gifts',
      price: '₹4,500',
      originalPrice: '₹6,000',
      image: '/img/food.jpg',
      rating: 4.6,
      reviews: 145,
      discount: '25% OFF',
      featured: false,
      inStock: true
    },
    {
      id: 6,
      name: 'Wedding Photo Frames',
      category: 'decor',
      price: '₹1,800',
      originalPrice: '₹2,500',
      image: '/img/photographers.jpg',
      rating: 4.7,
      reviews: 92,
      discount: '28% OFF',
      featured: false,
      inStock: false
    },
    {
      id: 7,
      name: 'Mehndi Design Stencils',
      category: 'accessories',
      price: '₹800',
      originalPrice: '₹1,200',
      image: '/img/mehndi.jpg',
      rating: 4.5,
      reviews: 267,
      discount: '33% OFF',
      featured: false,
      inStock: true
    },
    {
      id: 8,
      name: 'Bridal Trousseau Box',
      category: 'accessories',
      price: '₹8,500',
      originalPrice: '₹12,000',
      image: '/img/bridalwear.jpg',
      rating: 4.9,
      reviews: 76,
      discount: '29% OFF',
      featured: true,
      inStock: true
    },
    {
      id: 9,
      name: 'Traditional Gold Bangles',
      category: 'jewelry',
      price: '₹12,000',
      originalPrice: '₹18,000',
      image: '/img/jewellery.jpg',
      rating: 4.8,
      reviews: 134,
      discount: '33% OFF',
      featured: false,
      inStock: true
    },
    {
      id: 10,
      name: 'Designer Wedding Cards',
      category: 'invitations',
      price: '₹1,200',
      originalPrice: '₹1,800',
      image: '/img/invites.jpg',
      rating: 4.6,
      reviews: 98,
      discount: '33% OFF',
      featured: false,
      inStock: true
    }
  ];

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute top-0 left-0 w-1/3 lg:w-1/4">
        <img
          src="/img/12873194_7666-removebg-preview.png"
          alt="Background decoration"
          className="w-full h-auto object-contain opacity-8"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 lg:w-2/5">
        <img
          src="/img/62569719_9509225.png"
          alt="Background decoration"
          className="w-full h-auto object-contain opacity-8"
        />
      </div>

      <div className="w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-royal-red"></div>
            <span 
              className="text-royal-red font-medium tracking-wider uppercase text-sm"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Premium Collection
            </span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-royal-red"></div>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Wedding <span className="text-royal-red">Shopping</span>
          </h2>
          <p 
            className="text-xl text-gray-600 leading-relaxed" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Discover our curated collection of wedding essentials, from elegant invitations to beautiful accessories for your special day.
          </p>
        </div>

        {/* Enhanced Category Filter */}
        <div className="mb-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="inline-flex bg-gray-50 p-1.5 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-royal-red text-white shadow-md' 
                      : 'text-gray-600 hover:text-royal-red hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Products with Navigation Arrows */}
        <div className="relative">
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

          {/* Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
          >
            {filteredProducts.map((product) => (
              <div key={product.id} className="group flex-shrink-0">
                {/* Product Card - Reduced Size */}
                <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 w-64">
                  {/* Product Image - Reduced Height */}
                  <div className="relative h-32 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${product.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Discount Badge - Smaller */}
                    <div className="absolute top-2 left-2">
                      <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-md">
                        {product.discount}
                      </span>
                    </div>

                    {/* Featured Badge - Smaller */}
                    {product.featured && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-yellow-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-md">
                          ⭐
                        </span>
                      </div>
                    )}

                    {/* Stock Status */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-gray-800 text-white px-2 py-1 rounded-md text-xs font-medium">
                          Out of Stock
                        </span>
                      </div>
                    )}

                    {/* Quick Actions - Enhanced Visibility */}
                    <div className="absolute bottom-2 right-2 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-1">
                        <button className="bg-white/95 text-royal-red p-1.5 rounded-full hover:bg-royal-red hover:text-white transition-colors shadow-lg border border-royal-red/20">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="bg-white/95 text-red-500 p-1.5 rounded-full hover:bg-red-500 hover:text-white transition-colors shadow-lg border border-red-500/20">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Info - Compact */}
                  <div className="p-3">
                    {/* Category and Stock Status */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-royal-red font-medium capitalize">
                        {product.category}
                      </span>
                      {product.inStock && (
                        <span className="text-xs text-green-600 font-medium">
                          In Stock
                        </span>
                      )}
                    </div>
                    
                    {/* Product Name - Smaller */}
                    <h3 
                      className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-royal-red transition-colors" 
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {product.name}
                    </h3>
                    
                    {/* Rating - Compact */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <svg
                            key={i}
                            className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price - Compact */}
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-lg font-bold text-gray-900">{product.price}</span>
                      <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                    </div>

                    {/* Action Buttons - Smaller */}
                    <div className="flex gap-1">
                      <button 
                        className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all duration-300 ${
                          product.inStock 
                            ? 'bg-gray-900 hover:bg-gray-800 text-white transform hover:scale-105' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? 'View' : 'Sold Out'}
                      </button>
                      <button 
                        className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all duration-300 ${
                          product.inStock 
                            ? 'bg-royal-red hover:bg-red-700 text-white' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!product.inStock}
                      >
                        Add Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* View All Card - Reduced Size */}
            <div className="flex-shrink-0 w-64">
              <div className="h-full bg-gradient-to-br from-royal-red via-red-800 to-red-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 flex items-center justify-center min-h-[200px]">
                <div className="text-center p-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    View All Products
                  </h3>
                  <p className="text-white/80 text-xs mb-3">
                    150+ premium items
                  </p>
                  <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium py-1.5 px-3 rounded-md transition-all duration-300 text-xs">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingSection;