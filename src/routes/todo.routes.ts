import { Router } from 'express';
import { createTodo, getTodos } from '../controllers/todo.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { validationSchemas } from '../middleware/validators.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', authenticate, validate(validationSchemas.createTodo), createTodo);
router.get('/', authenticate, getTodos);

export default router;
