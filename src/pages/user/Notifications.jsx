import React from 'react';
import UserLayout from '../../layouts/UserLayout';
import { useNotificationContext } from '../../context/NotificationContext';
import Button from '../../components/common/Button';
import { Bell, CheckCheck, Trash2, Info, CheckCircle2 } from 'lucide-react';

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotification } = useNotificationContext();

  return (
    <UserLayout>
      <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-center border-b border-peach-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-peach-600 block mb-1">
              Updates &amp; Alerts
            </span>
            <h1 className="text-3xl font-black text-purple-950">Notifications</h1>
          </div>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} icon={CheckCheck}>
              Mark all read
            </Button>
          )}
        </div>

        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between ${
                  notif.read
                    ? 'bg-white border-peach-200 opacity-80'
                    : 'bg-peach-100/70 border-peach-300 ring-1 ring-purple-400'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-purple-900 text-white mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-extrabold text-sm text-purple-950">{notif.title}</h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-peach-500 animate-ping"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{notif.message}</p>
                    <span className="text-[10px] text-slate-400 font-semibold mt-2 block">{notif.time}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearNotification(notif.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-peach-200 shadow-sm">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-purple-950">No Notifications</h3>
            <p className="text-xs text-slate-500 mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default Notifications;
