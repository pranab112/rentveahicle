import React, { useState } from 'react';
import { Vehicle, VehicleType } from '../../types';
import { VehicleFilters } from '../../components/public/VehicleFilters';
import { VehicleGrid } from '../../components/public/VehicleGrid';
import { Button } from '../../components/ui/button';
import { Filter } from 'lucide-react';

// Extended Mock Data for Listing
export const MOCK_PUBLIC_FLEET: Vehicle[] = [
  { 
    id: '1', operatorId: 'demo', make: 'Toyota', model: 'Prado', plate: 'BA-2-PA 9988', type: VehicleType.SUV, 
    imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1000', 
    description: 'Luxury SUV for off-road adventures and city comfort. Features leather seats and sunroof.',
    dailyRate: 120, seats: 7, transmission: 'Automatic', fuelType: 'Diesel',
    features: ['Leather Seats', 'Sunroof', '4WD', 'Bluetooth', 'AC']
  },
  { 
    id: '2', operatorId: 'demo', make: 'Hyundai', model: 'Tucson', plate: 'BA-3-CH 1234', type: VehicleType.SUV, 
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000', 
    description: 'Compact SUV perfect for family trips. Efficient and comfortable.',
    dailyRate: 85, seats: 5, transmission: 'Automatic', fuelType: 'Petrol',
    features: ['Apple CarPlay', 'Reverse Camera', 'AC', 'Cruise Control']
  },
  { 
    id: '3', operatorId: 'demo', make: 'Suzuki', model: 'Swift', plate: 'BA-5-PA 5566', type: VehicleType.SEDAN, 
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1000', 
    description: 'Economical and zippy city car. Easy to park and fuel efficient.',
    dailyRate: 45, seats: 4, transmission: 'Manual', fuelType: 'Petrol',
    features: ['Bluetooth', 'AC', 'Power Steering']
  },
  { 
    id: '4', operatorId: 'demo', make: 'Toyota', model: 'HiAce', plate: 'BA-1-JA 1122', type: VehicleType.VAN, 
    imageUrl: 'https://images.unsplash.com/photo-1625055086221-5f252445b41e?q=80&w=1000', 
    description: 'Spacious 14-seater van for group tours and events.',
    dailyRate: 150, seats: 14, transmission: 'Manual', fuelType: 'Diesel',
    features: ['High Roof', 'AC', 'Reclining Seats']
  },
  { 
    id: '5', operatorId: 'demo', make: 'Mahindra', model: 'Scorpio', plate: 'BA-4-PA 7788', type: VehicleType.SUV, 
    imageUrl: 'https://images.unsplash.com/photo-1632245889029-e413c634e121?q=80&w=1000', 
    description: 'Rugged SUV for rough terrains.',
    dailyRate: 90, seats: 7, transmission: 'Manual', fuelType: 'Diesel',
    features: ['4WD', 'AC', 'Roof Carrier']
  }
];

export default function VehicleListingPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: 'All',
    minPrice: 0,
    maxPrice: 500,
    seats: 2,
    transmission: 'All'
  });

  const filteredVehicles = MOCK_PUBLIC_FLEET.filter(v => {
    if (filters.type !== 'All' && v.type !== filters.type) return false;
    if (v.dailyRate && v.dailyRate > filters.maxPrice) return false;
    if (v.seats && v.seats < filters.seats) return false;
    if (filters.transmission !== 'All' && v.transmission !== filters.transmission) return false;
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Our Fleet</h1>
            <p className="text-slate-500 mt-2">Browse our collection of quality vehicles.</p>
          </div>
          <Button 
            className="md:hidden flex items-center gap-2" 
            variant="outline"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <Filter size={16} /> Filters
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden md:block w-72 flex-shrink-0 sticky top-24">
            <VehicleFilters filters={filters} onChange={setFilters} />
          </div>

          {/* Mobile Filter Drawer (Simple implementation) */}
          {mobileFiltersOpen && (
             <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:hidden">
                <div className="bg-white w-full rounded-t-2xl max-h-[90vh] overflow-y-auto">
                   <VehicleFilters 
                      filters={filters} 
                      onChange={setFilters} 
                      onClose={() => setMobileFiltersOpen(false)}
                   />
                </div>
             </div>
          )}

          {/* Vehicle Grid */}
          <div className="flex-1 w-full">
            <VehicleGrid vehicles={filteredVehicles} />
          </div>
        </div>
      </div>
    </div>
  );
}