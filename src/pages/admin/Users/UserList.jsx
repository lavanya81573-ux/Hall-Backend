import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import UserTable from '../../../components/admin/UserTable';
import { MOCK_ADMIN_USER, ADMIN_NAME } from '../../../utils/constants';

const UserList = () => {
  const navigate = useNavigate();
  const [users] = useState([
    { id: 'usr-admin-1', name: ADMIN_NAME, email: 'admin@elitehall.com', role: 'admin', phone: '+91 98765 43210', status: 'Active' },
    { id: 'usr-1', name: 'Ananya Roy', email: 'ananya@example.com', role: 'user', phone: '+91 98123 45678', status: 'Active' },
    { id: 'usr-2', name: 'Vikram Malhotra', email: 'vikram@techcorp.com', role: 'user', phone: '+91 98989 12345', status: 'Active' },
    { id: 'usr-3', name: 'Siddharth Rao', email: 'siddharth@gmail.com', role: 'user', phone: '+91 97777 66655', status: 'Active' },
    { id: 'usr-4', name: 'Kavita Sharma', email: 'kavita@designhub.io', role: 'user', phone: '+91 91234 56789', status: 'Inactive' }
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-purple-950">User Management</h1>
          <p className="text-xs text-slate-500">Registered member accounts and system administrators</p>
        </div>

        <UserTable
          users={users}
          onViewUser={(user) => navigate(`/admin/users/${user.id}`)}
        />
      </div>
    </AdminLayout>
  );
};

export default UserList;
