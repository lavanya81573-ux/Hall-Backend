import { ADMIN_NAME } from '../utils/constants';

export const userService = {
  async getUsers() {
    return [
      { id: 'usr-admin-1', name: ADMIN_NAME, email: 'admin@elitehall.com', role: 'admin', phone: '+91 98765 43210', status: 'Active' },
      { id: 'usr-1', name: 'Ananya Roy', email: 'ananya@example.com', role: 'user', phone: '+91 98123 45678', status: 'Active' },
      { id: 'usr-2', name: 'Vikram Malhotra', email: 'vikram@techcorp.com', role: 'user', phone: '+91 98989 12345', status: 'Active' },
      { id: 'usr-3', name: 'Siddharth Rao', email: 'siddharth@gmail.com', role: 'user', phone: '+91 97777 66655', status: 'Active' },
      { id: 'usr-4', name: 'Kavita Sharma', email: 'kavita@designhub.io', role: 'user', phone: '+91 91234 56789', status: 'Inactive' }
    ];
  }
};
