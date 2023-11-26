import mongoose from 'mongoose';
import Event from '../models/eventSchema.js';

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = new Event(eventData);
    await newEvent.save();
    res
      .status(201)
      .json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Get an event
export const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error getting event:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the event' });
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error getting events:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the events' });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const eventData = req.body;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    const updatedEvent = await Event.findByIdAndUpdate(id, eventData, {
      new: true,
    });
    res
      .status(200)
      .json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while updating the event' });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the event' });
  }
};
