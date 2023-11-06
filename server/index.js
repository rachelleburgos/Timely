import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js'; // Import routes from user.js
import eventRoutes from './routes/eventRoutes.js'; // Import routes from event.js

const app = express();

// Load environment variables from .env file
dotenv.config();

app.use(cors()); // Allow cross-origin requests

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Middleware
app.use('/api/users', userRoutes); // Use the routes from user.js when the path is /api/users
app.use('/api/events', eventRoutes); // Use the routes from event.js when the path is /api/events

const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Timely';
const PORT = process.env.PORT || 5000; // Once we deploy our app, the hosting service will provide us with a port number.
                                       // For now, we will use port 5000.

// Connect to MongoDB
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true}) // useNewUrlParser and useUnifiedTopology are options that we pass in to avoid deprecation warnings
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
