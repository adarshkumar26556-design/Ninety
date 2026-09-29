import { useState, useEffect } from 'react';
import type { Property, PropertyFilters } from '../types';
import { propertyApi } from '../services/propertyApi';
import { MOCK_PROPERTIES } from '../data/properties';

export const useProperties = (filters?: PropertyFilters) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      
      // Use mock data directly since we are modifying properties.ts
      let filtered = [...MOCK_PROPERTIES].filter(p => p.status === 'active');
      if (filters?.brand) filtered = filtered.filter(p => p.brand === filters.brand);
      if (filters?.featured) filtered = filtered.filter(p => p.featured);
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.location.destination.toLowerCase().includes(q)
        );
      }
      setProperties(filtered);
      setLoading(false);
    };
    fetchProperties();
  }, [filters?.brand, filters?.featured, filters?.search, filters?.destination, filters?.propertyType]);

  return { properties, loading, error };
};

export const useProperty = (slug: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);
      
      const found = MOCK_PROPERTIES.find(p => p.slug === slug);
      if (found) setProperty(found);
      else setError('Property not found');
      
      setLoading(false);
    };
    fetchProperty();
  }, [slug]);

  return { property, loading, error };
};
