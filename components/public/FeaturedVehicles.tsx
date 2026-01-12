import React from 'react';
import { Link } from 'react-router-dom';
import { Vehicle, VehicleType } from '../../types';
import { VehicleCard } from './VehicleCard';
import { ArrowRight } from 'lucide-react';

const FEATURED_MOCK: Vehicle[] = [
  { 
    id: 'f1', 
    operatorId: 'demo', 
    make: 'Toyota', 
    model: 'Prado', 
    plate: 'BA-2-PA 9988', 
    type: VehicleType.SUV, 
    imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1000&auto=format&fit=crop', 
    description: 'Luxury SUV for off-road adventures and city comfort.',
    dailyRate: 120,
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel'
  },
  { 
    id: 'f2', 
    operatorId: 'demo', 
    make: 'Hyundai', 
    model: 'Tucson', 
    plate: 'BA-3-CH 1234', 
    type: VehicleType.SUV, 
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop', 
    description: 'Compact SUV perfect for family trips.',
    dailyRate: 85,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol'
  },
  { 
    id: 'f3', 
    operatorId: 'demo', 
    make: 'Suzuki', 
    model: 'Swift', 
    plate: 'BA-5-PA 5566', 
    type: VehicleType.SEDAN, 
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1000&auto=format&fit=crop', 
    description: 'Economical and zippy city car.',
    dailyRate: 45,
    seats: 4,
    transmission: 'Manual',
    fuelType: 'Petrol'
  }
];

export const FeaturedVehicles = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Vehicles</h2>
            <p className="text-slate-600 max-w-2xl">
              Choose from our selection of well-maintained vehicles. Whether you need a city car or an off-road beast, we have it all.
            </p>
          </div>
          <Link to="/vehicles" className="text-primary font-semibold flex items-center gap-2 hover:underline">
            View All Vehicles <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_MOCK.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
};