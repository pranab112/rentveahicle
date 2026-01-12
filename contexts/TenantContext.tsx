import React, { createContext, useContext, useEffect, useState } from 'react';
import { Tenant } from '../types';
import { getTenantSlug, hexToHsl } from '../lib/tenant';
import { api, setTenantHeader } from '../lib/api';

interface TenantContextType {
  tenant: Tenant | null;
  loading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  loading: true,
  error: null
});

// Mock fetch for now, replace with real API call later
const fetchTenant = async (slug: string): Promise<Tenant> => {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 600));
    
    // Hardcoded demo logic for MVP
    if (slug === 'demo') {
        return {
            id: 't_demo',
            name: 'Demo Fleet',
            domain: 'demo.fleetlink.com',
            primaryColor: '#4f46e5' // indigo-600
        };
    }
    if (slug === 'red') {
        return {
            id: 't_red',
            name: 'Red Express',
            domain: 'red.fleetlink.com',
            primaryColor: '#dc2626' // red-600
        };
    }
    if (slug === 'green') {
        return {
            id: 't_green',
            name: 'Green Tours',
            domain: 'green.fleetlink.com',
            primaryColor: '#059669' // emerald-600
        };
    }
    
    // Fallback/Default for this environment if no slug matches
    // This allows the app to work immediately without configuration
    return {
        id: 't_default',
        name: 'FleetLink Operator',
        domain: 'app.fleetlink.com',
        primaryColor: '#4f46e5'
    };
};

export const TenantProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initTenant = async () => {
      try {
        const slug = getTenantSlug();
        const targetSlug = slug || 'demo'; // Default to demo if no specific tenant requested
        
        console.log(`Initializing tenant: ${targetSlug}`);
        const data = await fetchTenant(targetSlug);
        setTenant(data);
        setTenantHeader(data.id);
        
        // Apply theme
        if (data.primaryColor) {
          const hsl = hexToHsl(data.primaryColor);
          document.documentElement.style.setProperty('--primary', hsl);
          document.documentElement.style.setProperty('--ring', hsl);
        }
        
        // Update title
        document.title = `${data.name} - FleetLink`;
        
      } catch (err) {
        console.error("Failed to load tenant", err);
        setError("Operator not found");
      } finally {
        setLoading(false);
      }
    };

    initTenant();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
            <p className="text-slate-500 text-sm font-medium">Loading Operator...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md p-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Operator Not Found</h1>
            <p className="text-slate-500 mb-6">The fleet operator you are looking for does not exist or is currently unavailable.</p>
            <button onClick={() => window.location.search = '?tenant=demo'} className="text-indigo-600 hover:underline font-medium">
              Try Demo Store
            </button>
        </div>
      </div>
    );
  }

  return (
    <TenantContext.Provider value={{ tenant, loading, error }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenantContext = () => useContext(TenantContext);