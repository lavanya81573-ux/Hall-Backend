import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { BOOKING_STATUS } from '../../utils/constants';
import { CheckCircle2, XCircle, Eye, Clock } from 'lucide-react';

const BookingTable = ({ bookings, onApprove, onReject, onViewDetails }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case BOOKING_STATUS.APPROVED:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">Approved</span>;
      case BOOKING_STATUS.PENDING:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center w-fit gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      case BOOKING_STATUS.REJECTED:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">Rejected</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-peach-200 shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-purple-950 text-white text-xs uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3.5">Booking ID</th>
            <th className="px-4 py-3.5">Hall Name</th>
            <th className="px-4 py-3.5">User</th>
            <th className="px-4 py-3.5">Dates</th>
            <th className="px-4 py-3.5">Amount</th>
            <th className="px-4 py-3.5">Status</th>
            <th className="px-4 py-3.5">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-peach-100">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-peach-50/60 transition-colors">
              <td className="px-4 py-3 font-bold text-purple-950">{booking.id}</td>
              <td className="px-4 py-3 font-semibold text-purple-900">{booking.hallName}</td>
              <td className="px-4 py-3">
                <p className="font-semibold text-slate-800">{booking.userName}</p>
                <p className="text-xs text-slate-500">{booking.userEmail}</p>
              </td>
              <td className="px-4 py-3 text-xs text-slate-600">
                {formatDate(booking.startDate)} {booking.startDate !== booking.endDate && `- ${formatDate(booking.endDate)}`}
              </td>
              <td className="px-4 py-3 font-bold text-purple-950">{formatCurrency(booking.totalAmount)}</td>
              <td className="px-4 py-3">{getStatusBadge(booking.status)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center space-x-2">
                  {/* View Details Button */}
                  <button
                    onClick={() => onViewDetails(booking)}
                    className="p-1.5 text-purple-700 hover:bg-purple-100 rounded-xl transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Approve Button */}
                  {booking.status !== BOOKING_STATUS.APPROVED && (
                    <button
                      onClick={() => onApprove(booking.id)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
                      title="Approve Reservation"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}

                  {/* Cancel / Reject Button */}
                  {booking.status !== BOOKING_STATUS.REJECTED && (
                    <button
                      onClick={() => onReject(booking.id)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
                      title="Cancel / Reject Reservation"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
