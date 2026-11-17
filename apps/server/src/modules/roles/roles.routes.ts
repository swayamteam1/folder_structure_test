import { Router } from 'express';
import * as controller from './roles.controller';
import { authenticate } from '../../middleware/authMiddleware';

export const router = Router();
router.get('/', authenticate, controller.getAll);

export default router;
