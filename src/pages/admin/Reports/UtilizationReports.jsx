import React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';

const UtilizationReports = () => {
  const utilization = [
    { hall: 'Elite Hall - Grand Ballroom', occupancy: '88%', hours: '420 Hours' },
    { hall: 'Elite Hall - Executive Suite', occupancy: '75%', hours: '310 Hours' },
    { hall: 'Elite Hall - Royal Garden Pavilion', occupancy: '82%', hours: '360 Hours' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-purple-950">Hall Occupancy &amp; Utilization</h1>
          <p className="text-xs text-slate-500">Track venue occupancy rates and peak utilization hours</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {utilization.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-peach-200 shadow-sm space-y-2">
              <span className="text-[10px] font-bold text-peach-600 uppercase tracking-wider block">Occupancy Rate</span>
              <h3 className="text-lg font-extrabold text-purple-950">{item.hall}</h3>
              <p className="text-3xl font-black text-purple-950">{item.occupancy}</p>
              <p className="text-xs text-slate-500">Booked: {item.hours}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UtilizationReports;
