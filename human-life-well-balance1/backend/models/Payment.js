const mongoose = require('mongoose');


const PaymentSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
