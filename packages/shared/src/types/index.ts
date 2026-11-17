export interface UserDTO {
  id: number;
  email: string;
  name: string;
  isActive: boolean;
  roles: string[];
}

export interface ApiResponseDTO<T = any> {
  success: boolean;
  message: string;
  data: T;
}
