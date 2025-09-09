'use client';

import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  isMobile?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export default function SearchBar({ isMobile = false, onExpandedChange }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Notify parent component about expansion state
  useEffect(() => {
    onExpandedChange?.(isExpanded);
  }, [isExpanded, onExpandedChange]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);

  const handleClose = () => {
    setIsExpanded(false);
    setSearchQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log('Search query:', searchQuery);
    }
  };

  if (isMobile) {
    return (
      <div className="relative">
        {/* Mobile search trigger with new colors */}
        <button
          type="button"
          className="p-2 transition-opacity hover:opacity-80"
          style={{ color: '#707070' }}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Search"
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>

        {/* Mobile search dropdown with new colors */}
        {isExpanded && (
          <div 
            className="absolute top-full right-0 mt-2 w-80 max-w-[90vw] border rounded-lg shadow-lg z-50"
            style={{ 
              backgroundColor: '#FAF9F6',
              borderColor: '#707070'
            }}
          >
            <form onSubmit={handleSubmit} className="p-4">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search…"
                  className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm focus:ring-opacity-50"
                  style={{
                    borderColor: '#707070',
                    backgroundColor: '#FAF9F6',
                    color: '#1C1C1C'
                  }}
                />
                <MagnifyingGlassIcon 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: '#707070' }}
                />
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-80 transition-opacity"
                  style={{ color: '#707070' }}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  // Desktop search (inline expansion)
  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className={`flex items-center transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-96' : 'w-10'
        }`}
      >
        {isExpanded ? (
          <div className="relative flex items-center w-full">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search…"
              className="w-full pl-10 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
              style={{
                borderColor: '#707070',
                backgroundColor: '#FAF9F6',
                color: '#1C1C1C'
              }}
            />
            <MagnifyingGlassIcon 
              className="absolute left-3 w-4 h-4" 
              style={{ color: '#707070' }}
            />
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-3 transition-opacity hover:opacity-80"
              style={{ color: '#707070' }}
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="p-2 transition-opacity hover:opacity-80 rounded-full"
            style={{ 
              color: '#707070',
              backgroundColor: 'rgba(178, 34, 34, 0.05)'
            }}
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
}
