import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { CalendarHeader } from '../../../components/admin/calendar/CalendarHeader';
import { CalendarGrid } from '../../../components/admin/calendar/CalendarGrid';
import { DayDetailModal } from '../../../components/admin/calendar/DayDetailModal';
import { MOCK_PUBLIC_FLEET } from '../../vehicles/page';
import { Booking, BookingStatus } from '../../../types';

// Extended Mock Bookings for demonstration
const MOCK_CALENDAR_BOOKINGS: Booking[] = [
  { 
    id: 'b_1001', vehicleId: '1', customerName: 'John Doe', customerPhone: '9841234567', 
    startDate: '2024-05-20', endDate: '2024-05-22', pickupLocation: 'Airport', dropLocation: 'Hotel', 
    status: BookingStatus.CONFIRMED, totalAmount: 360 
  },
  { 
    id: 'b_1002', vehicleId: '2', customerName: 'Jane Smith', customerPhone: '9801987654', 
    startDate: new Date().toISOString().split('T')[0], endDate: '2024-06-05', pickupLocation: 'Thamel', dropLocation: 'Pokhara', 
    status: BookingStatus.ONGOING, totalAmount: 425 
  },
  { 
    id: 'b_1003', vehicleId: '3', customerName: 'Alice Johnson', customerPhone: '9812341234', 
    startDate: '2024-06-10', endDate: '2024-06-12', pickupLocation: 'Boudha', dropLocation: 'Nagarkot', 
    status: BookingStatus.PENDING, totalAmount: 135 
  },
   { 
    id: 'b_1004', vehicleId: '1', customerName: 'Bob Brown', customerPhone: '9867890123', 
    startDate: '2024-06-15', endDate: '2024-06-16', pickupLocation: 'Patan', dropLocation: 'Bhaktapur', 
    status: BookingStatus.CONFIRMED, totalAmount: 600 
  },
  { 
    id: 'b_1005', vehicleId: '4', customerName: 'Sarah Conner', customerPhone: '9800000000', 
    startDate: '2024-05-25', endDate: '2024-05-28', pickupLocation: 'Patan', dropLocation: 'Bhaktapur', 
    status: BookingStatus.COMPLETED, totalAmount: 400 
  },
];

export default function AdminCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedVehicleId, setSelectedVehicleId] = useState('all');
  const [selectedDay, setSelectedDay] = useState<{ date: Date; bookings: Booking[] } | null>(null);

  const bookings = MOCK_CALENDAR_BOOKINGS;
  const vehicles = MOCK_PUBLIC_FLEET;

  const filteredBookings = bookings.filter(b => 
    selectedVehicleId === 'all' || b.vehicleId === selectedVehicleId
  );

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const handleDayClick = (date: Date, dayBookings: Booking[]) => {
    setSelectedDay({ date, bookings: dayBookings });
  };

  return (
    <div className="h-full flex flex-col">
      <CalendarHeader 
        currentDate={currentDate}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        onToday={handleToday}
        selectedVehicleId={selectedVehicleId}
        onVehicleChange={setSelectedVehicleId}
        vehicles={vehicles}
      />

      <div className="flex-1">
        <CalendarGrid 
          currentDate={currentDate}
          bookings={filteredBookings}
          vehicles={vehicles}
          onDayClick={handleDayClick}
        />
      </div>

      <DayDetailModal 
        isOpen={!!selectedDay}
        onClose={() => setSelectedDay(null)}
        date={selectedDay?.date || new Date()}
        bookings={selectedDay?.bookings || []}
        vehicles={vehicles}
      />
    </div>
  );
}