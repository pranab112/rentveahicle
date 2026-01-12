import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { CalendarDays, MessageCircle } from 'lucide-react';
import { useTenant } from '../../hooks/useTenant';
import { useNavigate } from 'react-router-dom';

interface BookingCTAProps {
  vehicleId: string;
  dailyRate: number;
  vehicleName: string;
}

export const BookingCTA: React.FC<BookingCTAProps> = ({ vehicleId, dailyRate, vehicleName }) => {
  const { tenant } = useTenant();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays > 0) {
        setTotalPrice(diffDays * dailyRate);
      } else {
        setTotalPrice(null);
      }
    } else {
      setTotalPrice(null);
    }
  }, [startDate, endDate, dailyRate]);

  const handleBook = () => {
    navigate(`/book/${vehicleId}?start=${startDate}&end=${endDate}`);
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in booking the ${vehicleName} from ${startDate || '[Start Date]'} to ${endDate || '[End Date]'}. Is it available?`;
    window.open(`https://wa.me/9779800000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sticky top-24">
      <div className="mb-6">
        <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Daily Rate</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-slate-900">${dailyRate}</span>
          <span className="text-slate-500">/ day</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <CalendarDays size={16} /> Pickup Date
          </label>
          <input 
            type="date" 
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <CalendarDays size={16} /> Return Date
          </label>
          <input 
            type="date" 
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {totalPrice !== null && (
        <div className="bg-slate-50 p-4 rounded-lg mb-6 flex justify-between items-center border border-slate-100">
          <span className="text-slate-600 font-medium">Total Price</span>
          <span className="text-xl font-bold text-indigo-600">${totalPrice}</span>
        </div>
      )}

      <div className="space-y-3">
        <Button 
          className="w-full h-12 text-base" 
          disabled={!startDate || !endDate}
          onClick={handleBook}
        >
          Check Availability & Book
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full h-12 text-base gap-2 hover:bg-green-50 hover:text-green-700 hover:border-green-200"
          onClick={handleWhatsApp}
        >
          <MessageCircle size={18} /> Inquiry via WhatsApp
        </Button>
      </div>

      <p className="text-xs text-center text-slate-400 mt-4">
        No credit card required for inquiry. Free cancellation up to 24h before pickup.
      </p>
    </div>
  );
};