const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mightguy72000:Mightguy%40123@cluster0.p7ukxu5.mongodb.net/travel-agency', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  }
};

module.exports = connectDB;
