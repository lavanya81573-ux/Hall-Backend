import React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { useBookingContext } from '../../../context/BookingContext';
import { formatCurrency } from '../../../utils/formatCurrency';
import PaymentStatus from '../../../components/payment/PaymentStatus';
import Button from '../../../components/common/Button';

const Refunds = () => {
  const { bookings, updatePaymentStatus } = useBookingContext();
  const refundableBookings = bookings.filter(b => b.paymentStatus === 'Paid' || b.paymentStatus === 'Refunded');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-purple-950">Refund Management</h1>
          <p className="text-xs text-slate-500">Process refunds for cancelled or rejected bookings</p>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl border border-peach-200 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-purple-950 text-white text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Booking ID</th>
                <th className="px-4 py-3.5">Customer</th>
                <th className="px-4 py-3.5">Refundable Amount</th>
                <th className="px-4 py-3.5">Current Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-peach-100">
              {refundableBookings.map((b) => (
                <tr key={b.id} className="hover:bg-peach-50/60">
                  <td className="px-4 py-3 font-bold text-purple-950">{b.id}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{b.userName}</td>
                  <td className="px-4 py-3 font-black text-purple-950">{formatCurrency(b.totalAmount)}</td>
                  <td className="px-4 py-3"><PaymentStatus status={b.paymentStatus} /></td>
                  <td className="px-4 py-3 text-right">
                    {b.paymentStatus === 'Paid' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => updatePaymentStatus(b.id, 'Refunded')}
                      >
                        Issue Refund
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Refunds;
