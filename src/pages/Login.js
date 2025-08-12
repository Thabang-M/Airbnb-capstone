import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ToastContext';
import { useAuth } from '../AuthContext';
import { getApiUrl } from '../config';

const Login = () => {
  const [role, setRole] = useState('guest');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Login: Attempting login for role:', role);
      const res = await fetch(getApiUrl('api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, role })
      });
      console.log('Login: Response status:', res.status);
      console.log('Login: Response headers:', res.headers);
      const data = await res.json();
      console.log('Login: Response data:', data);
      if (!res.ok) {
        showError(data.error || 'Login failed');
        return;
      }
      showSuccess('Login successful!');
      // Update AuthContext with user data and token
      login(data.user, data.token);
      // Redirect based on role
      if (role === 'host') {
        navigate('/admin');
      } else {
        navigate('/locations');
      }
    } catch (err) {
      console.error('Login error:', err);
      showError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          ← Back to Home
        </button>
      </div>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Role:</label><br />
          <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="guest">Guest</option>
            <option value="host">Host</option>
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Email:</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Password:</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            background: loading ? '#ccc' : '#ff385c', 
            color: '#fff', 
            border: 'none', 
            borderRadius: 8, 
            padding: '12px 0', 
            fontWeight: 600, 
            fontSize: 18, 
            marginBottom: 12,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        Don't have an account? <a href="/signup">Sign up as Guest</a> | <a href="/host-signup">Sign up as Host</a>
      </div>
    </div>
  );
};

export default Login; 