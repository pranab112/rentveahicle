import React from 'react';
import { BookingStatus } from '../../../types';

export const StatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
  const styles = {
    [BookingStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [BookingStatus.CONFIRMED]: 'bg-blue-100 text-blue-800 border-blue-200',
    [BookingStatus.ONGOING]: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    [BookingStatus.COMPLETED]: 'bg-green-100 text-green-800 border-green-200',
    [BookingStatus.CANCELLED]: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
};