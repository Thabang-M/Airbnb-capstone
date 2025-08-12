import React, { createContext, useContext, useState, useEffect } from 'react';
import { getApiUrl } from './config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  // Check for JWT session on mount
  useEffect(() => {
    async function fetchSession() {
      setLoading(true);
      try {
        console.log('AuthContext: Checking JWT session...');
        
        if (!token) {
          console.log('AuthContext: No token found');
          setUser(null);
          setRole(null);
          setLoading(false);
          return;
        }
        
        const res = await fetch(getApiUrl('api/auth/session'), {
          headers: {
            'Authorization': `Bearer ${token}`
          }
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
          setToken(null);
          localStorage.removeItem('authToken');
        }
      } catch (err) {
        console.error('AuthContext: Session check error:', err);
        setUser(null);
        setRole(null);
        setToken(null);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    }
    fetchSession();
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setRole(userData.role);
    setToken(authToken);
    localStorage.setItem('authToken', authToken);
  };

  const logout = async () => {
    setUser(null);
    setRole(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, role, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}; 