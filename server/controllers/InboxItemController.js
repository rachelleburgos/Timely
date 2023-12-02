import mongoose from 'mongoose'

import InboxItemSchema from '../models/InboxItemSchema.js'

// Create a new inbox item
export const createInboxItem = async (req, res) => {
  try {
    const inboxItemData = req.body
    const newInboxItem = new InboxItemSchema(inboxItemData)
    await newInboxItem.save()
    res.status(201).json(newInboxItem)
  } catch (error) {
    next(error)
  }
}

// Create multiple new inbox items
export const createMultipleInboxItems = async (req, res) => {
  try {
    const inboxItemsData = req.body // Expecting an array of inbox item objects
    const newInboxItems = await InboxItemSchema.insertMany(inboxItemsData)
    res.status(201).json({
      message: 'Inbox items created successfully',
      inboxItems: newInboxItems
    })
  } catch (error) {
    next(error)
  }
}

// Get an inbox item
export const getInboxItem = async (req, res) => {
  try {
    const { id } = req.params
    const inboxItem = await InboxItemSchema.findById(id)
    if (!inboxItem) {
      return res.status(404).json({ error: 'Inbox item not found' })
    }
    res.status(200).json(inboxItem)
  } catch (error) {
    next(error)
  }
}

// Get all inbox items
export const getAllInboxItems = async (req, res) => {
  try {
    const inboxItems = await InboxItemSchema.find()
    res.status(200).json(inboxItems)
  } catch (error) {
    next(error)
  }
}

// Get all inbox items for a specific user
export const getUserInboxItems = async (req, res) => {
  try {
    const userId = req.params.userId
    const inboxItems = await InboxItemSchema.find({
      user: new mongoose.Types.ObjectId(userId)
    })
    res.status(200).json(inboxItems)
  } catch (error) {
    next(error)
  }
}

// Update an inbox item
export const updateInboxItem = async (req, res) => {
  try {
    const { id } = req.params
    const inboxItemData = req.body
    const updatedInboxItem = await InboxItemSchema.findByIdAndUpdate(id, inboxItemData, {
      new: true
    })
    if (!updatedInboxItem) {
      return res.status(404).json({ error: 'Inbox item not found' })
    }
    res.status(200).json(updatedInboxItem)
  } catch (error) {
    next(error)
  }
}

// Delete an inbox item
export const deleteInboxItem = async (req, res) => {
  try {
    const { id } = req.params
    const inboxItem = await InboxItemSchema.findByIdAndDelete(id)
    if (!inboxItem) {
      return res.status(404).json({ error: 'Inbox item not found' })
    }
    res.status(200).json({ message: 'Inbox item deleted successfully' })
  } catch (error) {
    next(error)
  }
}

// Delete multiple inbox items
export const deleteMultipleInboxItems = async (req, res) => {
  try {
    const inboxItemIds = req.body.ids // Expecting an array of inbox item IDs
    const deletedInboxItems = await InboxItemSchema.deleteMany({
      _id: { $in: inboxItemIds }
    })
    res.status(200).json({
      message: 'Inbox items deleted successfully',
      deletedItemsCount: deletedInboxItems.deletedCount
    })
  } catch (error) {
    next(error)
  }
}
