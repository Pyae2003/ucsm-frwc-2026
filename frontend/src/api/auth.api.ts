import api from '../lib/axios';
import type { LoginRequest, LoginResponse, ApiResponse, Admin } from '../types';

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/admin/login', data);
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse<Admin>> => {
    const response = await api.get<ApiResponse<Admin>>('/admin/profile');
    return response.data;
  },
};

