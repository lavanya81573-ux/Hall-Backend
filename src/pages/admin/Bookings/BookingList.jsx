import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import BookingTable from '../../../components/admin/BookingTable';
import { useBookingContext } from '../../../context/BookingContext';

const BookingList = () => {
  const { bookings, updateBookingStatus } = useBookingContext();
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-purple-950">Master Booking Records</h1>
          <p className="text-xs text-slate-500">Review all reservation requests, approve or decline pending bookings</p>
        </div>

        <BookingTable
          bookings={bookings}
          onApprove={(id) => updateBookingStatus(id, 'Approved')}
          onReject={(id) => updateBookingStatus(id, 'Rejected')}
          onViewDetails={(booking) => navigate(`/admin/bookings/${booking.id}`)}
        />
      </div>
    </AdminLayout>
  );
};

export default BookingList;
