import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
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
    age: {
      type: Number,
      min: [1, 'Age should be at least 1'],
      max: [100, 'Age cannot exceed 100'],
    },
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

// Create a virtual property for full name
UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save hook for hashing the password before saving
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

// Create a unique index on the email field
UserSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('User', UserSchema);
