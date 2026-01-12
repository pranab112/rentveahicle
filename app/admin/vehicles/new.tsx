import React from 'react';
import { VehicleForm } from '../../../components/admin/vehicles/VehicleForm';
import { Button } from '../../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewVehiclePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/vehicles">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft size={16} /> Back
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Add New Vehicle</h2>
          <p className="text-slate-500">Enter the details of your new fleet addition.</p>
        </div>
      </div>
      
      <VehicleForm />
    </div>
  );
}