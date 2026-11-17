import { apiRequest } from './api';
import type { User, AuthResponse } from '../types';

export const authService = {
  login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const res = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (res.data?.token) {
      localStorage.setItem('pern_auth_token', res.data.token);
    }
    return res.data;
  },
  register: async (data: { email: string; password: string; name: string }) => {
    return await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getCurrentUser: async (): Promise<{ data: User }> => {
    return await apiRequest<User>('/auth/me');
  },
  logout: () => {
    localStorage.removeItem('pern_auth_token');
  }
};
