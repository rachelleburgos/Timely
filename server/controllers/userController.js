/**
 * @file UserController.js
 * @brief Controller for handling User-related operations in an application.
 *
 * This file contains functions for managing user profiles, including creating, retrieving, updating, and deleting user profiles.
 * These functions interact with the MongoDB database through the Mongoose model to perform CRUD operations on user data.
 * Each function handles HTTP requests, processes the request data, interacts with the database, and returns appropriate
 * responses to the client. Error handling is also incorporated, passing errors to the middleware for consistent management.
 *
 * @requires UserSchema - Mongoose model for the user data.
 *
 * @controller
 * @function createUserProfile - Create a new user profile based on request data.
 * @function getUserProfile - Retrieve a user profile by its ID and update it with provided data.
 * @function getAllUserProfiles - Retrieve all user profiles from the database.
 * @function updateUserProfile - Update an existing user profile by its ID.
 * @function deleteUserProfile - Delete a user profile by its ID.
 *
 * @example
 * // Example usage in an Express.js route
 * router.post('/users', createUserProfile);
 * router.get('/users/:id', getUserProfile);
 * router.get('/users', getAllUserProfiles);
 * router.put('/users/:id', updateUserProfile);
 * router.delete('/users/:id', deleteUserProfile.
 */

import mongoose from 'mongoose';

import UserSchema from '../models/UserSchema.js';

// Create a new user profile
export const createUserProfile = async (req, res, next) => {
  const userData = req.body;

  try {
    const newUser = new UserSchema(userData);
    await newUser.save();
    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    next(error); // Pass error to the error handler middleware
  }
};

// Get a user profile
export const getUserProfile = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    const user = await UserSchema.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error); // Pass error to the error handler middleware
  }
};

// Get all user profiles
export const getAllUserProfiles = async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting user profiles:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the user profiles' });
  }
};

// Update a user profile
export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const updatedUser = await UserSchema.findByIdAndUpdate(id, userData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res
      .status(200)
      .json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while updating the user profile' });
  }
};

// Delete a user profile
export const deleteUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserSchema.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the user profile' });
  }
};
