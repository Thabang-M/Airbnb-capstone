const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hostEmail: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    latitude: Number,
    longitude: Number
  },
  propertyDetails: {
    bedNum: Number,
    bathNum: Number,
    sqFt: Number,
    maxGuests: Number,
    bedrooms: [
      {
        type: { type: String },
        beds: Number,
        bedType: String
      }
    ],
    propertyType: String,
    roomType: String
  },
  amenities: [String],
  images: [String],
  pricing: {
    basePrice: Number,
    currency: String,
    cleaningFee: Number,
    serviceFee: Number,
    securityDeposit: Number,
    extraGuestFee: Number
  },
  availability: {
    isAvailable: Boolean,
    minimumStay: Number,
    maximumStay: Number,
    checkInTime: String,
    checkOutTime: String
  },
  ratings: {
    averageRating: Number,
    totalReviews: Number,
    accuracy: Number,
    cleanliness: Number,
    communication: Number,
    location: Number,
    value: Number
  },
  houseRules: [String],
  cancellationPolicy: String,
  dateCreated: String,
  lastUpdated: String
});

// Add indexes for better query performance
listingSchema.index({ 'address.city': 1, 'address.country': 1 });
listingSchema.index({ hostId: 1 });

module.exports = mongoose.model('Listing', listingSchema); 