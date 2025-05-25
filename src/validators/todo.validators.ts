import { body, param } from "express-validator";

const validations = {
    createTodo: [
        body('title')
            .trim()
            .notEmpty()
            .withMessage('Title is required')
            .isLength({ min: 1, max: 100 })
            .withMessage('Title must be between 1 and 100 characters'),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('Description must not exceed 500 characters'),
        body('dueDate')
            .notEmpty()
            .withMessage('Due date is required')
            .isDate()
            .withMessage('Please provide a valid date')
            .custom((value) => {
                const date = new Date(value);
                if (date < new Date()) {
                    throw new Error('Due date cannot be in the past');
                }
                return true;
            }),
        body('isCompleted')
            .optional()
            .isBoolean()
            .withMessage('isCompleted must be a boolean value'),
    ],
    updateTodo: [
        body()
            .custom((value, { req }) => {
                const allowedFields = ['title', 'description', 'dueDate', 'isCompleted'];
                const providedFields = Object.keys(req.body);
                const invalidFields = providedFields.filter(field => !allowedFields.includes(field));
                
                if (invalidFields.length > 0) {
                    throw new Error(`Invalid fields provided: ${invalidFields.join(', ')}`);
                }
                return true;
            }),
        body('title')
            .optional()
            .trim()
            .isLength({ min: 1, max: 100 })
            .withMessage('Title must be between 1 and 100 characters'),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('Description must not exceed 500 characters'),
        body('dueDate')
            .optional()
            .isDate()
            .withMessage('Please provide a valid date')
            .custom((value) => {
                const date = new Date(value);
                if (date < new Date()) {
                    throw new Error('Due date cannot be in the past');
                }
                return true;
            }),
        body('isCompleted')
            .optional()
            .isBoolean()
            .withMessage('isCompleted must be a boolean value'),
    ],
    idValidator: [
        param('id')
            .isMongoId()
            .withMessage('Invalid MongoDB ID format')
    ]
}

export const validationSchemas = {
    createTodo: validations.createTodo,
    getTodoById: validations.idValidator,
    deleteTodo: validations.idValidator,
    updateTodo: [...validations.idValidator, ...validations.updateTodo],
    toggleComplete: [...validations.idValidator]
}