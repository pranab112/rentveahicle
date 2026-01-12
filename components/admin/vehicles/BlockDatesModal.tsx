import React from 'react';
import { Button } from '../../ui/button';
import { X } from 'lucide-react';

interface BlockDatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (start: string, end: string, reason: string) => void;
}

export const BlockDatesModal: React.FC<BlockDatesModalProps> = ({ isOpen, onClose, onSave }) => {
  const [start, setStart] = React.useState('');
  const [end, setEnd] = React.useState('');
  const [reason, setReason] = React.useState('Maintenance');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Block Dates</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Start Date</label>
              <input 
                type="date" 
                value={start}
                onChange={e => setStart(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">End Date</label>
              <input 
                type="date" 
                value={end}
                onChange={e => setEnd(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Reason</label>
            <select 
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="Maintenance">Maintenance</option>
              <option value="Personal Use">Personal Use</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="p-6 pt-0 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => { onSave(start, end, reason); onClose(); }}>Block Dates</Button>
        </div>
      </div>
    </div>
  );
};