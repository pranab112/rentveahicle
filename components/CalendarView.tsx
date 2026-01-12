import React from 'react';
import { Booking, Vehicle, BookingStatus } from '../types';
import { Calendar as CalendarIcon } from 'lucide-react';

interface CalendarViewProps {
  vehicles: Vehicle[];
  bookings: Booking[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ vehicles, bookings }) => {
  // Mocking next 7 days
  const today = new Date();
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const getStatusForDay = (vehicleId: string, date: string) => {
    const booking = bookings.find(b => 
      b.vehicleId === vehicleId && 
      b.startDate <= date && 
      b.endDate >= date &&
      b.status !== BookingStatus.CANCELLED
    );
    
    if (booking) return { status: 'booked', label: 'Booked' };
    return { status: 'available', label: 'Available' };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Availability Calendar</h2>
        <p className="text-slate-500">Weekly view of your fleet's schedule.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="p-4 text-left font-semibold text-slate-700 min-w-[150px] sticky left-0 bg-slate-50 z-10">Vehicle</th>
              {next7Days.map(day => (
                <th key={day} className="p-4 text-center font-medium text-slate-600 min-w-[100px]">
                  {new Date(day).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {vehicles.map(vehicle => (
              <tr key={vehicle.id} className="hover:bg-slate-50/50">
                <td className="p-4 sticky left-0 bg-white z-10 border-r border-slate-100">
                  <div className="font-medium text-slate-800">{vehicle.make} {vehicle.model}</div>
                  <div className="text-xs text-slate-500">{vehicle.plate}</div>
                </td>
                {next7Days.map(day => {
                  const { status } = getStatusForDay(vehicle.id, day);
                  return (
                    <td key={day} className="p-2 text-center">
                      <div className={`w-full h-10 rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${
                        status === 'booked' 
                          ? 'bg-red-50 text-red-600 border border-red-100' 
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      }`}>
                        {status === 'booked' ? 'Booked' : 'Free'}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};