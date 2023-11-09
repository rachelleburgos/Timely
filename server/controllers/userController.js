import User from '../models/userSchema.js';

// Create a new user profile
export const createUserProfile = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user profile:', error);
        res.status(500).json({ error: 'Failed to create user profile' });
    }
}

// Get a user profile
export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user profile:', error);
        res.status(500).json({ error: 'An error occurred while fetching the user profile' });
    }
}

// Get all user profiles
export const getAllUserProfiles = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting user profiles:', error);
        res.status(500).json({ error: 'An error occurred while fetching the user profiles' });
    }
}

// Update a user profile
export const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'An error occurred while updating the user profile' });
    }
}

// Delete a user profile
export const deleteUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user profile:', error);
        res.status(500).json({ error: 'An error occurred while deleting the user profile' });
    }
}