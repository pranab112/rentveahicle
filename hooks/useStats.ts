import useSWR from 'swr';
import { api, ApiResponse } from '../lib/api';

export interface DashboardStats {
  totalVehicles: number;
  activeBookings: number;
  pendingRequests: number;
  monthlyRevenue: number;
  vehicleUtilization: number;
  recentActivity: any[];
}

const getStats = async (): Promise<DashboardStats> => {
    // In a real app, this would be a dedicated endpoint
    // For now, we simulate fetching stats via a dedicated path or calculate from other endpoints if API doesn't support
    const response = await api.get<ApiResponse<DashboardStats>>('/admin/stats');
    return response.data.data;
};

export const useStats = () => {
  const { data: stats, error, isLoading, mutate } = useSWR<DashboardStats>(
    '/admin/stats',
    getStats
  );

  return {
    stats,
    isLoading,
    error,
    refetch: mutate
  };
};