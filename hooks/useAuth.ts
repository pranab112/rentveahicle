import useSWR from 'swr';
import { authApi, LoginCredentials, RegisterData } from '../lib/api/auth';
import { setAuthToken, api } from '../lib/api';
import { Operator } from '../types';

const fetcher = (url: string) => api.get(url).then(res => res.data.data);

export const useAuth = () => {
  // Check if token exists in localStorage to determine if we should fetch user
  const token = localStorage.getItem('fleetlink_token');
  
  const { data: user, error, mutate, isLoading } = useSWR<Operator>(
    token ? '/auth/me' : null,
    fetcher
  );

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);
      setAuthToken(response.token);
      await mutate(response.user, false);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authApi.register(data);
      setAuthToken(response.token);
      await mutate(response.user, false);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setAuthToken(null);
    mutate(undefined, false);
  };

  const updateProfile = async (data: Partial<Operator>) => {
    try {
      const updatedUser = await authApi.updateMe(data);
      mutate(updatedUser, false);
      return updatedUser;
    } catch (err) {
      throw err;
    }
  };

  return {
    user,
    isLoading: isLoading && !!token, // Only loading if we have a token and are fetching
    isAuthenticated: !!user,
    error,
    login,
    register,
    logout,
    updateProfile
  };
};