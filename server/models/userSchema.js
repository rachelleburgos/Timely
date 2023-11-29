/**
 * @file UserSchema.js
 * @brief Schema definition for the User model in an application.
 *
 * This file defines the `UserSchema` for MongoDB using Mongoose. It's structured to manage user data in an application,
 * focusing on personal and authentication information. The schema includes fields for the user's first and last names,
 * email, and password. Each field is appropriately validated for length and format. The email field is unique, ensuring
 * no duplicate registrations.
 *
 * Additional features include a virtual property to retrieve a user's full name and a pre-save hook to hash passwords before
 * saving them to the database. The schema also defines an index on the email field for optimized querying.
 *
 * @requires mongoose - For schema definition and data modeling.
 * @requires bcrypt - For password hashing.
 *
 * @schema
 * @param {String} firstName - The first name of the user, required with lowercase and length constraints.
 * @param {String} lastName - The last name of the user, required with lowercase and length constraints.
 * @param {String} email - The user's email address, required, unique, and formatted as an email.
 * @param {String} password - The user's password, required with a minimum length constraint.
 *
 * @virtual
 * fullName - A computed property that combines firstName and lastName.
 *
 * @hook
 * pre-save - Hashes the password before saving the user document.
 *
 * @index
 * email - A unique index on the email field to ensure no duplicate emails.
 *
 * @export
 * User - The Mongoose model created from UserSchema.
 *
 * @example
 * // Creating a new user
 * const newUser = new User({
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com',
 *   password: 'SecurePassword123'
 * });
 * newUser.save();
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    // Personal Information
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      lowercase: true,
      minLength: [1, 'First name should be at least 1 character'],
      maxLength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      lowercase: true,
      minLength: [1, 'Last name should be at least 1 character'],
      maxLength: [50, 'Last name cannot exceed 50 characters'],
    },

    // Authentication Details
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
      minLength: [6, 'Email should be at least 6 characters'],
      maxLength: [254, 'Email cannot exceed 254 characters'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password should be at least 6 characters'],
    },
  },
  { timestamps: true }
);

// Virtuals for Additional Properties
UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Middleware for Data Processing
// Hashing Password before Saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Ensuring Email Uniqueness
UserSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('User', UserSchema);
