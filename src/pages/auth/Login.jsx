import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { useAuth } from '../../hooks/useAuth';
import { Mail, Lock, Shield, CheckCircle2, User, Eye, EyeOff } from 'lucide-react';
import { ADMIN_NAME } from '../../utils/constants';

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isJustRegistered = searchParams.get('registered') === 'true';
  const initialEmail = searchParams.get('email') || '';

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    if (initialEmail && !email) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const loggedUser = await login(email, password);
      if (loggedUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="User Portal" subtitle="Login to your account to browse and book venues.">
      {isJustRegistered && (
        <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold text-center flex items-center justify-center space-x-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Account registered! Please login below.</span>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">User Email</label>
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white shadow-sm font-medium"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Enter your password"
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

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-extrabold text-base shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'User Login'}
        </button>
      </form>

      {/* Don't have an account? Register section */}
      <div className="pt-2 text-center space-y-3">
        <p className="text-xs font-semibold text-slate-500">Don't have an account?</p>
        <Link
          to="/signup"
          className="block w-full py-3 px-4 rounded-2xl border-2 border-purple-600 text-purple-700 hover:bg-purple-50 font-extrabold text-sm text-center transition-all bg-white shadow-sm"
        >
          Register a new user account
        </Link>
      </div>

      {/* Admin Login Portal Link */}
      <div className="pt-4 border-t border-slate-200 text-center">
        <p className="text-xs font-semibold text-slate-500 mb-1.5">Are you a System Administrator?</p>
        <Link
          to="/admin/login"
          className="inline-flex items-center space-x-1.5 py-1.5 px-3 rounded-xl bg-purple-950 text-peach-300 font-bold text-xs hover:bg-purple-900 transition-colors shadow-sm"
        >
          <Shield className="w-3.5 h-3.5 text-peach-300" />
          <span>Switch to Admin Portal Login</span>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
