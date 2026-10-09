import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { Building2, Printer, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import Button from '../common/Button';

const PaymentReceipt = ({ booking, txnId = 'TXN-62013616' }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const gstAmount = Math.round(booking.totalAmount * 0.18);
  const baseAmount = booking.totalAmount - gstAmount;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-peach-200 shadow-xl space-y-6 text-left max-w-xl mx-auto print:shadow-none print:border-none print:p-0">
      {/* Receipt Header */}
      <div className="flex justify-between items-start border-b border-peach-200 pb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-900 text-peach-300 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-purple-950 leading-tight">Elite Hall</h3>
            <p className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">Luxury Venues Receipt</p>
          </div>
        </div>

        <div className="text-right">
          {booking.paymentStatus === 'Refunded' ? (
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black border border-rose-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
              <span>REFUND PROCESSED</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>PAYMENT SUCCESSFUL</span>
            </span>
          )}
          <p className="text-[11px] text-slate-400 font-medium mt-1">Receipt Date: {formatDate(new Date().toISOString())}</p>
        </div>
      </div>

      {/* Transaction & Booking Ref Meta */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-peach-50/70 p-4 rounded-2xl border border-peach-200 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">Transaction ID</span>
          <span className="font-mono font-bold text-purple-950 text-sm">{txnId}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">Booking Reference</span>
          <span className="font-mono font-bold text-purple-950 text-sm">{booking.id}</span>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">Payment Method</span>
          <span className="font-bold text-purple-900 text-xs truncate block">{booking.paymentMethod || 'Net Banking'}</span>
        </div>
      </div>

      {/* Customer & Event Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-b border-peach-100 pb-4">
        <div>
          <h4 className="font-extrabold text-purple-950 uppercase tracking-wider text-[11px] mb-1">Customer Info</h4>
          <p className="font-bold text-slate-800">{booking.userName || 'Valued Customer'}</p>
          <p className="text-slate-500">{booking.userEmail}</p>
          <p className="text-slate-500">{booking.userPhone || '+91 98765 43210'}</p>
        </div>
        <div>
          <h4 className="font-extrabold text-purple-950 uppercase tracking-wider text-[11px] mb-1">Venue Reservation</h4>
          <p className="font-bold text-purple-900">{booking.hallName}</p>
          <p className="text-slate-600">Event: {booking.eventType || 'Special Event'}</p>
          <p className="text-slate-600">Dates: {formatDate(booking.startDate)} {booking.startDate !== booking.endDate && `- ${formatDate(booking.endDate)}`}</p>
        </div>
      </div>

      {/* Itemized Payment Table */}
      <div className="space-y-2">
        <h4 className="font-extrabold text-purple-950 uppercase tracking-wider text-[11px]">Payment Breakdown</h4>
        <div className="rounded-2xl border border-peach-200 overflow-hidden text-xs">
          <div className="bg-purple-950 text-white p-2.5 flex justify-between font-bold text-[11px]">
            <span>Description</span>
            <span>Amount</span>
          </div>
          <div className="p-3 space-y-2 bg-white divide-y divide-peach-100">
            <div className="flex justify-between text-slate-700">
              <span>Hall Rental ({booking.hallName})</span>
              <span className="font-semibold">{formatCurrency(baseAmount)}</span>
            </div>
            <div className="flex justify-between text-slate-700 pt-2">
              <span>GST &amp; Government Taxes (18%)</span>
              <span className="font-semibold">{formatCurrency(gstAmount)}</span>
            </div>
            <div className="flex justify-between text-purple-950 font-black text-sm pt-2 bg-peach-50/50 p-2 rounded-xl">
              <span>Total Paid Amount</span>
              <span className="text-purple-950">{formatCurrency(booking.totalAmount)}</span>
            </div>
            {booking.paymentStatus === 'Refunded' && (
              <div className="flex justify-between text-rose-700 font-black text-sm pt-2 bg-rose-50 p-2 rounded-xl mt-2">
                <span>Refunded Amount</span>
                <span className="text-rose-700">-{formatCurrency(booking.totalAmount)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info & Print Action */}
      <div className="pt-2 flex items-center justify-between print:hidden">
        <div className="flex items-center space-x-1.5 text-emerald-700 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified Digital Receipt</span>
        </div>

        <Button variant="outline" size="sm" icon={Printer} onClick={handlePrint}>
          Print Receipt
        </Button>
      </div>
    </div>
  );
};

export default PaymentReceipt;
