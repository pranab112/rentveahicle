import React from 'react';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, isSameMonth, isSameDay, isToday, 
  format, parseISO, isWithinInterval 
} from 'date-fns';
import { Booking, BookingStatus, Vehicle } from '../../../types';

interface CalendarGridProps {
  currentDate: Date;
  bookings: Booking[];
  vehicles: Vehicle[];
  onDayClick: (date: Date, dayBookings: Booking[]) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  currentDate, 
  bookings, 
  vehicles,
  onDayClick
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getDayBookings = (date: Date) => {
    return bookings.filter(booking => {
      const start = parseISO(booking.startDate);
      const end = parseISO(booking.endDate);
      // Check if current date is within booking range
      // We compare using date strings to avoid time discrepancies
      const dateStr = format(date, 'yyyy-MM-dd');
      return dateStr >= booking.startDate && dateStr <= booking.endDate;
    });
  };

  const getVehicleCode = (id: string) => {
    const v = vehicles.find(v => v.id === id);
    return v ? v.plate.split('-').pop() || v.model.substring(0, 3) : '---';
  };

  const getStatusStyle = (status: BookingStatus) => {
    switch(status) {
      case BookingStatus.PENDING: return 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200';
      case BookingStatus.CONFIRMED: return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
      case BookingStatus.ONGOING: return 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200';
      case BookingStatus.COMPLETED: return 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';
      case BookingStatus.CANCELLED: return 'bg-red-50 text-red-400 border-red-100 line-through opacity-50';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Days Header */}
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 auto-rows-fr">
        {days.map((day, dayIdx) => {
          const dayBookings = getDayBookings(day);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isTodayDate = isToday(day);

          return (
            <div 
              key={day.toString()} 
              className={`
                min-h-[120px] p-2 border-b border-r border-slate-100 transition-colors cursor-pointer hover:bg-slate-50
                ${!isCurrentMonth ? 'bg-slate-50/50 text-slate-400' : 'bg-white'}
                ${dayIdx % 7 === 6 ? 'border-r-0' : ''} /* Remove right border for last column */
              `}
              onClick={() => onDayClick(day, dayBookings)}
            >
              <div className="flex justify-between items-start mb-1">
                <span 
                  className={`
                    text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                    ${isTodayDate ? 'bg-indigo-600 text-white shadow-sm' : ''}
                  `}
                >
                  {format(day, 'd')}
                </span>
                {dayBookings.length > 0 && (
                   <span className="text-[10px] font-medium text-slate-400">{dayBookings.length}</span>
                )}
              </div>

              <div className="space-y-1">
                {dayBookings.slice(0, 4).map(booking => {
                  const isStart = isSameDay(day, parseISO(booking.startDate));
                  const isEnd = isSameDay(day, parseISO(booking.endDate));
                  const style = getStatusStyle(booking.status);
                  
                  return (
                    <div 
                      key={booking.id}
                      className={`
                        text-[10px] px-1.5 py-0.5 rounded border truncate
                        ${style}
                      `}
                      title={`${booking.customerName} - ${booking.status}`}
                    >
                      <span className="font-bold mr-1">{getVehicleCode(booking.vehicleId)}</span>
                      {/* Only show name on start day or if it's the first day of the week to give context */}
                      {(isStart || day.getDay() === 0) ? booking.customerName : ''}
                    </div>
                  );
                })}
                {dayBookings.length > 4 && (
                  <div className="text-[10px] text-slate-400 text-center font-medium">
                    + {dayBookings.length - 4} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};