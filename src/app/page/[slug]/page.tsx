'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useStaticPage } from '../../../../hooks/useStaticPages';

export default function StaticPageDetail() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug as string;
  const { page, loading, error } = useStaticPage(slug);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  if (error || !page) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {page.title}
          </h1>
          <p className="text-white/80 mt-2">
            Last updated: {new Date(page.updated_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div 
          className="prose prose-lg max-w-none text-gray-900
            prose-headings:font-playfair prose-headings:text-gray-900
            prose-h1:text-4xl prose-h1:text-gray-900
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-4 prose-h2:text-gray-900
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-900
            prose-h4:text-xl prose-h4:text-gray-900
            prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-6
            prose-ul:my-6 prose-ul:space-y-2
            prose-ol:my-6 prose-ol:space-y-2
            prose-li:text-gray-800
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-em:text-gray-800
            prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
            [&_*]:text-gray-800"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </article>

      {/* Contact CTA */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Have Questions?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            If you have any questions about our policies, feel free to contact us. We're here to help!
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
