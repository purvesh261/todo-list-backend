import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import todoRoutes from './todo.routes.js';

const router = Router();

router.use(authenticate);
router.use('/todos', todoRoutes);

export default router; 