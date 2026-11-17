const db = require('../../config/database');

exports.findAll = async () => {
  const sql = `
    SELECT u.id, u.email, u.name, u.is_active, u.created_at,
           COALESCE(array_agg(r.name) FILTER (WHERE r.name IS NOT NULL), '{}') AS roles
    FROM users u
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    GROUP BY u.id
    ORDER BY u.id ASC
  `;
  const result = await db.query(sql);
  return result.rows;
};

exports.findById = async (id) => {
  const sql = `
    SELECT u.id, u.email, u.name, u.is_active, u.created_at,
           COALESCE(array_agg(r.name) FILTER (WHERE r.name IS NOT NULL), '{}') AS roles
    FROM users u
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    WHERE u.id = $1
    GROUP BY u.id
  `;
  const result = await db.query(sql, [id]);
  return result.rows[0];
};

exports.update = async (id, { name, isActive }) => {
  const sql = `
    UPDATE users
    SET name = COALESCE($1, name),
        is_active = COALESCE($2, is_active),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING id, email, name, is_active, updated_at
  `;
  const result = await db.query(sql, [name, isActive, id]);
  return result.rows[0];
};

exports.delete = async (id) => {
  const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
  return result.rowCount > 0;
};
