import mongoose from 'mongoose';

let initialized = false;

export const connect = async () => {
  if (initialized) {
    console.log('MongoDB already connected');
    return;
  }

  mongoose.set('strictQuery', true); // This should work on the server side
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    initialized = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
