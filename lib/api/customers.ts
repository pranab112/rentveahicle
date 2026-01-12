import { api, ApiResponse } from '../api';
import { Customer } from '../../types';

export interface CustomerFilters {
  search?: string;
  isVerified?: boolean;
}

export const customersApi = {
  getCustomers: async (filters?: CustomerFilters): Promise<Customer[]> => {
    const response = await api.get<ApiResponse<Customer[]>>('/customers', { params: filters });
    return response.data.data;
  },

  getCustomer: async (id: string): Promise<Customer> => {
    const response = await api.get<ApiResponse<Customer>>(`/customers/${id}`);
    return response.data.data;
  },

  updateCustomer: async (id: string, data: Partial<Customer>): Promise<Customer> => {
    const response = await api.put<ApiResponse<Customer>>(`/customers/${id}`, data);
    return response.data.data;
  },

  verifyCustomer: async (id: string): Promise<void> => {
    await api.post(`/customers/${id}/verify`);
  },

  uploadDocuments: async (customerId: string, files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach(file => formData.append('documents', file));

    const response = await api.post<ApiResponse<{ urls: string[] }>>(
      `/customers/${customerId}/documents`, 
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data.data.urls;
  }
};