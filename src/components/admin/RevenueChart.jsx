import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

const RevenueChart = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="bg-white rounded-2xl p-6 border border-peach-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-peach-100">
        <div>
          <h3 className="text-lg font-extrabold text-purple-950">Revenue Trends &amp; Monthly Growth</h3>
          <p className="text-xs text-slate-500">Track total revenue collected across Elite Hall venues</p>
        </div>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0 text-xs font-semibold">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-700"></span>
            <span className="text-purple-950">Monthly Revenue</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-peach-500"></span>
            <span className="text-purple-950">Target Threshold</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-64 flex items-end justify-between gap-2 pt-8 pb-2">
          {data.map((item, idx) => {
            const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-purple-950 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-xl pointer-events-none z-20 whitespace-nowrap">
                  <div>{item.month}: {formatCurrency(item.revenue)}</div>
                  <div className="text-peach-300 font-normal">{item.bookings} Bookings</div>
                </div>

                {/* Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full max-w-[40px] bg-gradient-to-t from-purple-900 via-purple-700 to-peach-400 rounded-t-xl transition-all duration-300 group-hover:scale-105 shadow-md shadow-purple-900/10"
                ></div>

                {/* X Label */}
                <span className="text-xs font-bold text-slate-600 mt-2">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
