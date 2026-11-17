export interface User {
  id: number;
  email: string;
  name: string;
  is_active: boolean;
  roles?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  errors?: any;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRoles: number;
  systemHealth: string;
  timestamp: string;
}
