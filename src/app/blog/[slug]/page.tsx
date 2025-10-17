'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useBlogPost } from '../../../../hooks/useBlogData';
import { getMediaUrl } from '@/config/api';
import { processBlogContent } from '@/utils/blogContent';
import { 
  ClockIcon, 
  EyeIcon, 
  CalendarIcon, 
  ArrowLeftIcon,
  ShareIcon,
  TagIcon,
  UserIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowUpIcon,
  PaperAirplaneIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug as string;
  const { post, loading, error } = useBlogPost(slug);
  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    comment: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    if (post) {
      document.title = post.meta_title || `${post.title} | chobighar Blog`;
    }
  }, [post]);

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

  // Fetch comments
  useEffect(() => {
    if (post) {
      fetchComments();
    }
  }, [post]);

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const response = await fetch(`http://localhost:8000/api/blog/comments/?post=${slug}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!post) return;
    
    setSubmittingComment(true);
    try {
      const response = await fetch('http://localhost:8000/api/blog/comments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post: post.id,
          name: commentForm.name,
          email: commentForm.email,
          comment: commentForm.comment
        })
      });

      if (response.ok) {
        setCommentSuccess(true);
        setCommentForm({ name: '', email: '', comment: '' });
        setTimeout(() => setCommentSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
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
        console.log('Share failed:', err);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Article</h2>
          <p className="text-gray-600">Please wait while we fetch the content...</p>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const featuredImageUrl = post.featured_image ? getMediaUrl(post.featured_image) : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Same design as Portfolio */}
      <section className="relative w-full 
        h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[65vh] xl:h-[70vh]
        min-h-[250px] sm:min-h-[350px] md:min-h-[400px] 
        max-h-[400px] sm:max-h-[500px] md:max-h-[700px]
        overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          {featuredImageUrl ? (
            <Image
              src={featuredImageUrl}
              alt={post.featured_image_alt || post.title}
              fill
              className="object-cover object-center w-full h-full"
              priority
              quality={95}
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800"></div>
          )}
          {/* Simplified Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80"></div>
        </div>

        {/* Content - Positioned at bottom */}
        <div className="relative h-full flex items-end pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Breadcrumb & Category */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Link href="/blog" className="text-white/70 hover:text-white text-xs sm:text-sm transition-colors">
                Blog
              </Link>
              <span className="text-white/50">/</span>
              <span className="inline-flex items-center bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {post.category_name}
              </span>
            </div>

            {/* Title & Metadata */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {post.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-2 sm:mb-4">{post.excerpt}</p>

            {/* Compact Info Bar */}
            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-white/70">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <UserIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{post.author}</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{formatDate(post.published_date || post.created_at)}</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{post.reading_time} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Share Button - Mobile: Top Right, Desktop: Bottom Right */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:bottom-6 md:right-6 md:top-auto z-30">
          <button
            onClick={handleShare}
            className="backdrop-blur-md bg-black/30 border border-white/30 hover:bg-black/40 text-white hover:text-white shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 px-4 py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm"
          >
            <ShareIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </section>

      {/* Article Content */}
      <article className="relative -mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Content Container */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-6 md:p-10 lg:p-16">
              {/* Rich Content from CKEditor - Preserve original formatting */}
              <div className="ck-editor-content max-w-none">
                {/* Debug: Show if content exists */}
                {!post.content && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-600 text-lg font-medium">No content available for this blog post.</p>
                  </div>
                )}
                
                {/* Processed content - preserving CKEditor styling */}
                {post.content && (
                  <div dangerouslySetInnerHTML={{ __html: processBlogContent(post.content || '') }} />
                )}
                
                {/* Debug: Show raw content length */}
                {post.content && (
                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-gray-500 text-sm bg-gray-50 px-4 py-2 rounded-lg inline-block">
                      Content length: {post.content.length} characters
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tags Section */}
          {post.tags_list && post.tags_list.length > 0 && (
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TagIcon className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Tags</h3>
                  <div className="flex flex-wrap gap-3">
                    {post.tags_list.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center bg-gradient-to-r from-red-50 to-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium hover:from-red-100 hover:to-red-200 transition-all duration-200 cursor-pointer border border-red-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {post.related_posts && post.related_posts.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Related Articles
              </h2>
              <p className="text-gray-600 text-lg">More stories you might enjoy</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {post.related_posts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {relatedPost.thumbnail ? (
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <Image
                        src={getMediaUrl(relatedPost.thumbnail) || ''}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                      <span className="text-red-400 text-5xl">📝</span>
                    </div>
                  )}
                  <div className="p-6">
                    <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {relatedPost.category_name}
                    </span>
                    <h3 
                      className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        <span>{relatedPost.reading_time}m</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <EyeIcon className="w-3 h-3" />
                        <span>{relatedPost.views_count}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comments Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Comments Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-red-600" />
              <h2 
                className="text-3xl md:text-4xl font-bold text-gray-900"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Comments ({comments.length})
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              Share your thoughts and join the conversation
            </p>
          </div>

          {/* Comment Form */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 mb-12 border border-red-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Leave a Comment
            </h3>
            
            {commentSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                <span>Comment submitted successfully! It will be visible after approval.</span>
              </div>
            )}

            <form onSubmit={handleCommentSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={commentForm.name}
                    onChange={(e) => setCommentForm({...commentForm, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all bg-white text-gray-900 placeholder-gray-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={commentForm.email}
                    onChange={(e) => setCommentForm({...commentForm, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all bg-white text-gray-900 placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Comment *
                </label>
                <textarea
                  required
                  rows={5}
                  value={commentForm.comment}
                  onChange={(e) => setCommentForm({...commentForm, comment: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all resize-none bg-white text-gray-900 placeholder-gray-500"
                  placeholder="Share your thoughts..."
                />
              </div>

              <button
                type="submit"
                disabled={submittingComment}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
                {submittingComment ? 'Submitting...' : 'Post Comment'}
              </button>
            </form>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {loadingComments ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading comments...</p>
              </div>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div 
                  key={comment.id}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-red-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900">{comment.name}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <ChatBubbleBottomCenterTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HeartIcon className="w-12 h-12 text-white mx-auto mb-6" />
          <h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to Create Beautiful Memories?
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Let our expert photographers capture your special moments with creativity and passion
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <span>Get in Touch</span>
            <ArrowLeftIcon className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-24 z-[9000] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 transform hover:opacity-90"
          style={{
            backgroundColor: '#B22222'
          }}
          aria-label="Back to top"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </main>
  );
}
