import React from 'react';
import { Booking } from '../../types';
import { Clock } from 'lucide-react';

interface UpcomingBookingsProps {
  bookings: Booking[];
  vehicles: any[];
}

export const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({ bookings, vehicles }) => {
    // Sort by date closest to today
    const sorted = [...bookings].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    
    // Filter next 7 days (mock logic for now, just taking top 5)
    const upcoming = sorted.slice(0, 5);
    
    const getVehicleName = (id: string) => {
        const v = vehicles.find(v => v.id === id);
        return v ? `${v.make} ${v.model}` : `Vehicle #${id}`;
    };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full">
      <h3 className="font-bold text-slate-900 mb-4">Upcoming Schedule</h3>
      <div className="space-y-3">
        {upcoming.length === 0 ? (
            <div className="text-center py-8">
               <p className="text-sm text-slate-500">No upcoming bookings for the next 7 days.</p>
            </div>
        ) : upcoming.map((booking) => {
            const startDate = new Date(booking.startDate);
            const isToday = startDate.toDateString() === new Date().toDateString();
            
            return (
                <div key={booking.id} className={`flex items-start gap-4 p-3 rounded-lg border transition-colors ${isToday ? 'bg-indigo-50 border-indigo-100' : 'border-slate-100 hover:border-slate-200'}`}>
                    <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg shrink-0 border ${isToday ? 'bg-white text-indigo-700 border-indigo-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                        <span className="text-[10px] font-bold uppercase leading-none">{startDate.toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span className="text-lg font-bold leading-none mt-1">{startDate.getDate()}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-900 text-sm truncate">{booking.customerName}</p>
                        <p className="text-xs text-slate-500 mb-1 truncate">{getVehicleName(booking.vehicleId)}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                             <Clock size={12} />
                             <span>09:00 AM • {booking.pickupLocation || 'Depot'}</span>
                        </div>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};