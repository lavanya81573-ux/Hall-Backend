import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

const PaymentSummary = ({ booking }) => {
  if (!booking) return null;

  return (
    <div className="bg-gradient-to-br from-purple-950 to-purple-900 text-white rounded-3xl p-6 border border-purple-800 shadow-xl space-y-4">
      <h3 className="text-lg font-extrabold text-white border-b border-purple-800 pb-3">Payment Summary</h3>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between text-purple-200">
          <span>Booking Reference</span>
          <span className="font-bold text-white">{booking.id}</span>
        </div>
        <div className="flex justify-between text-purple-200">
          <span>Hall Reserved</span>
          <span className="font-bold text-white">{booking.hallName}</span>
        </div>
        <div className="flex justify-between text-purple-200">
          <span>Event Type</span>
          <span className="font-bold text-white">{booking.eventType}</span>
        </div>
        <div className="pt-3 border-t border-purple-800 flex justify-between text-base font-extrabold">
          <span className="text-peach-300">Total Payable</span>
          <span className="text-xl text-white">{formatCurrency(booking.totalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
