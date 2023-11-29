/**
 * @file EventSchema.js
 * @brief Schema definition for the Event model in a calendar application.
 *
 * This file defines the `EventSchema` for MongoDB using Mongoose. The schema is used to represent events in a calendar application,
 * including their title, start and end dates, location, description, user association, priority, all-day indicator, timezone, and information
 * about recurring events. It includes fields for event appearance (color and FontAwesome icon). The `isAllDay` field indicates whether
 * an event spans the entire day, and the `timezone` field specifies the timezone for the event timing. The `recurringEventId` field links
 * an event to its parent recurring event, and `originalStartTime` records the original start time of the event as per the recurring pattern.
 *
 * @requires mongoose - For schema definition and data modeling.
 *
 * @schema
 * @param {String} title - The title of the event, required with length constraints.
 * @param {Object} start - The start date and time of the event, including the timezone, required.
 * @param {Object} end - The end date and time of the event, including the timezone, required.
 * @param {String} location - The location of the event, with length constraints.
 * @param {String} description - A detailed description of the event.
 * @param {Number} priority - The priority level of the event, with default and range validations.
 * @param {Schema.Types.ObjectId} user - Reference to the user associated with the event, required.
 * @param {String} color - The color code for the event display, with a default value and format validation.
 * @param {String} faIcon - The FontAwesome icon class for the event, with default and length constraints.
 * @param {Boolean} isCompleted - Flag indicating if the event is completed, with a default value of false.
 * @param {Boolean} isAllDay - Flag indicating if the event spans the entire day, with a default value of false.
 * @param {Schema.Types.ObjectId} recurringEventId - Reference to the parent recurring event.
 * @param {Date} originalStartTime - The original start time of the event according to the recurring pattern.
 *
 * @validation
 * Ensures the event start date and time are earlier than the end date and time.
 *
 * @export
 * Event - The Mongoose model created from EventSchema.
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    // Basic Event Details
    title: {
      type: String,
      required: [true, 'Event title is required'],
      minLength: [1, 'Event title should be at least 1 character'],
      maxLength: [50, 'Event title cannot exceed 50 characters'],
    },
    description: {
      type: String,
      maxLength: [1000, 'Event description cannot exceed 1000 characters'],
    },
    location: {
      type: String,
      maxLength: [200, 'Event location cannot exceed 200 characters'],
    },

    // Date and Time
    start: {
      dateTime: {
        type: Date,
        required: [true, 'Event start date and time is required'],
      },
      timezone: {
        type: String,
        default: 'UTC',
      },
    },
    end: {
      dateTime: {
        type: Date,
        required: [true, 'Event end date and time is required'],
      },
      timezone: {
        type: String,
        default: 'UTC',
      },
    },
    isAllDay: {
      type: Boolean,
      default: false,
    },

    // Priority of the Event
    priority: {
      type: Number,
      min: [0, 'Event priority cannot be less than 0'],
      max: [5, 'Event priority cannot exceed 5'],
      default: 0,
    },

    // User Information
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Event user is required'],
    },

    // Event Appearance
    color: {
      type: String,
      default: '#FFFFFF',
      match: [/^#([0-9a-f]{3}){1,2}$/i, 'Please enter a valid color code'],
    },
    faIcon: {
      type: String,
      default: 'fa-calendar',
      minLength: [1, 'Icon class should be at least 1 character'],
      maxLength: [50, 'Icon class cannot exceed 50 characters'],
    },

    // Event Status
    isCompleted: {
      type: Boolean,
      default: false,
    },

    // Recurring Event Information
    recurringEventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
    originalStartTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Validator to ensure the start date is before the end time
EventSchema.pre('validate', function (next) {
  if (this.start.dateTime > this.end.dateTime) {
    this.invalidate(
      'end.dateTime',
      'Event end date and time must be after start date and time'
    );
  }
  next();
});

export default mongoose.model('Event', EventSchema);
