import mongoose from 'mongoose'
import EventSchema from '../models/EventSchema.js'

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const eventData = req.body
    const newEvent = new EventSchema(eventData)
    await newEvent.save()
    res.status(201).json({ message: 'Event created successfully', event: newEvent })
  } catch (error) {
    next(error)
  }
}

// Create multiple new events
export const createMultipleEvents = async (req, res) => {
  try {
    const eventsData = req.body // Expecting an array of event objects
    const newEvents = await EventSchema.insertMany(eventsData)
    res.status(201).json({ message: 'Events created successfully', events: newEvents })
  } catch (error) {
    next(error)
  }
}

// Get an event
export const getEvent = async (req, res) => {
  try {
    const { id } = req.params
    const event = await EventSchema.findById(id)
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }
    res.status(200).json(event)
  } catch (error) {
    next(error)
  }
}

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await EventSchema.find()
    res.status(200).json(events)
  } catch (error) {
    next(error)
  }
}

// Get all events for a specific user
export const getUserEvents = async (req, res) => {
  try {
    const userId = req.params.userId
    const userEvents = await EventSchema.find({
      user: new mongoose.Types.ObjectId(userId)
    })
    res.status(200).json(userEvents)
  } catch (error) {
    next(error)
  }
}

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params
    const eventData = req.body
    const event = await EventSchema.findById(id)
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }
    const updatedEvent = await EventSchema.findByIdAndUpdate(id, eventData, {
      new: true
    })
    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent })
  } catch (error) {
    next(error)
  }
}

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params
    const event = await EventSchema.findById(id)
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }
    await EventSchema.findByIdAndDelete(id)
    res.status(200).json({ message: 'Event deleted successfully' })
  } catch (error) {
    next(error)
  }
}

// Delete multiple events
export const deleteMultipleEvents = async (req, res) => {
  try {
    const eventIds = req.body.ids // Expecting an array of event IDs
    const deletedEvents = await EventSchema.deleteMany({
      _id: { $in: eventIds }
    })
    res.status(200).json({
      message: 'Events deleted successfully',
      deletedEventsCount: deletedEvents.deletedCount
    })
  } catch (error) {
    next(error)
  }
}
