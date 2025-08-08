const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb+srv://thabang129m:129m129m@airbnb-capstone.tkq35et.mongodb.net/?retryWrites=true&w=majority&appName=airbnb-capstone';

const connectDB = async () => {
  try {
    console.log('🔌 Attempting to connect to MongoDB...');
    console.log('📍 URI:', uri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in logs
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    console.log('🔗 Connection state:', mongoose.connection.readyState);
    
    // Set up connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });
    
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    console.error('🔍 Error details:', {
      name: err.name,
      code: err.code,
      message: err.message
    });
    
    // Don't exit immediately, let the application handle the error
    throw err;
  }
};

module.exports = connectDB; 