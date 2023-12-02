import mongoose from 'mongoose'

const { Schema } = mongoose

const EventSchema = new Schema(
  {
    // Basic Event Details
    title: {
      type: String,
      required: [true, 'Event title is required'],
      minLength: [1, 'Event title should be at least 1 character'],
      maxLength: [50, 'Event title cannot exceed 50 characters']
    },
    description: {
      type: String,
      maxLength: [1000, 'Event description cannot exceed 1000 characters']
    },
    location: {
      type: String,
      maxLength: [200, 'Event location cannot exceed 200 characters']
    },

    // Date and Time
    start: {
      dateTime: {
        type: Date,
        required: [true, 'Event start date and time is required']
      },
      timezone: {
        type: String,
        default: 'UTC'
      }
    },
    end: {
      dateTime: {
        type: Date,
        required: [true, 'Event end date and time is required']
      },
      timezone: {
        type: String,
        default: 'UTC'
      }
    },
    isAllDay: {
      type: Boolean,
      default: false
    },

    // Priority of the Event
    priority: {
      type: Number,
      min: [0, 'Event priority cannot be less than 0'],
      max: [5, 'Event priority cannot exceed 5'],
      default: 0
    },

    // User Information
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Event user is required']
    },

    // Event Appearance
    color: {
      type: String,
      default: '#FFFFFF',
      match: [/^#([0-9a-f]{3}){1,2}$/i, 'Please enter a valid color code']
    },
    faIcon: {
      type: String,
      default: 'fa-calendar',
      minLength: [1, 'Icon class should be at least 1 character'],
      maxLength: [50, 'Icon class cannot exceed 50 characters']
    },

    // Event Status
    isCompleted: {
      type: Boolean,
      default: false
    },

    // Recurring Event Information
    recurringEventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    },
    originalStartTime: {
      type: Date
    }
  },
  { timestamps: true }
)

// Validator to ensure the start date is before the end time
EventSchema.pre('validate', function (next) {
  if (this.start.dateTime > this.end.dateTime) {
    this.invalidate('end.dateTime', 'Event end date and time must be after start date and time')
  }
  next()
})

export default mongoose.model('Event', EventSchema)
