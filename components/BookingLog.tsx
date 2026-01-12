import React, { useState } from 'react';
import { Booking, BookingStatus, Vehicle } from '../types';
import { Calendar, MapPin, User, CheckCircle, XCircle, Clock, PlayCircle } from 'lucide-react';

interface BookingLogProps {
  bookings: Booking[];
  vehicles: Vehicle[];
  onUpdateStatus: (id: string, status: BookingStatus) => void;
  onAddBooking: (booking: Booking) => void;
}

export const BookingLog: React.FC<BookingLogProps> = ({ bookings, vehicles, onUpdateStatus, onAddBooking }) => {
  const [showForm, setShowForm] = useState(false);
  const [newBooking, setNewBooking] = useState<Partial<Booking>>({
    status: BookingStatus.CONFIRMED
  });

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED: return 'bg-blue-100 text-blue-700';
      case BookingStatus.ONGOING: return 'bg-amber-100 text-amber-700';
      case BookingStatus.COMPLETED: return 'bg-green-100 text-green-700';
      case BookingStatus.CANCELLED: return 'bg-slate-100 text-slate-500';
    }
  };

  const handleCreate = () => {
    if (!newBooking.customerName || !newBooking.vehicleId || !newBooking.startDate) return;
    
    onAddBooking({
      id: Date.now().toString(),
      vehicleId: newBooking.vehicleId,
      customerName: newBooking.customerName,
      customerPhone: newBooking.customerPhone || '',
      startDate: newBooking.startDate,
      endDate: newBooking.endDate || newBooking.startDate,
      pickupLocation: newBooking.pickupLocation || '',
      dropLocation: newBooking.dropLocation || '',
      status: BookingStatus.CONFIRMED
    });
    setShowForm(false);
    setNewBooking({ status: BookingStatus.CONFIRMED });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Booking Log</h2>
          <p className="text-slate-500">Track pickups, drop-offs, and customer details.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          New Booking
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Create Booking</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="block text-sm text-slate-600 mb-1">Customer Name</label>
               <input type="text" className="w-full p-2 border rounded-md" 
                value={newBooking.customerName || ''} onChange={e => setNewBooking({...newBooking, customerName: e.target.value})} />
             </div>
             <div>
               <label className="block text-sm text-slate-600 mb-1">Phone</label>
               <input type="tel" className="w-full p-2 border rounded-md" 
                value={newBooking.customerPhone || ''} onChange={e => setNewBooking({...newBooking, customerPhone: e.target.value})} />
             </div>
             <div>
               <label className="block text-sm text-slate-600 mb-1">Vehicle</label>
               <select className="w-full p-2 border rounded-md"
                value={newBooking.vehicleId || ''} onChange={e => setNewBooking({...newBooking, vehicleId: e.target.value})}>
                 <option value="">Select Vehicle</option>
                 {vehicles.map(v => <option key={v.id} value={v.id}>{v.make} {v.model} ({v.plate})</option>)}
               </select>
             </div>
             <div className="grid grid-cols-2 gap-2">
                <div>
                   <label className="block text-sm text-slate-600 mb-1">Start Date</label>
                   <input type="date" className="w-full p-2 border rounded-md"
                    value={newBooking.startDate || ''} onChange={e => setNewBooking({...newBooking, startDate: e.target.value})} />
                </div>
                <div>
                   <label className="block text-sm text-slate-600 mb-1">End Date</label>
                   <input type="date" className="w-full p-2 border rounded-md"
                    value={newBooking.endDate || ''} onChange={e => setNewBooking({...newBooking, endDate: e.target.value})} />
                </div>
             </div>
             <div>
               <label className="block text-sm text-slate-600 mb-1">Pickup Location</label>
               <input type="text" className="w-full p-2 border rounded-md" 
                value={newBooking.pickupLocation || ''} onChange={e => setNewBooking({...newBooking, pickupLocation: e.target.value})} />
             </div>
             <div>
               <label className="block text-sm text-slate-600 mb-1">Drop Location</label>
               <input type="text" className="w-full p-2 border rounded-md" 
                value={newBooking.dropLocation || ''} onChange={e => setNewBooking({...newBooking, dropLocation: e.target.value})} />
             </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-600">Cancel</button>
            <button onClick={handleCreate} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Save Booking</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-800">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-800">Vehicle</th>
                <th className="px-6 py-4 font-semibold text-slate-800">Customer</th>
                <th className="px-6 py-4 font-semibold text-slate-800">Date & Location</th>
                <th className="px-6 py-4 font-semibold text-slate-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No active bookings found.</td>
                </tr>
              ) : bookings.map(booking => {
                const vehicle = vehicles.find(v => v.id === booking.vehicleId);
                return (
                  <tr key={booking.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {vehicle ? (
                        <div>
                          <p className="font-medium text-slate-800">{vehicle.make} {vehicle.model}</p>
                          <p className="text-xs text-slate-400">{vehicle.plate}</p>
                        </div>
                      ) : <span className="text-red-400">Vehicle Removed</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-slate-400" />
                        <div>
                          <p className="text-slate-800 font-medium">{booking.customerName}</p>
                          <p className="text-xs">{booking.customerPhone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs">
                          <Calendar size={14} className="text-slate-400" />
                          <span>{booking.startDate} to {booking.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <MapPin size={14} className="text-slate-400" />
                          <span>{booking.pickupLocation || 'Depot'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {booking.status === BookingStatus.CONFIRMED && (
                          <button onClick={() => onUpdateStatus(booking.id, BookingStatus.ONGOING)} title="Start Trip" className="p-1.5 text-amber-600 hover:bg-amber-50 rounded"><PlayCircle size={18} /></button>
                        )}
                        {booking.status === BookingStatus.ONGOING && (
                          <button onClick={() => onUpdateStatus(booking.id, BookingStatus.COMPLETED)} title="Complete Trip" className="p-1.5 text-green-600 hover:bg-green-50 rounded"><CheckCircle size={18} /></button>
                        )}
                        {(booking.status !== BookingStatus.COMPLETED && booking.status !== BookingStatus.CANCELLED) && (
                          <button onClick={() => onUpdateStatus(booking.id, BookingStatus.CANCELLED)} title="Cancel Trip" className="p-1.5 text-red-600 hover:bg-red-50 rounded"><XCircle size={18} /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};