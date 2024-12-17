// Import necessary modules
const express = require('express');
const router = express.Router();

// Import the controllers
const { bookingController } = require('../controllers/agency.controller.js');

// Booking Routes
router.post('/bookings', bookingController.createBooking); // Submit a package booking
router.get('/bookings', bookingController.getAllBookings); // Get all bookings (admin or authenticated user)

module.exports = router; // Ensure this is being exported correctly
