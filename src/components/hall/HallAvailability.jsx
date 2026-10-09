import React, { useState } from 'react';
import { Calendar as CalendarIcon, CheckCircle, XCircle } from 'lucide-react';
import Button from '../common/Button';

const HallAvailability = ({ hallId, onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState(null);

  const checkAvailability = (e) => {
    e.preventDefault();
    if (!selectedDate) return;

    // Simulate availability check
    const isAvailable = new Date(selectedDate).getDate() % 2 === 0;
    setAvailabilityStatus(isAvailable ? 'available' : 'booked');
    if (isAvailable && onSelectDate) {
      onSelectDate(selectedDate);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 rounded-3xl p-6 text-white border border-purple-800 shadow-xl">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-peach-500/20 text-peach-300 flex items-center justify-center border border-peach-500/30">
          <CalendarIcon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-base font-bold text-white">Check Real-Time Availability</h4>
          <p className="text-xs text-purple-200/80">Select your preferred date for Elite Hall booking</p>
        </div>
      </div>

      <form onSubmit={checkAvailability} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-peach-200 mb-1">Target Date</label>
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setAvailabilityStatus(null);
            }}
            className="w-full px-4 py-2.5 rounded-xl bg-purple-900/80 border border-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-peach-400 text-sm"
            required
          />
        </div>

        <Button type="submit" variant="accent" fullWidth size="md">
          Check Date Status
        </Button>
      </form>

      {availabilityStatus && (
        <div className={`mt-4 p-3.5 rounded-2xl border text-xs font-bold flex items-center space-x-2 ${
          availabilityStatus === 'available'
            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
            : 'bg-rose-950/60 text-rose-300 border-rose-700'
        }`}>
          {availabilityStatus === 'available' ? (
            <>
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Great news! Elite Hall is available on {selectedDate}. Proceed to booking!</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>Elite Hall is reserved on {selectedDate}. Please select another date.</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HallAvailability;
