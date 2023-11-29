/**
 * @file InboxItemSchema.js
 * @brief Schema definition for the InboxItem model in a task management application.
 *
 * This file defines the `InboxItemSchema` for MongoDB using Mongoose. It is structured to manage items or tasks
 * within an Inbox module of a task management or calendar application. The schema includes fields for the item's
 * title, description, duration, priority, associated user, and appearance attributes like color and FontAwesome icon.
 * Each field is properly validated for data integrity and consistency. The duration and priority fields allow users
 * to specify the estimated time and importance of each task, respectively.
 *
 * The schema is designed to cater to tasks that are not yet scheduled but are pending or in a to-do state.
 *
 * @requires mongoose - For schema definition and data modeling.
 *
 * @schema
 * @param {String} title - The title of the inbox item, required with length constraints.
 * @param {String} description - The description of the inbox item, required with length constraints.
 * @param {Number} duration - The estimated duration for the inbox item in minutes, with default and range validations.
 * @param {Number} priority - The priority level of the inbox item, with default and range validations.
 * @param {Schema.Types.ObjectId} user - Reference to the user associated with the inbox item, required.
 * @param {String} color - The color code for the item display, with default value and format validation.
 * @param {String} faIcon - The FontAwesome icon class for the item, with default and length constraints.
 *
 * @export
 * InboxItem - The Mongoose model created from InboxItemSchema.
 *
 * @example
 * // Creating a new inbox item
 * const newInboxItem = new InboxItem({
 *   title: 'Prepare Meeting Agenda',
 *   description: 'Draft an agenda for the upcoming team meeting',
 *   duration: 30,
 *   priority: 3,
 *   user: userId,
 *   color: '#FF5733',
 *   faIcon: 'fa-clipboard-list'
 * });
 * newInboxItem.save();
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const InboxItemSchema = new Schema(
  {
    // Basic Inbox Item Details
    title: {
      type: String,
      required: [true, 'Inbox item title is required'],
      minLength: [1, 'Inbox item title should be at least 1 character'],
      maxLength: [50, 'Inbox item title cannot exceed 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Inbox item description is required'],
      minLength: [1, 'Inbox item description should be at least 1 character'],
      maxLength: [1000, 'Inbox item description cannot exceed 1000 characters'],
    },

    // Task Duration and Priority
    duration: {
      type: Number,
      min: [0, 'Inbox item duration cannot be less than 0 minutes'],
      max: [1440, 'Inbox item duration cannot exceed 1440 minutes (24 hours)'],
      default: 60,
    },
    priority: {
      type: Number,
      min: [0, 'Inbox item priority cannot be less than 0'],
      max: [5, 'Inbox item priority cannot exceed 5'],
      default: 0,
    },

    // User Information
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Inbox item user is required'],
    },

    // Appearance of the Inbox Item
    color: {
      type: String,
      default: '#FFFFFF',
      match: [/^#([0-9a-f]{3}){1,2}$/i, 'Please enter a valid color code'],
    },
    faIcon: {
      type: String,
      default: 'fa-inbox',
      minLength: [1, 'Icon class should be at least 1 character'],
      maxLength: [50, 'Icon class cannot exceed 50 characters'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('InboxItem', InboxItemSchema);
