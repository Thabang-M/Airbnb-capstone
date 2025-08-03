import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../config';

const HostSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [languages, setLanguages] = useState('');
  const [address, setAddress] = useState({ street: '', city: '', state: '', zipCode: '', country: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Profile picture must be less than 5MB');
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
      setError(''); // Clear any previous errors
    };
    reader.readAsDataURL(file);
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Client-side validation
  const validateForm = () => {
    if (!firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!profilePicture) {
      setError('Profile picture is required');
      return false;
    }
    if (!languages.trim()) {
      setError('Please specify at least one language');
      return false;
    }
    if (!address.street.trim() || !address.city.trim() || !address.state.trim() || !address.zipCode.trim() || !address.country.trim()) {
      setError('All address fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Client-side validation
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      
      const res = await fetch(getApiUrl('api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          profilePicture,
          languages: languages.split(',').map(l => l.trim()),
          address,
          role: 'host'
        })
      });
      
      let data;
      try {
        const responseText = await res.text();
        if (responseText) {
          data = JSON.parse(responseText);
        } else {
          data = {};
        }
      } catch (jsonError) {
        // Handle JSON parsing errors
        console.error('JSON parsing error:', jsonError);
        setError('Server returned invalid response. Please try again or contact support.');
        return;
      }
      
      if (!res.ok) {
        // Handle specific error cases based on backend responses
        switch (res.status) {
          case 400:
            if (data.error && data.error.includes('Missing required host fields')) {
              setError('Please fill in all required fields: First Name, Last Name, Phone Number, Profile Picture, Languages, and Address');
            } else if (data.error && data.error.includes('Email, password, and role are required')) {
              setError('Please fill in all required fields');
            } else {
              setError(data.error || 'Please check your input and try again');
            }
            break;
          case 409:
            setError('This email is already registered. Please use a different email or try logging in instead.');
            break;
          case 500:
            setError('Server error. Please try again later or contact support if the problem persists.');
            break;
          default:
            setError(data.error || `Sign up failed (Status: ${res.status}). Please try again.`);
        }
        return;
      }
      
      setSuccess('Sign up successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error('Signup error:', err);
      console.error('Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      
      // Handle specific error types
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Unable to connect to the server. Please check if the server is running on port 5002 and try again.');
      } else if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError('Network error. Please check your internet connection and try again.');
      } else if (err.name === 'SyntaxError') {
        setError('Invalid response from server. Please try again or contact support.');
      } else {
        // Log the actual error for debugging
        console.error('Unexpected error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
        setError(`Sign up failed: ${err.message || 'Unknown error'}. Please try again.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 500, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
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
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Host Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>First Name: <span style={{ color: 'red' }}>*</span></label><br />
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Last Name: <span style={{ color: 'red' }}>*</span></label><br />
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Email: <span style={{ color: 'red' }}>*</span></label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Password: <span style={{ color: 'red' }}>*</span></label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <small style={{ color: '#666', fontSize: '12px' }}>Must be at least 6 characters long</small>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Phone Number: <span style={{ color: 'red' }}>*</span></label><br />
          <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Profile Picture: <span style={{ color: 'red' }}>*</span></label><br />
          <input type="file" accept="image/*" onChange={handleImageChange} required style={{ width: '100%' }} />
          <small style={{ color: '#666', fontSize: '12px' }}>Maximum file size: 5MB. Supported formats: JPG, PNG, GIF</small>
          {profilePicture && <img src={profilePicture} alt="Profile Preview" style={{ width: 80, height: 80, borderRadius: '50%', marginTop: 8 }} />}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Languages (comma separated): <span style={{ color: 'red' }}>*</span></label><br />
          <input type="text" value={languages} onChange={e => setLanguages(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} placeholder="e.g. English, Spanish" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Address: <span style={{ color: 'red' }}>*</span></label><br />
          <input type="text" name="street" value={address.street} onChange={handleAddressChange} required placeholder="Street" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 6 }} />
          <input type="text" name="city" value={address.city} onChange={handleAddressChange} required placeholder="City" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 6 }} />
          <input type="text" name="state" value={address.state} onChange={handleAddressChange} required placeholder="State" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 6 }} />
          <input type="text" name="zipCode" value={address.zipCode} onChange={handleAddressChange} required placeholder="Zip Code" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 6 }} />
          <input type="text" name="country" value={address.country} onChange={handleAddressChange} required placeholder="Country" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 16, padding: '8px 12px', backgroundColor: '#ffebee', borderRadius: '4px', border: '1px solid #ffcdd2' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 16, padding: '8px 12px', backgroundColor: '#e8f5e8', borderRadius: '4px', border: '1px solid #c8e6c9' }}>{success}</div>}
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            width: '100%', 
            background: isSubmitting ? '#ccc' : '#1976d2', 
            color: '#fff', 
            border: 'none', 
            borderRadius: 8, 
            padding: '12px 0', 
            fontWeight: 600, 
            fontSize: 18, 
            marginBottom: 12,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default HostSignup; 