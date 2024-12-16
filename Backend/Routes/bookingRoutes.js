const express = require('express');
const { getAllBookings, createBooking } = require('../controllers/bookingController');

const router = express.Router();

router.get('/bookings', getAllBookings);
router.post('/bookings', createBooking);

module.exports = router;
