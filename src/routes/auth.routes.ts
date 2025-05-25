import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { validationSchemas } from '../validators/validators.js';
import { validate } from '../middleware/validate.middleware.js';

const router = Router();

const validators = validationSchemas.auth;

router.post('/signup', validate(validators.signup), signup);
router.post('/login', validate(validators.login), login);

export default router;
