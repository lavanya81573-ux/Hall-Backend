import React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { useBookingContext } from '../../../context/BookingContext';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import PaymentStatus from '../../../components/payment/PaymentStatus';

const PaymentList = () => {
  const { bookings } = useBookingContext();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-purple-950">Payment Transactions</h1>
          <p className="text-xs text-slate-500">Log of all payments, payment methods, and revenue receipts</p>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl border border-peach-200 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-purple-950 text-white text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Booking ID</th>
                <th className="px-4 py-3.5">User</th>
                <th className="px-4 py-3.5">Amount</th>
                <th className="px-4 py-3.5">Method</th>
                <th className="px-4 py-3.5">Payment Status</th>
                <th className="px-4 py-3.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-peach-100">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-peach-50/60">
                  <td className="px-4 py-3 font-bold text-purple-950">{b.id}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{b.userName}</td>
                  <td className="px-4 py-3 font-black text-purple-950">{formatCurrency(b.totalAmount)}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-purple-700">{b.paymentMethod || 'UPI / Card'}</td>
                  <td className="px-4 py-3"><PaymentStatus status={b.paymentStatus} /></td>
                  <td className="px-4 py-3 text-xs text-slate-500">{formatDate(b.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PaymentList;
