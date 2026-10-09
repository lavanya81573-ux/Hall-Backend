import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import Button from '../../components/common/Button';
import PaymentReceipt from '../../components/payment/PaymentReceipt';
import { useBookings } from '../../hooks/useBookings';
import { useAuth } from '../../hooks/useAuth';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const txn = searchParams.get('txn') || 'TXN-62013616';
  const bookingId = searchParams.get('booking') || 'HB-7322';

  const { getBookingById, bookings } = useBookings();
  const { user } = useAuth();

  const booking = getBookingById(bookingId) || bookings[0] || {
    id: bookingId,
    hallName: 'Elite Hall - Marriage Hall',
    userName: user?.name || 'keerthi',
    userEmail: user?.email || 'keerthi@gmail.com',
    userPhone: user?.phone || '+91 98765 43210',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    totalAmount: 41300,
    eventType: 'Marriage Function',
    status: 'Approved',
    paymentStatus: 'Paid'
  };

  return (
    <UserLayout>
      <div className="py-12 max-w-2xl mx-auto px-4 text-center space-y-8">
        {/* Top Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-4 border-emerald-200 shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-purple-950">Payment Successful!</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Thank you for booking with Elite Hall. Your transaction reference is <strong className="text-purple-950 font-mono">{txn}</strong>.
          </p>
        </div>

        {/* Official Printable User Payment Receipt Component */}
        <PaymentReceipt booking={booking} txnId={txn} />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2 print:hidden max-w-md mx-auto">
          <Link to={`/booking/${bookingId}`} className="w-full">
            <Button variant="primary" fullWidth size="md" icon={ArrowRight}>
              View Booking Details
            </Button>
          </Link>
          <Link to="/my-bookings" className="w-full">
            <Button variant="outline" fullWidth size="md">
              Go to My Bookings
            </Button>
          </Link>
        </div>
      </div>
    </UserLayout>
  );
};

export default PaymentSuccess;
