import { query } from '../../config/database';

export const getAllPermissions = async () => {
  const res = await query('SELECT * FROM permissions ORDER BY id ASC');
  return res.rows;
};

export default { getAllPermissions };
