import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import { useBookingContext } from '../../../context/BookingContext';
import BookingStatus from '../../../components/booking/BookingStatus';
import PaymentStatus from '../../../components/payment/PaymentStatus';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import Button from '../../../components/common/Button';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

const AdminBookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, updateBookingStatus } = useBookingContext();
  const booking = bookings.find(b => b.id === id);

  if (!booking) return null;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <button onClick={() => navigate('/admin/bookings')} className="inline-flex items-center space-x-2 text-xs font-bold text-purple-700 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Bookings</span>
        </button>

        <div className="bg-white rounded-3xl p-8 border border-peach-200 shadow-xl space-y-6">
          <div className="flex justify-between items-start border-b border-peach-100 pb-6">
            <div>
              <span className="text-xs font-bold text-peach-600 uppercase tracking-wider block">Booking Details</span>
              <h1 className="text-2xl font-black text-purple-950">{booking.hallName}</h1>
              <p className="text-xs text-slate-500">Booking ID: {booking.id}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <BookingStatus status={booking.status} />
              <PaymentStatus status={booking.paymentStatus} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-peach-50/60 p-4 rounded-2xl border border-peach-200 space-y-2">
              <h4 className="font-extrabold text-purple-950 text-xs uppercase tracking-wider">Event Details</h4>
              <p className="text-xs text-slate-700 font-bold">Type: {booking.eventType}</p>
              <p className="text-xs text-slate-600">Guests: {booking.guestCount}</p>
              <p className="text-xs text-slate-600">Dates: {formatDate(booking.startDate)} - {formatDate(booking.endDate)}</p>
            </div>

            <div className="bg-peach-50/60 p-4 rounded-2xl border border-peach-200 space-y-2">
              <h4 className="font-extrabold text-purple-950 text-xs uppercase tracking-wider">Customer Contact</h4>
              <p className="text-xs text-purple-950 font-bold">{booking.userName}</p>
              <p className="text-xs text-slate-600">{booking.userEmail}</p>
              <p className="text-xs text-slate-600">{booking.userPhone}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-peach-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Total Revenue</span>
              <span className="text-2xl font-black text-purple-950">{formatCurrency(booking.totalAmount)}</span>
            </div>

            <div className="flex space-x-3">
              {booking.status !== 'Rejected' && (
                <Button
                  variant="danger"
                  icon={XCircle}
                  onClick={() => {
                    updateBookingStatus(booking.id, 'Rejected');
                    navigate('/admin/bookings');
                  }}
                >
                  Cancel Booking
                </Button>
              )}
              {booking.status !== 'Approved' && (
                <Button
                  variant="primary"
                  icon={CheckCircle2}
                  onClick={() => {
                    updateBookingStatus(booking.id, 'Approved');
                    navigate('/admin/bookings');
                  }}
                >
                  Approve Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBookingDetails;
