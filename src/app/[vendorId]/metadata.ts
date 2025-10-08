import { Metadata } from 'next';

interface VendorProfileData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  category_name: string;
  subcategory_name: string;
  rating: number;
  reviews_count: number;
  experience: string;
  price_range: string;
  phone: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  images: Array<{
    id: string;
    image: string;
    title: string;
    image_type: string;
  }>;
}

export async function generateMetadata({ params }: { params: { vendorId: string } }): Promise<Metadata> {
  const vendorSlug = params.vendorId;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  try {
    // Fetch vendor data for metadata
    const response = await fetch(`${API_BASE_URL}/api/vendor/profiles/${vendorSlug}/`, {
      cache: 'no-store' // Always get fresh data for metadata
    });
    
    if (!response.ok) {
      return {
        title: 'Vendor Not Found - chobighar',
        description: 'The requested vendor profile could not be found.',
      };
    }
    
    const vendor: VendorProfileData = await response.json();
    
    // Get the main profile image
    const profileImage = vendor.images?.find(img => img.image_type === 'profile')?.image || 
                        vendor.images?.[0]?.image || 
                        '/img/default-vendor.jpg';
    
    // Use meta fields from backend if available, otherwise generate
    const title = vendor.meta_title || 
                 `${vendor.name} - ${vendor.subcategory_name} in ${vendor.location} | chobighar`;
    
    const description = vendor.meta_description || 
                       (vendor.description 
                         ? `${vendor.description.substring(0, 160)}...`
                         : `${vendor.name} offers professional ${vendor.subcategory_name} services in ${vendor.location}. ${vendor.experience} of experience. Rating: ${vendor.rating}/5 (${vendor.reviews_count} reviews). Contact for bookings.`);
    
    // Use meta keywords from backend if available, otherwise generate
    const keywords = vendor.meta_keywords || 
                    [
                      vendor.name,
                      vendor.subcategory_name,
                      vendor.category_name,
                      vendor.location,
                      'wedding photography',
                      'event photography',
                      'professional photographer',
                      'wedding vendor',
                      'event planning',
                      'chobighar',
                      vendor.tagline,
                      `${vendor.subcategory_name} ${vendor.location}`,
                      `wedding ${vendor.subcategory_name}`,
                      `professional ${vendor.subcategory_name}`
                    ].filter(Boolean).join(', ');
    
    // Prepare image URL
    const imageUrl = profileImage.startsWith('http') ? profileImage : `${API_BASE_URL}${profileImage}`;
    
    return {
      title,
      description,
      keywords,
      authors: [{ name: 'chobighar' }],
      creator: 'chobighar',
      publisher: 'chobighar',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        title,
        description,
        url: `https://chobighar.com/${vendorSlug}`,
        siteName: 'chobighar',
        type: 'profile',
        locale: 'en_IN',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${vendor.name} - ${vendor.subcategory_name} in ${vendor.location}`,
          },
          // Add gallery images as additional OG images
          ...vendor.images.slice(0, 3).map(img => ({
            url: img.image.startsWith('http') ? img.image : `${API_BASE_URL}${img.image}`,
            width: 800,
            height: 600,
            alt: `${vendor.name} - ${img.title || 'Portfolio Image'}`,
          }))
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
        creator: '@chobighar',
        site: '@chobighar',
      },
      alternates: {
        canonical: `https://chobighar.com/${vendorSlug}`,
      },
      other: {
        'og:business:hours': 'mo-su 09:00-21:00',
        'og:type': 'business.business',
        'business:contact_data:street_address': vendor.location,
        'business:contact_data:locality': vendor.location,
        'business:contact_data:region': 'West Bengal',
        'business:contact_data:postal_code': '',
        'business:contact_data:country_name': 'India',
        'business:contact_data:email': vendor.email,
        'business:contact_data:phone_number': vendor.phone,
        'business:contact_data:website': vendor.website || `https://chobighar.com/${vendorSlug}`,
      },
    };
    
  } catch (error) {
    console.error('Error generating metadata for vendor:', error);
    return {
      title: 'Vendor Profile - chobighar',
      description: 'Professional wedding and event vendors in Kolkata. Find the best photographers, decorators, and event planners.',
    };
  }
}