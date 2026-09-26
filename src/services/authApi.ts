import api from './api';
import type { LoginCredentials, AuthResponse, ApiResponse } from '../types';

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<ApiResponse<AuthResponse>>('/admin/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('vilstay_admin_token');
  },

  getToken: () => localStorage.getItem('vilstay_admin_token'),

  isAuthenticated: () => !!localStorage.getItem('vilstay_admin_token'),
};
