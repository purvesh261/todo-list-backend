import { body } from 'express-validator'

const validations = {
    auth: {
        email: body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    
    password: body('password')
        .isStrongPassword()
        .withMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    },    
    todo: {
        title: body('title')
            .trim()
            .notEmpty()
            .withMessage('Title is required')
            .isLength({ min: 1, max: 100 })
            .withMessage('Title must be between 1 and 100 characters'),
        
        description: body('description')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('Description must not exceed 500 characters'),
        
        dueDate: body('dueDate')
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
        
        isCompleted: body('isCompleted')
            .optional()
            .isBoolean()
            .withMessage('isCompleted must be a boolean value')
    }
};

export const validationSchemas = {
    auth: [...Object.values(validations.auth)],
    createTodo: [
        ...Object.values(validations.todo)
    ]
};