/**
 * @file EventRoutes.js
 * @brief Routing for Event-related endpoints in an Express.js application.
 *
 * This file configures the Express router to handle routes associated with event operations. It includes routes for
 * creating new events, retrieving all events, as well as fetching, updating, and deleting individual events based on their ID.
 * The controller functions for these operations are imported from 'EventController.js'.
 *
 * @requires express - The Express framework to create the router.
 * @requires EventController - Controller functions for handling event-related operations.
 *
 * @router
 * @route {POST} '/' - Endpoint for creating a new event.
 * @route {GET} '/' - Endpoint for retrieving all events.
 * @route {GET} '/:id' - Endpoint for retrieving a single event by its ID.
 * @route {PATCH} '/:id' - Endpoint for updating an event by its ID.
 * @route {DELETE} '/:id' - Endpoint for deleting an event by its ID.
 * @route {GET} '/user/:userId' - Endpoint for retrieving all events for a specific user.
 * @route {POST} '/events/multiple' - Endpoint for creating multiple events.
 * @route {DELETE} '/events/multiple' - Endpoint for deleting multiple events.
 *
 * @example
 * // Example of using these routes in an Express.js application
 * import eventRoutes from './EventRoutes.js';
 * // other imports and middleware setup
 * app.use('/events', eventRoutes); // Mounting the event routes
 */

import express from 'express';
import {
  createEvent,
  getEvent,
  getAllEvents,
  getUserEvents,
  updateEvent,
  deleteEvent,
  createMultipleEvents,
  deleteMultipleEvents,
} from '../controllers/EventController.js';

const router = express.Router();

// Routes for creating and getting all events
router
  .route('/')
  .post(createEvent) // Create a new event
  .get(getAllEvents); // Get all events

// Routes for a single event by id
router
  .route('/:id')
  .get(getEvent) // Get a single event by id
  .patch(updateEvent) // Update an event by id
  .delete(deleteEvent); // Delete an event by id

// Route for getting all events for a specific user
router.route('/user/:userId').get(getUserEvents); // Get all events for a specific user

// Routes for creating and deleting multiple events
router
  .post('/multiple', createMultipleEvents) // Route for creating multiple events
  .delete('/multiple', deleteMultipleEvents); // Route for deleting multiple events

export default router;
