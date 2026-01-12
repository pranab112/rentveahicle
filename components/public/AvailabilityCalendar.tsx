import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AvailabilityCalendarProps {
  bookedDates?: string[]; // ISO date strings
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ bookedDates = [] }) => {
  // Simple Mock Calendar for current month
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  // Mock some booked dates if none provided for demo
  const mockBooked = bookedDates.length > 0 ? bookedDates : [
    new Date(today.getFullYear(), today.getMonth(), 15).toISOString().split('T')[0],
    new Date(today.getFullYear(), today.getMonth(), 16).toISOString().split('T')[0],
    new Date(today.getFullYear(), today.getMonth(), 20).toISOString().split('T')[0],
  ];

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const isBooked = (day: number) => {
    const checkDate = new Date(today.getFullYear(), today.getMonth(), day).toISOString().split('T')[0];
    return mockBooked.includes(checkDate);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900">Availability</h3>
        <div className="flex items-center gap-4">
          <button className="p-1 hover:bg-slate-100 rounded-full"><ChevronLeft size={20} /></button>
          <span className="font-medium text-slate-700">{currentMonth}</span>
          <button className="p-1 hover:bg-slate-100 rounded-full"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="font-medium text-slate-400 py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {blanks.map(i => <div key={`blank-${i}`} />)}
        {days.map(day => {
          const booked = isBooked(day);
          return (
            <div 
              key={day}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-sm font-medium
                ${booked 
                  ? 'bg-red-50 text-red-400 line-through cursor-not-allowed' 
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer'}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
      
      <div className="flex gap-4 mt-4 text-xs font-medium justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-50 border border-emerald-100"></div> Available
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-50 border border-red-100"></div> Booked
        </div>
      </div>
    </div>
  );
};