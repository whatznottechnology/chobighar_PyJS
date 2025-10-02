'use client';

import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon, MapPinIcon, StarIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getApiUrl, API_ENDPOINTS } from '@/config/api';

interface SearchResult {
  type: string;
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  url: string;
  category?: string;
  location?: string;
  rating?: number;
  price_range?: string;
  vendor_count?: number;
  portfolio_count?: number;
  image_count?: number;
  icon?: string;
}

interface SearchBarProps {
  isMobile?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export default function SearchBar({ isMobile = false, onExpandedChange }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  // Handle escape key and outside clicks
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        handleClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Search function
  const performSearch = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`${getApiUrl(API_ENDPOINTS.SEARCH)}?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (response.ok) {
        setSearchResults(data.results || []);
        setShowResults(true);
      } else {
        console.error('Search failed:', data.error);
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowResults(false);
    } finally {
      setIsSearching(false);
    }
  };

  // Load suggestions on expand
  useEffect(() => {
    if (isExpanded && suggestions.length === 0) {
      fetch(getApiUrl(API_ENDPOINTS.SEARCH_SUGGESTIONS))
        .then(res => res.json())
        .then(data => setSuggestions(data.suggestions || []))
        .catch(err => console.error('Failed to load suggestions:', err));
    }
  }, [isExpanded, suggestions.length]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleClose = () => {
    setIsExpanded(false);
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    console.log('Navigating to:', result.url); // Debug log
    router.push(result.url);
    handleClose();
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearchQuery(suggestion.term);
    performSearch(suggestion.term);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'vendor':
        return '👨‍💼';
      case 'vendor_category':
        return '🏢';
      case 'vendor_subcategory':
        return '📋';
      case 'vendor_image':
        return '🖼️';
      case 'vendor_service':
        return '🛠️';
      case 'portfolio':
        return '📸';
      case 'portfolio_category':
        return '📁';
      case 'portfolio_image':
        return '📷';
      case 'photoshoot_service':
        return '📸';
      default:
        return '🔍';
    }
  };

  const getResultTypeLabel = (type: string) => {
    switch (type) {
      case 'vendor':
        return 'Vendor';
      case 'vendor_category':
        return 'Category';
      case 'vendor_subcategory':
        return 'Subcategory';
      case 'vendor_image':
        return 'Vendor Photo';
      case 'vendor_service':
        return 'Service';
      case 'portfolio':
        return 'Album';
      case 'portfolio_category':
        return 'Portfolio Category';
      case 'portfolio_image':
        return 'Photo';
      case 'photoshoot_service':
        return 'Photoshoot Service';
      default:
        return 'Result';
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
            ref={resultsRef}
            className="absolute top-full right-0 mt-2 w-80 max-w-[90vw] border rounded-lg shadow-lg z-[90] max-h-96 overflow-hidden"
            style={{ 
              backgroundColor: '#FAF9F6',
              borderColor: '#707070'
            }}
          >
            <form onSubmit={handleSubmit} className="p-4 border-b" style={{ borderColor: '#707070' }}>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search vendors, albums, services..."
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
                {isSearching ? (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: '#B22222' }}></div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-80 transition-opacity"
                    style={{ color: '#707070' }}
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>

            {/* Search Results */}
            {showResults && searchResults.length > 0 && (
              <div className="max-h-64 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                    style={{ borderColor: '#707070' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {result.image ? (
                          <Image
                            src={result.image}
                            alt={result.title}
                            width={40}
                            height={40}
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-lg">
                            {result.icon || getResultIcon(result.type)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">{result.title}</h4>
                        {result.subtitle && (
                          <p className="text-xs text-gray-600 truncate">{result.subtitle}</p>
                        )}
                        {result.description && (
                          <p className="text-xs text-gray-500 truncate mt-1">{result.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#B22222', color: 'white' }}>
                            {getResultTypeLabel(result.type)}
                          </span>
                          {result.location && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <MapPinIcon className="w-3 h-3" />
                              {result.location}
                            </span>
                          )}
                          {result.rating && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <StarIcon className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {result.rating.toFixed(1)}
                            </span>
                          )}
                          {result.image_count && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <PhotoIcon className="w-3 h-3" />
                              {result.image_count}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {showResults && searchResults.length === 0 && !isSearching && searchQuery && (
              <div className="p-4 text-center text-gray-500">
                <p className="text-sm">No results found for "{searchQuery}"</p>
              </div>
            )}

            {/* Suggestions */}
            {!searchQuery && suggestions.length > 0 && (
              <div className="p-4">
                <h5 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Popular Searches</h5>
                <div className="flex flex-wrap gap-2">
                  {suggestions.slice(0, 6).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:opacity-80"
                      style={{ 
                        borderColor: '#B22222', 
                        color: '#B22222',
                        backgroundColor: 'transparent'
                      }}
                    >
                      {suggestion.term} ({suggestion.count})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Desktop search (inline expansion)
  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
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
                placeholder="Search vendors, albums, services..."
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
              {isSearching ? (
                <div className="absolute right-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2" style={{ borderColor: '#B22222' }}></div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-3 transition-opacity hover:opacity-80"
                  style={{ color: '#707070' }}
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
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

      {/* Desktop Search Results */}
      {isExpanded && (showResults || (!searchQuery && suggestions.length > 0)) && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 border rounded-lg shadow-lg z-[90] max-h-96 overflow-hidden"
          style={{ 
            backgroundColor: '#FAF9F6',
            borderColor: '#707070'
          }}
        >
          {/* Search Results */}
          {showResults && searchResults.length > 0 && (
            <div className="max-h-64 overflow-y-auto">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleResultClick(result)}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                  style={{ borderColor: '#E5E7EB' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {result.image ? (
                        <Image
                          src={result.image}
                          alt={result.title}
                          width={48}
                          height={48}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-xl">
                          {result.icon || getResultIcon(result.type)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{result.title}</h4>
                      {result.subtitle && (
                        <p className="text-sm text-gray-600 truncate">{result.subtitle}</p>
                      )}
                      {result.description && (
                        <p className="text-xs text-gray-500 truncate mt-1">{result.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#B22222', color: 'white' }}>
                          {result.category}
                        </span>
                        {result.location && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPinIcon className="w-3 h-3" />
                            {result.location}
                          </span>
                        )}
                        {result.rating && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <StarIcon className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {result.rating}
                          </span>
                        )}
                        {result.image_count && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <PhotoIcon className="w-3 h-3" />
                            {result.image_count} photos
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {showResults && searchResults.length === 0 && !isSearching && searchQuery && (
            <div className="p-4 text-center text-gray-500">
              <p>No results found for "{searchQuery}"</p>
              <p className="text-sm mt-1">Try searching for photographers, venues, decorators, or wedding albums</p>
            </div>
          )}

          {/* Suggestions */}
          {!searchQuery && suggestions.length > 0 && (
            <div className="p-4">
              <h5 className="text-sm font-medium text-gray-700 mb-3">Popular Searches</h5>
              <div className="grid grid-cols-2 gap-2">
                {suggestions.slice(0, 8).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left p-2 rounded-lg border transition-colors hover:bg-gray-50 hover:opacity-80"
                    style={{ 
                      borderColor: '#E5E7EB'
                    }}
                  >
                    <div className="font-medium text-sm text-gray-900">{suggestion.term}</div>
                    <div className="text-xs text-gray-500">{suggestion.count} results</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
