const db = require('../../config/database');

exports.findByEmail = async (email) => {
  const sql = `
    SELECT u.id, u.email, u.password_hash, u.name, u.is_active,
           COALESCE(array_agg(r.name) FILTER (WHERE r.name IS NOT NULL), '{}') AS roles
    FROM users u
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    WHERE u.email = $1
    GROUP BY u.id
  `;
  const result = await db.query(sql, [email]);
  return result.rows[0];
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

exports.createUser = async (email, passwordHash, name) => {
  const client = await db.getClient();
  try {
    await client.query('BEGIN');
    const userRes = await client.query(
      'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at',
      [email, passwordHash, name]
    );
    const newUser = userRes.rows[0];

    // Default 'user' role
    await client.query(
      `INSERT INTO user_roles (user_id, role_id)
       SELECT $1, id FROM roles WHERE name = 'user' ON CONFLICT DO NOTHING`,
      [newUser.id]
    );

    await client.query('COMMIT');
    return { ...newUser, roles: ['user'] };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};
