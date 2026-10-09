import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate, calculateDaysDifference } from '../../utils/formatDate';
import { Building2, Calendar, Users, ShieldCheck, Tag, Clock, CreditCard } from 'lucide-react';

const BookingSummary = ({ hall, bookingData }) => {
  const getMultiplier = () => {
    const pkg = bookingData?.durationPackage;
    if (pkg === '6 Hours') return 0.35;
    if (pkg === 'Half Day') return 0.5;
    if (pkg === '1 Day') return 1.0;
    if (pkg === '2 Days') return 2.0;
    if (pkg === '3 Days') return 3.0;
    return Math.max(1, calculateDaysDifference(bookingData?.startDate, bookingData?.endDate));
  };

  const durationMultiplier = getMultiplier();
  const baseRate = Math.round((hall?.pricePerDay || 25000) * durationMultiplier);
  const serviceTax = Math.round(baseRate * 0.18);
  const grandTotal = baseRate + serviceTax;
  const pkgLabel = bookingData?.durationPackage || `${calculateDaysDifference(bookingData?.startDate, bookingData?.endDate)} Day(s)`;

  return (
    <div className="bg-gradient-to-b from-purple-950 to-purple-900 text-white rounded-3xl p-6 border border-purple-800 shadow-xl space-y-6">
      <div className="flex items-center space-x-3 border-b border-purple-800/80 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-peach-500/20 text-peach-300 flex items-center justify-center border border-peach-500/30">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-widest text-peach-300 font-bold">Booking Breakdown</span>
          <h3 className="text-lg font-extrabold text-white">{hall?.name || 'Elite Hall'}</h3>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex justify-between py-2 border-b border-purple-800/40 text-purple-200">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-peach-400" /> Start Date</span>
          <span className="font-bold text-white">{bookingData?.startDate ? formatDate(bookingData.startDate) : 'Not selected'}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-purple-800/40 text-purple-200">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-peach-400" /> End Date</span>
          <span className="font-bold text-white">{bookingData?.endDate ? formatDate(bookingData.endDate) : 'Not selected'}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-purple-800/40 text-purple-200">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-peach-400" /> Event Time</span>
          <span className="font-bold text-white">{bookingData?.startTime || '09:00 AM'} - {bookingData?.endTime || '10:00 PM'}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-purple-800/40 text-purple-200">
          <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5 text-peach-400" /> Payment Method</span>
          <span className="font-extrabold text-peach-300">{bookingData?.paymentMethod || 'Credit Card'}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-purple-800/40 text-purple-200">
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-peach-400" /> Package &amp; Guests</span>
          <span className="font-bold text-white">{pkgLabel} • {bookingData?.guestCount || 0} Guests</span>
        </div>
        <div className="flex justify-between py-2 border-b border-purple-800/40 text-purple-200">
          <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-peach-400" /> Event Type</span>
          <span className="font-bold text-white">{bookingData?.eventType || 'N/A'}</span>
        </div>
      </div>

      {/* Pricing Calculation */}
      <div className="bg-purple-900/60 rounded-2xl p-4 border border-purple-800 space-y-2 text-xs">
        <div className="flex justify-between text-purple-200">
          <span>Venue Rate ({pkgLabel})</span>
          <span className="font-bold text-white">{formatCurrency(baseRate)}</span>
        </div>
        <div className="flex justify-between text-purple-200">
          <span>GST &amp; Service Charge (18%)</span>
          <span className="font-bold text-white">{formatCurrency(serviceTax)}</span>
        </div>
        <div className="pt-2 border-t border-purple-700/60 flex justify-between text-sm font-extrabold">
          <span className="text-peach-300">Total Payable Amount</span>
          <span className="text-xl text-white">{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-[11px] text-peach-200 bg-purple-900/40 px-3 py-2 rounded-xl border border-purple-800">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Fully refundable up to 14 days before event start.</span>
      </div>
    </div>
  );
};

export default BookingSummary;
