import React, { createContext, useContext, useState, useEffect } from 'react';
import { getApiUrl } from './config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for session cookies on mount
  useEffect(() => {
    async function fetchSession() {
      setLoading(true);
      try {
        const res = await fetch(getApiUrl('api/auth/session'), {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setRole(data.user?.role || null);
        } else {
          setUser(null);
          setRole(null);
        }
      } catch {
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    }
    fetchSession();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setRole(userData.role);
  };

  const logout = async () => {
    await fetch(getApiUrl('api/auth/logout'), { method: 'POST', credentials: 'include' });
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}; 