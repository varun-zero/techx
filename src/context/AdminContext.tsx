'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Admin {
  username: string;
  isAuthenticated: boolean;
}

interface AdminContextType {
  admin: Admin | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing admin session on mount
  useEffect(() => {
    const checkStoredAdmin = async () => {
      try {
        const response = await fetch('/api/admin/session', {
          credentials: 'same-origin',
          cache: 'no-store',
        });
        if (response.ok) {
          const data = await response.json();
          if (data.username) {
            setAdmin({ username: data.username, isAuthenticated: true });
          }
        }
      } catch (error) {
        console.error('Error restoring admin session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStoredAdmin();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setAdmin({ username, isAuthenticated: true });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during admin login:', error);
      return false;
    }
  };

  const logout = () => {
    setAdmin(null);
    void fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'same-origin',
    });
  };

  const isAdmin = admin?.isAuthenticated === true;

  return (
    <AdminContext.Provider value={{ admin, login, logout, isAdmin, isLoading }}>
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
