import useSWR from 'swr';
import { publicApi } from '../lib/api/public';
import { getTenantSlug, hexToHsl } from '../lib/tenant';
import { setTenantHeader } from '../lib/api';
import { Tenant } from '../types';
import { useEffect } from 'react';

// We use a key that includes the slug to ensure SWR caches correctly per tenant
const getTenantKey = () => {
  const slug = getTenantSlug();
  return slug ? `/public/tenants/${slug}` : null;
};

export const useTenant = () => {
  const slug = getTenantSlug() || 'demo';
  
  const { data: tenant, error, isLoading } = useSWR<Tenant>(
    `/public/tenants/${slug}`,
    () => publicApi.getTenantInfo(slug),
    {
        revalidateOnFocus: false,
        shouldRetryOnError: false
    }
  );

  useEffect(() => {
    if (tenant) {
      // 1. Set global API header
      setTenantHeader(tenant.id);

      // 2. Set Theme Colors
      if (tenant.primaryColor) {
        const hsl = hexToHsl(tenant.primaryColor);
        document.documentElement.style.setProperty('--primary', hsl);
        document.documentElement.style.setProperty('--ring', hsl);
      }

      // 3. Set Document Title
      document.title = `${tenant.name} - FleetLink`;
    }
  }, [tenant]);

  return {
    tenant,
    isLoading,
    error
  };
};