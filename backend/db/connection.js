const mongoose = require('mongoose');

const uri = 'mongodb+srv://thabang129m:129m129m@airbnb-capstone.tkq35et.mongodb.net/?retryWrites=true&w=majority&appName=airbnb-capstone';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // MongoDB connected successfully
  } catch (err) {
    process.exit(1);
  }
};

module.exports = connectDB; 