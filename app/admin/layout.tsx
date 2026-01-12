import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/admin/Sidebar';
import { AdminHeader } from '../../components/admin/Header';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mock Auth Check
  useEffect(() => {
    // In a real app, verify token/session here
    const isAuthenticated = true; 
    if (!isAuthenticated) {
        navigate('/login');
    }
  }, [navigate]);

  // Determine Page Title based on route
  const getPageTitle = () => {
      const path = location.pathname;
      if (path === '/admin') return 'Dashboard';
      if (path.includes('/admin/fleet')) return 'Vehicle Management';
      if (path.includes('/admin/bookings')) return 'Bookings';
      if (path.includes('/admin/calendar')) return 'Calendar';
      if (path.includes('/admin/customers')) return 'Customers';
      if (path.includes('/admin/marketplace')) return 'Partner Network';
      if (path.includes('/admin/requests')) return 'Request Center';
      if (path.includes('/admin/settings')) return 'Settings';
      return 'FleetLink Admin';
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-h-screen md:ml-64 transition-all duration-300">
         <AdminHeader title={getPageTitle()} onMenuClick={() => setSidebarOpen(true)} />
         
         <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto w-full">
              {children || <Outlet />}
            </div>
         </main>
      </div>
    </div>
  );
}