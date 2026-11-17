const app = require('./app');
const config = require('./config/environment');
const db = require('./config/database');
const logger = require('./utils/logger');

async function startServer() {
  try {
    logger.info('Connecting to PostgreSQL database...');
    const dbInfo = await db.testConnection();
    logger.info(`✅ Connected to PostgreSQL database "${dbInfo.db_name}" at ${dbInfo.current_time}`);

    app.listen(config.port, () => {
      logger.info(`🚀 API Server running on port ${config.port} in [${config.env}] mode`);
      logger.info(`👉 API Health endpoint: http://localhost:${config.port}/api/health`);
    });
  } catch (err) {
    logger.error('❌ Failed to connect to database or start server:', err.message);
    process.exit(1);
  }
}

startServer();
