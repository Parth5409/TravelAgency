// Import dependencies
const mongoose = require("mongoose");

// Package Schema
const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availableDates: { type: [String], required: true }, // Array of dates as strings
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// Booking Schema
const bookingSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    numberOfTravelers: { type: Number, required: true },
    specialRequests: { type: String }, // Optional field
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

// Admin Schema (for basic authentication)
const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true }, // Ideally hashed for security
  },
  { timestamps: true }
);

// User Schema (for sign-in and sign-up)
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed passwords for security
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

// Models
const Package = mongoose.model("Package", packageSchema);
const Booking = mongoose.model("Booking", bookingSchema);
const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);

// Export Models
module.exports = {
  Package,
  Booking,
  Admin,
  User,
};
