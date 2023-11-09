import mongoose from 'mongoose'

import User from './userSchema.js';

const { Schema } = mongoose;

const EventSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Event name is required'],
        minLength: [1, 'Event name should be at least 1 character'],
        maxLength: [50, 'Event name cannot exceed 50 characters'],
    },
    date: {
        type: Date,
        required: [true, 'Event date is required'],
    },
    location: {
        type: String,
        minLength: [1, 'Event location should be at least 1 character'],
        maxLength: [200, 'Event location cannot exceed 200 characters'],
    },
    description: {
        type: String,
        required: [true, 'Event description is required'],
        minLength: [1, 'Event description should be at least 1 character'],
        maxLength: [1000, 'Event description cannot exceed 1000 characters'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Event user is required'],
    },
    isScheduled: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);
