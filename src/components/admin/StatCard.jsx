import React from 'react';

const StatCard = ({ title, value, change, changeType = 'positive', icon: Icon, color = 'purple' }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-peach-200/80 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-extrabold text-purple-950">{value}</h3>
          {change && (
            <p className={`text-xs font-semibold mt-2 flex items-center ${changeType === 'positive' ? 'text-emerald-600' : 'text-rose-600'}`}>
              <span>{changeType === 'positive' ? '↑' : '↓'} {change}</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-800 to-peach-500 flex items-center justify-center text-white shadow-md">
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
