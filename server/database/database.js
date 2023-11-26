import mongoose from 'mongoose';

export const connectDatabase = async uri => {
  try {
    await mongoose.connect(uri, {});
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};
