import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import { ADMIN_NAME } from '../utils/constants';
import { Link } from 'react-router-dom';
import { Shield, Bell, ExternalLink } from 'lucide-react';
import { useNotificationContext } from '../context/NotificationContext';

const AdminLayout = ({ children }) => {
  const { unreadAdminCount } = useNotificationContext();

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Admin Header Bar */}
        <header className="bg-white border-b border-peach-200 px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-purple-900 text-peach-300 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-purple-950 leading-none">
                Elite Hall Management Panel
              </h2>
              <p className="text-xs text-purple-600 font-semibold mt-0.5">
                Logged in as Admin: <strong className="text-purple-900">{ADMIN_NAME}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Public Portal Link */}
            <Link
              to="/"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-peach-100 hover:bg-peach-200 text-purple-900 font-bold text-xs border border-peach-300 transition-colors"
            >
              <span>View Public Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Admin Notifications Bell Icon */}
            <Link
              to="/admin/notifications"
              className="relative p-2.5 rounded-xl text-purple-900 hover:bg-peach-100 transition-colors border border-peach-200"
              title="Admin Notifications & Alerts"
            >
              <Bell className="w-5 h-5" />
              {unreadAdminCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                  {unreadAdminCount}
                </span>
              )}
            </Link>

            {/* Admin Profile Info */}
            <div className="flex items-center space-x-3 border-l border-peach-200 pl-4">
              <div className="w-8 h-8 rounded-xl bg-purple-900 text-peach-300 flex items-center justify-center font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-purple-950 leading-tight">{ADMIN_NAME}</p>
                <p className="text-[10px] text-peach-600 font-bold uppercase">System Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
