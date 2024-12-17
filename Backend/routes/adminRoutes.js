// Import necessary modules
const express = require('express');
const router = express.Router();

// Import the controllers
const { packageController, adminController } = require('../controllers/agency.controller.js');

// Import the isAuthenticated middleware
// const isAuthenticated = require('../middleware/isAuthenticated');

// Admin Routes
router.post('/admin/packages', adminController.addAdmin); // Add new admin
router.post('/admin/login', adminController.adminLogin); // Admin login
router.post('/admin/packages', packageController.createPackage); // Add new tour package
router.put('/admin/packages/:id', packageController.updatePackage); // Update existing tour package
router.delete('/admin/packages/:id', packageController.deletePackage); // Delete a tour package

module.exports = router; // Ensure this is being exported correctly
