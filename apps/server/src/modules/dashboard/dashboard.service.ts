import { query } from '../../config/database';

export const getStats = async () => {
  const userCountRes = await query('SELECT COUNT(*) as count FROM users');
  const roleCountRes = await query('SELECT COUNT(*) as count FROM roles');
  const activeUserRes = await query('SELECT COUNT(*) as count FROM users WHERE is_active = true');

  return {
    totalUsers: parseInt(userCountRes.rows[0].count, 10),
    activeUsers: parseInt(activeUserRes.rows[0].count, 10),
    totalRoles: parseInt(roleCountRes.rows[0].count, 10),
    systemHealth: 'Optimal',
    timestamp: new Date().toISOString()
  };
};

export default { getStats };
