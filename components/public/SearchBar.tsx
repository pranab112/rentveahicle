import React, { useState } from 'react';
import { Button } from '../ui/button';
import { VehicleType } from '../../types';
import { CalendarDays, Car, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SearchBar = () => {
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [type, setType] = useState<string>('');

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl border border-slate-100 max-w-4xl mx-auto -mt-12 md:-mt-16 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        
        {/* Pickup Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <CalendarDays size={14} /> Pickup Date
          </label>
          <input
            type="date"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </div>

        {/* Return Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <CalendarDays size={14} /> Return Date
          </label>
          <input
            type="date"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>

        {/* Vehicle Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Car size={14} /> Vehicle Type
          </label>
          <select
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Any Type</option>
            {Object.values(VehicleType).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div>
          <Link to={`/vehicles?type=${type}&start=${pickupDate}&end=${returnDate}`}>
            <Button className="w-full h-[42px] bg-primary hover:bg-primary/90 text-white font-semibold shadow-md" size="lg">
              <Search className="mr-2 h-4 w-4" /> Search Cars
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};