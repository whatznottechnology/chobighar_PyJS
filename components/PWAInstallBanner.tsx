'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWABannerState {
  dismissed: boolean;
  dismissedAt: number;
  installedOnce: boolean;
}

const STORAGE_KEY = 'pwa-banner-state';
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent SSR issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // Check if app is currently installed
    const isInstalled = () => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://')
      );
    };

    // Get banner state from localStorage
    const getBannerState = (): PWABannerState => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          return { dismissed: false, dismissedAt: 0, installedOnce: false };
        }
        return JSON.parse(stored);
      } catch {
        return { dismissed: false, dismissedAt: 0, installedOnce: false };
      }
    };

    // Save banner state
    const saveBannerState = (state: PWABannerState) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    };

    // If app is installed, don't show banner
    if (isInstalled()) {
      const state = getBannerState();
      if (!state.installedOnce) {
        // Mark as installed once
        saveBannerState({ ...state, installedOnce: true, dismissed: false, dismissedAt: 0 });
      }
      return;
    }

    // Check if banner was dismissed
    const bannerState = getBannerState();
    
    if (bannerState.dismissed) {
      const timeSinceDismiss = Date.now() - bannerState.dismissedAt;
      
      // If less than 7 days since dismissal, don't show
      if (timeSinceDismiss < DISMISS_DURATION) {
        return;
      } else {
        // Reset dismissal after 7 days
        saveBannerState({ ...bannerState, dismissed: false, dismissedAt: 0 });
      }
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Only show if not recently dismissed
      if (!bannerState.dismissed) {
        setShowBanner(true);
        // Notify navbar that banner is shown
        window.dispatchEvent(new CustomEvent('pwa-banner-shown'));
      }
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setShowBanner(false);
      const state = getBannerState();
      saveBannerState({ ...state, installedOnce: true, dismissed: false, dismissedAt: 0 });
      
      // Notify navbar
      window.dispatchEvent(new CustomEvent('pwa-banner-closed'));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isMounted]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback for iOS or browsers without prompt
      alert('To install this app:\n\n1. Tap the Share button\n2. Tap "Add to Home Screen"');
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA installation accepted');
        setShowBanner(false);
        window.dispatchEvent(new CustomEvent('pwa-banner-closed'));
      }
    } catch (error) {
      console.error('Install prompt failed:', error);
    }

    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setShowBanner(false);
    
    // Save dismissed state
    const state: PWABannerState = {
      dismissed: true,
      dismissedAt: Date.now(),
      installedOnce: false
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    
    // Notify navbar
    window.dispatchEvent(new CustomEvent('pwa-banner-closed'));
  };

  // Don't render on server or if not showing
  if (!isMounted || !showBanner) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] animate-slide-down mb-2">
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-lg border-b border-red-900/30">
        <div className="container mx-auto px-3 py-1.5 sm:py-2">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Icon & Text */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg p-1 shadow-md">
                <Image 
                  src="/chabighar.webp" 
                  alt="Chobighar" 
                  width={40} 
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[11px] sm:text-xs leading-tight truncate">
                  Install Chobighar App
                </h3>
                <p className="text-[9px] sm:text-[10px] text-white/90 truncate leading-tight hidden sm:block">
                  Quick access & offline support
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1 sm:gap-1.5 bg-white text-red-600 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-semibold text-[10px] sm:text-xs hover:bg-gray-100 transition-all duration-200 shadow-md"
              >
                <ArrowDownTrayIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Install</span>
                <span className="sm:hidden">Get</span>
              </button>
              <button
                onClick={handleClose}
                className="p-1 sm:p-1.5 hover:bg-white/10 rounded-md transition-colors"
                aria-label="Close"
              >
                <XMarkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PWAInstallBanner;


