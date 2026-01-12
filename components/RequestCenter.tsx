import React from 'react';
import { VehicleRequest, RequestStatus } from '../types';
import { ArrowDownLeft, ArrowUpRight, Check, X } from 'lucide-react';

interface RequestCenterProps {
  incomingRequests: VehicleRequest[];
  outgoingRequests: VehicleRequest[];
  onHandleRequest: (id: string, action: 'accept' | 'reject') => void;
}

export const RequestCenter: React.FC<RequestCenterProps> = ({ incomingRequests, outgoingRequests, onHandleRequest }) => {
  
  const StatusBadge = ({ status }: { status: RequestStatus }) => {
    const colors = {
      [RequestStatus.PENDING]: 'bg-yellow-100 text-yellow-700',
      [RequestStatus.ACCEPTED]: 'bg-green-100 text-green-700',
      [RequestStatus.REJECTED]: 'bg-red-100 text-red-700',
    };
    return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[status]}`}>{status}</span>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Incoming */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <ArrowDownLeft className="text-indigo-600" /> Incoming Requests
        </h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
          {incomingRequests.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-sm">No incoming requests.</div>
          ) : incomingRequests.map(req => (
            <div key={req.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-slate-800">Request for {req.vehicleId}</p>
                  <p className="text-xs text-slate-500">From: {req.requestingOperatorName}</p>
                </div>
                <StatusBadge status={req.status} />
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Dates: <span className="font-medium">{req.startDate}</span> to <span className="font-medium">{req.endDate}</span>
              </p>
              {req.status === RequestStatus.PENDING && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => onHandleRequest(req.id, 'accept')}
                    className="flex-1 bg-indigo-600 text-white text-xs py-1.5 rounded hover:bg-indigo-700 flex items-center justify-center gap-1"
                  >
                    <Check size={12} /> Accept
                  </button>
                  <button 
                    onClick={() => onHandleRequest(req.id, 'reject')}
                    className="flex-1 bg-white border border-slate-300 text-slate-600 text-xs py-1.5 rounded hover:bg-slate-50 flex items-center justify-center gap-1"
                  >
                    <X size={12} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Outgoing */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <ArrowUpRight className="text-emerald-600" /> Outgoing Requests
        </h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
          {outgoingRequests.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-sm">No outgoing requests sent.</div>
          ) : outgoingRequests.map(req => (
            <div key={req.id} className="p-4">
               <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-slate-800">Requesting {req.vehicleId}</p>
                  <p className="text-xs text-slate-500">Sent to Partner</p>
                </div>
                <StatusBadge status={req.status} />
              </div>
              <p className="text-sm text-slate-600">
                 Requested: {req.startDate}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};