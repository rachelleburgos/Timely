import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDatabase } from './database.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import { applySecurityMiddleware } from './middlewares/security.js';
import { errorHandler } from './middlewares/errorHandler.js';

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
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use morgan for logging
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

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
