// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Import routes
const packageRoutes = require('./routes/packageRoutes.js');
const bookingRoutes = require('./routes/bookingRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const userRoutes = require('./routes/userRoutes.js'); // Correct the duplicate declaration here

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// CORS Options
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from localhost:5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(morgan('dev')); // Log HTTP requests

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/travel-agency';

// Session configuration
const store = MongoStore.create({
  mongoUrl: MONGO_URI,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
  touchAfter: 24 * 3600, // Avoid frequent session updates
});

const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 3, // 3 days
    maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
  },
};

app.use(session(sessionOptions));

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
// Tour Packages Routes
app.use('/packages', packageRoutes);

// Booking Routes
app.use('/bookings', bookingRoutes);

// Admin Routes
app.use('/admin/packages', adminRoutes);

// User Routes
app.use('/users', userRoutes); // Add user routes here

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
