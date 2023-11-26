import mongoose from 'mongoose';

const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      minLength: [1, 'Event title should be at least 1 character'],
      maxLength: [50, 'Event title cannot exceed 50 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Event duration is required'],
      min: [1, 'Event duration should be at least 1 minute'],
      max: [1440, 'Event duration cannot exceed 1440 minutes (24 hours)'],
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
  recurrence: {
    type: {
      pattern: {
        type: String,
        enum: ['none', 'daily', 'weekly', 'monthly', 'yearly', 'custom'],
        default: 'none'
      },
      daysOfWeek: {
        type: [Boolean],
        default: [false, false, false, false, false, false, false], // Represents [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
      },
    },
    default: null,
  },
  },
  { timestamps: true }
);

export default mongoose.model('Event', EventSchema);
