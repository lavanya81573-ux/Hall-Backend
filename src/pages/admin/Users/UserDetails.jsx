import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import { ADMIN_NAME } from '../../../utils/constants';
import { ArrowLeft, User, Mail, Phone, ShieldCheck } from 'lucide-react';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isTargetAdmin = id === 'usr-admin-1';
  const userName = isTargetAdmin ? ADMIN_NAME : 'Ananya Roy';
  const userEmail = isTargetAdmin ? 'admin@elitehall.com' : 'ananya@example.com';

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <button onClick={() => navigate('/admin/users')} className="inline-flex items-center space-x-2 text-xs font-bold text-purple-700 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Users List</span>
        </button>

        <div className="bg-white rounded-3xl p-8 border border-peach-200 shadow-xl space-y-6">
          <div className="flex items-center space-x-4 pb-6 border-b border-peach-100">
            <div className="w-16 h-16 rounded-2xl bg-purple-900 text-peach-300 flex items-center justify-center font-bold text-xl">
              {isTargetAdmin ? <ShieldCheck className="w-8 h-8" /> : <User className="w-8 h-8 text-peach-400" />}
            </div>
            <div>
              <h2 className="text-2xl font-black text-purple-950 flex items-center space-x-2">
                <span>{userName}</span>
                {isTargetAdmin && (
                  <span className="bg-peach-500 text-white text-xs px-2 py-0.5 rounded font-bold uppercase">
                    Admin
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500">User ID: {id}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-peach-100">
              <span className="text-slate-500 font-semibold">Email:</span>
              <span className="font-bold text-purple-950">{userEmail}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-peach-100">
              <span className="text-slate-500 font-semibold">Role:</span>
              <span className="font-bold text-purple-950 capitalize">{isTargetAdmin ? 'Admin' : 'User'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-peach-100">
              <span className="text-slate-500 font-semibold">Account Status:</span>
              <span className="font-bold text-emerald-600">Active</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserDetails;
