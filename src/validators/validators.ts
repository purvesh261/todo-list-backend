import { validationSchemas as authValidations } from './auth.validators.js';
import { validationSchemas as todoValidations } from './todo.validators.js';

export const validationSchemas = {
    auth: authValidations,
    todo: todoValidations
};