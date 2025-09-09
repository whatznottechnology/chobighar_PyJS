'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Vendors() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(prev => prev === categoryId ? null : categoryId);
  };

  const categories = [
    {
      id: 'venues',
      title: 'Wedding Venues',
      description: 'Beautiful venues for your perfect day',
      vendorCount: '250+',
      subcategories: [
        { name: 'Banquet Halls', count: 85, price: '₹50,000+' },
        { name: 'Marriage Gardens', count: 62, price: '₹30,000+' },
        { name: 'Wedding Resorts', count: 45, price: '₹1,00,000+' }
      ]
    },
    {
      id: 'photographers',
      title: 'Wedding Photographers', 
      description: 'Capture your precious moments',
      vendorCount: '180+',
      subcategories: [
        { name: 'Wedding Photography', count: 95, price: '₹25,000+' },
        { name: 'Pre Wedding Shoots', count: 48, price: '₹15,000+' },
        { name: 'Candid Photography', count: 62, price: '₹20,000+' }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Wedding Vendors Directory
        </h1>
        <p className="text-center text-gray-600 text-lg mb-12">
          Step 3: Categories data structure added 
        </p>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button 
                onClick={() => toggleCategory(category.id)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                    <p className="text-gray-600 mt-1">{category.description}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {category.vendorCount} vendors
                    </span>
                  </div>
                  {expandedCategory === category.id ? 
                    <ChevronUpIcon className="w-6 h-6 text-gray-400" /> : 
                    <ChevronDownIcon className="w-6 h-6 text-gray-400" />
                  }
                </div>
              </button>
              
              {expandedCategory === category.id && (
                <div className="border-t bg-gray-50 p-6">
                  <h4 className="font-semibold text-lg mb-4">Subcategories:</h4>
                  <div className="space-y-3">
                    {category.subcategories.map((sub, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded border">
                        <div>
                          <span className="font-medium">{sub.name}</span>
                          <span className="ml-2 text-sm text-gray-500">({sub.count} vendors)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">{sub.price}</span>
                          <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
