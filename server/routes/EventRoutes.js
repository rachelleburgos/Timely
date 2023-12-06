import express from 'express'
import {
  createEvent,
  getEvent,
  getAllEvents,
  getUserEvents,
  updateEvent,
  deleteEvent,
  createMultipleEvents,
  deleteMultipleEvents
} from '../controllers/EventController.js'

const router = express.Router()

// Routes for creating and getting all events
router
  .route('/')
  .post(createEvent) // Create a new event
  .get(getAllEvents) // Get all events

// Routes for a single event by id
router
  .route('/:id')
  .get(getEvent) // Get a single event by id
  .patch(updateEvent) // Update an event by id
  .delete(deleteEvent) // Delete an event by id

// Route for getting all events for a specific user
router.route('/user/:userId').get(getUserEvents) // Get all events for a specific user

// Routes for creating and deleting multiple events
router
  .post('/multiple', createMultipleEvents) // Route for creating multiple events
  .delete('/multiple', deleteMultipleEvents) // Route for deleting multiple events

export default router
