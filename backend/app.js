const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const cameraRoutes = require('./routes/camera');
const teddyRoutes = require('./routes/teddy');
const furnitureRoutes = require('./routes/furniture');

const app = express();

mongoose.connect(
    'mongodb+srv://will:nAcmfCoHGDgzrCHG@cluster0-pme76.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => {
      console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
      console.log('Unable to connect to MongoDB Atlas!');
      console.error(error);
    });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/css', express.static(path.join(__dirname, '../css')));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// API routes
app.use('/api/cameras', cameraRoutes);
app.use('/api/teddies', teddyRoutes);
app.use('/api/furniture', furnitureRoutes);

// Fallback to serve index.html for any other requests (Single Page Application support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/index.html'));
});

module.exports = app;