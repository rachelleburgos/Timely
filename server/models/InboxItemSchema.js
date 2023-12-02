import mongoose from 'mongoose'

const { Schema } = mongoose

const InboxItemSchema = new Schema(
  {
    // Basic Inbox Item Details
    title: {
      type: String,
      required: [true, 'Inbox item title is required'],
      minLength: [1, 'Inbox item title should be at least 1 character'],
      maxLength: [50, 'Inbox item title cannot exceed 50 characters']
    },
    description: {
      type: String,
      required: [true, 'Inbox item description is required'],
      minLength: [1, 'Inbox item description should be at least 1 character'],
      maxLength: [1000, 'Inbox item description cannot exceed 1000 characters']
    },

    // Task Duration and Priority
    duration: {
      type: Number,
      min: [0, 'Inbox item duration cannot be less than 0 minutes'],
      max: [1440, 'Inbox item duration cannot exceed 1440 minutes (24 hours)'],
      default: 60
    },
    priority: {
      type: Number,
      min: [0, 'Inbox item priority cannot be less than 0'],
      max: [5, 'Inbox item priority cannot exceed 5'],
      default: 0
    },

    // User Information
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Inbox item user is required']
    },

    // Appearance of the Inbox Item
    color: {
      type: String,
      default: '#FFFFFF',
      match: [/^#([0-9a-f]{3}){1,2}$/i, 'Please enter a valid color code']
    },
    faIcon: {
      type: String,
      default: 'fa-inbox',
      minLength: [1, 'Icon class should be at least 1 character'],
      maxLength: [50, 'Icon class cannot exceed 50 characters']
    }
  },
  { timestamps: true }
)

export default mongoose.model('InboxItem', InboxItemSchema)
