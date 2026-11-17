const db = require('../../config/database');

exports.getAllRoles = async () => {
  const res = await db.query('SELECT * FROM roles ORDER BY id ASC');
  return res.rows;
};
