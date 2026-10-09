import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_NAME } from '../../utils/constants';
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  Users,
  CreditCard,
  DollarSign,
  BarChart3,
  Shield,
  ChevronRight,
  Sparkles,
  Bell
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Hall Management', path: '/admin/halls', icon: Building2 },
    { name: 'Booking Approvals', path: '/admin/bookings', icon: CalendarCheck },
    { name: 'Notifications & Alerts', path: '/admin/notifications', icon: Bell },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Payment & Refunds', path: '/admin/payments', icon: CreditCard },
    { name: 'Pricing & Policies', path: '/admin/pricing', icon: DollarSign },
    { name: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 }
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950 text-white min-h-screen p-6 border-r border-purple-800/50 flex flex-col justify-between">
      <div>
        {/* Admin Profile Box Header */}
        <div className="bg-purple-900/60 border border-purple-700/60 rounded-2xl p-4 mb-8 shadow-inner">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-purple-800 text-peach-300 flex items-center justify-center font-bold border border-purple-700">
                <Shield className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-purple-900 rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-base font-extrabold text-white">{ADMIN_NAME}</span>
                <Sparkles className="w-4 h-4 text-peach-300" />
              </div>
              <p className="text-xs text-peach-200 font-medium">System Administrator</p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-purple-800/80 flex items-center justify-between text-[11px] text-purple-200/80">
            <span>Role: Administrator</span>
            <span className="bg-peach-500/20 text-peach-300 px-2 py-0.5 rounded-full font-bold border border-peach-500/40">Verified</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-wider font-bold text-purple-300/60 px-3 mb-2">
            Admin Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-peach-500 to-orange-500 text-white shadow-lg shadow-peach-500/20 font-bold'
                    : 'text-purple-100/90 hover:bg-purple-800/70 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-peach-300 group-hover:scale-110 transition-transform'}`} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-6 border-t border-purple-800/60 text-xs text-purple-300/60">
        <p className="font-semibold text-purple-200">Elite Hall Admin Panel</p>
        <p>Logged in as: <span className="text-peach-300 font-bold">{ADMIN_NAME}</span></p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
