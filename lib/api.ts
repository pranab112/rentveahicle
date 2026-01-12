import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// In a real env, this comes from process.env.NEXT_PUBLIC_API_URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"; 

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 1. Auth Token
    const token = localStorage.getItem('fleetlink_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 2. Tenant ID
    // We try to get it from the helper setter first (common headers), 
    // fallback to localStorage if needed for persistency across reloads before Context inits
    // Note: The Context usually sets the common header, but explicit check here is safer.
    const storedTenant = localStorage.getItem('fleetlink_tenant_id');
    if (storedTenant && !config.headers['X-Tenant-ID']) {
      config.headers['X-Tenant-ID'] = storedTenant;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('fleetlink_token');
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
      }

      // You might want to trigger a toast notification here
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Network error
      console.error('Network Error:', error.request);
      // alert('Network error. Please check your connection.');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Helper to manually set auth token (e.g. after login)
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('fleetlink_token', token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('fleetlink_token');
    delete api.defaults.headers.common["Authorization"];
  }
};

// Helper to set tenant header
export const setTenantHeader = (tenantId: string | null) => {
  if (tenantId) {
    localStorage.setItem('fleetlink_tenant_id', tenantId);
    api.defaults.headers.common["X-Tenant-ID"] = tenantId;
  } else {
    localStorage.removeItem('fleetlink_tenant_id');
    delete api.defaults.headers.common["X-Tenant-ID"];
  }
};

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}