import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../config';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch(getApiUrl('api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, role: 'guest' })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Sign up failed');
        return;
      }
      setSuccess('Sign up successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError('Sign up failed. Please try again.');
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
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Guest Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>First Name:</label><br />
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Last Name:</label><br />
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Email:</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Password:</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 16 }}>{success}</div>}
        <button type="submit" style={{ width: '100%', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Sign Up</button>
      </form>
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Signup; 