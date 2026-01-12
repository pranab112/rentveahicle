import useSWR from 'swr';
import { bookingsApi, BookingFilters } from '../lib/api/bookings';
import { Booking } from '../types';

export const useBookings = (filters?: BookingFilters) => {
  const filterKey = JSON.stringify(filters);

  const { data: bookings, error, isLoading, mutate } = useSWR<Booking[]>(
    ['/bookings', filterKey],
    () => bookingsApi.getBookings(filters)
  );

  return {
    bookings: bookings || [],
    isLoading,
    error,
    refetch: mutate
  };
};