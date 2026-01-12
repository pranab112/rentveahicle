import React from 'react';
import { VehicleType } from '../../types';
import { Button } from '../ui/button';
import { Filter, X } from 'lucide-react';

interface FilterState {
  type: string;
  minPrice: number;
  maxPrice: number;
  seats: number;
  transmission: string;
}

interface VehicleFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const VehicleFilters: React.FC<VehicleFiltersProps> = ({ 
  filters, 
  onChange, 
  className = "",
  isOpen = false,
  onClose
}) => {
  const handleChange = (key: keyof FilterState, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Filter size={20} /> Filters
        </h3>
        {onClose && (
          <button onClick={onClose} className="md:hidden text-slate-500">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Type */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-3 block">Vehicle Type</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input 
                type="radio" 
                name="type" 
                checked={filters.type === 'All'} 
                onChange={() => handleChange('type', 'All')}
                className="text-primary focus:ring-primary" 
              />
              All Types
            </label>
            {Object.values(VehicleType).map(t => (
              <label key={t} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input 
                  type="radio" 
                  name="type" 
                  checked={filters.type === t}
                  onChange={() => handleChange('type', t)}
                  className="text-primary focus:ring-primary" 
                />
                {t}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-3 block">
            Max Price: <span className="text-primary">${filters.maxPrice}/day</span>
          </label>
          <input 
            type="range" 
            min="20" 
            max="500" 
            step="10" 
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>$20</span>
            <span>$500+</span>
          </div>
        </div>

        {/* Seats */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-3 block">Seats</label>
          <div className="flex gap-2">
            {[2, 4, 6, 8].map(num => (
              <button
                key={num}
                onClick={() => handleChange('seats', num)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  filters.seats === num 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {num}+
              </button>
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-3 block">Transmission</label>
          <select 
            className="w-full p-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
            value={filters.transmission}
            onChange={(e) => handleChange('transmission', e.target.value)}
          >
            <option value="All">Any</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onChange({ type: 'All', minPrice: 0, maxPrice: 500, seats: 2, transmission: 'All' })}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};