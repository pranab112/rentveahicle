import React, { useState } from 'react';
import { VehicleForm } from '../../../components/admin/vehicles/VehicleForm';
import { Button } from '../../../components/ui/button';
import { ArrowLeft, CalendarX, Trash2, ClipboardList } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Vehicle, VehicleType, VehicleStatus } from '../../../types';
import { BlockDatesModal } from '../../../components/admin/vehicles/BlockDatesModal';

// Mock Fetch (In real app, fetch from API)
const MOCK_VEHICLE: Vehicle = { 
  id: '1', operatorId: 'me', make: 'Toyota', model: 'Prado', year: 2022, plate: 'BA-2-PA 9988', type: VehicleType.SUV, 
  imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=600', 
  description: 'Luxury SUV for off-road adventures and city comfort. Features leather seats and sunroof.',
  dailyRate: 120, seats: 7, transmission: 'Automatic', fuelType: 'Diesel', status: VehicleStatus.ACTIVE,
  features: ['Leather Seats', 'Sunroof', '4WD', 'Bluetooth', 'AC'],
  photos: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=600']
};

export default function EditVehiclePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBlockModal, setShowBlockModal] = useState(false);

  // In real app, fetch vehicle by id
  const vehicle = MOCK_VEHICLE; 

  const handleDelete = () => {
    if (confirm('Are you sure you want to permanently delete this vehicle?')) {
      // API delete call
      navigate('/admin/vehicles');
    }
  };

  const handleBlockDates = (start: string, end: string, reason: string) => {
    console.log(`Blocked ${start} to ${end} for ${reason}`);
    // API Call to block dates
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/vehicles">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft size={16} /> Back
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Edit Vehicle</h2>
            <p className="text-slate-500">Update details for {vehicle.make} {vehicle.model}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setShowBlockModal(true)}>
            <CalendarX size={16} /> Block Dates
          </Button>
          <Link to={`/admin/bookings?vehicleId=${id}`}>
             <Button variant="outline" className="gap-2">
               <ClipboardList size={16} /> View Bookings
             </Button>
          </Link>
          <Button variant="destructive" className="gap-2" onClick={handleDelete}>
            <Trash2 size={16} /> Delete
          </Button>
        </div>
      </div>
      
      <VehicleForm initialData={vehicle} isEdit />

      <BlockDatesModal 
        isOpen={showBlockModal} 
        onClose={() => setShowBlockModal(false)} 
        onSave={handleBlockDates} 
      />
    </div>
  );
}