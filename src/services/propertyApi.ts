import api from './api';
import type { Property, PropertyFilters, ApiResponse } from '../types';

export const propertyApi = {
  // Public
  getProperties: async (filters?: PropertyFilters) => {
    const params = new URLSearchParams();
    if (filters?.brand) params.append('brand', filters.brand);
    if (filters?.destination) params.append('destination', filters.destination);
    if (filters?.propertyType) params.append('propertyType', filters.propertyType);
    if (filters?.featured !== undefined) params.append('featured', String(filters.featured));
    if (filters?.search) params.append('search', filters.search);
    if (filters?.minPrice) params.append('minPrice', String(filters.minPrice));
    if (filters?.maxPrice) params.append('maxPrice', String(filters.maxPrice));

    const response = await api.get<ApiResponse<Property[]>>(`/properties?${params.toString()}`);
    return response.data;
  },

  getPropertyBySlug: async (slug: string) => {
    const response = await api.get<ApiResponse<Property>>(`/properties/${slug}`);
    return response.data;
  },

  // Admin (protected)
  adminGetProperties: async () => {
    const response = await api.get<ApiResponse<Property[]>>('/admin/properties');
    return response.data;
  },

  createProperty: async (data: FormData) => {
    const response = await api.post<ApiResponse<Property>>('/admin/properties', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateProperty: async (id: string, data: FormData) => {
    const response = await api.put<ApiResponse<Property>>(`/admin/properties/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteProperty: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/admin/properties/${id}`);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get<ApiResponse<{
      total: number;
      byBrand: { vilstay: number; vilstayGo: number; vilstayVenue: number };
      recent: Property[];
    }>>('/admin/dashboard');
    return response.data;
  },
};
