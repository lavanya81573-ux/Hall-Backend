import React, { createContext, useContext, useState, useEffect } from 'react';
import { Bell, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const NotificationContext = createContext();

const DEFAULT_USER_NOTIFICATIONS = [
  {
    id: 'unotif-1',
    title: 'Booking Approved! 🎉',
    message: 'Your reservation for Elite Hall - Grand Ballroom (#HB-8842) has been approved by Admin.',
    time: '10 mins ago',
    read: false,
    type: 'success'
  },
  {
    id: 'unotif-2',
    title: 'Payment Receipt Available 💳',
    message: 'Payment of ₹41,300 received for Booking #HB-1533. Your official receipt is ready.',
    time: '1 hour ago',
    read: false,
    type: 'payment'
  },
  {
    id: 'unotif-3',
    title: 'Exclusive Weekend Offer ✨',
    message: 'Get 15% discount on upcoming weekday bookings for Elite Hall Marriage Suites.',
    time: '1 day ago',
    read: true,
    type: 'offer'
  }
];

const DEFAULT_ADMIN_NOTIFICATIONS = [
  {
    id: 'anotif-1',
    title: 'New Booking Submitted 📋',
    message: 'User Keerthi (keerthi@gmail.com) submitted booking request #HB-1533 for Marriage Hall.',
    time: '5 mins ago',
    read: false,
    type: 'booking'
  },
  {
    id: 'anotif-2',
    title: 'Payment Received 💰',
    message: 'Ananya Roy completed ₹50,000 online payment for Booking #HB-8842.',
    time: '35 mins ago',
    read: false,
    type: 'payment'
  },
  {
    id: 'anotif-3',
    title: 'New User Registered 👤',
    message: 'New user Siddharth Rao (siddharth@gmail.com) created an account.',
    time: '2 hours ago',
    read: true,
    type: 'user'
  },
  {
    id: 'anotif-4',
    title: 'System Backup Complete 🛡️',
    message: 'Routine Elite Hall database backup completed with 0 errors.',
    time: '1 day ago',
    read: true,
    type: 'system'
  }
];

export const NotificationProvider = ({ children }) => {
  // User Notifications state with localStorage
  const [userNotifications, setUserNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('elite_user_notifications');
      return saved ? JSON.parse(saved) : DEFAULT_USER_NOTIFICATIONS;
    } catch {
      return DEFAULT_USER_NOTIFICATIONS;
    }
  });

  // Admin Notifications state with localStorage
  const [adminNotifications, setAdminNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('elite_admin_notifications');
      return saved ? JSON.parse(saved) : DEFAULT_ADMIN_NOTIFICATIONS;
    } catch {
      return DEFAULT_ADMIN_NOTIFICATIONS;
    }
  });

  // Floating Toast state
  const [toast, setToast] = useState(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('elite_user_notifications', JSON.stringify(userNotifications));
  }, [userNotifications]);

  useEffect(() => {
    localStorage.setItem('elite_admin_notifications', JSON.stringify(adminNotifications));
  }, [adminNotifications]);

  // Sync across tabs via storage event
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'elite_user_notifications' && e.newValue) {
        try {
          setUserNotifications(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === 'elite_admin_notifications' && e.newValue) {
        try {
          setAdminNotifications(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Show Toast Helper
  const showToast = (title, message, type = 'info', role = 'user') => {
    setToast({ title, message, type, role });
    setTimeout(() => {
      setToast(prev => (prev?.title === title ? null : prev));
    }, 5000);
  };

  // User Actions
  const addUserNotification = (notif) => {
    const newNotif = {
      id: `unotif-${Date.now()}`,
      time: 'Just now',
      read: false,
      type: notif.type || 'info',
      ...notif
    };
    setUserNotifications(prev => [newNotif, ...prev]);
    showToast(newNotif.title, newNotif.message, newNotif.type, 'user');
  };

  const markUserNotifRead = (id) => {
    setUserNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllUserNotifRead = () => {
    setUserNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearUserNotif = (id) => {
    setUserNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Admin Actions
  const addAdminNotification = (notif) => {
    const newNotif = {
      id: `anotif-${Date.now()}`,
      time: 'Just now',
      read: false,
      type: notif.type || 'booking',
      ...notif
    };
    setAdminNotifications(prev => [newNotif, ...prev]);
    showToast(newNotif.title, newNotif.message, newNotif.type, 'admin');
  };

  const markAdminNotifRead = (id) => {
    setAdminNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAdminNotifRead = () => {
    setAdminNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAdminNotif = (id) => {
    setAdminNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadUserCount = userNotifications.filter(n => !n.read).length;
  const unreadAdminCount = adminNotifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        // User Notifications
        notifications: userNotifications,
        userNotifications,
        unreadCount: unreadUserCount,
        unreadUserCount,
        addNotification: addUserNotification,
        addUserNotification,
        markAsRead: markUserNotifRead,
        markUserNotifRead,
        markAllAsRead: markAllUserNotifRead,
        markAllUserNotifRead,
        clearNotification: clearUserNotif,
        clearUserNotif,

        // Admin Notifications
        adminNotifications,
        unreadAdminCount,
        addAdminNotification,
        markAdminNotifRead,
        markAllAdminNotifRead,
        clearAdminNotif,

        // Toast Trigger
        showToast
      }}
    >
      {children}

      {/* Real-time Floating Toast Alert */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-top-4 fade-in duration-300">
          <div className={`p-4 rounded-2xl shadow-2xl border flex items-start space-x-3 backdrop-blur-md ${
            toast.type === 'success' 
              ? 'bg-emerald-950/95 border-emerald-500/40 text-emerald-100'
              : toast.type === 'warning'
              ? 'bg-rose-950/95 border-rose-500/40 text-rose-100'
              : toast.role === 'admin'
              ? 'bg-purple-950/95 border-purple-500/40 text-purple-100'
              : 'bg-slate-900/95 border-peach-400/30 text-white'
          }`}>
            <div className="p-2 rounded-xl bg-white/10 shrink-0 mt-0.5">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : toast.type === 'warning' ? (
                <AlertCircle className="w-5 h-5 text-rose-400" />
              ) : (
                <Bell className="w-5 h-5 text-peach-300" />
              )}
            </div>

            <div className="flex-1 pr-2">
              <div className="flex items-center space-x-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  toast.role === 'admin' ? 'bg-purple-800 text-purple-200' : 'bg-peach-500/30 text-peach-200'
                }`}>
                  {toast.role === 'admin' ? 'Admin Alert' : 'User Update'}
                </span>
              </div>
              <h4 className="text-sm font-black mt-1 leading-snug">{toast.title}</h4>
              <p className="text-xs text-white/80 mt-1 leading-relaxed line-clamp-2">{toast.message}</p>
            </div>

            <button
              onClick={() => setToast(null)}
              className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
