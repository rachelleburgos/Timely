/**
 * @file EventController.js
 * @brief Controller for handling Event-related operations in a calendar application.
 *
 * This file contains functions for creating, retrieving, updating, and deleting events in the calendar application,
 * including both individual and multiple events. These functions interact with the MongoDB database through
 * the Mongoose model to perform CRUD operations. Each function is designed to handle HTTP requests, process the
 * request data, interact with the database, and return appropriate responses to the client.
 *
 * @requires EventSchema - Mongoose model for the event data.
 *
 * @controller
 * @function createEvent - Create a new individual event based on request data.
 * @function createMultipleEvents - Create multiple new events based on request data.
 * @function getEvent - Retrieve a single event by its ID.
 * @function getAllEvents - Retrieve all events from the database.
 * @function getUserEvents - Retrieve all events for a specific user.
 * @function updateEvent - Update an existing event by its ID.
 * @function deleteEvent - Delete an individual event by its ID.
 * @function deleteMultipleEvents - Delete multiple events based on a list of IDs.
 *
 * @example
 * // Example usage in an Express.js route
 * router.post('/events', createEvent);                    // Create an individual event
 * router.post('/events/multiple', createMultipleEvents);  // Create multiple events
 * router.get('/events/:id', getEvent);                    // Retrieve an individual event
 * router.get('/events', getAllEvents);                    // Retrieve all events
 * router.get('/events/user/:userId', getUserEvents);      // Retrieve events for a specific user
 * router.put('/events/:id', updateEvent);                 // Update an individual event
 * router.delete('/events/:id', deleteEvent);              // Delete an individual event
 * router.delete('/events/multiple', deleteMultipleEvents); // Delete multiple events
 */

import mongoose from 'mongoose';
import EventSchema from '../models/EventSchema.js';

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = new EventSchema(eventData);
    await newEvent.save();
    res
      .status(201)
      .json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event', details: error });
  }
};

// Create multiple new events
export const createMultipleEvents = async (req, res) => {
  try {
    const eventsData = req.body; // Expecting an array of event objects
    const newEvents = await EventSchema.insertMany(eventsData);
    res
      .status(201)
      .json({ message: 'Events created successfully', events: newEvents });
  } catch (error) {
    console.error('Error creating events:', error);
    res.status(500).json({ error: 'Failed to create events', details: error });
  }
};

// Get an event
export const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await EventSchema.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error getting event:', error);
    res.status(500).json({
      error: 'An error occurred while fetching the event',
      details: error,
    });
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await EventSchema.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error getting events:', error);
    res.status(500).json({
      error: 'An error occurred while fetching the events',
      details: error,
    });
  }
};

// Get all events for a specific user
export const getUserEvents = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userEvents = await EventSchema.find({
      user: mongoose.Types.ObjectId(userId),
    });
    res.status(200).json(userEvents);
  } catch (error) {
    console.error('Error getting user events:', error);
    res.status(500).json({
      error: 'An error occurred while fetching the user events',
      details: error,
    });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const eventData = req.body;
    const event = await EventSchema.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    const updatedEvent = await EventSchema.findByIdAndUpdate(id, eventData, {
      new: true,
    });
    res
      .status(200)
      .json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      error: 'An error occurred while updating the event',
      details: error,
    });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await EventSchema.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    await EventSchema.findByIdAndDelete(id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the event' });
  }
};

// Delete multiple events
export const deleteMultipleEvents = async (req, res) => {
  try {
    const eventIds = req.body.ids; // Expecting an array of event IDs
    const deletedEvents = await EventSchema.deleteMany({
      _id: { $in: eventIds },
    });
    res.status(200).json({
      message: 'Events deleted successfully',
      deletedEventsCount: deletedEvents.deletedCount,
    });
  } catch (error) {
    console.error('Error deleting events:', error);
    res.status(500).json({ error: 'Failed to delete events', details: error });
  }
};
