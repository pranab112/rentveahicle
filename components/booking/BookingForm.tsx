import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, MapPin, Clock } from 'lucide-react';

// Validation Schema
const bookingSchema = z.object({
  // Customer Details
  fullName: z.string().min(2, "Full Name is required"),
  phone: z.string().regex(/^(?:\+977|0)?9\d{9}$/, "Invalid Nepal phone number (e.g., 9800000000)"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  address: z.string().optional(),
  
  // Trip Details
  pickupLocation: z.string().min(2, "Pickup location is required"),
  dropLocation: z.string().optional(),
  pickupTime: z.string().min(1, "Pickup time is required"),
  specialRequests: z.string().optional(),
  
  // Agreements
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must agree to the rental terms",
  }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  vehicleId: string;
  onSubmitStart: () => void;
  startDate: string;
  endDate: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ vehicleId, onSubmitStart, startDate, endDate }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      pickupTime: "09:00",
      termsAccepted: false
    }
  });

  const pickupLocation = watch('pickupLocation');

  const onFormSubmit = async (data: BookingFormData) => {
    onSubmitStart();
    
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Booking Data:", { ...data, vehicleId, startDate, endDate });
    
    // Redirect to success
    navigate('/booking-confirmed', { 
        state: { 
            bookingRef: `REF-${Math.floor(Math.random() * 10000)}`,
            vehicleId,
            dates: { start: startDate, end: endDate },
            customerName: data.fullName
        } 
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      
      {/* Customer Details Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Customer Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name *</label>
            <input 
              {...register('fullName')}
              className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.fullName ? 'border-red-500' : 'border-slate-300'}`}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Phone Number *</label>
            <input 
              {...register('phone')}
              className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
              placeholder="98XXXXXXXX"
              type="tel"
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email Address (Optional)</label>
            <input 
              {...register('email')}
              className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
              placeholder="you@example.com"
              type="email"
            />
             {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

           <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Address (Optional)</label>
            <input 
              {...register('address')}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="City, Country"
            />
          </div>
        </div>

        <div className="mt-6">
           <label className="text-sm font-medium text-slate-700 mb-2 block">Upload License / ID (Recommended)</label>
           <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
             <UploadCloud className="text-slate-400 mb-2" size={32} />
             <p className="text-sm text-slate-600 font-medium">Click to upload document</p>
             <p className="text-xs text-slate-400 mt-1">JPG, PNG or PDF (Max 5MB)</p>
           </div>
        </div>
      </div>

      {/* Trip Details Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Trip Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <MapPin size={16} /> Pickup Location *
            </label>
            <input 
              {...register('pickupLocation')}
              className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.pickupLocation ? 'border-red-500' : 'border-slate-300'}`}
              placeholder="e.g., Airport, Hotel Name"
            />
            {errors.pickupLocation && <p className="text-xs text-red-500">{errors.pickupLocation.message}</p>}
          </div>

          <div className="space-y-2">
             <div className="flex justify-between">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <MapPin size={16} /> Drop-off Location
                </label>
                <button 
                  type="button" 
                  className="text-xs text-indigo-600 hover:underline"
                  onClick={() => setValue('dropLocation', pickupLocation)}
                >
                  Same as Pickup
                </button>
             </div>
            <input 
              {...register('dropLocation')}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Leave blank if same as pickup"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Clock size={16} /> Pickup Time *
            </label>
            <input 
              type="time"
              {...register('pickupTime')}
              className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.pickupTime ? 'border-red-500' : 'border-slate-300'}`}
            />
             {errors.pickupTime && <p className="text-xs text-red-500">{errors.pickupTime.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Special Requests</label>
            <textarea 
              {...register('specialRequests')}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
              placeholder="Baby seat, GPS, extra luggage, etc..."
            />
        </div>
      </div>

      {/* Terms & Submit */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
         <label className="flex items-start gap-3 cursor-pointer">
           <input 
             type="checkbox" 
             {...register('termsAccepted')}
             className="mt-1 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
           />
           <span className="text-sm text-slate-600">
             I agree to the <a href="#" className="text-indigo-600 hover:underline">Rental Terms & Conditions</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>. I understand that payment will be collected at the time of pickup.
           </span>
         </label>
         {errors.termsAccepted && <p className="text-xs text-red-500 mt-2 ml-7">{errors.termsAccepted.message}</p>}

         <Button 
           type="submit" 
           isLoading={isSubmitting}
           className="w-full mt-6 h-12 text-lg font-semibold"
         >
           Confirm Booking Request
         </Button>
      </div>

    </form>
  );
};