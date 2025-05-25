import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { validationSchemas } from '../middleware/validators.js';
import { validate } from '../middleware/validate.middleware.js';

const router = Router();

router.post('/signup', validate(validationSchemas.auth), signup);
router.post('/login', validate(validationSchemas.auth), login);

export default router;
