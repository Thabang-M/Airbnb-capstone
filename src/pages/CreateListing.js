import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocationsUpdate } from '../hooks/useLocationsUpdate';
import { getApiUrl } from '../config';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    description: '',
    enhancedCleaning: false,
    selfCheckIn: false,
    amenities: [],
    pricing: {
      basePrice: 0,
      currency: 'ZAR',
      cleaningFee: 0,
      serviceFee: 0,
      securityDeposit: 0,
      extraGuestFee: 0
    },
    propertyDetails: {
      bedNum: 0,
      bathNum: 0,
      maxGuests: 0,
      propertyType: '',
      roomType: ''
    },
    images: []
  });
  const [newAmenity, setNewAmenity] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const commonAmenities = [
    'WiFi', 'Kitchen', 'Free parking', 'Air conditioning', 'Heating', 
    'Washer', 'Dryer', 'TV', 'Pool', 'Breakfast', 'Pets allowed', 
    'Smoke alarm', 'First aid kit'
  ];

  const { addLocationToList } = useLocationsUpdate();

  const propertyTypes = [
    'Apartment', 'House', 'Condo', 'Villa', 'Cabin', 'Loft', 'Studio'
  ];

  const roomTypes = [
    'Entire place', 'Private room', 'Shared room'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else if (name.startsWith('pricing.')) {
      const pricingField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [pricingField]: type === 'number' ? parseFloat(value) || 0 : value
        }
      }));
    } else if (name.startsWith('propertyDetails.')) {
      const propertyField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        propertyDetails: {
          ...prev.propertyDetails,
          [propertyField]: type === 'number' ? parseInt(value) || 0 : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleAmenityAdd = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const handleAmenityRemove = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...images]
      }));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(getApiUrl('api/listings'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create listing');
      }

      setSuccess('Listing created successfully!');
      
      // Add the new location to the locations list
      if (formData.address.city && formData.address.country) {
        addLocationToList(formData.address.city, formData.address.country);
      }
      
      setTimeout(() => navigate('/admin/listings'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div style={{ padding: 40, maxWidth: 1000, margin: '0 auto', background: '#fff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 32, color: '#333' }}>Create Listing</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        {/* Left Column */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Listing Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Street Address:</label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>City:</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>State/Province:</label>
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleInputChange}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>ZIP/Postal Code:</label>
            <input
              type="text"
              name="address.zipCode"
              value={formData.address.zipCode}
              onChange={handleInputChange}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Country:</label>
            <input
              type="text"
              name="address.country"
              value={formData.address.country}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <input
                type="checkbox"
                name="enhancedCleaning"
                checked={formData.enhancedCleaning}
                onChange={handleInputChange}
                style={{ marginRight: 8 }}
              />
              Enhanced Cleaning
            </label>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                name="selfCheckIn"
                checked={formData.selfCheckIn}
                onChange={handleInputChange}
                style={{ marginRight: 8 }}
              />
              Self Check-In
            </label>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Amenities:</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Add custom amenity"
                style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
              <button
                type="button"
                onClick={handleAmenityAdd}
                style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer' }}
              >
                Add
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
              {commonAmenities.map(amenity => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => {
                    if (!formData.amenities.includes(amenity)) {
                      setFormData(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }));
                    }
                  }}
                  style={{
                    background: formData.amenities.includes(amenity) ? '#4caf50' : '#f0f0f0',
                    color: formData.amenities.includes(amenity) ? '#fff' : '#333',
                    border: 'none',
                    borderRadius: 16,
                    padding: '4px 12px',
                    cursor: 'pointer',
                    fontSize: 12
                  }}
                >
                  {amenity}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {formData.amenities.map(amenity => (
                <span
                  key={amenity}
                  style={{
                    background: '#e3f2fd',
                    color: '#1976d2',
                    borderRadius: 16,
                    padding: '4px 12px',
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  {amenity}
                  <button
                    type="button"
                    onClick={() => handleAmenityRemove(amenity)}
                    style={{ background: 'none', border: 'none', color: '#1976d2', cursor: 'pointer', fontSize: 16 }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Base Price (ZAR):</label>
            <input
              type="number"
              name="pricing.basePrice"
              value={formData.pricing.basePrice}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Cleaning Fee (ZAR):</label>
            <input
              type="number"
              name="pricing.cleaningFee"
              value={formData.pricing.cleaningFee}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Security Deposit (ZAR):</label>
            <input
              type="number"
              name="pricing.securityDeposit"
              value={formData.pricing.securityDeposit}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Property Type:</label>
            <select
              name="propertyDetails.propertyType"
              value={formData.propertyDetails.propertyType}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            >
              <option value="">Select property type</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Room Type:</label>
            <select
              name="propertyDetails.roomType"
              value={formData.propertyDetails.roomType}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            >
              <option value="">Select room type</option>
              {roomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Max Guests:</label>
              <input
                type="number"
                name="propertyDetails.maxGuests"
                value={formData.propertyDetails.maxGuests}
                onChange={handleInputChange}
                required
                min="0"
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Bedrooms:</label>
              <input
                type="number"
                name="propertyDetails.bedNum"
                value={formData.propertyDetails.bedNum}
                onChange={handleInputChange}
                required
                min="0"
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Bathrooms:</label>
              <input
                type="number"
                name="propertyDetails.bathNum"
                value={formData.propertyDetails.bathNum}
                onChange={handleInputChange}
                required
                min="0"
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
            {formData.images.length > 0 && (
              <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 8 }}>
                {formData.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index + 1}`}
                    style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 4 }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </form>

      {error && <div style={{ color: 'red', textAlign: 'center', marginTop: 16 }}>{error}</div>}
      {success && <div style={{ color: 'green', textAlign: 'center', marginTop: 16 }}>{success}</div>}

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 32 }}>
        <button
          type="button"
          onClick={handleCancel}
          style={{
            background: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            cursor: 'pointer',
            fontSize: 16
          }}
        >
          ← Back to Dashboard
        </button>
        <button
          onClick={handleSubmit}
          style={{
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            cursor: 'pointer',
            fontSize: 16
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateListing; 