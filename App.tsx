import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { TenantProvider } from './contexts/TenantContext';

// Layouts
import AdminLayout from './app/admin/layout';
import HomePage from './app/page';
import AdminDashboard from './app/admin/page';

// Public Pages
import VehicleListingPage from './app/vehicles/page';
import VehicleDetailPage from './app/vehicles/detail';
import BookingPage from './app/book/page';
import BookingConfirmedPage from './app/booking-confirmed/page';

// Admin Pages
import AdminVehiclesPage from './app/admin/vehicles/page';
import NewVehiclePage from './app/admin/vehicles/new';
import EditVehiclePage from './app/admin/vehicles/edit';
import AdminBookingsPage from './app/admin/bookings/page';
import BookingDetailPage from './app/admin/bookings/detail';
import AdminCalendarPage from './app/admin/calendar/page';
import AdminSettingsPage from './app/admin/settings/page';

// Legacy components adapted for the new router (Temporary until full page migration)
import { Marketplace } from './components/Marketplace';
import { RequestCenter } from './components/RequestCenter';

// Mock Data for legacy components
import { Vehicle, Booking, VehicleType, BookingStatus } from './types';

const MOCK_PARTNER_VEHICLES: Vehicle[] = [
  { id: 'p1', operatorId: 'partner_1', make: 'Ford', model: 'Transit', plate: 'PRT-111', type: VehicleType.VAN, imageUrl: 'https://picsum.photos/400/300?random=3', description: 'Partner vehicle: High roof spacious van.' },
];

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <span>FleetLink</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
             <a href="/" className="hover:text-indigo-600">Home</a>
             <a href="/vehicles" className="hover:text-indigo-600">Vehicles</a>
             <a href="/about" className="hover:text-indigo-600">About</a>
          </nav>
          <div className="flex items-center gap-4">
             <a href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">Operator Login</a>
             <a href="/admin" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition-colors">Book Now</a>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          © 2024 FleetLink. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const MarketplaceWrapper = () => {
  return <div className="space-y-6"><div><h2 className="text-2xl font-bold">Partner Network</h2></div><Marketplace partnerVehicles={MOCK_PARTNER_VEHICLES} onRequestVehicle={() => alert('Request sent!')} /></div>;
}

const App: React.FC = () => {
  return (
    <TenantProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/vehicles" element={<VehicleListingPage />} />
            <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
            <Route path="/book/:vehicleId" element={<BookingPage />} />
            <Route path="/booking-confirmed" element={<BookingConfirmedPage />} />
            <Route path="/login" element={<div className="container mx-auto py-12 px-4 text-center">Login Page (Coming Soon)</div>} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            
            {/* Vehicle Management Routes */}
            <Route path="fleet" element={<AdminVehiclesPage />} /> 
            <Route path="vehicles" element={<AdminVehiclesPage />} />
            <Route path="vehicles/new" element={<NewVehiclePage />} />
            <Route path="vehicles/:id" element={<EditVehiclePage />} />

            {/* Booking Management Routes */}
            <Route path="bookings" element={<AdminBookingsPage />} />
            <Route path="bookings/:id" element={<BookingDetailPage />} />
            
            {/* Calendar Route */}
            <Route path="calendar" element={<AdminCalendarPage />} />

            {/* Settings Route */}
            <Route path="settings" element={<AdminSettingsPage />} />

            <Route path="marketplace" element={<MarketplaceWrapper />} />
            <Route path="requests" element={<RequestCenter incomingRequests={[]} outgoingRequests={[]} onHandleRequest={() => {}} />} />
            
            <Route path="customers" element={<div className="p-8 text-center text-slate-500">Customer Management Module</div>} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TenantProvider>
  );
};

export default App;