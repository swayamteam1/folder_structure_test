import { Router } from 'express';
import * as controller from './auth.controller';
import { authenticate } from '../../middleware/authMiddleware';

export const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/me', authenticate, controller.me);

export default router;
