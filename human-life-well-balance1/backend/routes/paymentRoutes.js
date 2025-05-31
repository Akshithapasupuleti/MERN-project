const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// POST /api/payments
router.post('/', async (req, res) => {
  try {
    const { cardNumber, expiryDate, cvv } = req.body;

    // Create a new payment document
    const newPayment = new Payment({
      cardNumber,
      expiryDate,
      cvv,
    });

    // Save payment details to MongoDB
    
    await newPayment.save();

    res.status(201).json({ message: 'Payment details saved successfully' });
  } catch (error) {
    console.error('success:', error.message);
    res.status(500).json({ error: 'success' });
  }
});

module.exports = router;
