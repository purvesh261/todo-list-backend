import cron from 'node-cron';
import { completeDueTodos } from '../services/todo.service.js';
import logger from '../utils/logger.js';

export const initCronJob = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            logger.info('Running cron job...');
            const result = await completeDueTodos();
            logger.info(`${result} todos marked complete.`)
            logger.info('Cleanup job completed successfully');
        } catch (error) {
            logger.info('Error in cron job:', error);
        }
    });
}; 