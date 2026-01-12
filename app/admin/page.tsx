import React from 'react';
import { Vehicle, Booking, BookingStatus, VehicleType } from '../../types';
import { ArrowUpRight, ArrowDownLeft, Truck, Calendar, DollarSign, Plus } from 'lucide-react';
import { StatsCard } from '../../components/admin/StatsCard';
import { RecentBookingsTable } from '../../components/admin/RecentBookingsTable';
import { UpcomingBookings } from '../../components/admin/UpcomingBookings';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

// Mocks to allow UI to render without full backend connection yet
const MOCK_VEHICLES: Vehicle[] = [
  { id: '1', operatorId: 'me', make: 'Toyota', model: 'HiAce', plate: 'ABC-1234', type: VehicleType.VAN, imageUrl: 'https://images.unsplash.com/photo-1625055086221-5f252445b41e?q=80&w=400', description: 'Reliable van' },
  { id: '2', operatorId: 'me', make: 'Hyundai', model: 'Accent', plate: 'XYZ-9876', type: VehicleType.SEDAN, imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=400', description: 'City sedan' },
  { id: '3', operatorId: 'me', make: 'Mahindra', model: 'Scorpio', plate: 'BA-9999', type: VehicleType.SUV, imageUrl: 'https://images.unsplash.com/photo-1632245889029-e413c634e121?q=80&w=400', description: '4WD' },
];

const MOCK_BOOKINGS: Booking[] = [
  { id: 'b1', vehicleId: '1', customerName: 'John Doe', customerPhone: '9841234567', startDate: '2024-05-20', endDate: '2024-05-22', pickupLocation: 'Airport', dropLocation: 'Hotel', status: BookingStatus.CONFIRMED },
  { id: 'b2', vehicleId: '2', customerName: 'Jane Smith', customerPhone: '9801987654', startDate: new Date().toISOString().split('T')[0], endDate: '2024-06-05', pickupLocation: 'Thamel', dropLocation: 'Pokhara', status: BookingStatus.ONGOING },
  { id: 'b3', vehicleId: '3', customerName: 'Alice Johnson', customerPhone: '9812341234', startDate: '2024-06-10', endDate: '2024-06-12', pickupLocation: 'Boudha', dropLocation: 'Nagarkot', status: BookingStatus.PENDING },
  { id: 'b4', vehicleId: '1', customerName: 'Bob Brown', customerPhone: '9867890123', startDate: '2024-06-15', endDate: '2024-06-16', pickupLocation: 'Patan', dropLocation: 'Bhaktapur', status: BookingStatus.CONFIRMED },
];

export default function AdminDashboard() {
  const bookings = MOCK_BOOKINGS;
  const vehicles = MOCK_VEHICLES;

  // Derived Stats
  const totalVehicles = vehicles.length;
  const today = new Date().toISOString().split('T')[0];
  const activeBookings = bookings.filter(b => b.startDate <= today && b.endDate >= today && b.status !== BookingStatus.CANCELLED).length;
  const pendingRequests = bookings.filter(b => b.status === BookingStatus.PENDING).length;
  
  // Calculate Revenue (Mock)
  const monthlyRevenue = bookings.reduce((acc, curr) => acc + (curr.totalAmount || 15000), 0);

  return (
    <div className="space-y-6">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold tracking-tight text-slate-900">Overview</h2>
           <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
           <Link to="/admin/bookings">
             <Button variant="outline">View All Bookings</Button>
           </Link>
           <Link to="/admin/fleet">
             <Button className="gap-2"><Plus size={16} /> Add Vehicle</Button>
           </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
            title="Total Vehicles" 
            value={totalVehicles} 
            icon={Truck} 
            description="Active in fleet" 
            trend="+1"
        />
        <StatsCard 
            title="Today's Active" 
            value={activeBookings} 
            icon={Calendar} 
            description="Vehicles on trip"
        />
        <StatsCard 
            title="Pending Requests" 
            value={pendingRequests} 
            icon={ArrowDownLeft} 
            description="Needs attention"
            trend={pendingRequests > 0 ? "Action Required" : ""}
        />
        <StatsCard 
            title="Month Revenue" 
            value={`Rs. ${monthlyRevenue.toLocaleString()}`} 
            icon={DollarSign} 
            description="Estimated revenue"
            trend="+12%"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Recent Bookings (Takes 2 cols) */}
        <div className="lg:col-span-2 flex flex-col">
          <RecentBookingsTable bookings={bookings} vehicles={vehicles} />
        </div>

        {/* Right: Upcoming (Takes 1 col) */}
        <div className="lg:col-span-1">
          <UpcomingBookings bookings={bookings} vehicles={vehicles} />
        </div>
      </div>
    </div>
  );
}