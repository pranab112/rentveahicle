import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../ui/button';
import { VehicleType, VehicleStatus, Vehicle } from '../../../types';
import { PhotoUploader } from './PhotoUploader';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const vehicleSchema = z.object({
  make: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  plate: z.string().min(1, "License plate is required"),
  type: z.nativeEnum(VehicleType),
  status: z.nativeEnum(VehicleStatus).optional(),
  seats: z.number().min(1, "At least 1 seat required"),
  fuelType: z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid']),
  transmission: z.enum(['Automatic', 'Manual']),
  features: z.array(z.string()),
  dailyRate: z.number().min(0, "Rate must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  photos: z.array(z.string()).min(1, "At least 1 photo is required"),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

interface VehicleFormProps {
  initialData?: Partial<Vehicle>;
  isEdit?: boolean;
}

const COMMON_FEATURES = [
  "Air Conditioning", "Bluetooth", "Reverse Camera", "GPS Navigation",
  "Leather Seats", "Sunroof", "Cruise Control", "Apple CarPlay",
  "Android Auto", "Heated Seats", "Roof Rack", "4WD"
];

export const VehicleForm: React.FC<VehicleFormProps> = ({ initialData, isEdit }) => {
  const navigate = useNavigate();
  const { register, control, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      make: initialData?.make || '',
      model: initialData?.model || '',
      year: initialData?.year || new Date().getFullYear(),
      plate: initialData?.plate || '',
      type: initialData?.type || VehicleType.SEDAN,
      status: initialData?.status || VehicleStatus.ACTIVE,
      seats: initialData?.seats || 4,
      fuelType: initialData?.fuelType || 'Petrol',
      transmission: initialData?.transmission || 'Manual',
      features: initialData?.features || [],
      dailyRate: initialData?.dailyRate || 0,
      description: initialData?.description || '',
      photos: initialData?.photos || (initialData?.imageUrl ? [initialData.imageUrl] : []),
    }
  });

  const selectedFeatures = watch('features');
  const photos = watch('photos');

  const onSubmit = async (data: VehicleFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form Data:", data);
    navigate('/admin/vehicles');
  };

  const toggleFeature = (feature: string) => {
    const current = selectedFeatures || [];
    if (current.includes(feature)) {
      setValue('features', current.filter(f => f !== feature));
    } else {
      setValue('features', [...current, feature]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto pb-10">
      
      {/* 1. Basic Info */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Brand / Make *</label>
            <input {...register('make')} className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Toyota" />
            {errors.make && <p className="text-xs text-red-500">{errors.make.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Model *</label>
            <input {...register('model')} className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Corolla" />
            {errors.model && <p className="text-xs text-red-500">{errors.model.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Year</label>
            <input type="number" {...register('year', { valueAsNumber: true })} className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
            {errors.year && <p className="text-xs text-red-500">{errors.year.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Number Plate *</label>
            <input {...register('plate')} className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none uppercase" placeholder="ABC-1234" />
            {errors.plate && <p className="text-xs text-red-500">{errors.plate.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Vehicle Type</label>
            <select {...register('type')} className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
              {Object.values(VehicleType).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          {isEdit && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Status</label>
              <select {...register('status')} className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                {Object.values(VehicleStatus).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* 2. Specifications */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Seats</label>
            <input type="number" {...register('seats', { valueAsNumber: true })} className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Fuel Type</label>
            <select {...register('fuelType')} className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
              {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Transmission</label>
            <select {...register('transmission')} className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
              {['Manual', 'Automatic'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-3 block">Features</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {COMMON_FEATURES.map(feature => (
              <label key={feature} className="flex items-center space-x-2 cursor-pointer p-2 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={selectedFeatures?.includes(feature)}
                  onChange={() => toggleFeature(feature)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="text-sm text-slate-700 select-none">{feature}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Pricing */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Daily Rate (NPR) *</label>
            <div className="relative">
               <span className="absolute left-3 top-2 text-slate-500 text-sm">Rs.</span>
               <input 
                 type="number" 
                 {...register('dailyRate', { valueAsNumber: true })} 
                 className="w-full pl-10 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" 
                 placeholder="0.00"
               />
            </div>
            {errors.dailyRate && <p className="text-xs text-red-500">{errors.dailyRate.message}</p>}
          </div>
          {/* Add more pricing fields if needed */}
        </div>
      </div>

      {/* 4. Photos */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Vehicle Photos</h3>
        <Controller
          control={control}
          name="photos"
          render={({ field }) => (
            <PhotoUploader photos={field.value} onChange={field.onChange} />
          )}
        />
        {errors.photos && <p className="text-xs text-red-500 mt-2">{errors.photos.message}</p>}
      </div>

      {/* 5. Description */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Description</h3>
        <textarea 
          {...register('description')}
          className="w-full p-4 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none h-32"
          placeholder="Describe your vehicle..."
        />
        {errors.description && <p className="text-xs text-red-500 mt-2">{errors.description.message}</p>}
      </div>

      <div className="flex items-center justify-end gap-4 sticky bottom-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-lg">
        <Button type="button" variant="outline" onClick={() => navigate('/admin/vehicles')}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting} className="min-w-[150px]">
          {isEdit ? 'Update Vehicle' : 'Save Vehicle'}
        </Button>
      </div>
    </form>
  );
};