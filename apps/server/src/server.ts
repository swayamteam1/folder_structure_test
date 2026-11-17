import { app } from './app';
import { config } from './config/environment';
import { testConnection } from './config/database';
import { logger } from './utils/logger';

async function startServer() {
  try {
    logger.info('Connecting to PostgreSQL database...');
    const dbInfo = await testConnection();
    logger.info(`✅ Connected to PostgreSQL database "${dbInfo.db_name}" at ${dbInfo.current_time}`);

    app.listen(config.port, () => {
      logger.info(`🚀 Server running on port ${config.port} in [${config.env}] mode`);
      logger.info(`👉 API Health endpoint: http://localhost:${config.port}/api/health`);
    });
  } catch (err: any) {
    logger.error('❌ Failed to connect to database or start server:', err.message);
    process.exit(1);
  }
}

startServer();
