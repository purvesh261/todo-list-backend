import mongoose from 'mongoose';
import logger from '../utils/logger.js';

export async function connectToDatabase() {
    logger.info('Connecting to MongoDB...');
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error('MongoDB connection error:', error);
    }
}