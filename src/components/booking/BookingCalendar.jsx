import React, { useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const BookingCalendar = ({ bookings = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-peach-200 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-peach-100 mb-4">
        <h3 className="text-lg font-extrabold text-purple-950 flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-purple-600" />
          <span>Elite Hall Master Booking Calendar</span>
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-xl border border-peach-300 text-purple-900 hover:bg-peach-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-purple-950 px-2">{monthName}</span>
          <button
            onClick={nextMonth}
            className="p-2 rounded-xl border border-peach-300 text-purple-900 hover:bg-peach-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-purple-900 mb-2">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="h-14 rounded-2xl bg-peach-50/40"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const isBooked = dayNum % 5 === 0;
          return (
            <div
              key={dayNum}
              className={`h-14 rounded-2xl p-2 flex flex-col justify-between border text-xs transition-colors ${
                isBooked
                  ? 'bg-purple-900 text-white border-purple-800'
                  : 'bg-peach-50/70 text-purple-950 border-peach-200 hover:bg-peach-100'
              }`}
            >
              <span className="font-bold">{dayNum}</span>
              {isBooked && (
                <span className="text-[9px] bg-peach-500 text-white font-bold px-1 rounded truncate">
                  Elite Hall Reserved
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingCalendar;
