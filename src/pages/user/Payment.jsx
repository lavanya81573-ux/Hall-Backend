import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import PaymentForm from '../../components/payment/PaymentForm';
import PaymentSummary from '../../components/payment/PaymentSummary';
import { useBookings } from '../../hooks/useBookings';
import { usePayment } from '../../hooks/usePayment';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookingById } = useBookings();
  const { processPayment, loading, error } = usePayment();
  const booking = getBookingById(id);

  const handlePaymentSubmit = async (paymentDetails) => {
    try {
      const res = await processPayment(booking.id, paymentDetails);
      navigate(`/payment-success?txn=${res.transactionId}&booking=${booking.id}`);
    } catch (err) {
      navigate(`/payment-failed?reason=${encodeURIComponent(err.message)}&booking=${booking.id}`);
    }
  };

  if (!booking) return null;

  return (
    <UserLayout>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-peach-600 block mb-1">
            Payment Step
          </span>
          <h1 className="text-3xl font-black text-purple-950">Complete Your Elite Hall Payment</h1>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <PaymentForm
              amount={booking.totalAmount}
              onSubmit={handlePaymentSubmit}
              loading={loading}
            />
          </div>

          <div>
            <PaymentSummary booking={booking} />
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Payment;
