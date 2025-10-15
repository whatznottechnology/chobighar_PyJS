/**
 * Blog content processing utilities
 */

import { getMediaUrl } from '@/config/api';

/**
 * Process blog content to fix image URLs and improve formatting
 */
export function processBlogContent(content: string): string {
  if (!content) return '';

  let processedContent = content;

  // Get the API base URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Fix relative image URLs to absolute URLs - more comprehensive approach
  processedContent = processedContent.replace(
    /src="([^"]+)"/g,
    (match, src) => {
      // If already absolute URL, return as is
      if (src.startsWith('http://') || src.startsWith('https://')) {
        return match;
      }
      
      // If relative path starting with /media/
      if (src.startsWith('/media/')) {
        return `src="${API_BASE_URL}${src}"`;
      }
      
      // If relative path not starting with /
      if (src.startsWith('media/')) {
        return `src="${API_BASE_URL}/${src}"`;
      }
      
      // For any other relative path
      if (!src.startsWith('/')) {
        return `src="${API_BASE_URL}/${src}"`;
      }
      
      // Default case - prepend API base URL
      return `src="${API_BASE_URL}${src}"`;
    }
  );

  // Add responsive classes and ensure proper styling for images
  processedContent = processedContent.replace(
    /<img([^>]+)>/g,
    (match, attributes) => {
      // Remove any existing width/height constraints
      const cleanAttributes = attributes
        .replace(/style="[^"]*"/gi, '')
        .replace(/width="[^"]*"/gi, '')
        .replace(/height="[^"]*"/gi, '');
      
      return `<img${cleanAttributes} class="max-w-full h-auto rounded-xl shadow-lg mx-auto my-6 block" style="max-width: 100%; height: auto;">`;
    }
  );

  // Add responsive classes to iframes (videos)
  processedContent = processedContent.replace(
    /<iframe([^>]+)>/g,
    (match, attributes) => {
      return `<iframe${attributes} class="max-w-full rounded-xl shadow-lg mx-auto my-6 block" style="min-height: 300px; max-width: 100%; width: 100%;">`;
    }
  );

  // Handle content that's all in one paragraph - split into proper sections
  if (processedContent.startsWith('<p>') && processedContent.endsWith('</p>') && !processedContent.includes('</p><p>')) {
    // Remove outer p tags first
    let textContent = processedContent.replace(/^<p>|<\/p>$/g, '');
    
    // Split content into sections based on common patterns
    const sections = [];
    let currentSection = '';
    
    // Split by numbered headings (1., 2., etc.)
    const parts = textContent.split(/(\d+\.\s+[^.]+(?:\s+[A-Z][^.]*)*)/);
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim();
      if (!part) continue;
      
      // Check if this is a numbered heading
      if (/^\d+\.\s+/.test(part)) {
        // Save previous section
        if (currentSection) {
          sections.push(currentSection);
          currentSection = '';
        }
        
        // Extract the heading
        const headingMatch = part.match(/^(\d+\.\s+[^.]+)/);
        if (headingMatch) {
          const heading = headingMatch[1];
          const remaining = part.substring(headingMatch[0].length).trim();
          
          sections.push(`<h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">${heading}</h3>`);
          
          if (remaining) {
            currentSection = remaining;
          }
        }
      } else {
        // Add to current section
        currentSection += (currentSection ? ' ' : '') + part;
      }
    }
    
    // Add the last section
    if (currentSection) {
      sections.push(currentSection);
    }
    
    // Process sections into paragraphs with proper styling
    const processedSections = sections.map(section => {
      if (section.startsWith('<h') || section.includes('<img')) {
        return section; // Already formatted
      }
      
      // Split long sections into paragraphs
      const sentences = section.match(/[^.!?]+[.!?]+/g) || [section];
      const paragraphs = [];
      let currentParagraph = '';
      
      for (const sentence of sentences) {
        currentParagraph += sentence;
        
        // Create new paragraph after 3-4 sentences or if very long
        if (currentParagraph.length > 300 || 
            (currentParagraph.split(/[.!?]/).length > 3 && currentParagraph.length > 150)) {
          paragraphs.push(`<p style="color: #374151; line-height: 1.7; margin-bottom: 1.5rem; font-size: 1.125rem;">${currentParagraph.trim()}</p>`);
          currentParagraph = '';
        }
      }
      
      // Add remaining content
      if (currentParagraph.trim()) {
        paragraphs.push(`<p style="color: #374151; line-height: 1.7; margin-bottom: 1.5rem; font-size: 1.125rem;">${currentParagraph.trim()}</p>`);
      }
      
      return paragraphs.join('\n\n');
    });
    
    processedContent = processedSections.join('\n\n');
  }

  // Clean up any remaining numbered headings that weren't caught above
  processedContent = processedContent.replace(
    /<p>(\d+\.\s+[^<]+?)<\/p>/g,
    '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">$1</h3>'
  );

  // Ensure proper spacing around block elements
  processedContent = processedContent.replace(/(<\/h[1-6]>)\s*(<p>)/g, '$1\n\n$2');
  processedContent = processedContent.replace(/(<\/p>)\s*(<h[1-6]>)/g, '$1\n\n$2');

  // Final fallback: if content still doesn't have proper paragraphs, wrap everything
  if (!processedContent.includes('<p') && !processedContent.includes('<h')) {
    processedContent = `<p style="color: #374151; line-height: 1.7; margin-bottom: 1.5rem; font-size: 1.125rem;">${processedContent}</p>`;
  }

  // Ensure all text has proper color styling
  processedContent = processedContent.replace(
    /<p([^>]*)>/g, 
    '<p$1 style="color: #374151; line-height: 1.7; margin-bottom: 1.5rem; font-size: 1.125rem;">'
  );

  return processedContent;
}

/**
 * Extract first image from content for use as thumbnail
 */
export function extractFirstImage(content: string): string | null {
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
  return imgMatch ? imgMatch[1] : null;
}

/**
 * Calculate estimated reading time
 */
export function calculateReadingTime(content: string): number {
  if (!content) return 1;
  
  // Remove HTML tags and count words
  const textContent = content.replace(/<[^>]*>/g, '');
  const words = textContent.trim().split(/\s+/).length;
  
  // Average reading speed is 200 words per minute
  const readingTime = Math.ceil(words / 200);
  
  return Math.max(1, readingTime);
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  if (!content) return '';
  
  // Remove HTML tags
  const textContent = content.replace(/<[^>]*>/g, '');
  
  if (textContent.length <= maxLength) {
    return textContent;
  }
  
  // Cut at word boundary
  const excerpt = textContent.substring(0, maxLength);
  const lastSpace = excerpt.lastIndexOf(' ');
  
  if (lastSpace > 0) {
    return excerpt.substring(0, lastSpace) + '...';
  }
  
  return excerpt + '...';
}