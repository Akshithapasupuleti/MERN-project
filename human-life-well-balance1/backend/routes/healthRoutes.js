const express = require('express');
const router = express.Router();
const Health = require('../models/Health'); // Assuming you have a Health model defined

// POST /api/health - Create a new health record
router.post('/', async (req, res) => {
  const newHealthData = new Health(req.body);

  try {
    await newHealthData.save();
    res.status(200).send('Data saved successfully!');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Failed to save data.');
  }
});

// GET /api/health - Retrieve all health records
router.get('/', async (req, res) => {
  try {
    const healthData = await Health.find();
    res.status(200).json(healthData);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Failed to retrieve data.');
  }
});

// GET /api/health/:id - Retrieve a specific health record by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const healthData = await Health.findById(id);
    if (!healthData) {
      return res.status(404).send('Health record not found.');
    }
    res.status(200).json(healthData);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Failed to retrieve data.');
  }
});

// DELETE /api/health/:id - Delete a specific health record by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHealthData = await Health.findByIdAndDelete(id);
    if (!deletedHealthData) {
      return res.status(404).send('Health record not found.');
    }
    res.status(200).send('Health record deleted successfully.');
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send('Failed to delete health record.');
  }
});

// PUT /api/health/:id - Update a specific health record by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedHealthData = await Health.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedHealthData) {
      return res.status(404).send('Health record not found.');
    }
    res.status(200).json(updatedHealthData);
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send('Failed to update health record.');
  }
});

module.exports = router;
