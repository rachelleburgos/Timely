/**
 * @file InboxItemController.js
 * @brief Controller for handling InboxItem-related operations in a task management application.
 *
 * This file contains functions for managing InboxItem data, including creating, retrieving, updating, and deleting both individual
 * and multiple inbox items. These functions interact with the MongoDB database through the Mongoose model to perform CRUD operations
 * on InboxItem data. Each function is designed to handle HTTP requests, process the request data, interact with the database, and
 * return appropriate responses to the client. Error handling is also included to manage any issues during database operations.
 *
 * @requires InboxItemSchema - Mongoose model for the InboxItem data.
 *
 * @controller
 * @function createInboxItem - Create a new individual inbox item based on request data.
 * @function createMultipleInboxItems - Create multiple new inbox items based on request data.
 * @function getInboxItem - Retrieve a specific inbox item by its ID.
 * @function getAllInboxItems - Retrieve all inbox items from the database.
 * @function getUserInboxItems - Retrieve all inbox items for a specific user.
 * @function updateInboxItem - Update an existing inbox item by its ID.
 * @function deleteInboxItem - Delete an individual inbox item by its ID.
 * @function deleteMultipleInboxItems - Delete multiple inbox items based on a list of IDs.
 *
 * @example
 * // Example usage in an Express.js route
 * router.post('/inboxitems', createInboxItem);                  // Create an individual inbox item
 * router.post('/inboxitems/multiple', createMultipleInboxItems); // Create multiple inbox items
 * router.get('/inboxitems/:id', getInboxItem);                  // Retrieve an individual inbox item
 * router.get('/inboxitems', getAllInboxItems);                  // Retrieve all inbox items
 * router.get('/inboxitems/user/:userId', getUserInboxItems);    // Retrieve inbox items for a specific user
 * router.put('/inboxitems/:id', updateInboxItem);               // Update an individual inbox item
 * router.delete('/inboxitems/:id', deleteInboxItem);            // Delete an individual inbox item
 * router.delete('/inboxitems/multiple', deleteMultipleInboxItems); // Delete multiple inbox items
 */

import mongoose from 'mongoose';

import InboxItemSchema from '../models/InboxItemSchema.js';

// Create a new inbox item
export const createInboxItem = async (req, res) => {
  try {
    const inboxItemData = req.body;
    const newInboxItem = new InboxItemSchema(inboxItemData);
    await newInboxItem.save();
    res.status(201).json(newInboxItem);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to create inbox item', details: error });
  }
};

// Create multiple new inbox items
export const createMultipleInboxItems = async (req, res) => {
  try {
    const inboxItemsData = req.body; // Expecting an array of inbox item objects
    const newInboxItems = await InboxItemSchema.insertMany(inboxItemsData);
    res.status(201).json({
      message: 'Inbox items created successfully',
      inboxItems: newInboxItems,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to create inbox items', details: error });
  }
};

// Get an inbox item
export const getInboxItem = async (req, res) => {
  try {
    const { id } = req.params;
    const inboxItem = await InboxItemSchema.findById(id);
    if (!inboxItem) {
      return res.status(404).json({ error: 'Inbox item not found' });
    }
    res.status(200).json(inboxItem);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching inbox item', details: error });
  }
};

// Get all inbox items
export const getAllInboxItems = async (req, res) => {
  try {
    const inboxItems = await InboxItemSchema.find();
    res.status(200).json(inboxItems);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching inbox items', details: error });
  }
};

// Get all inbox items for a specific user
export const getUserInboxItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const inboxItems = await InboxItemSchema.find({
      user: mongoose.Types.ObjectId(userId),
    });
    res.status(200).json(inboxItems);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching inbox items', details: error });
  }
};

// Update an inbox item
export const updateInboxItem = async (req, res) => {
  try {
    const { id } = req.params;
    const inboxItemData = req.body;
    const updatedInboxItem = await InboxItemSchema.findByIdAndUpdate(
      id,
      inboxItemData,
      { new: true }
    );
    if (!updatedInboxItem) {
      return res.status(404).json({ error: 'Inbox item not found' });
    }
    res.status(200).json(updatedInboxItem);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error updating inbox item', details: error });
  }
};

// Delete an inbox item
export const deleteInboxItem = async (req, res) => {
  try {
    const { id } = req.params;
    const inboxItem = await InboxItemSchema.findByIdAndDelete(id);
    if (!inboxItem) {
      return res.status(404).json({ error: 'Inbox item not found' });
    }
    res.status(200).json({ message: 'Inbox item deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error deleting inbox item', details: error });
  }
};

// Delete multiple inbox items
export const deleteMultipleInboxItems = async (req, res) => {
  try {
    const inboxItemIds = req.body.ids; // Expecting an array of inbox item IDs
    const deletedInboxItems = await InboxItemSchema.deleteMany({
      _id: { $in: inboxItemIds },
    });
    res.status(200).json({
      message: 'Inbox items deleted successfully',
      deletedItemsCount: deletedInboxItems.deletedCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to delete inbox items', details: error });
  }
};
