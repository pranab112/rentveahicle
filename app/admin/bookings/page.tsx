import React, { useState } from 'react';
import { Booking, BookingStatus, VehicleType } from '../../../types';
import { BookingFilters } from '../../../components/admin/bookings/BookingFilters';
import { BookingsTable } from '../../../components/admin/bookings/BookingsTable';
import { MOCK_PUBLIC_FLEET } from '../../vehicles/page';

// Extended Mock Data
const MOCK_BOOKINGS: Booking[] = [
  { 
    id: 'b_1001', vehicleId: '1', customerName: 'John Doe', customerPhone: '9841234567', 
    startDate: '2024-05-20', endDate: '2024-05-22', pickupLocation: 'Tribhuvan Airport', dropLocation: 'Hyatt Regency', 
    status: BookingStatus.CONFIRMED, totalAmount: 360, createdAt: '2024-05-18T10:00:00Z',
    paymentStatus: 'Partial', source: 'Website'
  },
  { 
    id: 'b_1002', vehicleId: '2', customerName: 'Jane Smith', customerPhone: '9801987654', 
    startDate: new Date().toISOString().split('T')[0], endDate: '2024-06-05', pickupLocation: 'Thamel', dropLocation: 'Pokhara', 
    status: BookingStatus.ONGOING, totalAmount: 425, createdAt: '2024-05-25T14:30:00Z',
    paymentStatus: 'Paid', source: 'Phone'
  },
  { 
    id: 'b_1003', vehicleId: '3', customerName: 'Alice Johnson', customerPhone: '9812341234', 
    startDate: '2024-06-10', endDate: '2024-06-12', pickupLocation: 'Boudha', dropLocation: 'Nagarkot', 
    status: BookingStatus.PENDING, totalAmount: 135, createdAt: '2024-06-01T09:15:00Z',
    paymentStatus: 'Unpaid', source: 'Website', specialRequests: 'Need a child seat'
  },
  { 
    id: 'b_1004', vehicleId: '4', customerName: 'Bob Brown', customerPhone: '9867890123', 
    startDate: '2024-05-01', endDate: '2024-05-05', pickupLocation: 'Patan', dropLocation: 'Bhaktapur', 
    status: BookingStatus.COMPLETED, totalAmount: 600, createdAt: '2024-04-28T11:00:00Z',
    paymentStatus: 'Paid', source: 'Walk-in'
  },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [currentTab, setCurrentTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter(b => {
    // Tab Filter
    if (currentTab !== 'All' && b.status !== currentTab) return false;
    
    // Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        b.customerName.toLowerCase().includes(q) ||
        b.customerPhone.includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleConfirm = (ids: string[]) => {
    setBookings(prev => prev.map(b => ids.includes(b.id) ? { ...b, status: BookingStatus.CONFIRMED } : b));
  };

  const handleCancel = (id: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: BookingStatus.CANCELLED } : b));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Bookings</h2>
        <p className="text-slate-500">Manage all your reservations and trips.</p>
      </div>

      <BookingFilters 
        currentTab={currentTab} 
        onTabChange={setCurrentTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <BookingsTable 
        bookings={filteredBookings} 
        vehicles={MOCK_PUBLIC_FLEET}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}