import { Router } from 'express';
import * as controller from './users.controller';
import { authenticate, authorizeRole } from '../../middleware/authMiddleware';

export const router = Router();

router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate, controller.getById);
router.put('/:id', authenticate, authorizeRole('admin'), controller.update);
router.delete('/:id', authenticate, authorizeRole('admin'), controller.remove);

export default router;
