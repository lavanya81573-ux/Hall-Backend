import React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { useBookingContext } from '../../../context/BookingContext';
import { BarChart3, TrendingUp } from 'lucide-react';

const BookingReports = () => {
  const { bookings, halls } = useBookingContext();

  const totalBookings = bookings.length;
  const approvedBookings = bookings.filter(b => b.status === 'Approved').length;
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;
  const availableHalls = halls.filter(h => h.status === 'Available').length; // or maybe just halls.length if no status

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-purple-950">System Reports</h1>
          <p className="text-xs text-slate-500">Overview of all system statistics</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-peach-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">TOTAL BOOKINGS</span>
            <p className="text-3xl font-black text-purple-950">{totalBookings}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-peach-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">APPROVED BOOKINGS</span>
            <p className="text-3xl font-black text-emerald-600">{approvedBookings}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-peach-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">CANCELLED BOOKINGS</span>
            <p className="text-3xl font-black text-rose-600">{cancelledBookings}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-peach-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">AVAILABLE HALLS</span>
            <p className="text-3xl font-black text-blue-600">{availableHalls}</p>
          </div>
        </div>

        {/* Booking Details Table */}
        <div className="bg-white rounded-3xl border border-peach-200 shadow-sm overflow-hidden mt-6">
          <div className="p-4 border-b border-peach-100 bg-peach-50/30">
            <h3 className="text-sm font-black text-purple-950">Booking Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-peach-50/50 text-xs text-purple-900 border-b border-peach-100">
                  <th className="p-4 font-bold">Booking ID</th>
                  <th className="p-4 font-bold">Hall</th>
                  <th className="p-4 font-bold">User</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-slate-50 hover:bg-peach-50/20">
                    <td className="p-4 font-bold text-purple-900">{booking.id}</td>
                    <td className="p-4">{booking.hallName}</td>
                    <td className="p-4">{booking.userName}</td>
                    <td className="p-4">{booking.startDate}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        booking.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                        booking.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-slate-500">No bookings found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BookingReports;
