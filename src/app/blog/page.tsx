'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useBlogPosts, useBlogCategories, useFeaturedPosts } from '../../../hooks/useBlogData';
import { getMediaUrl } from '@/config/api';
import { MagnifyingGlassIcon, ClockIcon, EyeIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { categories } = useBlogCategories();
  const { posts: featuredPosts } = useFeaturedPosts();
  const { posts, loading } = useBlogPosts({
    category: selectedCategory || undefined,
    search: searchQuery || undefined
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-700 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Blog
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Photography tips, wedding inspiration, and behind-the-scenes stories
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && !selectedCategory && !searchQuery && (
          <div className="mb-12">
            <h2 
              className="text-3xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Link 
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {post.thumbnail ? (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getMediaUrl(post.thumbnail) || ''}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-48 bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                      <span className="text-red-400 text-4xl">📸</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">
                        {post.category_name}
                      </span>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{post.reading_time} min read</span>
                      </div>
                    </div>
                    <h3 
                      className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{formatDate(post.published_date)}</span>
                      <div className="flex items-center gap-1">
                        <EyeIcon className="w-4 h-4" />
                        <span>{post.views_count}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Posts Section */}
        <div>
          <h2 
            className="text-3xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {selectedCategory ? `${categories.find(c => c.slug === selectedCategory)?.name || 'Category'}` : 'Latest Articles'}
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl">
              <p className="text-gray-600 text-lg">No articles found.</p>
              {(selectedCategory || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSearchQuery('');
                  }}
                  className="mt-4 text-red-600 hover:text-red-700 font-semibold"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link 
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {post.thumbnail ? (
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <Image
                        src={getMediaUrl(post.thumbnail) || ''}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                      <span className="text-gray-400 text-4xl">📝</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                        {post.category_name}
                      </span>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{post.reading_time} min</span>
                      </div>
                    </div>
                    <h3 
                      className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formatDate(post.published_date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <EyeIcon className="w-4 h-4" />
                        <span>{post.views_count}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Categories Section */}
        <div className="mt-16">
          <h2 
            className="text-3xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`p-4 rounded-xl text-center transition-all duration-300 ${
                  selectedCategory === category.slug
                    ? 'bg-red-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon || '📝'}</div>
                <div className="font-semibold text-sm">{category.name}</div>
                <div className="text-xs mt-1 opacity-75">{category.posts_count} posts</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
