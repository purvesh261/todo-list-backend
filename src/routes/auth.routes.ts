import { Router } from 'express';
import { signupController } from '../controllers/auth.controller.js';
import { validationSchemas } from '../middleware/validators.js';
import { validate } from '../middleware/validate.middleware.js';

const router = Router();

router.post('/signup', validate(validationSchemas.signup), signupController);

export default router;
