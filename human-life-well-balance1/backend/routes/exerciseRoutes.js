// backend/routes/exerciseRoutes.js
const express = require('express');
const router = express.Router();
const { getExercises } = require('../controllers/exerciseController');

// Route for fetching exercises
router.get('/', getExercises);

module.exports = router;
