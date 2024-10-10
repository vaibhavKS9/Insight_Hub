// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db');
const { Project } = require('./models');  // Import Project from models

const projectsRoutes = require('./routes/projects');  // Import projects routes
const messageRouter = require('./routes/messages');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectsRoutes);  // Use projects routes
app.use('/api/messages', messageRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
