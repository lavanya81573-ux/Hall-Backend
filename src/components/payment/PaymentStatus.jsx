import React from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

const PaymentStatus = ({ status }) => {
  const configs = {
    Paid: {
      icon: CheckCircle2,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      label: 'Payment Verified & Completed'
    },
    Pending: {
      icon: Clock,
      color: 'bg-amber-100 text-amber-800 border-amber-300',
      label: 'Payment Pending'
    },
    Refunded: {
      icon: CheckCircle2,
      color: 'bg-purple-100 text-purple-900 border-purple-300',
      label: 'Refund Processed'
    },
    Failed: {
      icon: XCircle,
      color: 'bg-rose-100 text-rose-800 border-rose-300',
      label: 'Transaction Failed'
    }
  };

  const config = configs[status] || configs.Pending;
  const IconComp = config.icon;

  return (
    <div className={`px-3 py-1.5 rounded-full border ${config.color} text-xs font-bold inline-flex items-center space-x-1.5`}>
      <IconComp className="w-4 h-4" />
      <span>{config.label}</span>
    </div>
  );
};

export default PaymentStatus;
