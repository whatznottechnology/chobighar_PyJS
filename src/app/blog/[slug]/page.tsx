'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useBlogPost } from '../../../../hooks/useBlogData';
import { getMediaUrl } from '@/config/api';
import { 
  ClockIcon, 
  EyeIcon, 
  CalendarIcon, 
  ArrowLeftIcon,
  ShareIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { post, loading, error } = useBlogPost(slug);

  useEffect(() => {
    if (post) {
      // Update document title for SEO
      document.title = post.meta_title || `${post.title} | chobighar Blog`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && post.meta_description) {
        metaDescription.setAttribute('content', post.meta_description);
      }
    }
  }, [post]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link 
            href="/blog"
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const featuredImageUrl = post.featured_image ? getMediaUrl(post.featured_image) : null;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Blog
          </Link>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {post.category_name}
            </span>
          </div>

          {/* Title */}
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>{formatDate(post.published_date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              <span>{post.reading_time} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <EyeIcon className="w-4 h-4" />
              <span>{post.views_count} views</span>
            </div>
            <div className="flex items-center gap-2">
              <span>By {post.author}</span>
            </div>
            <button
              onClick={handleShare}
              className="ml-auto flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              <ShareIcon className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {featuredImageUrl && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
            <Image
              src={featuredImageUrl}
              alt={post.featured_image_alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Excerpt */}
          <div className="text-xl text-gray-700 mb-8 pb-8 border-b border-gray-200 font-medium italic">
            {post.excerpt}
          </div>

          {/* Main Content */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-playfair prose-headings:text-gray-900
              prose-h2:text-gray-900 prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8
              prose-h3:text-gray-900 prose-h3:text-xl prose-h3:font-bold prose-h3:mb-3 prose-h3:mt-6
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base
              prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-img:rounded-xl prose-img:shadow-lg
              prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
              prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
              prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4
              prose-li:text-gray-700 prose-li:mb-2"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          {/* Tags */}
          {post.tags_list && post.tags_list.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <TagIcon className="w-5 h-5 text-gray-400" />
                {post.tags_list.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Posts */}
      {post.related_posts && post.related_posts.length > 0 && (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 
              className="text-3xl font-bold text-gray-900 mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.related_posts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {relatedPost.thumbnail ? (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getMediaUrl(relatedPost.thumbnail) || ''}
                        alt={relatedPost.title}
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
                    <span className="text-sm text-red-600 font-semibold">
                      {relatedPost.category_name}
                    </span>
                    <h3 
                      className="text-lg font-bold text-gray-900 mt-2 mb-2 group-hover:text-red-600 transition-colors line-clamp-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                      <ClockIcon className="w-4 h-4" />
                      <span>{relatedPost.reading_time} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to Book Your Event?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Let's create beautiful memories together
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  );
}
