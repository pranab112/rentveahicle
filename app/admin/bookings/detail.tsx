import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Booking, BookingStatus, Vehicle } from '../../../types';
import { MOCK_PUBLIC_FLEET } from '../../vehicles/page';
import { Button } from '../../../components/ui/button';
import { ArrowLeft, User, MapPin, Calendar, Clock, Phone, Mail, FileText, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { StatusBadge } from '../../../components/admin/bookings/StatusBadge';
import { StatusActions } from '../../../components/admin/bookings/StatusActions';
import { PaymentCard } from '../../../components/admin/bookings/PaymentCard';
import { formatDate } from '../../../lib/utils';

// Reusing MOCK_BOOKINGS logic from page.tsx for simplicity in this demo environment
// Ideally this would be fetched from an API/Context
const MOCK_BOOKINGS: Booking[] = [
  { 
    id: 'b_1001', vehicleId: '1', customerName: 'John Doe', customerPhone: '9841234567', customerEmail: 'john@example.com',
    startDate: '2024-05-20', endDate: '2024-05-22', pickupLocation: 'Tribhuvan Airport', dropLocation: 'Hyatt Regency', pickupTime: '10:00',
    status: BookingStatus.CONFIRMED, totalAmount: 360, createdAt: '2024-05-18T10:00:00Z',
    paymentStatus: 'Partial', source: 'Website', deposit: 100,
    specialRequests: 'Flight arriving at 9:30 AM. Flight No: RA-401'
  },
  { 
    id: 'b_1003', vehicleId: '3', customerName: 'Alice Johnson', customerPhone: '9812341234', 
    startDate: '2024-06-10', endDate: '2024-06-12', pickupLocation: 'Boudha', dropLocation: 'Nagarkot', pickupTime: '14:00',
    status: BookingStatus.PENDING, totalAmount: 135, createdAt: '2024-06-01T09:15:00Z',
    paymentStatus: 'Unpaid', source: 'Website', specialRequests: 'Need a child seat'
  },
];

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  // Find booking
  const initialBooking = MOCK_BOOKINGS.find(b => b.id === id) || MOCK_BOOKINGS[0]; // Fallback for demo if id not found
  const [booking, setBooking] = useState<Booking>(initialBooking);
  const [note, setNote] = useState('');

  const vehicle = MOCK_PUBLIC_FLEET.find(v => v.id === booking.vehicleId);

  const handleStatusUpdate = (newStatus: BookingStatus) => {
    setBooking(prev => ({ ...prev, status: newStatus }));
  };

  const handlePaymentUpdate = (data: { deposit: number; discount: number; paymentStatus: 'Paid' | 'Unpaid' | 'Partial' }) => {
    setBooking(prev => ({ ...prev, ...data }));
  };

  if (!booking) return <div>Booking not found</div>;

  return (
    <div className="space-y-6 pb-20">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/bookings">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft size={16} /> Back
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
               <h2 className="text-2xl font-bold tracking-tight text-slate-900">Booking #{booking.id.slice(-6).toUpperCase()}</h2>
               <StatusBadge status={booking.status} />
            </div>
            <p className="text-slate-500 text-sm mt-1">Created on {new Date(booking.createdAt || '').toLocaleString()}</p>
          </div>
        </div>

        <StatusActions status={booking.status} onUpdateStatus={handleStatusUpdate} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Booking Info */}
           <Card>
             <CardHeader className="pb-3 border-b border-slate-100">
               <CardTitle className="text-base font-bold flex items-center gap-2">
                 <Calendar size={18} className="text-slate-400" /> Trip Details
               </CardTitle>
             </CardHeader>
             <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-1">
                 <p className="text-xs text-slate-500 uppercase font-semibold">Pickup</p>
                 <p className="font-medium text-slate-900">{formatDate(booking.startDate)}</p>
                 <p className="text-sm text-slate-600 flex items-center gap-1"><Clock size={14} /> {booking.pickupTime || '09:00'}</p>
                 <p className="text-sm text-slate-600 flex items-center gap-1"><MapPin size={14} /> {booking.pickupLocation}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-xs text-slate-500 uppercase font-semibold">Drop-off</p>
                 <p className="font-medium text-slate-900">{formatDate(booking.endDate)}</p>
                 <p className="text-sm text-slate-600 flex items-center gap-1"><MapPin size={14} /> {booking.dropLocation || booking.pickupLocation}</p>
               </div>
               {booking.specialRequests && (
                 <div className="md:col-span-2 bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-sm text-yellow-800">
                   <span className="font-semibold">Special Request:</span> {booking.specialRequests}
                 </div>
               )}
             </CardContent>
           </Card>

           {/* Vehicle Info */}
           <Card>
             <CardHeader className="pb-3 border-b border-slate-100">
               <CardTitle className="text-base font-bold flex items-center gap-2">
                 <ExternalLink size={18} className="text-slate-400" /> Vehicle Assigned
               </CardTitle>
             </CardHeader>
             <CardContent className="pt-6">
                {vehicle ? (
                  <div className="flex gap-4 items-center">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                      <img src={vehicle.imageUrl} alt={vehicle.model} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{vehicle.make} {vehicle.model}</h3>
                      <p className="text-slate-500 text-sm mb-2">{vehicle.plate} • {vehicle.type}</p>
                      <Link to={`/admin/vehicles/${vehicle.id}`}>
                        <Button variant="outline" size="sm" className="h-8">View Vehicle</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-500">Vehicle info not available</p>
                )}
             </CardContent>
           </Card>

           {/* Notes */}
           <Card>
             <CardHeader className="pb-3 border-b border-slate-100">
               <CardTitle className="text-base font-bold flex items-center gap-2">
                 <FileText size={18} className="text-slate-400" /> Notes
               </CardTitle>
             </CardHeader>
             <CardContent className="pt-6">
                <div className="space-y-4">
                  {booking.notes ? (
                    <div className="bg-slate-50 p-3 rounded text-sm text-slate-700">{booking.notes}</div>
                  ) : (
                    <p className="text-sm text-slate-400 italic">No notes yet.</p>
                  )}
                  <div className="flex gap-2">
                    <textarea 
                      className="flex-1 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                      rows={2}
                      placeholder="Add a private note..."
                      value={note}
                      onChange={e => setNote(e.target.value)}
                    />
                    <Button size="sm" className="self-end" onClick={() => { 
                        if(note) {
                            setBooking(prev => ({ ...prev, notes: prev.notes ? `${prev.notes}\n${note}` : note }));
                            setNote('');
                        }
                    }}>Add</Button>
                  </div>
                </div>
             </CardContent>
           </Card>

        </div>

        {/* Right Column (1/3) */}
        <div className="lg:col-span-1 space-y-6">
           
           {/* Customer Card */}
           <Card>
             <CardHeader className="pb-3 border-b border-slate-100">
               <CardTitle className="text-base font-bold flex items-center gap-2">
                 <User size={18} className="text-slate-400" /> Customer
               </CardTitle>
             </CardHeader>
             <CardContent className="pt-6 space-y-4">
               <div>
                 <h3 className="font-bold text-slate-900">{booking.customerName}</h3>
                 <p className="text-xs text-green-600 font-medium">Verified Customer</p>
               </div>
               <div className="space-y-2 text-sm">
                 <a href={`tel:${booking.customerPhone}`} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600">
                   <Phone size={14} /> {booking.customerPhone}
                 </a>
                 <a href={`mailto:${booking.customerEmail}`} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600">
                   <Mail size={14} /> {booking.customerEmail || 'No email provided'}
                 </a>
               </div>
               <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between text-xs text-slate-500 mb-2">
                    <span>Source</span>
                    <span className="font-medium text-slate-700">{booking.source || 'Website'}</span>
                  </div>
               </div>
               <Button variant="outline" size="sm" className="w-full">View Profile</Button>
             </CardContent>
           </Card>

           {/* Payment Card */}
           <PaymentCard 
             totalAmount={booking.totalAmount || 0}
             deposit={booking.deposit}
             discount={booking.discount}
             paymentStatus={booking.paymentStatus}
             onUpdate={handlePaymentUpdate}
           />

        </div>

      </div>
    </div>
  );
}