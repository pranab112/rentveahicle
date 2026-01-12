import useSWR from 'swr';
import { bookingsApi } from '../lib/api/bookings';
import { Booking, BookingStatus } from '../types';

export const useBooking = (id: string) => {
  const { data: booking, error, isLoading, mutate } = useSWR<Booking>(
    id ? `/bookings/${id}` : null,
    () => bookingsApi.getBooking(id)
  );

  const updateStatus = async (status: BookingStatus) => {
    if (!booking) return;
    try {
        const updated = await bookingsApi.updateBookingStatus(id, status);
        mutate(updated, false); // Optimistic update could be implemented here
        return updated;
    } catch (e) {
        throw e;
    }
  };

  const update = async (data: Partial<Booking>) => {
    if (!booking) return;
    try {
        const updated = await bookingsApi.updateBooking(id, data);
        mutate(updated, false);
        return updated;
    } catch (e) {
        throw e;
    }
  };

  return {
    booking,
    isLoading,
    error,
    updateStatus,
    update,
    refetch: mutate
  };
};