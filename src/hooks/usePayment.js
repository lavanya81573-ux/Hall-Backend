import { useState } from 'react';
import { useBookingContext } from '../context/BookingContext';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { updatePaymentStatus } = useBookingContext();

  const processPayment = async (bookingId, paymentDetails) => {
    setLoading(true);
    setError(null);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setLoading(false);
        if (paymentDetails.cardNumber && paymentDetails.cardNumber.endsWith('0000')) {
          const err = 'Card declined. Please try another payment method.';
          setError(err);
          reject(new Error(err));
        } else {
          updatePaymentStatus(bookingId, 'Paid', paymentDetails.paymentMethod || 'Credit Card');
          resolve({
            success: true,
            transactionId: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
            amount: paymentDetails.amount,
            date: new Date().toISOString()
          });
        }
      }, 1200);
    });
  };

  return {
    loading,
    error,
    processPayment
  };
};
