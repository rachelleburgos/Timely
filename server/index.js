/**
 * @file index.js
 * @brief Entry point for the Express.js application.
 *
 * This is the main file of the Express.js application. It sets up the server and includes all the necessary middleware,
 * route imports, and configurations. The file starts by importing required modules and setting up environment variables.
 * It then applies security middleware for enhanced security, sets up rate limiting to prevent abuse of APIs, and includes
 * middleware for request parsing and logging. The server routes for users, events, and inbox items are then set up.
 * Finally, the script connects to the MongoDB database and starts the server.
 *
 * @requires express - Express framework to create an Express application.
 * @requires dotenv - Module to load environment variables from a .env file.
 * @requires express-rate-limit - Middleware for rate-limiting requests.
 * @requires morgan - HTTP request logger middleware.
 * @requires fs - Node.js file system module for logging.
 * @requires path - Node.js path module for handling file paths.
 * @requires url - Node.js URL module for file URL resolution.
 * @requires DatabaseConnection - Utility for connecting to the MongoDB database.
 * @requires UserRoutes - Routes for user-related API endpoints.
 * @requires EventRoutes - Routes for event-related API endpoints.
 * @requires InboxItemRoutes - Routes for inbox item-related API endpoints.
 * @requires Security - Middleware for applying security-related configurations.
 * @requires ErrorHandler - Middleware for handling errors across the application.
 *
 * @server
 * @function startServer - Asynchronously starts the server and connects to the database.
 *
 * @example
 * // Running the server
 * node index.js
 */

import express from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDatabase } from './database/DatabaseConnection.js';

import userRoutes from './routes/UserRoutes.js';
import eventRoutes from './routes/EventRoutes.js';
import inboxItemRoutes from './routes/InboxItemRoutes.js';

import { applySecurityMiddleware } from './middlewares/SecurityMiddleware.js';
import { errorHandler } from './middlewares/ErrorHandler.js';

const app = express();

// Load environment variables from .env file
dotenv.config();

// Apply security-related middleware
applySecurityMiddleware(app);

// Use error handling middleware
app.use(errorHandler);

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Built-in middleware for json and urlencoded form data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use morgan for logging
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs/access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/inboxitems', inboxItemRoutes);
const CONNECTION_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/Timely';
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDatabase(CONNECTION_URI);
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};

startServer();
