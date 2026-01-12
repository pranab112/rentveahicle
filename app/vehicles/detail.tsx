import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PUBLIC_FLEET } from './page';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Users, Settings2, Fuel, Check } from 'lucide-react';
import { PhotoGallery } from '../../components/public/PhotoGallery';
import { BookingCTA } from '../../components/public/BookingCTA';
import { AvailabilityCalendar } from '../../components/public/AvailabilityCalendar';

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  // Find vehicle in mock data
  const vehicle = MOCK_PUBLIC_FLEET.find(v => v.id === id);

  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Vehicle Not Found</h2>
        <Link to="/vehicles">
          <Button variant="outline">Back to Fleet</Button>
        </Link>
      </div>
    );
  }

  // Mock gallery images (reusing main image for demo if no photos array)
  const galleryImages = vehicle.photos && vehicle.photos.length > 0 
    ? vehicle.photos 
    : [vehicle.imageUrl, vehicle.imageUrl, vehicle.imageUrl, vehicle.imageUrl];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumb / Back */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="container mx-auto px-4 h-14 flex items-center">
          <Link to="/vehicles" className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-2">
            <ArrowLeft size={16} /> Back to All Vehicles
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PhotoGallery images={galleryImages} alt={`${vehicle.make} ${vehicle.model}`} />
            
            <div className="bg-white rounded-xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                 <div>
                   <h1 className="text-3xl font-bold text-slate-900">{vehicle.make} {vehicle.model}</h1>
                   <div className="flex items-center gap-3 mt-2">
                     <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                       {vehicle.type}
                     </span>
                     <span className="text-slate-400 text-sm">ID: {vehicle.id}</span>
                   </div>
                 </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-lg text-center">
                   <Users className="mx-auto text-slate-400 mb-2" size={20} />
                   <p className="text-sm font-medium text-slate-900">{vehicle.seats} Seats</p>
                   <p className="text-xs text-slate-500">Capacity</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg text-center">
                   <Settings2 className="mx-auto text-slate-400 mb-2" size={20} />
                   <p className="text-sm font-medium text-slate-900">{vehicle.transmission}</p>
                   <p className="text-xs text-slate-500">Gearbox</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg text-center">
                   <Fuel className="mx-auto text-slate-400 mb-2" size={20} />
                   <p className="text-sm font-medium text-slate-900">{vehicle.fuelType}</p>
                   <p className="text-xs text-slate-500">Fuel Type</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg text-center">
                   <span className="block text-xl font-bold text-slate-400 mb-1">2023</span>
                   <p className="text-sm font-medium text-slate-900">Year</p>
                   <p className="text-xs text-slate-500">Model</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-slate-900">Description</h3>
                <p className="text-slate-600 leading-relaxed">{vehicle.description}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {vehicle.features?.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <AvailabilityCalendar />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BookingCTA vehicleId={vehicle.id} dailyRate={vehicle.dailyRate || 50} vehicleName={`${vehicle.make} ${vehicle.model}`} />
          </div>

        </div>
      </div>
    </div>
  );
}