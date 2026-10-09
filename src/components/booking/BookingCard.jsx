import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { BOOKING_STATUS } from '../../utils/constants';
import { Building2, Calendar, Clock, CreditCard, ArrowRight } from 'lucide-react';

const BookingCard = ({ booking }) => {
  const getBadgeClass = (status) => {
    switch (status) {
      case BOOKING_STATUS.APPROVED:
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case BOOKING_STATUS.PENDING:
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case BOOKING_STATUS.REJECTED:
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-peach-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-peach-100 pb-4 mb-4 gap-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400">ID: {booking.id}</span>
            <h4 className="text-base font-extrabold text-purple-950">{booking.hallName}</h4>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeClass(booking.status)}`}>
          {booking.status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-4">
        <div className="flex items-center space-x-2 text-slate-600">
          <Calendar className="w-4 h-4 text-purple-600" />
          <span>{formatDate(booking.startDate)} {booking.startDate !== booking.endDate && `- ${formatDate(booking.endDate)}`}</span>
        </div>

        <div className="flex items-center space-x-2 text-slate-600">
          <CreditCard className="w-4 h-4 text-peach-500" />
          <span>Payment: <strong className="text-purple-950">{booking.paymentStatus}</strong></span>
        </div>

        <div className="flex items-center space-x-2 text-slate-600">
          <Clock className="w-4 h-4 text-purple-600" />
          <span>Booked on: {formatDate(booking.createdAt)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-peach-100">
        <div>
          <span className="text-[11px] text-slate-400 font-semibold block">Total Amount</span>
          <span className="text-lg font-black text-purple-950">{formatCurrency(booking.totalAmount)}</span>
        </div>

        <Link
          to={`/booking/${booking.id}`}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-peach-100 text-purple-900 hover:bg-peach-200 font-bold text-xs border border-peach-300 transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default BookingCard;
