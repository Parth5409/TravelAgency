// Import necessary modules
const express = require('express');
const router = express.Router();

const { packageController } = require('../controllers/agency.controller.js');

// Package Routes with authentication middleware
router.get('/packages', packageController.getAllPackages); // Retrieve all tour packages
router.get('/packages/:id', packageController.getPackageById); // Retrieve details of a specific package

// Create package (admin-only access)
router.post('/packages', packageController.createPackage); // Create a new tour package

// Update package (admin-only access)
router.put('/packages/:id', packageController.updatePackage); // Update an existing tour package

// Delete package (admin-only access)
router.delete('/packages/:id', packageController.deletePackage); // Delete a tour package

module.exports = router; // Ensure this is being exported correctly
