import React from 'react';
import { Vehicle } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Users, Fuel, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-shadow duration-300 group">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={vehicle.imageUrl} 
          alt={`${vehicle.make} ${vehicle.model}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
          {vehicle.type}
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 leading-tight">{vehicle.make} {vehicle.model}</h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-1">{vehicle.description}</p>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-600 mb-4">
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
            <Users size={14} className="text-slate-400" />
            <span>{vehicle.seats || 4} Seats</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
            <Settings2 size={14} className="text-slate-400" />
            <span>{vehicle.transmission || 'Auto'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
            <Fuel size={14} className="text-slate-400" />
            <span>{vehicle.fuelType || 'Petrol'}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-auto bg-slate-50/50">
        <div>
          <p className="text-xs text-slate-500 font-medium uppercase">Daily Rate</p>
          <p className="text-lg font-bold text-primary">
            ${vehicle.dailyRate || 50}<span className="text-sm font-normal text-slate-400">/day</span>
          </p>
        </div>
        <Link to={`/vehicles/${vehicle.id}`}>
          <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};