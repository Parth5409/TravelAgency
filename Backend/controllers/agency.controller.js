// Import Models
const { Package, Booking, Admin, User } = require("../models/agency.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// Controller for Tour Packages
const packageController = {
  getAllPackages: async (req, res) => {
    try {
      const packages = await Package.find();
      res.status(200).json(packages);
    } catch (error) {
      res.status(500).json({ error: "Error fetching packages" });
    }
  },

  getPackageById: async (req, res) => {
    try {
      const { id } = req.params;
      const packageData = await Package.findById(id);
      if (!packageData)
        return res.status(404).json({ error: "Package not found" });
      res.status(200).json(packageData);
    } catch (error) {
      res.status(500).json({ error: "Error fetching package details" });
    }
  },

  createPackage: async (req, res) => {
    try {
      const newPackage = new Package(req.body);
      const savedPackage = await newPackage.save();
      res.status(201).json(savedPackage);
    } catch (error) {
      res.status(500).json({ error: "Error creating package" });
    }
  },

  updatePackage: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedPackage = await Package.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedPackage)
        return res.status(404).json({ error: "Package not found" });
      res.status(200).json(updatedPackage);
    } catch (error) {
      res.status(500).json({ error: "Error updating package" });
    }
  },

  deletePackage: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPackage = await Package.findByIdAndDelete(id);
      if (!deletedPackage)
        return res.status(404).json({ error: "Package not found" });
      res.status(200).json({ message: "Package deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting package" });
    }
  },
};

// Controller for Bookings
const bookingController = {
  createBooking: async (req, res) => {
    try {
      const {
        customerName,
        email,
        phoneNumber,
        numberOfTravelers,
        specialRequests,
        packageId,
      } = req.body;
      const selectedPackage = await Package.findById(packageId);
      if (!selectedPackage)
        return res.status(404).json({ error: "Package not found" });

      const totalPrice = selectedPackage.price * numberOfTravelers;
      const newBooking = new Booking({
        customerName,
        email,
        phoneNumber,
        numberOfTravelers,
        specialRequests,
        package: packageId,
        totalPrice,
      });

      const savedBooking = await newBooking.save();
      res.status(201).json(savedBooking);
    } catch (error) {
      res.status(500).json({ error: "Error creating booking" });
    }
  },

  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.find().populate("package");
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Error fetching bookings" });
    }
  },
};

// Controller for Admin
const adminController = {
  addAdmin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin)
        return res.status(400).json({ error: "Admin already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({ username, password: hashedPassword });
      const savedAdmin = await newAdmin.save();
      res.status(201).json(savedAdmin);
    } catch (error) {
      res.status(500).json({ error: "Error adding admin" });
    }
  },

  adminLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ username });
      if (!admin) return res.status(404).json({ error: "Admin not found" });

      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid)
        return res.status(400).json({ error: "Invalid credentials" });

      res.status(200).json({ message: "Login successful", admin });
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  },
};

// Controller for Users
const userController = {
  signUp: async (req, res) => {
    try {
      const { name, email, password, phoneNumber } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ error: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: "Error signing up" });
    }
  },

  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: "User not found" });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(400).json({ error: "Invalid credentials" });

      // Generate JWT Token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(200).json({ message: "Sign-in successful", user, token });
    } catch (error) {
      res.status(500).json({ error: "Error signing in" });
    }
  },
};

module.exports = userController;
// Export Controllers
module.exports = {
  packageController,
  bookingController,
  adminController,
  userController,
};
