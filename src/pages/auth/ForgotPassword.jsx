import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/common/Button';
import { Mail, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your email to receive password reset instructions">
      {submitted ? (
        <div className="text-center py-4 space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-purple-950">Instructions Sent!</h4>
          <p className="text-xs text-slate-600">
            We sent a password reset link to <strong>{email}</strong>. Please check your inbox.
          </p>
          <Link to="/login">
            <Button variant="primary" fullWidth size="md" className="mt-4">
              Return to Login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-2.5 text-purple-500" />
              <input
                type="email"
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-peach-300 text-sm text-purple-950 focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" fullWidth size="lg">
            Send Reset Link
          </Button>

          <div className="text-center pt-2">
            <Link to="/login" className="text-xs font-semibold text-purple-700 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
