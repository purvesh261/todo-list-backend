import { Router } from 'express';
import { createTodo, getTodos, getTodoById, deleteTodo, updateTodo, toggleComplete } from '../controllers/todo.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { validationSchemas } from '../validators/validators.js';

const router = Router();

const validators = validationSchemas.todo;

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo item
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the todo item
 *               description:
 *                 type: string
 *                 description: Optional description of the todo item
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: Optional due date for the todo item
 *     responses:
 *       201:
 *         description: Todo item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.post('/', validate(validators.createTodo), createTodo);

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todo items with pagination and filtering
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: isCompleted
 *         schema:
 *           type: boolean
 *         description: Filter by completion status
 *       - in: query
 *         name: dueDateFrom
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter todos due after this date
 *       - in: query
 *         name: dueDateTo
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter todos due before this date
 *       - in: query
 *         name: createdAtFrom
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter todos created after this date
 *       - in: query
 *         name: createdAtTo
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter todos created before this date
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title and description
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *           enum: [createdAt, dueDate, title]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of todo items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *                 total:
 *                   type: integer
 *                   description: Total number of items
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 limit:
 *                   type: integer
 *                   description: Number of items per page
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 */
router.get('/', getTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a todo item by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo item ID
 *     responses:
 *       200:
 *         description: Todo item details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.get('/:id', validate(validators.getTodoById), getTodoById);

/**
 * @swagger
 * /api/todos/{id}/toggle-complete:
 *   patch:
 *     summary: Toggle the completion status of a todo item
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo item ID
 *     responses:
 *       200:
 *         description: Todo item completion status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.patch('/:id/toggle-complete', validate(validators.toggleComplete), toggleComplete);

/**
 * @swagger
 * /api/todos/{id}:
 *   patch:
 *     summary: Update a todo item
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the todo item
 *               description:
 *                 type: string
 *                 description: Description of the todo item
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: Due date for the todo item
 *     responses:
 *       200:
 *         description: Todo item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.patch('/:id', validate(validators.updateTodo), updateTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo item
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo item ID
 *     responses:
 *       204:
 *         description: Todo item deleted successfully
 */
router.delete('/:id', validate(validators.deleteTodo), deleteTodo);

export default router;
