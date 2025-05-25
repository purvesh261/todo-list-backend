import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authenticate);


export default router; 