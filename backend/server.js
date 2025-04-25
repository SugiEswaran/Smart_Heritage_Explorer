// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
connectDB();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Example of a simple POST route for feedback submission
app.post('/feedback', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Save feedback to the database (you can define a model for feedback here)
  // For now, we'll just log it
  console.log('Feedback received:', { name, email, message });
  res.status(201).json({ success: 'Feedback submitted successfully' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
