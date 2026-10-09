import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { useAuth } from '../../hooks/useAuth';
import { Mail, Lock, Shield, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { ADMIN_NAME, ROLES } from '../../utils/constants';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@elitehall.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const loggedUser = await login(email, password, 'ROLE_ADMIN');
      if (loggedUser.role === ROLES.ADMIN || loggedUser.role === 'ROLE_ADMIN') {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdminLogin = async () => {
    setLoading(true);
    try {
      await login('admin@elitehall.com', 'admin123', 'ROLE_ADMIN');
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Quick login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Admin Portal"
      subtitle="Welcome to Elite Hall Management Panel"
    >
      <div className="bg-purple-950 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-inner border border-purple-800">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-800 text-peach-300 flex items-center justify-center font-bold">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-black text-white">Administrator Access</p>
            <p className="text-[10px] text-peach-200">Restricted to System Staff</p>
          </div>
        </div>
        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
          Secure
        </span>
      </div>

      {error && (
        <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Admin Email Field */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email</label>
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type="email"
              required
              placeholder="admin@elitehall.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white shadow-sm font-medium"
            />
          </div>
        </div>

        {/* Admin Password Field */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Admin Password</label>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-2xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white shadow-sm font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none z-10"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-900 to-purple-950 hover:from-purple-950 hover:to-black text-white font-extrabold text-base shadow-md transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <span>{loading ? 'Authenticating Admin...' : 'Login to Admin Dashboard'}</span>
          <ArrowRight className="w-4 h-4 text-peach-300" />
        </button>
      </form>

      {/* One-Click Admin Quick Sign In */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleQuickAdminLogin}
          className="w-full py-2.5 px-4 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold text-xs flex items-center justify-center space-x-2 border border-purple-300 transition-colors"
        >
          <Shield className="w-4 h-4 text-purple-700" />
          <span>Quick Login as Admin</span>
        </button>
      </div>

      {/* Switch to User Portal Link */}
      <div className="pt-4 text-center border-t border-slate-200">
        <p className="text-xs font-semibold text-slate-500 mb-2">Looking for customer login?</p>
        <Link
          to="/login"
          className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-purple-700 hover:text-purple-900 underline underline-offset-2"
        >
          <span>Go to User Portal Login</span>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default AdminLogin;
