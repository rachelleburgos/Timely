import mongoose from 'mongoose'

import UserSchema from '../models/UserSchema.js'

// Create a new user profile
export const createUserProfile = async (req, res, next) => {
  const userData = req.body
  try {
    const newUser = new UserSchema(userData)
    await newUser.save()
    res.status(201).json({ message: 'User created successfully', user: newUser })
  } catch (error) {
    next(error)
  }
}

// Get a user profile
export const getUserProfile = async (req, res, next) => {
  const { id } = req.params

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid user ID' })
    }
    const user = await UserSchema.findById(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

// Get all user profiles
export const getAllUserProfiles = async (req, res) => {
  try {
    const users = await UserSchema.find()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

// Update a user profile
export const updateUserProfile = async (req, res) => {
  const { id } = req.params
  const userData = req.body

  try {
    const updatedUser = await UserSchema.findByIdAndUpdate(id, userData, {
      new: true
    })
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser })
  } catch (error) {
    next(error)
  }
}

// Delete a user profile
export const deleteUserProfile = async (req, res) => {
  const { id } = req.params

  try {
    const user = await UserSchema.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    next(error)
  }
}
