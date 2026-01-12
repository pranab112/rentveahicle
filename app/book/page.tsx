import React, { useState } from 'react';
import { useParams, useSearchParams, Navigate, Link } from 'react-router-dom';
import { MOCK_PUBLIC_FLEET } from '../vehicles/page';
import { BookingSummary } from '../../components/booking/BookingSummary';
import { BookingForm } from '../../components/booking/BookingForm';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BookingPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Default dates (tomorrow if not provided)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(tomorrow);
  dayAfter.setDate(tomorrow.getDate() + 2);

  const startDate = searchParams.get('start') || tomorrow.toISOString().split('T')[0];
  const endDate = searchParams.get('end') || dayAfter.toISOString().split('T')[0];

  const vehicle = MOCK_PUBLIC_FLEET.find(v => v.id === vehicleId);

  if (!vehicle) {
    return <Navigate to="/vehicles" replace />;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to={`/vehicles/${vehicleId}`} className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Vehicle
          </Link>
          <div className="font-semibold text-slate-900">Secure Checkout</div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Left: Form */}
           <div className="lg:col-span-2">
             <div className="mb-6">
               <h1 className="text-2xl font-bold text-slate-900">Complete Your Booking</h1>
               <p className="text-slate-500">Fill in the details below to secure your reservation.</p>
             </div>
             
             <BookingForm 
               vehicleId={vehicle.id} 
               startDate={startDate} 
               endDate={endDate}
               onSubmitStart={() => setIsSubmitting(true)}
             />
           </div>

           {/* Right: Summary */}
           <div className="lg:col-span-1">
             <BookingSummary 
               vehicle={vehicle} 
               startDate={startDate}
               endDate={endDate}
             />
           </div>
        </div>
      </div>
    </div>
  );
}