import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import BookingTable from '../../../components/admin/BookingTable';
import { useBookingContext } from '../../../context/BookingContext';

const BookingApproval = () => {
  const { bookings, updateBookingStatus } = useBookingContext();
  const navigate = useNavigate();
  const pendingBookings = bookings.filter(b => b.status === 'Pending');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-purple-950">Pending Approvals Queue</h1>
          <p className="text-xs text-slate-500">Filter list of reservation requests awaiting admin approval</p>
        </div>

        {pendingBookings.length > 0 ? (
          <BookingTable
            bookings={pendingBookings}
            onApprove={(id) => updateBookingStatus(id, 'Approved')}
            onReject={(id) => updateBookingStatus(id, 'Rejected')}
            onViewDetails={(booking) => navigate(`/admin/bookings/${booking.id}`)}
          />
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-peach-200 shadow-sm">
            <h3 className="text-lg font-bold text-purple-950">No Pending Approvals 🎉</h3>
            <p className="text-xs text-slate-500 mt-1">All reservation requests have been processed.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BookingApproval;
