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
        console.log('AuthContext: Checking session...');
        const res = await fetch(getApiUrl('api/auth/session'), {
          credentials: 'include',
        });
        console.log('AuthContext: Session response status:', res.status);
        if (res.ok) {
          const data = await res.json();
          console.log('AuthContext: Session data:', data);
          setUser(data.user);
          setRole(data.user?.role || null);
        } else {
          console.log('AuthContext: Session check failed');
          setUser(null);
          setRole(null);
        }
      } catch (err) {
        console.error('AuthContext: Session check error:', err);
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