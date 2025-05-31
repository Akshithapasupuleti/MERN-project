const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, age, study } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already taken' });
    }

    // Create a new user
    const newUser = new User({ name, email, password, age, study });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: 'Validation failed', errors: messages });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});





// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Forgot Password (OTP Mockup)
// Forgot Password (OTP Mockup)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body; // Destructure email from the request body

  try {
    // Validate email
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Mock sending OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    console.log(`OTP for ${email}: ${otp}`); // Log OTP (for testing purposes)

    // Here, you would typically send the OTP via email or SMS
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error in forgot-password:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
