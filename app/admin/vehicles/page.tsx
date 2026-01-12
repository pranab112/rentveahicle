import React, { useState } from 'react';
import { Vehicle, VehicleType, VehicleStatus } from '../../../types';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Plus, Filter } from 'lucide-react';
import { VehicleTable } from '../../../components/admin/vehicles/VehicleTable';

// Mock Data
const MOCK_VEHICLES: Vehicle[] = [
  { 
    id: '1', operatorId: 'me', make: 'Toyota', model: 'Prado', year: 2022, plate: 'BA-2-PA 9988', type: VehicleType.SUV, 
    imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=200', 
    description: 'Luxury SUV', dailyRate: 120, status: VehicleStatus.ACTIVE
  },
  { 
    id: '2', operatorId: 'me', make: 'Hyundai', model: 'Tucson', year: 2021, plate: 'BA-3-CH 1234', type: VehicleType.SUV, 
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=200', 
    description: 'Compact SUV', dailyRate: 85, status: VehicleStatus.MAINTENANCE
  },
  { 
    id: '3', operatorId: 'me', make: 'Suzuki', model: 'Swift', year: 2023, plate: 'BA-5-PA 5566', type: VehicleType.SEDAN, 
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=200', 
    description: 'Economical car', dailyRate: 45, status: VehicleStatus.ACTIVE
  }
];

export default function AdminVehiclesPage() {
  const [filter, setFilter] = useState<string>('All');
  const [vehicles, setVehicles] = useState(MOCK_VEHICLES);

  const filteredVehicles = vehicles.filter(v => {
    if (filter === 'All') return true;
    return v.status === filter;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(prev => prev.filter(v => v.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Vehicles</h2>
          <p className="text-slate-500">Manage your fleet inventory, pricing and availability.</p>
        </div>
        <Link to="/admin/vehicles/new">
          <Button className="gap-2">
            <Plus size={18} /> Add New Vehicle
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        {['All', ...Object.values(VehicleStatus)].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
              filter === status 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <VehicleTable vehicles={filteredVehicles} onDelete={handleDelete} />
    </div>
  );
}