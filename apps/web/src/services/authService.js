import { apiRequest } from './api';

export const authService = {
  login: async (credentials) => {
    const res = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (res.data?.token) {
      localStorage.setItem('pern_auth_token', res.data.token);
    }
    return res.data;
  },
  register: async (data) => {
    return await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },
  logout: () => {
    localStorage.removeItem('pern_auth_token');
  }
};
