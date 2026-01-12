import useSWR from 'swr';
import { vehiclesApi } from '../lib/api/vehicles';
import { publicApi } from '../lib/api/public';
import { Vehicle } from '../types';

interface UseVehicleOptions {
  id: string;
  isAdmin?: boolean;
}

export const useVehicle = ({ id, isAdmin = false }: UseVehicleOptions) => {
  const endpoint = isAdmin ? `/vehicles/${id}` : `/public/vehicles/${id}`;

  const { data: vehicle, error, isLoading, mutate } = useSWR<Vehicle>(
    id ? endpoint : null,
    async () => {
       if (isAdmin) {
           return vehiclesApi.getVehicle(id);
       } else {
           return publicApi.getPublicVehicle(id);
       }
    }
  );

  return {
    vehicle,
    isLoading,
    error,
    refetch: mutate
  };
};