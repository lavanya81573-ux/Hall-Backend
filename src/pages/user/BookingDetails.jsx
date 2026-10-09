import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import { useBookings } from '../../hooks/useBookings';
import BookingStatus from '../../components/booking/BookingStatus';
import PaymentStatus from '../../components/payment/PaymentStatus';
import BookingLifecycleStepper from '../../components/booking/BookingLifecycleStepper';
import PaymentReceipt from '../../components/payment/PaymentReceipt';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { Building2, Calendar, Users, Mail, Phone, ArrowLeft, CreditCard, Clock, Receipt, Printer, XCircle, Star } from 'lucide-react';
import Button from '../../components/common/Button';

const BookingDetails = () => {
  const { id } = useParams();
  const { getBookingById, updateBookingStatus, updatePaymentStatus } = useBookings();
  const booking = getBookingById(id);
  const [showReceipt, setShowReceipt] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  // Feedback state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  if (!booking) {
    return (
      <UserLayout>
        <div className="py-20 text-center">
          <h2 className="text-xl font-bold text-purple-950">Booking Record Not Found</h2>
          <Link to="/my-bookings" className="text-purple-700 underline mt-2 inline-block">
            Back to My Bookings
          </Link>
        </div>
      </UserLayout>
    );
  }

  const handleCancelBooking = () => {
    updateBookingStatus(booking.id, 'Cancelled');
    if (booking.paymentStatus === 'Paid') {
      updatePaymentStatus(booking.id, 'Refunded', booking.paymentMethod);
    }
    setConfirmCancelOpen(false);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (rating > 0) {
      setFeedbackSubmitted(true);
    }
  };

  return (
    <UserLayout>
      <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link to="/my-bookings" className="inline-flex items-center space-x-2 text-xs font-bold text-purple-700 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Bookings</span>
        </Link>

        {/* Visual 8-Stage Booking Lifecycle Progress Bar */}
        <BookingLifecycleStepper booking={booking} />

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-peach-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-peach-100 pb-6 gap-4">
            <div>
              <span className="text-xs font-bold text-peach-600 block uppercase tracking-wider">Booking Record</span>
              <h1 className="text-2xl font-black text-purple-950">{booking.hallName}</h1>
              <p className="text-xs text-slate-500">Reference ID: {booking.id}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <BookingStatus status={booking.status} />
              <PaymentStatus status={booking.paymentStatus} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="bg-peach-50/60 p-4 rounded-2xl border border-peach-200 space-y-2">
              <h4 className="font-extrabold text-purple-950 text-xs uppercase tracking-wider">Schedule &amp; Guests</h4>
              <p className="flex items-center space-x-2 text-slate-700 text-xs">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
              </p>
              <p className="flex items-center space-x-2 text-slate-700 text-xs">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Event Slot: <strong>{booking.startTime || '09:00 AM'} - {booking.endTime || '10:00 PM'}</strong></span>
              </p>
              <p className="flex items-center space-x-2 text-slate-700 text-xs">
                <Users className="w-4 h-4 text-peach-500" />
                <span>{booking.guestCount} Attending Guests ({booking.eventType})</span>
              </p>
            </div>

            <div className="bg-peach-50/60 p-4 rounded-2xl border border-peach-200 space-y-2">
              <h4 className="font-extrabold text-purple-950 text-xs uppercase tracking-wider">Contact &amp; Payment</h4>
              <p className="font-bold text-purple-950 text-xs">{booking.userName}</p>
              <p className="flex items-center space-x-2 text-slate-600 text-xs">
                <Mail className="w-4 h-4 text-purple-600" />
                <span>{booking.userEmail}</span>
              </p>
              <p className="flex items-center space-x-2 text-slate-600 text-xs">
                <CreditCard className="w-4 h-4 text-peach-500" />
                <span>Payment Method: <strong>{booking.paymentMethod || 'Credit Card'}</strong></span>
              </p>
            </div>
          </div>

          {booking.notes && (
            <div className="p-4 rounded-2xl bg-purple-50 text-xs text-purple-900 border border-purple-200">
              <strong>Special Instructions:</strong> {booking.notes}
            </div>
          )}

          <div className="pt-4 border-t border-peach-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Total Charges</span>
              <span className="text-2xl font-black text-purple-950">{formatCurrency(booking.totalAmount)}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="md"
                icon={Receipt}
                onClick={() => setShowReceipt(!showReceipt)}
              >
                {showReceipt ? 'Hide Receipt' : 'View Payment Receipt'}
              </Button>

              {booking.paymentStatus === 'Pending' && booking.status !== 'Cancelled' && (
                <Link to={`/payment/${booking.id}`}>
                  <Button variant="primary" size="md" icon={CreditCard}>
                    Complete Payment Now
                  </Button>
                </Link>
              )}

              {booking.status !== 'Cancelled' && booking.status !== 'Rejected' && (
                <Button variant="outline" size="md" icon={XCircle} onClick={() => setConfirmCancelOpen(true)}>
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Payment Receipt Component */}
        {(showReceipt || booking.paymentStatus === 'Paid' || booking.paymentStatus === 'Refunded') && (
          <div className="pt-4">
            <h3 className="text-lg font-black text-purple-950 mb-3 px-2">Official Payment Receipt</h3>
            <PaymentReceipt booking={booking} txnId={booking.transactionId || 'TXN-62013616'} />
          </div>
        )}

        {/* Feedback Section */}
        {booking.status === 'Approved' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-peach-200 shadow-xl space-y-4">
            <h3 className="text-xl font-black text-purple-950">Hall Feedback</h3>
            <p className="text-xs text-slate-500 mb-4">Please rate your experience and provide comments about the hall and facilities.</p>
            
            {feedbackSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-bold text-center">
                Thank you! Your feedback has been submitted successfully.
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Rating (1-5 Stars)</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none"
                      >
                        <Star className={`w-8 h-8 ${star <= (hoverRating || rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Comments</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about the hall, amenities, and your overall experience..."
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    className="w-full p-3 rounded-xl border border-peach-300 text-sm text-purple-950 focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
                <Button type="submit" variant="primary" size="md">
                  Submit Feedback
                </Button>
              </form>
            )}
          </div>
        )}

        <ConfirmDialog
          isOpen={confirmCancelOpen}
          onClose={() => setConfirmCancelOpen(false)}
          onConfirm={handleCancelBooking}
          title="Cancel Booking"
          message={`Are you sure you want to cancel this booking? This action cannot be undone.${
            booking.paymentStatus === 'Paid' 
              ? ' A refund will be initiated to your original payment method automatically.' 
              : ''
          }`}
        />
      </div>
    </UserLayout>
  );
};

export default BookingDetails;
