import React from 'react';
import { format } from 'date-fns';
import { Booking, BookingStatus, Vehicle } from '../../../types';
import { X, Clock, User, Plus } from 'lucide-react';
import { Button } from '../../ui/button';
import { Link } from 'react-router-dom';

interface DayDetailModalProps {
  date: Date;
  bookings: Booking[];
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
}

export const DayDetailModal: React.FC<DayDetailModalProps> = ({ 
  date, 
  bookings, 
  isOpen, 
  onClose,
  vehicles
}) => {
  if (!isOpen) return null;

  const getStatusColor = (status: BookingStatus) => {
    switch(status) {
      case BookingStatus.PENDING: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case BookingStatus.CONFIRMED: return 'bg-blue-100 text-blue-800 border-blue-200';
      case BookingStatus.ONGOING: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case BookingStatus.COMPLETED: return 'bg-slate-100 text-slate-800 border-slate-200';
      case BookingStatus.CANCELLED: return 'bg-red-50 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getVehicleName = (id: string) => {
    const v = vehicles.find(v => v.id === id);
    return v ? `${v.make} ${v.model}` : 'Unknown Vehicle';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
          <h3 className="font-bold text-slate-900 text-lg">
            {format(date, 'EEEE, MMMM d, yyyy')}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {bookings.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p>No bookings for this date.</p>
            </div>
          ) : (
            bookings.map(booking => (
              <Link to={`/admin/bookings/${booking.id}`} key={booking.id} className="block group">
                <div className="border border-slate-200 rounded-lg p-3 hover:border-indigo-300 hover:shadow-sm transition-all bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                        {getVehicleName(booking.vehicleId)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {format(new Date(booking.startDate), 'MMM d')} - {format(new Date(booking.endDate), 'MMM d')}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock size={12} /> {booking.pickupTime || '09:00'}
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={12} /> {booking.customerName}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl">
          <Link to="/admin/bookings">
             <Button className="w-full gap-2" variant="outline" onClick={onClose}>
               View All Bookings
             </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};