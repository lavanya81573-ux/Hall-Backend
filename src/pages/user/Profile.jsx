import React, { useState } from 'react';
import UserLayout from '../../layouts/UserLayout';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import { ADMIN_NAME } from '../../utils/constants';
import { User, Mail, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Profile = () => {
  const { user, isAdmin, adminName, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: isAdmin ? ADMIN_NAME : (user?.name || ''),
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const displayName = isAdmin ? ADMIN_NAME : formData.name;

  return (
    <UserLayout>
      <div className="py-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-peach-600 block mb-1">
            Account Management
          </span>
          <h1 className="text-3xl font-black text-purple-950">User Profile</h1>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-peach-200 shadow-xl space-y-6">
          <div className="flex items-center space-x-4 pb-6 border-b border-peach-100">
            <div className="w-12 h-12 rounded-2xl bg-purple-900 text-peach-300 flex items-center justify-center font-bold shadow-md">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-purple-950 flex items-center space-x-2">
                <span>{displayName}</span>
                {isAdmin && (
                  <span className="bg-purple-900 text-peach-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-purple-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>

          {saved && (
            <div className="p-3.5 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center space-x-2 border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3 text-purple-500" />
                <input
                  type="text"
                  disabled={isAdmin}
                  value={displayName}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-peach-300 text-sm text-purple-950 font-bold bg-peach-50/30 focus:ring-2 focus:ring-purple-600 disabled:opacity-80"
                />
              </div>
              {isAdmin && (
                <p className="text-[11px] text-peach-600 font-semibold mt-1">
                  Note: Logged in as <strong>{ADMIN_NAME}</strong>.
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-purple-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-peach-300 text-sm text-purple-950 font-medium bg-peach-50/30 focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-950 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-3 text-purple-500" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-peach-300 text-sm text-purple-950 font-medium bg-peach-50/30 focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="md">
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
