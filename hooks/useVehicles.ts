import useSWR from 'swr';
import { vehiclesApi, VehicleFilters } from '../lib/api/vehicles';
import { publicApi, PublicVehicleFilters } from '../lib/api/public';
import { Vehicle } from '../types';

interface UseVehiclesOptions {
  isAdmin?: boolean;
  filters?: VehicleFilters | PublicVehicleFilters;
  disabled?: boolean;
}

export const useVehicles = ({ isAdmin = false, filters, disabled = false }: UseVehiclesOptions = {}) => {
  // Construct a stable key from filters
  const filterKey = JSON.stringify(filters);
  const endpoint = isAdmin ? '/vehicles' : '/public/vehicles';

  const { data: vehicles, error, isLoading, mutate } = useSWR<Vehicle[]>(
    disabled ? null : [endpoint, filterKey],
    async () => {
      if (isAdmin) {
        return vehiclesApi.getVehicles(filters as VehicleFilters);
      } else {
        return publicApi.getPublicVehicles(filters as PublicVehicleFilters);
      }
    }
  );

  return {
    vehicles: vehicles || [],
    isLoading,
    error,
    refetch: mutate
  };
};