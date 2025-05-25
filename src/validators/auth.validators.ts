import { body } from "express-validator";

const validations = {
    auth: [
        body('email')
                .isEmail()
                .withMessage('Please enter a valid email')
                .normalizeEmail(),
        body('password')
            .isStrongPassword()
            .withMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    ]
}

export const validationSchemas = {
    signup: validations.auth,
    login: validations.auth
}