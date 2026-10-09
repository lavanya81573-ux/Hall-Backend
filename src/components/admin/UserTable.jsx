import React from 'react';
import { ADMIN_NAME } from '../../utils/constants';
import { Mail, Phone, ShieldCheck, User } from 'lucide-react';

const UserTable = ({ users, onViewUser }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-peach-200 shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-purple-950 text-white text-xs uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3.5">User</th>
            <th className="px-4 py-3.5">Email</th>
            <th className="px-4 py-3.5">Phone</th>
            <th className="px-4 py-3.5">Role</th>
            <th className="px-4 py-3.5">Status</th>
            <th className="px-4 py-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-peach-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-peach-50/60 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 font-bold flex items-center justify-center border border-peach-200">
                    {user.name === ADMIN_NAME ? (
                      <ShieldCheck className="w-5 h-5 text-purple-700" />
                    ) : (
                      <User className="w-5 h-5 text-peach-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-950 flex items-center space-x-1.5">
                      <span>{user.name}</span>
                      {user.name === ADMIN_NAME && (
                        <span className="bg-peach-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">
                          Admin
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-500">ID: {user.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 font-medium text-slate-700">
                <div className="flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-500" />
                  <span>{user.email}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-xs text-slate-600">
                <div className="flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-peach-500" />
                  <span>{user.phone || 'N/A'}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                  user.role === 'admin'
                    ? 'bg-purple-800 text-white shadow-sm'
                    : 'bg-peach-100 text-purple-900 border border-peach-300'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  user.status === 'Active'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {user.status || 'Active'}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onViewUser(user)}
                  className="px-3 py-1.5 rounded-lg bg-peach-100 hover:bg-peach-200 text-purple-900 font-bold text-xs border border-peach-300 transition-colors"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
