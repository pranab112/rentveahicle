import React from 'react';
import { Booking, BookingStatus } from '../../types';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Eye, CheckCircle } from 'lucide-react';

interface RecentBookingsTableProps {
  bookings: Booking[];
  vehicles: any[]; // Ideally typed properly with Vehicle[]
}

export const RecentBookingsTable: React.FC<RecentBookingsTableProps> = ({ bookings, vehicles }) => {
  
  const getVehicleName = (id: string) => {
    const v = vehicles.find(v => v.id === id);
    return v ? `${v.make} ${v.model}` : `Vehicle #${id}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-1">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-900">Recent Bookings</h3>
        <Link to="/admin/bookings">
            <Button variant="outline" size="sm">View All</Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Vehicle</th>
              <th className="px-6 py-3">Dates</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.length === 0 ? (
                <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No recent bookings.</td>
                </tr>
            ) : bookings.slice(0, 5).map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {booking.customerName}
                  <div className="text-xs text-slate-500 font-normal">{booking.customerPhone}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                    {getVehicleName(booking.vehicleId)}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <div className="flex flex-col">
                    <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                    <span className="text-xs text-slate-400">to {new Date(booking.endDate).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${booking.status === BookingStatus.CONFIRMED ? 'bg-green-100 text-green-800' : 
                      booking.status === BookingStatus.PENDING ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-slate-100 text-slate-800'}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View Details">
                    <Eye size={16} className="text-slate-500" />
                  </Button>
                  {booking.status === BookingStatus.PENDING && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Confirm">
                       <CheckCircle size={16} className="text-green-600" />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};