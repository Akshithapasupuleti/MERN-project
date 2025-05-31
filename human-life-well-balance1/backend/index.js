const express = require('express');
const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
  app.post('/api/health', async (req, res) => {
    try {
      const healthData = new Health(req.body);
      await healthData.save();
      res.status(201).send('Health data saved successfully!');
    } catch (error) {
      res.status(500).send('Error saving health data.');
    }
  });

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
