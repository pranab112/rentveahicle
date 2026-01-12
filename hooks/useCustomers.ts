import useSWR from 'swr';
import { customersApi, CustomerFilters } from '../lib/api/customers';
import { Customer } from '../types';

export const useCustomers = (filters?: CustomerFilters) => {
  const filterKey = JSON.stringify(filters);

  const { data: customers, error, isLoading, mutate } = useSWR<Customer[]>(
    ['/customers', filterKey],
    () => customersApi.getCustomers(filters)
  );

  return {
    customers: customers || [],
    isLoading,
    error,
    refetch: mutate
  };
};