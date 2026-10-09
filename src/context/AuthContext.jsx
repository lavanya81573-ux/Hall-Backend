import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_ADMIN_USER, ROLES, ADMIN_NAME } from '../utils/constants';

const AuthContext = createContext();

const MOCK_REGULAR_USER = {
  id: 'usr-user-1',
  name: 'Ananya Roy',
  email: 'ananya@example.com',
  role: ROLES.USER,
  phone: '+91 98123 45678',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  joinDate: '2023-08-10'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('elite_hall_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.role === ROLES.ADMIN) {
          return { ...parsed, name: ADMIN_NAME };
        }
        return parsed;
      } catch (e) {
        // fallback
      }
    }
    return MOCK_REGULAR_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem('elite_hall_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('elite_hall_user');
    }
  }, [user]);

  const login = async (email, password, role = ROLES.USER) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Invalid email or password');
      }
      const data = await response.json();
      const loggedUser = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role === 'ROLE_ADMIN' ? ROLES.ADMIN : ROLES.USER,
        phone: data.phone || '+91 98765 00000',
        token: data.token,
        avatar: data.role === 'ROLE_ADMIN' 
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' 
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
      };
      setUser(loggedUser);
      setIsAuthenticated(true);
      return loggedUser;
    } catch (error) {
      console.error("Login Error: ", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          role: 'ROLE_USER'
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Registration failed');
      }
      const data = await response.json();
      const newUser = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: ROLES.USER,
        phone: data.phone || '+91 99999 88888',
        token: data.token,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
      };
      setUser(newUser);
      setIsAuthenticated(true);
      return newUser;
    } catch (error) {
      console.error("Register Error: ", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('elite_hall_user');
  };

  const switchToAdmin = () => {
    const adminUser = { ...MOCK_ADMIN_USER, name: ADMIN_NAME };
    setUser(adminUser);
    setIsAuthenticated(true);
  };

  const switchToUser = () => {
    setUser(MOCK_REGULAR_USER);
    setIsAuthenticated(true);
  };

  const updateUser = (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      if (updated.role === ROLES.ADMIN) {
        updated.name = ADMIN_NAME; // Guarantee Admin Name remains Lavanya
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin: user?.role === ROLES.ADMIN,
        adminName: ADMIN_NAME,
        login,
        register,
        logout,
        switchToAdmin,
        switchToUser,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
