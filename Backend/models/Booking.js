const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/ 
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/ 
  },
  numberOfTravelers: {
    type: Number,
    required: true,
    min: 1 
  },
  specialRequests: {
    type: String,
    default: "",
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
