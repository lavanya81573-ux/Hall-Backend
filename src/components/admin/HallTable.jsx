import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { Edit3, Trash2, Users, MapPin } from 'lucide-react';

const HallTable = ({ halls, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-peach-200 shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-purple-950 text-white text-xs uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3.5">Hall Details</th>
            <th className="px-4 py-3.5">Capacity</th>
            <th className="px-4 py-3.5">Rate / Day</th>
            <th className="px-4 py-3.5">Location</th>
            <th className="px-4 py-3.5">Status</th>
            <th className="px-4 py-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-peach-100">
          {halls.map((hall) => (
            <tr key={hall.id} className="hover:bg-peach-50/60 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={hall.image || '/images/halls/hall-1.jpg'}
                    alt={hall.name}
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-peach-300"
                  />
                  <div>
                    <h4 className="font-bold text-purple-950">{hall.name}</h4>
                    <p className="text-xs text-purple-600 font-semibold">{hall.slug}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center space-x-1 font-semibold text-slate-700">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span>{hall.capacity} Guests</span>
                </div>
              </td>
              <td className="px-4 py-3 font-bold text-purple-950">{formatCurrency(hall.pricePerDay)}</td>
              <td className="px-4 py-3 text-xs text-slate-600 max-w-xs truncate">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-peach-500 shrink-0" />
                  <span className="truncate">{hall.location}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {hall.status || 'Available'}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => onEdit(hall)}
                    className="p-1.5 text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
                    title="Edit Hall"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(hall.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Hall"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HallTable;
