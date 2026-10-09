import { ADMIN_NAME } from '../utils/constants';

export const authService = {
  async login(email, password) {
    if (email.toLowerCase().includes('admin')) {
      return {
        id: 'usr-admin-1',
        name: ADMIN_NAME,
        email: email,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
      };
    }
    return {
      id: 'usr-user-1',
      name: email.split('@')[0],
      email: email,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    };
  },

  async register(data) {
    return {
      id: `usr-${Date.now()}`,
      ...data,
      role: 'user'
    };
  }
};
