import dotenv from 'dotenv';
import app from './app.js';
import { connectToDatabase } from './config/db.js';
import { initCronJob } from './cron/complete-tasks.job.js';
import { initializeLogger } from './utils/logger.js';

dotenv.config();

const logger = initializeLogger();

const PORT = process.env.PORT || 3000;

logger.info("Starting application...");

connectToDatabase()
    .then(() => {
        initCronJob();
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    });
