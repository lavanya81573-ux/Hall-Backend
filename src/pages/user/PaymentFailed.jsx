import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import Button from '../../components/common/Button';
import { XCircle, RefreshCw } from 'lucide-react';

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason') || 'Transaction declined by bank server.';
  const bookingId = searchParams.get('booking') || '';

  return (
    <UserLayout>
      <div className="py-20 max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto border-4 border-rose-200">
          <XCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-purple-950">Payment Failed</h1>
          <p className="text-xs text-rose-600 font-semibold">{reason}</p>
        </div>

        <div className="p-4 bg-peach-50 rounded-2xl border border-peach-200 text-xs text-slate-600">
          Don't worry! Your booking slot remains reserved for a short period. Please try again.
        </div>

        <div className="flex flex-col gap-3">
          {bookingId && (
            <Link to={`/payment/${bookingId}`}>
              <Button variant="primary" fullWidth size="lg" icon={RefreshCw}>
                Retry Payment
              </Button>
            </Link>
          )}
          <Link to="/my-bookings">
            <Button variant="ghost" fullWidth size="md">
              Return to My Bookings
            </Button>
          </Link>
        </div>
      </div>
    </UserLayout>
  );
};

export default PaymentFailed;
