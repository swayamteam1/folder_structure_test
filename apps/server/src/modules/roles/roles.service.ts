import { query } from '../../config/database';

export const getAllRoles = async () => {
  const res = await query('SELECT * FROM roles ORDER BY id ASC');
  return res.rows;
};

export default { getAllRoles };
