import { Router } from 'express';
import { signupController, loginController } from '../controllers/auth.controller.js';
import { validationSchemas } from '../middleware/validators.js';
import { validate } from '../middleware/validate.middleware.js';

const router = Router();

router.post('/signup', validate(validationSchemas.signup), signupController);
router.post('/login', validate(validationSchemas.signup), loginController);

export default router;
