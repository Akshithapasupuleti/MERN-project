const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email format validation
  },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  study: { type: String, required: true },
});

// Password hashing before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison for login
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create a unique index on the email field to improve query performance
userSchema.index({ email: 1 }, { unique: true });

// Create the User model from the schema
module.exports = mongoose.model('User', userSchema);
