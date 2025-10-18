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

    // If app is installed, don't show banner and notify immediately
    if (isInstalled()) {
      const state = getBannerState();
      if (!state.installedOnce) {
        // Mark as installed once
        saveBannerState({ ...state, installedOnce: true, dismissed: false, dismissedAt: 0 });
      }
      setShowBanner(false);
      // Notify navbar immediately on mount
      window.dispatchEvent(new CustomEvent('pwa-banner-hidden'));
      return;
    }

    // Check if banner was dismissed
    const bannerState = getBannerState();
    
    if (bannerState.dismissed) {
      const timeSinceDismiss = Date.now() - bannerState.dismissedAt;
      
      // If less than 7 days since dismissal, don't show
      if (timeSinceDismiss < DISMISS_DURATION) {
        setShowBanner(false);
        window.dispatchEvent(new CustomEvent('pwa-banner-hidden'));
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
      
      // Only show if not recently dismissed and not installed
      const state = getBannerState();
      if (!bannerState.dismissed && !state.installedOnce) {
        setShowBanner(true);
        // Notify navbar that banner is shown
        window.dispatchEvent(new CustomEvent('pwa-banner-visible'));
      }
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setShowBanner(false);
      
      // Mark as installed
      const state: PWABannerState = {
        dismissed: false,
        dismissedAt: 0,
        installedOnce: true
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      
      // Notify navbar
      window.dispatchEvent(new CustomEvent('pwa-banner-hidden'));
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
        
        // Mark as installed
        const state: PWABannerState = {
          dismissed: false,
          dismissedAt: 0,
          installedOnce: true
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        
        // Notify navbar
        window.dispatchEvent(new CustomEvent('pwa-banner-hidden'));
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
    window.dispatchEvent(new CustomEvent('pwa-banner-hidden'));
  };

  // Don't render on server or if not showing
  if (!isMounted || !showBanner) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-black shadow-lg border-b border-gray-800">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 text-white">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Icon & Text */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg p-1.5 shadow-lg">
              <Image 
                src="/2.png" 
                alt="Chobighar" 
                width={40} 
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[11px] sm:text-sm leading-tight truncate text-white">
                Install Chobighar App
              </h3>
              <p className="text-[9px] sm:text-[10px] text-gray-400 truncate leading-tight hidden sm:block">
                Quick access & offline support
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-[10px] sm:text-xs transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
            >
              <ArrowDownTrayIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Install</span>
              <span className="sm:hidden">Get</span>
            </button>
            <button
              onClick={handleClose}
              className="p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg transition-all duration-200 group"
              aria-label="Close"
            >
              <XMarkIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gray-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PWAInstallBanner;


