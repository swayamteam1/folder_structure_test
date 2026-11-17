import { Router, Request, Response } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/users/users.routes';
import roleRoutes from '../modules/roles/roles.routes';
import permissionRoutes from '../modules/permissions/permissions.routes';
import dashboardRoutes from '../modules/dashboard/dashboard.routes';
import { testConnection } from '../config/database';

export const router = Router();

// Health check endpoint
router.get('/health', async (_req: Request, res: Response) => {
  try {
    const dbInfo = await testConnection();
    res.json({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        time: dbInfo.current_time,
        database: dbInfo.db_name
      }
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'unhealthy',
      database: {
        connected: false,
        error: err.message
      }
    });
  }
});

// Mount modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
