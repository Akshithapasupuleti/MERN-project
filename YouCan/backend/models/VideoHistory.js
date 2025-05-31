// models/VideoHistory.js
const mongoose = require('mongoose');

const videoHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  thumbnail: { type: String },
  dateWatched: { type: Date, default: Date.now },
});

const VideoHistory = mongoose.model('VideoHistory', videoHistorySchema);

module.exports = VideoHistory;
