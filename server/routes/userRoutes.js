/**
 * @file EventRoutes.js
 * @brief Routing for Event-related endpoints in an Express.js application.
 *
 * This file sets up the Express router for handling routes related to events. It imports the necessary controller functions
 * from 'eventController.js' and associates them with their respective routes. The file defines routes for creating and retrieving
 * all events, as well as fetching, updating, and deleting individual events by their ID.
 *
 * @requires express - Express framework to create router.
 * @requires eventController - Controller functions for event-related operations.
 *
 * @router
 * @route {POST} '/' - Create a new event.
 * @route {GET} '/' - Get all events.
 * @route {GET} '/:id' - Get a single event by ID.
 * @route {PATCH} '/:id' - Update an event by ID.
 * @route {DELETE} '/:id' - Delete an event by ID.
 *
 * @example
 * // Usage in an Express.js application
 * import eventRoutes from './EventRoutes.js';
 * app.use('/events', eventRoutes);
 */

import express from 'express';
import {
  createUserProfile,
  getUserProfile,
  getAllUserProfiles,
  updateUserProfile,
  deleteUserProfile,
} from '../controllers/UserController.js';

const router = express.Router();

// Routes for creating and getting all user profiles
router
  .route('/')
  .post(createUserProfile) // Create a new user profile
  .get(getAllUserProfiles); // Get all user profiles

// Routes for a single user profile by id
router
  .route('/:id')
  .get(getUserProfile) // Get a single user profile by id
  .patch(updateUserProfile) // Update a user profile by id
  .delete(deleteUserProfile); // Delete a user profile by id

export default router;
