import React from 'react';
import { BookingStatus } from '../../../types';
import { Button } from '../../ui/button';
import { CheckCircle, PlayCircle, StopCircle, XCircle } from 'lucide-react';

interface StatusActionsProps {
  status: BookingStatus;
  onUpdateStatus: (newStatus: BookingStatus) => void;
}

export const StatusActions: React.FC<StatusActionsProps> = ({ status, onUpdateStatus }) => {
  return (
    <div className="flex items-center gap-2">
      {status === BookingStatus.PENDING && (
        <>
          <Button 
            className="bg-green-600 hover:bg-green-700 gap-2"
            onClick={() => onUpdateStatus(BookingStatus.CONFIRMED)}
          >
            <CheckCircle size={16} /> Confirm Booking
          </Button>
          <Button 
            variant="destructive"
            className="gap-2"
            onClick={() => onUpdateStatus(BookingStatus.CANCELLED)}
          >
             <XCircle size={16} /> Cancel
          </Button>
        </>
      )}

      {status === BookingStatus.CONFIRMED && (
        <>
           <Button 
            className="bg-indigo-600 hover:bg-indigo-700 gap-2"
            onClick={() => onUpdateStatus(BookingStatus.ONGOING)}
           >
             <PlayCircle size={16} /> Start Trip
           </Button>
           <Button 
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-2"
            onClick={() => onUpdateStatus(BookingStatus.CANCELLED)}
           >
             <XCircle size={16} /> Cancel
           </Button>
        </>
      )}

      {status === BookingStatus.ONGOING && (
         <Button 
            className="bg-green-600 hover:bg-green-700 gap-2"
            onClick={() => onUpdateStatus(BookingStatus.COMPLETED)}
         >
            <CheckCircle size={16} /> Complete Trip
         </Button>
      )}

      {/* No actions for Completed or Cancelled */}
    </div>
  );
};