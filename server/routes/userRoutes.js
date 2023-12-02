import express from 'express'
import {
  createUserProfile,
  getUserProfile,
  getAllUserProfiles,
  updateUserProfile,
  deleteUserProfile
} from '../controllers/UserController.js'

const router = express.Router()

// Routes for creating and getting all user profiles
router
  .route('/')
  .post(createUserProfile) // Create a new user profile
  .get(getAllUserProfiles) // Get all user profiles

// Routes for a single user profile by id
router
  .route('/:id')
  .get(getUserProfile) // Get a single user profile by id
  .patch(updateUserProfile) // Update a user profile by id
  .delete(deleteUserProfile) // Delete a user profile by id

export default router
