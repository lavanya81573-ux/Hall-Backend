import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotificationContext } from '../../context/NotificationContext';
import {
  Building2,
  Calendar,
  Bell,
  User,
  Shield,
  LogOut,
  MoreVertical,
  Home as HomeIcon,
  Layers,
  Scale,
  LayoutDashboard,
  X,
  MessageSquare
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, adminName, logout, switchToAdmin, switchToUser } = useAuth();
  const { unreadCount } = useNotificationContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const displayName = isAdmin ? adminName : (user?.name || 'User');

  const handleSwitchToAdmin = () => {
    switchToAdmin();
    setMenuOpen(false);
    navigate('/admin/dashboard');
  };

  const handleSwitchToUser = () => {
    switchToUser();
    setMenuOpen(false);
    if (location.pathname.startsWith('/admin')) {
      navigate('/');
    }
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-peach-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-800 via-purple-600 to-peach-500 flex items-center justify-center text-white shadow-md shadow-purple-900/20 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-purple-950 tracking-tight block leading-none">
                Elite<span className="text-peach-500 font-serif italic ml-1">Hall</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-purple-600 font-semibold">
                Luxury Venues
              </span>
            </div>
          </Link>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {isAuthenticated && user ? (
              /* Authenticated User View: User Name Badge & Logout Button (No Photo) */
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-3.5 py-1.5 rounded-2xl bg-purple-100/90 hover:bg-purple-200/90 border border-purple-200 transition-all"
                  title="View Profile"
                >
                  <div className="w-6 h-6 rounded-lg bg-purple-900 text-peach-300 flex items-center justify-center font-bold">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-purple-950 max-w-[120px] sm:max-w-[160px] truncate">
                    {displayName}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl text-xs font-extrabold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all flex items-center space-x-1.5 shadow-sm"
                  title="Log out of account"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              /* Unauthenticated View: Direct Login & Register Links */
              <div className="flex items-center space-x-3 sm:space-x-4 text-sm font-bold">
                <Link
                  to="/login"
                  className={`transition-colors ${
                    isActive('/login')
                      ? 'text-purple-950 font-black underline underline-offset-4 decoration-2 decoration-purple-600'
                      : 'text-slate-700 hover:text-purple-950'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                    isActive('/signup') || isActive('/register')
                      ? 'bg-purple-950 text-white shadow-md'
                      : 'bg-purple-900 hover:bg-purple-950 text-white shadow-sm hover:shadow'
                  }`}
                >
                  Register
                </Link>
              </div>
            )}

            {/* User Notifications Bell Button */}
            <Link
              to="/notifications"
              className="relative p-2.5 rounded-2xl bg-peach-100/90 text-purple-950 border border-peach-200 hover:bg-peach-200 transition-colors"
              title="View Notifications"
            >
              <Bell className="w-5 h-5 text-purple-900" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Three Dots (...) Dropdown Menu Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-2.5 rounded-2xl transition-all border ${
                  menuOpen
                    ? 'bg-purple-950 text-white border-purple-950 shadow-md ring-2 ring-purple-600/30'
                    : 'bg-peach-100/90 text-purple-950 border-peach-200 hover:bg-peach-200 hover:text-purple-950'
                }`}
                title="More Navigation Menu"
                aria-label="More Navigation Menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <MoreVertical className="w-5 h-5" />}
              </button>

              {/* Popup Dropdown containing all navigation pages */}
              {menuOpen && (
                <div
                  className="absolute right-0 mt-3 w-72 rounded-3xl bg-white shadow-2xl border border-peach-200/90 py-3 z-50 divide-y divide-peach-100 text-sm animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  {/* Section 1: Primary Navigation */}
                  <div className="px-2 py-1 space-y-0.5">
                    <p className="px-3 py-1 text-[10px] uppercase tracking-wider font-extrabold text-purple-500">
                      Explore Pages
                    </p>

                    <Link
                      to="/"
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center px-3 py-2 rounded-xl font-semibold transition-colors ${
                        isActive('/') ? 'bg-purple-100 text-purple-950 font-bold' : 'text-slate-700 hover:bg-peach-100 hover:text-purple-950'
                      }`}
                    >
                      <HomeIcon className="w-4 h-4 mr-3 text-purple-600" />
                      Home
                    </Link>

                    <Link
                      to="/halls"
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center px-3 py-2 rounded-xl font-semibold transition-colors ${
                        isActive('/halls') ? 'bg-purple-100 text-purple-950 font-bold' : 'text-slate-700 hover:bg-peach-100 hover:text-purple-950'
                      }`}
                    >
                      <Layers className="w-4 h-4 mr-3 text-purple-600" />
                      Halls &amp; Venues
                    </Link>

                    <Link
                      to="/compare"
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center px-3 py-2 rounded-xl font-semibold transition-colors ${
                        isActive('/compare') ? 'bg-purple-100 text-purple-950 font-bold' : 'text-slate-700 hover:bg-peach-100 hover:text-purple-950'
                      }`}
                    >
                      <Scale className="w-4 h-4 mr-3 text-purple-600" />
                      Compare Venues
                    </Link>

                    <Link
                      to="/my-bookings"
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center px-3 py-2 rounded-xl font-semibold transition-colors ${
                        isActive('/my-bookings') ? 'bg-purple-100 text-purple-950 font-bold' : 'text-slate-700 hover:bg-peach-100 hover:text-purple-950'
                      }`}
                    >
                      <Calendar className="w-4 h-4 mr-3 text-purple-600" />
                      My Bookings
                    </Link>

                    <Link
                      to="/feedback"
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center px-3 py-2 rounded-xl font-semibold transition-colors ${
                        isActive('/feedback') ? 'bg-purple-100 text-purple-950 font-bold' : 'text-slate-700 hover:bg-peach-100 hover:text-purple-950'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 mr-3 text-purple-600" />
                      Feedback
                    </Link>
                  </div>

                  {/* Section 2: Notifications & Quick Role Switch */}
                  <div className="px-2 py-2 space-y-2">
                    <Link
                      to="/notifications"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-slate-700 hover:bg-peach-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <Bell className="w-4 h-4 mr-3 text-purple-600" />
                        <span>Notifications</span>
                      </div>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 bg-peach-500 text-white text-[10px] font-bold rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </Link>

                    {/* Role Toggle inside Menu */}
                    <div className="bg-peach-100/90 p-1.5 rounded-2xl border border-peach-200 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-purple-900 px-2">Role Mode:</span>
                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={handleSwitchToUser}
                          className={`px-2.5 py-1 text-xs rounded-xl font-bold transition-all ${
                            !isAdmin ? 'bg-white text-purple-950 shadow-sm' : 'text-purple-700 hover:text-purple-950'
                          }`}
                        >
                          User
                        </button>
                        <button
                          type="button"
                          onClick={handleSwitchToAdmin}
                          className={`px-2.5 py-1 text-xs rounded-xl font-bold transition-all flex items-center space-x-1 ${
                            isAdmin ? 'bg-purple-900 text-white shadow-sm' : 'text-purple-700 hover:text-purple-950'
                          }`}
                        >
                          <Shield className="w-3 h-3 text-peach-300" />
                          <span>Admin</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Profile / Auth Actions */}
                  <div className="px-2 py-1.5 space-y-1">
                    {isAuthenticated && user && (
                      <div className="px-3 py-1.5 bg-peach-50/60 rounded-xl mb-1 flex items-center space-x-2.5">
                        <div className="w-7 h-7 rounded-lg bg-purple-900 text-peach-300 flex items-center justify-center font-bold shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-purple-950 truncate">{displayName}</p>
                          <p className="text-[10px] text-purple-600 font-semibold capitalize truncate">
                            {isAdmin ? 'System Admin' : 'Registered Member'}
                          </p>
                        </div>
                      </div>
                    )}

                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center px-3 py-2 rounded-xl font-semibold text-slate-700 hover:bg-peach-100"
                    >
                      <User className="w-4 h-4 mr-3 text-purple-600" />
                      My Profile
                    </Link>

                    <Link
                      to="/admin/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center px-3 py-2 rounded-xl font-semibold text-purple-900 hover:bg-purple-50"
                    >
                      <Shield className="w-4 h-4 mr-3 text-purple-700" />
                      Admin Login Portal
                    </Link>

                    {isAuthenticated ? (
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-3 py-2 rounded-xl font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Log Out
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center px-3 py-2 rounded-xl font-semibold text-purple-900 hover:bg-purple-100"
                      >
                        <User className="w-4 h-4 mr-3 text-purple-700" />
                        Log In
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

