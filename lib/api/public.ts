import { api, ApiResponse } from '../api';
import { Tenant, Vehicle, Booking, VehicleType } from '../../types';

export interface PublicVehicleFilters {
  type?: VehicleType | 'All';
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  startDate?: string;
  endDate?: string;
}

export interface BookingRequestData {
  vehicleId: string;
  startDate: string;
  endDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupLocation: string;
  pickupTime: string;
  specialRequests?: string;
}

export const publicApi = {
  getTenantInfo: async (slug: string): Promise<Tenant> => {
    // Note: This endpoint might be unauthenticated, or use a public API key if needed
    // Usually tenants are resolved by subdomain, but an API endpoint is good for the context
    const response = await api.get<ApiResponse<Tenant>>(`/public/tenants/${slug}`);
    return response.data.data;
  },

  getPublicVehicles: async (filters?: PublicVehicleFilters): Promise<Vehicle[]> => {
    const response = await api.get<ApiResponse<Vehicle[]>>('/public/vehicles', { params: filters });
    return response.data.data;
  },

  getPublicVehicle: async (id: string): Promise<Vehicle> => {
    const response = await api.get<ApiResponse<Vehicle>>(`/public/vehicles/${id}`);
    return response.data.data;
  },

  checkAvailability: async (vehicleId: string, startDate: string, endDate: string): Promise<boolean> => {
    const response = await api.get<ApiResponse<{ available: boolean }>>(`/public/vehicles/${vehicleId}/availability`, {
      params: { startDate, endDate }
    });
    return response.data.data.available;
  },

  createBookingRequest: async (data: BookingRequestData): Promise<Booking> => {
    const response = await api.post<ApiResponse<Booking>>('/public/bookings', data);
    return response.data.data;
  }
};