import React from 'react';
import { LIFECYCLE_STAGES } from '../../utils/constants';
import {
  FileText,
  Clock,
  CheckCircle2,
  CreditCard,
  Check,
  CalendarCheck,
  QrCode,
  PartyPopper,
  AlertCircle
} from 'lucide-react';

const BookingLifecycleStepper = ({ booking }) => {
  if (!booking) return null;

  // Determine current active step (1 to 8) based on booking data
  let currentStep = 1;

  if (booking.status === 'Rejected') {
    currentStep = 2; // Stalled at Pending Approval
  } else if (booking.status === 'Completed') {
    currentStep = 8;
  } else if (booking.isCheckedIn) {
    currentStep = 7;
  } else if (booking.paymentStatus === 'Paid') {
    currentStep = 6; // Event Upcoming
  } else if (booking.status === 'Approved') {
    currentStep = 4; // Payment Pending
  } else if (booking.status === 'Pending') {
    currentStep = 2; // Pending Approval
  } else {
    currentStep = 1; // Booking Requested
  }

  const getStepIcon = (stepNum, key) => {
    switch (key) {
      case 'requested': return <FileText className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle2 className="w-4 h-4" />;
      case 'payment_pending': return <CreditCard className="w-4 h-4" />;
      case 'payment_completed': return <Check className="w-4 h-4" />;
      case 'event_upcoming': return <CalendarCheck className="w-4 h-4" />;
      case 'checked_in': return <QrCode className="w-4 h-4" />;
      case 'completed': return <PartyPopper className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-peach-200 shadow-md space-y-6">
      
      {/* Stepper Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-peach-100 pb-4 gap-2">
        <div>
          <span className="text-[10px] uppercase font-bold text-peach-600 tracking-widest block">Real-time Tracker</span>
          <h3 className="text-xl font-black text-purple-950">8-Stage Booking Lifecycle Progress</h3>
        </div>
        <div className="text-right">
          <span className="px-3 py-1 rounded-full bg-purple-900 text-peach-300 text-xs font-bold border border-purple-800">
            Current Stage: {LIFECYCLE_STAGES[currentStep - 1]?.label}
          </span>
        </div>
      </div>

      {/* Visual Stepper Steps */}
      <div className="overflow-x-auto pb-4 pt-2">
        <div className="min-w-[850px] flex items-center justify-between relative px-2">
          
          {/* Progress Connecting Line */}
          <div className="absolute top-6 left-8 right-8 h-1 bg-peach-200 -z-0">
            <div
              className="h-full bg-gradient-to-r from-purple-900 via-purple-700 to-peach-500 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (LIFECYCLE_STAGES.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Render 8 Steps */}
          {LIFECYCLE_STAGES.map((stage) => {
            const isCompleted = stage.step < currentStep;
            const isCurrent = stage.step === currentStep;

            return (
              <div key={stage.step} className="relative z-10 flex flex-col items-center group w-24 text-center">
                
                {/* Step Circle */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 font-extrabold text-xs shadow-md border-2 ${
                    isCompleted
                      ? 'bg-purple-900 text-peach-300 border-purple-800 ring-2 ring-purple-300/40'
                      : isCurrent
                      ? 'bg-peach-500 text-purple-950 border-peach-400 ring-4 ring-peach-200 scale-110 animate-pulse'
                      : 'bg-white text-slate-400 border-peach-200'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5 text-peach-300 stroke-[3]" /> : getStepIcon(stage.step, stage.key)}
                </div>

                {/* Step Label & Number */}
                <div className="mt-3 space-y-0.5">
                  <span className={`text-[10px] font-bold block ${isCurrent ? 'text-peach-600 uppercase tracking-widest' : 'text-slate-400'}`}>
                    Step {stage.step}
                  </span>
                  <p className={`text-xs font-extrabold leading-tight ${isCurrent ? 'text-purple-950 font-black' : isCompleted ? 'text-purple-900 font-bold' : 'text-slate-500'}`}>
                    {stage.label}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Active Stage Description Box */}
      <div className="p-4 rounded-2xl bg-peach-50/80 border border-peach-200 flex items-center space-x-3 text-xs">
        <div className="w-8 h-8 rounded-xl bg-purple-900 text-peach-300 flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <strong className="text-purple-950 font-extrabold">Stage {currentStep} Active:</strong>{' '}
          <span className="text-slate-700">{LIFECYCLE_STAGES[currentStep - 1]?.desc}</span>
        </div>
      </div>

    </div>
  );
};

export default BookingLifecycleStepper;
