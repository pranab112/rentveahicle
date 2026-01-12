import React, { useState } from 'react';
import { Booking, BookingStatus } from '../../../types';
import { StatusBadge } from './StatusBadge';
import { Button } from '../../ui/button';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Eye, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '../../../lib/utils';

interface BookingsTableProps {
  bookings: Booking[];
  vehicles: any[];
  onConfirm: (ids: string[]) => void;
  onCancel: (id: string) => void;
}

export const BookingsTable: React.FC<BookingsTableProps> = ({ bookings, vehicles, onConfirm, onCancel }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(bookings.map(b => b.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const getVehicleName = (id: string) => {
    const v = vehicles.find(v => v.id === id);
    return v ? `${v.make} ${v.model}` : 'Unknown Vehicle';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="bg-indigo-50 px-6 py-2 flex items-center justify-between border-b border-indigo-100">
          <span className="text-sm font-medium text-indigo-700">{selected.length} selected</span>
          <div className="flex gap-2">
            <Button size="sm" className="h-8 bg-indigo-600 hover:bg-indigo-700" onClick={() => { onConfirm(selected); setSelected([]); }}>
              Confirm Selected
            </Button>
            <Button size="sm" variant="ghost" className="h-8 text-indigo-700 hover:bg-indigo-100" onClick={() => setSelected([])}>
              Cancel Selection
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 w-10">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  onChange={handleSelectAll}
                  checked={bookings.length > 0 && selected.length === bookings.length}
                />
              </th>
              <th className="px-6 py-4">Booking ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Vehicle</th>
              <th className="px-6 py-4">Dates</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                  No bookings found matching your filters.
                </td>
              </tr>
            ) : bookings.map(booking => (
              <tr 
                key={booking.id} 
                className={`hover:bg-slate-50/50 transition-colors ${booking.status === BookingStatus.PENDING ? 'bg-yellow-50/30' : ''}`}
              >
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    checked={selected.includes(booking.id)}
                    onChange={() => handleSelectOne(booking.id)}
                  />
                </td>
                <td className="px-6 py-4 font-mono text-slate-500 text-xs">#{booking.id.slice(-6).toUpperCase()}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{booking.customerName}</div>
                  <div className="text-xs text-slate-500">{booking.customerPhone}</div>
                </td>
                <td className="px-6 py-4 text-slate-700">{getVehicleName(booking.vehicleId)}</td>
                <td className="px-6 py-4">
                  <div className="text-slate-900">{formatDate(booking.startDate)}</div>
                  <div className="text-xs text-slate-500">to {formatDate(booking.endDate)}</div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">
                   ${booking.totalAmount?.toLocaleString() || '0'}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/admin/bookings/${booking.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View Details">
                        <Eye size={16} className="text-slate-500" />
                      </Button>
                    </Link>
                    {booking.status === BookingStatus.PENDING && (
                      <>
                        <Button 
                            variant="ghost" size="sm" 
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50" 
                            title="Confirm"
                            onClick={() => onConfirm([booking.id])}
                        >
                          <CheckCircle size={16} />
                        </Button>
                        <Button 
                            variant="ghost" size="sm" 
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50" 
                            title="Cancel"
                            onClick={() => onCancel(booking.id)}
                        >
                          <XCircle size={16} />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};