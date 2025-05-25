import { body } from 'express-validator'

const validations = {
    email: body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    
    password: body('password')
        .isStrongPassword()
        .withMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
};

export const validationSchemas = {
    signup: [validations.email, validations.password],
};