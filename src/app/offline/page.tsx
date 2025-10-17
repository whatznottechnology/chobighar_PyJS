'use client';

import Link from 'next/link';
import { WifiIcon } from '@heroicons/react/24/outline';

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <WifiIcon className="w-24 h-24 mx-auto text-gray-300" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          You're Offline
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          It looks like you've lost your internet connection. Some features may not be available.
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Try Again
        </Link>
      </div>
    </main>
  );
}
