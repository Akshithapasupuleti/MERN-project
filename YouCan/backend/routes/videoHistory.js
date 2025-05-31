// routes/videoHistory.js
const express = require('express');
const VideoHistory = require('../models/VideoHistory');
const router = express.Router();

// Add video to history
router.post('/add', async (req, res) => {
  const { userId, videoId, title, thumbnail } = req.body;

  try {
    const newHistory = new VideoHistory({
      userId,
      videoId,
      title,
      thumbnail,
    });
    
    await newHistory.save();
    res.status(201).json({ message: 'Video added to history' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving video history' });
  }
});

// Get user video history
router.get('/history/:userId', async (req, res) => {
  const userId = req.params.userId;
  
  try {
    const history = await VideoHistory.find({ userId }).sort({ dateWatched: -1 });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching video history' });
  }
});

module.exports = router;
