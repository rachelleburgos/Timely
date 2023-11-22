import express from 'express';
import { createEvent, getEvent, getAllEvents, updateEvent, deleteEvent } from '../controllers/eventController.js';

const router = express.Router();

// Routes for creating and getting all events
router.route('/')
  .post(createEvent) // Create a new event
  .get(getAllEvents); // Get all events

// Routes for a single event by id
router.route('/:id')
  .get(getEvent) // Get a single event by id
  .patch(updateEvent) // Update an event by id
  .delete(deleteEvent); // Delete an event by id

export default router;