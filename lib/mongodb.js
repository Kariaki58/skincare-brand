import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to the .env.local file');
}

let cachedConn = null;

export async function connectToDatabase() {
    if (cachedConn) {
        return cachedConn;
    }

    try {
        cachedConn = await mongoose.connect(MONGODB_URI);
        return cachedConn;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}
