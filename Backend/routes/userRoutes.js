// Import necessary modules
const express = require('express');
const router = express.Router();

// Import the controllers
const { userController } = require('../controllers/agency.controller.js');

// User Routes
router.post('/signup', userController.signUp); // User sign-up
router.post('/signin', userController.signIn); // User sign-in

module.exports = router; // Ensure this is being exported correctly