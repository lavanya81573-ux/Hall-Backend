import React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import BookingCalendar from '../../../components/booking/BookingCalendar';
import { useBookingContext } from '../../../context/BookingContext';

const AdminHallAvailability = () => {
  const { bookings } = useBookingContext();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-purple-950">Elite Hall Availability Overview</h1>
          <p className="text-xs text-slate-500">Monitor availability schedules and dates for all Elite Hall suites</p>
        </div>

        <BookingCalendar bookings={bookings} />
      </div>
    </AdminLayout>
  );
};

export default AdminHallAvailability;
