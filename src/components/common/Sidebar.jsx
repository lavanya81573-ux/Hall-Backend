import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Building2, Calendar, User, Bell, Settings } from 'lucide-react';

const Sidebar = ({ className = '' }) => {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Halls', path: '/halls', icon: Building2 },
    { name: 'My Bookings', path: '/my-bookings', icon: Calendar },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Notifications', path: '/notifications', icon: Bell },
  ];

  return (
    <aside className={`w-64 bg-white border-r border-peach-200 p-4 min-h-screen ${className}`}>
      <div className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${
                active
                  ? 'bg-purple-800 text-white shadow-md shadow-purple-900/10'
                  : 'text-purple-950 hover:bg-peach-100 hover:text-purple-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-peach-300' : 'text-purple-600'}`} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
