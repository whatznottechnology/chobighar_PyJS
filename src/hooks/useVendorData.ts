import { useState, useEffect } from 'react';
import { 
  vendorService, 
  VendorCategory, 
  VendorSubCategory, 
  VendorProfile, 
  VendorProfileListItem 
} from '../services/vendorService';

export const useVendorCategories = () => {
  const [categories, setCategories] = useState<VendorCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await vendorService.getCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useVendorCategory = (slug: string) => {
  const [category, setCategory] = useState<VendorCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await vendorService.getCategoryBySlug(slug);
        setCategory(data);
      } catch (err) {
        setError('Failed to load category');
        console.error('Error fetching category:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  return { category, loading, error };
};

export const useVendorSubcategory = (slug: string) => {
  const [subcategory, setSubcategory] = useState<VendorSubCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchSubcategory = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await vendorService.getSubcategoryBySlug(slug);
        setSubcategory(data);
      } catch (err) {
        setError('Failed to load subcategory');
        console.error('Error fetching subcategory:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategory();
  }, [slug]);

  return { subcategory, loading, error };
};

export const useVendorProfiles = (filters?: {
  category?: string;
  subcategory?: string;
  featured?: boolean;
  location?: string;
  search?: string;
}) => {
  const [vendors, setVendors] = useState<VendorProfileListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await vendorService.getVendorProfiles(filters);
        setVendors(data);
      } catch (err) {
        setError('Failed to load vendors');
        console.error('Error fetching vendors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [
    filters?.category,
    filters?.subcategory,
    filters?.featured,
    filters?.location,
    filters?.search,
  ]);

  return { vendors, loading, error };
};

export const useVendorProfile = (slug: string) => {
  const [vendor, setVendor] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchVendor = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await vendorService.getVendorProfileBySlug(slug);
        setVendor(data);
      } catch (err) {
        setError('Failed to load vendor profile');
        console.error('Error fetching vendor profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [slug]);

  return { vendor, loading, error };
};

export const useFeaturedVendors = () => {
  const [vendors, setVendors] = useState<VendorProfileListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedVendors = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await vendorService.getFeaturedVendors();
        setVendors(data);
      } catch (err) {
        setError('Failed to load featured vendors');
        console.error('Error fetching featured vendors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedVendors();
  }, []);

  return { vendors, loading, error };
};

export const useVendorsByCategory = (categorySlug: string) => {
  const [data, setData] = useState<{
    category: VendorCategory | null;
    vendors: VendorProfileListItem[];
  }>({ category: null, vendors: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categorySlug) return;

    const fetchVendorsByCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await vendorService.getVendorsByCategory(categorySlug);
        setData(result);
      } catch (err) {
        setError('Failed to load vendors by category');
        console.error('Error fetching vendors by category:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorsByCategory();
  }, [categorySlug]);

  return { ...data, loading, error };
};

export const useVendorsBySubcategory = (subcategorySlug: string) => {
  const [data, setData] = useState<{
    subcategory: VendorSubCategory | null;
    vendors: VendorProfileListItem[];
  }>({ subcategory: null, vendors: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subcategorySlug) return;

    const fetchVendorsBySubcategory = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await vendorService.getVendorsBySubcategory(subcategorySlug);
        setData(result);
      } catch (err) {
        setError('Failed to load vendors by subcategory');
        console.error('Error fetching vendors by subcategory:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorsBySubcategory();
  }, [subcategorySlug]);

  return { ...data, loading, error };
};