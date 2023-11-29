/**
 * @file InboxItemRoutes.js
 * @brief Routing for InboxItem-related endpoints in an Express.js application.
 *
 * This file configures the Express router to handle routes associated with inbox item operations. It includes routes for
 * creating new inbox items, retrieving all inbox items, as well as fetching, updating, and deleting individual inbox items
 * based on their ID. The controller functions for these operations are imported from 'InboxItemController.js'. This structure
 * ensures a clear organization of API endpoints related to inbox items, facilitating maintainable and efficient route handling
 * in the application.
 *
 * @requires express - The Express framework to create the router.
 * @requires InboxItemController - Controller functions for handling inbox item-related operations.
 *
 * @router
 * @route {POST} '/' - Endpoint for creating a new inbox item.
 * @route {GET} '/' - Endpoint for retrieving all inbox items.
 * @route {GET} '/:id' - Endpoint for retrieving a single inbox item by its ID.
 * @route {PATCH} '/:id' - Endpoint for updating an inbox item by its ID.
 * @route {DELETE} '/:id' - Endpoint for deleting an inbox item by its ID.
 * @route {GET} '/user/:userId' - Endpoint for retrieving all inbox items for a specific user.
 * @route {POST} '/multiple' - Endpoint for creating multiple inbox items.
 * @route {DELETE} '/multiple' - Endpoint for deleting multiple inbox items.
 *
 * @example
 * // Example of using these routes in an Express.js application
 * import inboxItemRoutes from './InboxItemRoutes.js';
 * // other imports and middleware setup
 * app.use('/inboxitems', inboxItemRoutes); // Mounting the inbox item routes
 */

import express from 'express';
import {
  createInboxItem,
  getInboxItem,
  getAllInboxItems,
  getUserInboxItems,
  updateInboxItem,
  deleteInboxItem,
  createMultipleInboxItems,
  deleteMultipleInboxItems,
} from '../controllers/InboxItemController.js';

const router = express.Router();

// Routes for creating and getting all inbox items
router
  .route('/')
  .post(createInboxItem) // Create a new inbox item
  .get(getAllInboxItems); // Get all inbox items

// Routes for a single inbox item by id
router
  .route('/:id')
  .get(getInboxItem) // Get a single inbox item by id
  .patch(updateInboxItem) // Update an inbox item by id
  .delete(deleteInboxItem); // Delete an inbox item by id

// Route for getting all inbox items for a specific user
router.route('/user/:userId').get(getUserInboxItems); // Get all inbox items for a specific user

// Routes for creating and deleting multiple inbox items
router
  .route('/multiple')
  .post(createMultipleInboxItems) // Create multiple inbox items
  .delete(deleteMultipleInboxItems); // Delete multiple inbox items

export default router;
