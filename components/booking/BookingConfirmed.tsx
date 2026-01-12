import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { CheckCircle, Calendar, MessageCircle, Home, FileText } from 'lucide-react';
import { MOCK_PUBLIC_FLEET } from '../../app/vehicles/page';

export const BookingConfirmed = () => {
  const location = useLocation();
  const state = location.state as { bookingRef: string; vehicleId: string; dates: {start: string; end: string}; customerName: string } | null;
  
  const vehicle = state ? MOCK_PUBLIC_FLEET.find(v => v.id === state.vehicleId) : null;

  if (!state) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">No Booking Found</h1>
            <p className="text-slate-500 mb-6">It looks like you haven't made a booking yet.</p>
            <Link to="/"><Button>Back to Home</Button></Link>
        </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden text-center">
        
        <div className="bg-green-600 p-8 text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <CheckCircle size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-green-100">Thank you, {state.customerName}. Your request has been received.</p>
        </div>

        <div className="p-8">
           <div className="inline-block bg-slate-100 px-4 py-2 rounded-full text-slate-600 font-mono text-sm mb-8 border border-slate-200">
             Reference: <span className="font-bold text-slate-900">{state.bookingRef}</span>
           </div>

           <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left border border-slate-200">
             <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <FileText size={18} /> Reservation Details
             </h3>
             <div className="space-y-3 text-sm">
               <div className="flex justify-between">
                 <span className="text-slate-500">Vehicle</span>
                 <span className="font-medium text-slate-900">{vehicle?.make} {vehicle?.model}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-slate-500">Dates</span>
                 <span className="font-medium text-slate-900">
                    {new Date(state.dates.start).toLocaleDateString()} - {new Date(state.dates.end).toLocaleDateString()}
                 </span>
               </div>
               <div className="flex justify-between">
                 <span className="text-slate-500">Status</span>
                 <span className="font-medium text-green-600">Pending Operator Confirmation</span>
               </div>
             </div>
           </div>

           <div className="space-y-6">
             <h3 className="font-bold text-slate-900">What happens next?</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
                   <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-2">1</div>
                   <p className="text-xs text-indigo-900">We will call you within 2 hours to confirm details.</p>
                </div>
                <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
                   <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-2">2</div>
                   <p className="text-xs text-indigo-900">Bring your valid driver's license and citizenship.</p>
                </div>
                <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
                   <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-2">3</div>
                   <p className="text-xs text-indigo-900">Pay the total amount at the time of pickup.</p>
                </div>
             </div>
           </div>

           <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
             <Button className="bg-green-600 hover:bg-green-700 gap-2">
               <MessageCircle size={18} /> Message on WhatsApp
             </Button>
             <Link to="/">
                <Button variant="outline" className="gap-2 w-full md:w-auto">
                    <Home size={18} /> Back to Home
                </Button>
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
};