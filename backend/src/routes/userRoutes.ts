
import { Router } from 'express';
import { me, updateMe } from '../controllers/userController';
import { auth } from '../middleware/auth';
import { validate } from '../utils/validate';
import { updateProfileSchema } from '../validators/authSchemas';

const router = Router();
router.get('/me', auth, me);
router.patch('/me', auth, validate(updateProfileSchema), updateMe);
export default router;
