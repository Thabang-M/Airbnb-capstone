const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['guest', 'host'], required: true }, // 'guest' or 'host'
  firstName: String,
  lastName: String,
  phoneNumber: String,
  dateOfBirth: String,
  profilePicture: String, // Required for host, optional for guest (enforced in logic)
  isVerified: Boolean,
  dateJoined: String,
  languages: [String], // Free text array, required for host
  preferences: {
    language: String,
    currency: String,
    notifications: {
      email: Boolean,
      sms: Boolean,
      push: Boolean
    }
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  }
});

module.exports = mongoose.model('User', userSchema); 