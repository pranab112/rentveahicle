import { api, ApiResponse } from '../api';
import { Booking, BookingStatus } from '../../types';

export interface BookingFilters {
  status?: BookingStatus | 'All';
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface CreateBookingRequest extends Partial<Booking> {
  // Add any specific fields required for creation that aren't in the base type
}

export const bookingsApi = {
  getBookings: async (filters?: BookingFilters): Promise<Booking[]> => {
    const response = await api.get<ApiResponse<Booking[]>>('/bookings', { params: filters });
    return response.data.data;
  },

  getBooking: async (id: string): Promise<Booking> => {
    const response = await api.get<ApiResponse<Booking>>(`/bookings/${id}`);
    return response.data.data;
  },

  // Public creating a booking request
  createBooking: async (data: CreateBookingRequest): Promise<Booking> => {
    const response = await api.post<ApiResponse<Booking>>('/bookings', data);
    return response.data.data;
  },

  updateBookingStatus: async (id: string, status: BookingStatus): Promise<Booking> => {
    const response = await api.patch<ApiResponse<Booking>>(`/bookings/${id}/status`, { status });
    return response.data.data;
  },

  updateBooking: async (id: string, data: Partial<Booking>): Promise<Booking> => {
    const response = await api.put<ApiResponse<Booking>>(`/bookings/${id}`, data);
    return response.data.data;
  },

  getCalendarBookings: async (month: number, year: number, vehicleId?: string): Promise<Booking[]> => {
    const response = await api.get<ApiResponse<Booking[]>>('/bookings/calendar', {
      params: { month, year, vehicleId }
    });
    return response.data.data;
  }
};