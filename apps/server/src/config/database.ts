import { Pool, PoolClient, QueryResult } from 'pg';
import { config } from './environment';

export const pool = new Pool({
  connectionString: config.db.connectionString,
  max: config.db.maxPool,
  idleTimeoutMillis: config.db.idleTimeoutMillis,
  connectionTimeoutMillis: config.db.connectionTimeoutMillis
});

pool.on('error', (err: Error) => {
  console.error('❌ Unexpected error on idle PostgreSQL client:', err);
  process.exit(-1);
});

export const query = (text: string, params?: any[]): Promise<QueryResult> => pool.query(text, params);
export const getClient = (): Promise<PoolClient> => pool.connect();

export const testConnection = async (): Promise<{ current_time: string; db_name: string }> => {
  const res = await pool.query('SELECT NOW() as current_time, current_database() as db_name');
  return res.rows[0];
};

export default {
  query,
  getClient,
  pool,
  testConnection
};
