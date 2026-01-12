import React, { useState } from 'react';
import { Vehicle, VehicleType } from '../types';
import { Share2, CalendarCheck, Filter } from 'lucide-react';

interface MarketplaceProps {
  partnerVehicles: Vehicle[];
  onRequestVehicle: (vehicleId: string, vehicleDetails: string) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ partnerVehicles, onRequestVehicle }) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [requestDate, setRequestDate] = useState<string>('');

  const filtered = partnerVehicles.filter(v => filterType === 'All' || v.type === filterType);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Partner Inventory</h2>
          <p className="text-slate-500">View and request vehicles from other verified operators.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm">
          <Filter size={18} className="text-slate-400 ml-2" />
          <select 
            className="bg-transparent text-sm font-medium text-slate-700 outline-none p-1"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            {Object.values(VehicleType).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(vehicle => (
          <div key={vehicle.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="h-40 overflow-hidden relative">
              <img src={vehicle.imageUrl} alt={vehicle.model} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white font-semibold">{vehicle.make} {vehicle.model}</p>
                <p className="text-white/80 text-xs">Partner Network • {vehicle.plate}</p>
              </div>
            </div>
            <div className="p-4">
               <div className="flex items-center justify-between mb-3">
                 <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100">{vehicle.type}</span>
                 <span className="text-xs text-slate-500">Available Now</span>
               </div>
               <p className="text-sm text-slate-600 mb-4 h-10 line-clamp-2">{vehicle.description}</p>
               
               <div className="flex items-center gap-2">
                 <input 
                  type="date" 
                  className="flex-1 text-xs p-2 border rounded-lg bg-slate-50" 
                  onChange={(e) => setRequestDate(e.target.value)}
                 />
                 <button 
                  onClick={() => onRequestVehicle(vehicle.id, `${vehicle.make} ${vehicle.model}`)}
                  disabled={!requestDate}
                  className="flex items-center gap-1.5 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                 >
                   <Share2 size={14} /> Request
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};