const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  destination: String,
  checkIn: String,
  checkOut: String,
  numberOfGuests: Number,
  totalPrice: Number,
  currency: String,
  status: String,
  bookingDate: String,
  specialRequests: String,
  cancellationReason: String,
  reviewSubmitted: Boolean,
  paymentStatus: String,
  guestDetails: {
    adults: Number,
    children: Number,
    infants: Number
  },
  contactInfo: {
    phone: String,
    email: String
  }
});

module.exports = mongoose.model('Booking', bookingSchema); 