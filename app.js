const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // ✅ Required for static path resolution

const app = express();
const routes = require('./routing');

const jwtkey = 'e-comm'; // Note: Avoid hardcoding in production — use environment variables

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Serve uploaded CVs or images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Jobs')
    .then(() => console.log("DATABASE CONNECTED..."))
    .catch((error) => console.log("Database connection error:", error));

// Routes
app.use('/', routes);

// Server listening
app.listen(8000, () => console.log('SERVER IS RUNNING on port 8000...'));
