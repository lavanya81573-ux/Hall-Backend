import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useNotificationContext } from '../../context/NotificationContext';
import { ADMIN_NAME } from '../../utils/constants';
import Button from '../../components/common/Button';
import {
  Bell,
  CheckCheck,
  Trash2,
  Shield,
  CalendarCheck,
  CreditCard,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminNotifications = () => {
  const {
    adminNotifications,
    unreadAdminCount,
    markAdminNotifRead,
    markAllAdminNotifRead,
    clearAdminNotif
  } = useNotificationContext();

  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const filteredNotifications = adminNotifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'booking') return n.type === 'booking';
    if (filter === 'payment') return n.type === 'payment';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'booking':
        return <CalendarCheck className="w-5 h-5 text-peach-300" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-emerald-400" />;
      case 'user':
        return <UserCheck className="w-5 h-5 text-purple-300" />;
      default:
        return <Shield className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-r from-purple-950 via-purple-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl border border-purple-800 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-peach-500/20 text-peach-300 text-xs font-bold border border-peach-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admin Operations Alerts</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">System &amp; User Notifications</h1>
            <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
              Real-time administrative alerts regarding bookings, payments, and system updates.
            </p>
          </div>

          {adminNotifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAdminNotifRead}
              className="text-white border-purple-400 hover:bg-purple-800 shrink-0"
              icon={CheckCheck}
            >
              Mark All Read
            </Button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-peach-200 shadow-sm text-xs font-bold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'all' ? 'bg-purple-950 text-white shadow' : 'text-purple-900 hover:bg-peach-100'
            }`}
          >
            All Alerts ({adminNotifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'unread' ? 'bg-purple-950 text-white shadow' : 'text-purple-900 hover:bg-peach-100'
            }`}
          >
            Unread ({unreadAdminCount})
          </button>
          <button
            onClick={() => setFilter('booking')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'booking' ? 'bg-purple-950 text-white shadow' : 'text-purple-900 hover:bg-peach-100'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setFilter('payment')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'payment' ? 'bg-purple-950 text-white shadow' : 'text-purple-900 hover:bg-peach-100'
            }`}
          >
            Payments
          </button>
        </div>

        {/* Notification List */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markAdminNotifRead(notif.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between ${
                  notif.read
                    ? 'bg-white border-peach-200 opacity-90'
                    : 'bg-purple-950/5 border-purple-300 ring-2 ring-purple-600/30 shadow-md'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-purple-950 text-white flex items-center justify-center shrink-0 shadow">
                    {getIcon(notif.type)}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-extrabold text-base text-purple-950">{notif.title}</h4>
                      {!notif.read && (
                        <span className="px-2 py-0.5 rounded-full bg-peach-500 text-white text-[9px] font-black uppercase tracking-wider">
                          New
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1 leading-relaxed">
                      {notif.message}
                    </p>

                    <div className="flex items-center space-x-3 mt-3">
                      <span className="text-[11px] text-purple-600 font-bold">{notif.time}</span>
                      {notif.type === 'booking' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/admin/bookings');
                          }}
                          className="text-xs font-bold text-purple-900 hover:underline"
                        >
                          View Bookings →
                        </button>
                      )}
                      {notif.type === 'payment' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/admin/payments');
                          }}
                          className="text-xs font-bold text-purple-900 hover:underline"
                        >
                          View Payments →
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearAdminNotif(notif.id);
                  }}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Remove Notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-peach-200 shadow-sm space-y-3">
            <Bell className="w-12 h-12 text-purple-300 mx-auto" />
            <h3 className="text-lg font-bold text-purple-950">No Admin Notifications</h3>
            <p className="text-xs text-slate-500">All administrative alerts are cleared!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;
