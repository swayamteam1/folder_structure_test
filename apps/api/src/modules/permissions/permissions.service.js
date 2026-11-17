const db = require('../../config/database');

exports.getAllPermissions = async () => {
  const res = await db.query('SELECT * FROM permissions ORDER BY id ASC');
  return res.rows;
};
