'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'support_staff' | 'analytics_user';
  permissions: string[];
}

interface AdminContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  login: (user: AdminUser) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);

  const isAuthenticated = !!user;

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Super admin has all permissions
    if (user.role === 'super_admin') return true;
    
    return user.permissions.includes(permission);
  };

  const login = (userData: AdminUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value: AdminContextType = {
    user,
    isAuthenticated,
    hasPermission,
    login,
    logout,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
