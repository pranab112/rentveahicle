import React from 'react';
import { Vehicle, VehicleStatus } from '../../../types';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Edit, Trash2, Calendar, Eye } from 'lucide-react';

interface VehicleTableProps {
  vehicles: Vehicle[];
  onDelete: (id: string) => void;
}

export const VehicleTable: React.FC<VehicleTableProps> = ({ vehicles, onDelete }) => {
  const getStatusColor = (status?: VehicleStatus) => {
    switch(status) {
      case VehicleStatus.ACTIVE: return 'bg-green-100 text-green-700';
      case VehicleStatus.MAINTENANCE: return 'bg-yellow-100 text-yellow-700';
      case VehicleStatus.INACTIVE: return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Vehicle</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Plate</th>
              <th className="px-6 py-4">Rate</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  No vehicles found. Add your first vehicle to get started.
                </td>
              </tr>
            ) : vehicles.map(vehicle => (
              <tr key={vehicle.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                      <img src={vehicle.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{vehicle.make} {vehicle.model}</div>
                      <div className="text-xs text-slate-500">{vehicle.year || '2023'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{vehicle.type}</td>
                <td className="px-6 py-4 font-mono text-slate-600 text-xs uppercase">{vehicle.plate}</td>
                <td className="px-6 py-4 font-medium text-slate-900">${vehicle.dailyRate}<span className="text-xs text-slate-400 font-normal">/day</span></td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status || VehicleStatus.ACTIVE}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to={`/admin/vehicles/${vehicle.id}`}>
                      <Button variant="secondary" size="sm" className="h-8 w-8 p-0" title="Edit">
                        <Edit size={14} />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50" title="Delete" onClick={() => onDelete(vehicle.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};