const { Pool } = require('pg');
const config = require('./environment');

// Initialize PostgreSQL Connection Pool via 'pg'
const pool = new Pool({
  connectionString: config.db.connectionString,
  max: config.db.maxPool,
  idleTimeoutMillis: config.db.idleTimeoutMillis,
  connectionTimeoutMillis: config.db.connectionTimeoutMillis
});

pool.on('connect', () => {
  // Connected client to PostgreSQL pool
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle PostgreSQL client:', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
  pool,
  // Health check verification
  testConnection: async () => {
    const res = await pool.query('SELECT NOW() as current_time, current_database() as db_name');
    return res.rows[0];
  }
};
