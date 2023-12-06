import mongoose from 'mongoose'

export const connectDatabase = async uri => {
  try {
    await mongoose.connect(uri, {})
    console.log('Database connected successfully')
  } catch (error) {
    next(error)
  }
}
