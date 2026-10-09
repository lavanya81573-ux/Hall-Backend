import React from 'react';
import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';

const BookingStatus = ({ status }) => {
  const configs = {
    Approved: {
      icon: CheckCircle2,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      title: 'Booking Approved!',
      desc: 'Your reservation at Elite Hall has been officially confirmed.'
    },
    Pending: {
      icon: Clock,
      color: 'bg-amber-100 text-amber-800 border-amber-300',
      title: 'Awaiting Admin Approval',
      desc: 'Your request is currently being reviewed by Admin.'
    },
    Rejected: {
      icon: XCircle,
      color: 'bg-rose-100 text-rose-800 border-rose-300',
      title: 'Booking Declined',
      desc: 'The requested slot is unavailable or conflicts with hall maintenance.'
    }
  };

  const config = configs[status] || {
    icon: AlertCircle,
    color: 'bg-slate-100 text-slate-800 border-slate-300',
    title: status,
    desc: 'Status information updated.'
  };

  const IconComp = config.icon;

  return (
    <div className={`p-4 rounded-2xl border ${config.color} flex items-start space-x-3`}>
      <IconComp className="w-5 h-5 shrink-0 mt-0.5" />
      <div>
        <h4 className="font-extrabold text-sm">{config.title}</h4>
        <p className="text-xs opacity-90 mt-0.5">{config.desc}</p>
      </div>
    </div>
  );
};

export default BookingStatus;
