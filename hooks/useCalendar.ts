import useSWR from 'swr';
import { bookingsApi } from '../lib/api/bookings';
import { Booking } from '../types';

export const useCalendar = (month: number, year: number, vehicleId?: string) => {
  // Ensure we only fetch if we have valid month/year
  const shouldFetch = month >= 0 && year >= 2000;

  const { data: bookings, error, isLoading, mutate } = useSWR<Booking[]>(
    shouldFetch ? ['/bookings/calendar', month, year, vehicleId] : null,
    () => bookingsApi.getCalendarBookings(month, year, vehicleId)
  );

  return {
    events: bookings || [],
    isLoading,
    error,
    refetch: mutate
  };
};