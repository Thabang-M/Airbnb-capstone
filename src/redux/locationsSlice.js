import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getApiUrl } from '../config';

// Async thunk to fetch cities from the backend
export const fetchCities = createAsyncThunk(
  'locations/fetchCities',
  async (_, { rejectWithValue }) => {
    try {
      const apiUrl = getApiUrl('api/cities');
      console.log('Fetching cities from:', apiUrl);
      const response = await fetch(apiUrl);
      console.log('Cities response status:', response.status);
      if (!response.ok) {
        console.error('Cities fetch failed:', response.status, response.statusText);
        return rejectWithValue(`HTTP error! status: ${response.status}`);
      }
      const cities = await response.json();
      console.log('Cities data received:', cities);
      // Transform the cities array to match the expected format
      const locations = ['All locations', ...cities.map(city => `${city.city}, ${city.country}`)];
      console.log('Transformed locations:', locations);
      return locations;
    } catch (error) {
      console.error('Cities fetch error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    locations: ['All locations'],
    loading: false,
    error: null,
    lastUpdated: null
  },
  reducers: {
    addLocation: (state, action) => {
      const newLocation = action.payload;
      if (!state.locations.includes(newLocation)) {
        state.locations.push(newLocation);
      }
    },
    removeLocation: (state, action) => {
      const locationToRemove = action.payload;
      state.locations = state.locations.filter(loc => loc !== locationToRemove);
      // Ensure "All locations" is always present
      if (!state.locations.includes('All locations')) {
        state.locations.unshift('All locations');
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addLocation, removeLocation, clearError } = locationsSlice.actions;
export default locationsSlice.reducer; 