import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '../../ui/button';
import { Vehicle } from '../../../types';
import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  selectedVehicleId: string;
  onVehicleChange: (id: string) => void;
  vehicles: Vehicle[];
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrev,
  onNext,
  onToday,
  selectedVehicleId,
  onVehicleChange,
  vehicles
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="text-indigo-600" />
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          <button 
            onClick={onPrev}
            className="p-1 hover:bg-slate-100 rounded text-slate-600"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={onToday}
            className="px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded"
          >
            Today
          </button>
          <button 
            onClick={onNext}
            className="p-1 hover:bg-slate-100 rounded text-slate-600"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <select 
          className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full md:w-64 p-2.5 outline-none shadow-sm"
          value={selectedVehicleId}
          onChange={(e) => onVehicleChange(e.target.value)}
        >
          <option value="all">All Vehicles</option>
          {vehicles.map(v => (
            <option key={v.id} value={v.id}>{v.make} {v.model} ({v.plate})</option>
          ))}
        </select>
      </div>
    </div>
  );
};