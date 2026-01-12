import React, { useState } from 'react';
import { Vehicle, VehicleType } from '../types';
import { generateVehicleDescription } from '../services/geminiService';
import { Plus, Trash2, Car, Loader2, Image as ImageIcon, Link as LinkIcon, UploadCloud } from 'lucide-react';

interface FleetManagerProps {
  vehicles: Vehicle[];
  onAddVehicle: (v: Vehicle) => void;
  onRemoveVehicle: (id: string) => void;
}

export const FleetManager: React.FC<FleetManagerProps> = ({ vehicles, onAddVehicle, onRemoveVehicle }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Image handling state
  const [imageTab, setImageTab] = useState<'upload' | 'url'>('upload');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [previewImage, setPreviewImage] = useState<string>('');

  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    type: VehicleType.SEDAN,
    make: '',
    model: '',
    plate: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlBlur = () => {
    if (imageUrlInput) {
      setPreviewImage(imageUrlInput);
    }
  };

  const handleAdd = async () => {
    if (!newVehicle.make || !newVehicle.model || !newVehicle.plate) return;
    
    setLoading(true);
    const description = await generateVehicleDescription(
      newVehicle.make, 
      newVehicle.model, 
      newVehicle.type as string
    );

    // Use preview image if available, otherwise fallback to random placeholder
    const finalImage = previewImage || `https://picsum.photos/400/300?random=${Date.now()}`;

    const vehicle: Vehicle = {
      id: Date.now().toString(),
      operatorId: 'me',
      make: newVehicle.make,
      model: newVehicle.model,
      plate: newVehicle.plate,
      type: newVehicle.type as VehicleType,
      imageUrl: finalImage,
      photos: [finalImage], // Store as first photo in array
      description: description
    };

    onAddVehicle(vehicle);
    
    // Reset State
    setLoading(false);
    setIsAdding(false);
    setNewVehicle({ type: VehicleType.SEDAN, make: '', model: '', plate: '' });
    setPreviewImage('');
    setImageUrlInput('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Fleet</h2>
          <p className="text-slate-500">Manage your inventory and availability.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} /> Add Vehicle
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in slide-in-from-top-4">
          <h3 className="text-lg font-semibold mb-4">Add New Vehicle</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Left Column: Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Make</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Toyota"
                  value={newVehicle.make}
                  onChange={e => setNewVehicle({...newVehicle, make: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Camry"
                  value={newVehicle.model}
                  onChange={e => setNewVehicle({...newVehicle, model: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Plate Number</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. ABC-1234"
                  value={newVehicle.plate}
                  onChange={e => setNewVehicle({...newVehicle, plate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select 
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={newVehicle.type}
                  onChange={e => setNewVehicle({...newVehicle, type: e.target.value as VehicleType})}
                >
                  {Object.values(VehicleType).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column: Photo */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Vehicle Photo</label>
              
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex gap-2 mb-3">
                  <button 
                    onClick={() => setImageTab('upload')}
                    className={`flex-1 flex items-center justify-center gap-2 text-xs font-medium py-2 rounded-md transition-colors ${imageTab === 'upload' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <UploadCloud size={14} /> Upload
                  </button>
                  <button 
                    onClick={() => setImageTab('url')}
                    className={`flex-1 flex items-center justify-center gap-2 text-xs font-medium py-2 rounded-md transition-colors ${imageTab === 'url' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <LinkIcon size={14} /> Link URL
                  </button>
                </div>

                {imageTab === 'upload' ? (
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-white hover:bg-slate-50 transition-colors relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <ImageIcon className="mx-auto text-slate-400 mb-2" size={24} />
                    <p className="text-xs text-slate-500">Click to upload image</p>
                  </div>
                ) : (
                  <div>
                    <input 
                      type="text" 
                      className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="https://example.com/car.jpg"
                      value={imageUrlInput}
                      onChange={e => setImageUrlInput(e.target.value)}
                      onBlur={handleUrlBlur}
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Paste URL and click outside to preview</p>
                  </div>
                )}

                {/* Preview Area */}
                <div className="mt-4">
                   <p className="text-xs font-medium text-slate-600 mb-2">Preview:</p>
                   <div className="w-full h-32 bg-slate-200 rounded-md overflow-hidden flex items-center justify-center border border-slate-300">
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-slate-400 text-xs">No image selected</span>
                      )}
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button 
              onClick={handleAdd}
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              {loading ? 'Generating Details...' : 'Save Vehicle'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="h-48 overflow-hidden relative">
              <img src={vehicle.imageUrl} alt={vehicle.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-slate-700">
                {vehicle.plate}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-slate-900">{vehicle.make} {vehicle.model}</h3>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mt-1">
                    {vehicle.type}
                  </span>
                </div>
                <button 
                  onClick={() => onRemoveVehicle(vehicle.id)}
                  className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-sm text-slate-500 line-clamp-2">{vehicle.description}</p>
            </div>
          </div>
        ))}
        {vehicles.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
            <Car size={48} className="mx-auto mb-3 opacity-50" />
            <p>No vehicles in your fleet yet.</p>
            <button onClick={() => setIsAdding(true)} className="text-indigo-600 font-medium hover:underline mt-2">Add your first vehicle</button>
          </div>
        )}
      </div>
    </div>
  );
};