import { api, ApiResponse } from '../api';
import { Operator } from '../../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  companyName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: Operator;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data.data;
  },

  getMe: async (): Promise<Operator> => {
    const response = await api.get<ApiResponse<Operator>>('/auth/me');
    return response.data.data;
  },

  updateMe: async (data: Partial<Operator>): Promise<Operator> => {
    const response = await api.put<ApiResponse<Operator>>('/auth/me', data);
    return response.data.data;
  },

  changePassword: async (current: string, newPass: string): Promise<void> => {
    await api.post('/auth/change-password', { current, new: newPass });
  }
};