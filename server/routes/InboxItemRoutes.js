import express from 'express'
import {
  createInboxItem,
  getInboxItem,
  getAllInboxItems,
  getUserInboxItems,
  updateInboxItem,
  deleteInboxItem,
  createMultipleInboxItems,
  deleteMultipleInboxItems
} from '../controllers/InboxItemController.js'

const router = express.Router()

// Routes for creating and getting all inbox items
router
  .route('/')
  .post(createInboxItem) // Create a new inbox item
  .get(getAllInboxItems) // Get all inbox items

// Routes for a single inbox item by id
router
  .route('/:id')
  .get(getInboxItem) // Get a single inbox item by id
  .patch(updateInboxItem) // Update an inbox item by id
  .delete(deleteInboxItem) // Delete an inbox item by id

// Route for getting all inbox items for a specific user
router.route('/user/:userId').get(getUserInboxItems) // Get all inbox items for a specific user

// Routes for creating and deleting multiple inbox items
router
  .route('/multiple')
  .post(createMultipleInboxItems) // Create multiple inbox items
  .delete(deleteMultipleInboxItems) // Delete multiple inbox items

export default router
