const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/auth.routes');
const userRoutes = require('../modules/users/users.routes');
const roleRoutes = require('../modules/roles/roles.routes');
const permissionRoutes = require('../modules/permissions/permissions.routes');
const dashboardRoutes = require('../modules/dashboard/dashboard.routes');
const db = require('../config/database');

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    const dbInfo = await db.testConnection();
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
  } catch (err) {
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

module.exports = router;
