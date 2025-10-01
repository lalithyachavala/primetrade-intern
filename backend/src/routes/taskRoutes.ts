
import { Router } from 'express';
import { auth } from '../middleware/auth';
import { createTask, deleteTask, listTasks, updateTask } from '../controllers/taskController';
import { validate } from '../utils/validate';
import { taskCreateSchema, taskUpdateSchema } from '../validators/taskSchemas';

const router = Router();
router.get('/', auth, listTasks);
router.post('/', auth, validate(taskCreateSchema), createTask);
router.patch('/:id', auth, validate(taskUpdateSchema), updateTask);
router.delete('/:id', auth, deleteTask);
export default router;
