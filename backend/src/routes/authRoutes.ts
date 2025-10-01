
import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validate } from '../utils/validate';
import { loginSchema, registerSchema } from '../validators/authSchemas';

const router = Router();
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
export default router;
