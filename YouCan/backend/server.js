const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const videoHistoryRoutes = require('./routes/videoHistory');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001 

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/Youcan', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected to localhost Youcan database'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Schemas and Models
const replySchema = new mongoose.Schema({
  text: String,
  user: String, // Optional: to track who replied
  createdAt: { type: Date, default: Date.now },
});

const discussionSchema = new mongoose.Schema({
  title: String,
  description: String,
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now },
});

const Discussion = mongoose.model("Discussion", discussionSchema);

// Discussion Endpoints
app.get("/api/discussions", async (req, res) => {
  try {
    const discussions = await Discussion.find();
    res.json(discussions);
  } catch (error) {
    console.error("Error fetching discussions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/discussions", async (req, res) => {
  try {
    const newDiscussion = new Discussion(req.body);
    await newDiscussion.save();
    res.status(201).json(newDiscussion);
  } catch (error) {
    console.error("Error creating discussion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/discussions/:id", async (req, res) => {
  try {
    const result = await Discussion.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Discussion not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error deleting discussion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a reply to a discussion
app.post("/api/discussions/:id/replies", async (req, res) => {
  try {
    const discussionId = req.params.id;
    const reply = req.body; // { text: 'Reply content', user: 'User name' }

    // Find the discussion and add the reply
    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    discussion.replies.push(reply);
    await discussion.save();

    res.status(201).json(reply);
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
const generateNotes = async () => {
  if (!youtubeLink.includes("youtube.com/watch?v=")) {
    alert("Please enter a valid YouTube link.");
    return;
  }

  try {
    const videoId = youtubeLink.split("v=")[1].split("&")[0];
    const response = await fetch(
      `http://localhost:5001/api/generateNotes?videoId=${videoId}`
    );
    const data = await response.json();
    setNotes(data.notes || "No notes available for this video.");
  } catch (err) {
    setNotes("Error generating notes. Please try again later.");
  }
};

// Other Routes
app.use('/api/auth', authRoutes);
app.use('/api/videoHistory', videoHistoryRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
