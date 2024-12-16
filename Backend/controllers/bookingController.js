const Booking = require('../models/Booking');
const Package = require('../models/Package');

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

const createBooking = async (req, res) => {
  try {
    const { name, email, phone, travelers, specialRequests, packageId } = req.body;

    if (!name || !email || !phone || !travelers || !packageId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const packageData = await Package.findById(packageId);
    if (!packageData) {
      return res.status(404).json({ error: 'Package not found' });
    }

    const totalPrice = packageData.price * travelers;

    const booking = new Booking({
      customerName: name,
      email,
      phoneNumber: phone,
      numberOfTravelers: travelers,
      specialRequests,
      packageId,
      totalPrice,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create booking', details: err.message });
  }
};

module.exports = { getAllBookings, createBooking };
