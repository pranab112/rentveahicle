import React from 'react';
import { Vehicle } from '../../types';
import { CalendarDays, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface BookingSummaryProps {
  vehicle: Vehicle;
  startDate: string;
  endDate: string;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({ vehicle, startDate, endDate }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Calculate days (min 1 day)
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const dailyRate = vehicle.dailyRate || 0;
  const subtotal = diffDays * dailyRate;
  const total = subtotal; // Add tax or fees here if needed

  return (
    <Card className="sticky top-24 h-fit">
      <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
        <CardTitle className="text-lg text-slate-800">Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Vehicle Info */}
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-slate-200">
            <img src={vehicle.imageUrl} alt={vehicle.model} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 line-clamp-1">{vehicle.make} {vehicle.model}</h4>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{vehicle.type}</span>
            <p className="text-sm text-slate-500 mt-1">{vehicle.plate}</p>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <CalendarDays size={16} className="text-indigo-600" />
              <span>Dates</span>
            </div>
            <span className="font-medium text-slate-900">
              {start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 pl-6">Duration</span>
            <span className="text-slate-600">{diffDays} Days</span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 pt-4 border-t border-slate-100">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Rate</span>
            <span>${dailyRate} / day</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal ({diffDays} days)</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <span className="font-bold text-slate-900">Total Amount</span>
            <span className="text-xl font-bold text-indigo-600">${total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};