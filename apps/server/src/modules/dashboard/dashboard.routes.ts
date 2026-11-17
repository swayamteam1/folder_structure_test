import { Router } from 'express';
import * as controller from './dashboard.controller';
import { authenticate } from '../../middleware/authMiddleware';

export const router = Router();
router.get('/stats', authenticate, controller.getStats);

export default router;
