import { Router } from 'express';
import { createTodo, getTodos, getTodoById, deleteTodo, updateTodo, toggleComplete } from '../controllers/todo.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { validationSchemas } from '../validators/validators.js';

const router = Router();

const validators = validationSchemas.todo;

router.post('/', validate(validators.createTodo), createTodo);
router.get('/', getTodos);
router.patch('/:id/toggle-complete', validate(validators.toggleComplete), toggleComplete);
router.get('/:id', validate(validators.getTodoById), getTodoById);
router.delete('/:id', validate(validators.deleteTodo), deleteTodo);
router.patch('/:id', validate(validators.updateTodo), updateTodo);

export default router;
