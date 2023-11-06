import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import userRoutes from './routes/userRoutes.js'; // Import routes from user.js
import eventRoutes from './routes/eventRoutes.js'; // Import routes from event.js

const app = express();

// Load environment variables from .env file
dotenv.config();

// Security-related HTTP headers
app.use(helmet());

// Allow cross-origin requests with CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', // Replace '*' with your domain in production
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Built-in middleware for json and urlencoded form data
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

// Central error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something broke on the server!', error: err.message });
});

const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Timely';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => {
  console.error('Database connection failed', error);
  process.exit(1);
});
