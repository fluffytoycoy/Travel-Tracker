// Load Environment vars
require('dotenv').config();

// Load required packages
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Database = require('./config/database');
const location = require('./api/locations');
const follow = require('./api/following');
const auth = require('./auth/auth');
const corsConfig = require('./config/cors');
const middlewares = require('./middlewares/middlewares');

// Create database and connect
const database = new Database(process.env.DATABASE_URL);
database.connect();

// Create basic server
const app = express();
const port = process.env.PORT || 6161;

// Pre-Route Middleware
//  - Api: parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//  - security: Hides headers
app.use(helmet());

//  - security: Set acceptable incoming req domains
app.use(cors(corsConfig));

// ROUTES
app.get('/', (req, res) => {
  res.json({ message: 'working' });
});

// API - Auth
app.use('/auth', auth);

// API - Locations
app.use('/api/locations', location);

// API - friend listen\
app.use('/api/follow', follow);

// Post-Route Middleware
// Returns detailed 404 errors
app.use(middlewares.notFound);

// Handles all server based errors
app.use(middlewares.errorHandler);

//
//  Start App on ${port}
//
app.listen(port, () => {
  console.log(`App listening on localhost:${port}`);
});
