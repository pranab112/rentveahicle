import React from 'react';
import { Vehicle } from '../../types';
import { VehicleCard } from './VehicleCard';
import { Car } from 'lucide-react';

interface VehicleGridProps {
  vehicles: Vehicle[];
  isLoading?: boolean;
}

export const VehicleGrid: React.FC<VehicleGridProps> = ({ vehicles, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white rounded-xl overflow-hidden border border-slate-200 h-[380px] animate-pulse">
            <div className="h-48 bg-slate-200"></div>
            <div className="p-5 space-y-4">
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 bg-slate-200 rounded"></div>
                <div className="h-6 w-16 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <Car size={48} className="mx-auto text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-slate-900 mb-1">No vehicles found</h3>
        <p className="text-slate-500">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};