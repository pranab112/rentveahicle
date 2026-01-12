import { api, ApiResponse } from '../api';
import { Vehicle, VehicleType, VehicleStatus } from '../../types';

export interface VehicleFilters {
  type?: VehicleType | 'All';
  status?: VehicleStatus | 'All';
  search?: string;
}

export interface DateBlockData {
  startDate: string;
  endDate: string;
  reason?: string;
}

export const vehiclesApi = {
  getVehicles: async (filters?: VehicleFilters): Promise<Vehicle[]> => {
    const response = await api.get<ApiResponse<Vehicle[]>>('/vehicles', { params: filters });
    return response.data.data;
  },

  getVehicle: async (id: string): Promise<Vehicle> => {
    const response = await api.get<ApiResponse<Vehicle>>(`/vehicles/${id}`);
    return response.data.data;
  },

  createVehicle: async (data: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await api.post<ApiResponse<Vehicle>>('/vehicles', data);
    return response.data.data;
  },

  updateVehicle: async (id: string, data: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await api.put<ApiResponse<Vehicle>>(`/vehicles/${id}`, data);
    return response.data.data;
  },

  deleteVehicle: async (id: string): Promise<void> => {
    await api.delete(`/vehicles/${id}`);
  },

  uploadPhotos: async (vehicleId: string, files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach(file => formData.append('photos', file));
    
    const response = await api.post<ApiResponse<{ urls: string[] }>>(
      `/vehicles/${vehicleId}/photos`, 
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data.data.urls;
  },

  getAvailability: async (vehicleId: string, startDate: string, endDate: string): Promise<boolean> => {
    const response = await api.get<ApiResponse<{ available: boolean }>>(`/vehicles/${vehicleId}/availability`, {
      params: { startDate, endDate }
    });
    return response.data.data.available;
  },

  blockDates: async (vehicleId: string, data: DateBlockData): Promise<void> => {
    await api.post(`/vehicles/${vehicleId}/block`, data);
  }
};