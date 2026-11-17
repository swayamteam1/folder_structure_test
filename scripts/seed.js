const { Pool } = require('pg');
require('dotenv').config({ path: './apps/server/.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5433/pern_monorepo_dev'
});

async function runSeed() {
  const client = await pool.connect();
  try {
    console.log('⚡ Starting PostgreSQL Database Seeding...');

    await client.query('BEGIN');

    // 1. Create Tables
    console.log('Creating tables if they do not exist...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS permissions (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS user_roles (
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
        PRIMARY KEY (user_id, role_id)
      );

      CREATE TABLE IF NOT EXISTS role_permissions (
        role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
        permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
        PRIMARY KEY (role_id, permission_id)
      );
    `);

    // 2. Insert Roles
    console.log('Seeding roles...');
    await client.query(`
      INSERT INTO roles (name, description) VALUES
        ('admin', 'Full system administrative access'),
        ('manager', 'Manager level operational access'),
        ('user', 'Standard registered application user')
      ON CONFLICT (name) DO NOTHING;
    `);

    // 3. Insert Permissions
    console.log('Seeding permissions...');
    await client.query(`
      INSERT INTO permissions (slug, description) VALUES
        ('users:read', 'View user accounts'),
        ('users:write', 'Create and modify user accounts'),
        ('users:delete', 'Remove user accounts'),
        ('dashboard:view', 'Access analytics dashboard')
      ON CONFLICT (slug) DO NOTHING;
    `);

    // 4. Insert Default Admin User
    console.log('Seeding default administrator user...');
    // Default password hash for 'Admin@123456'
    const defaultPasswordHash = '$2a$10$wT0r77JkWqD0x8b3G4kG4.d7t9h2Z9jJq1lB4yL1rO7M2q1K3G5eq';
    const userRes = await client.query(`
      INSERT INTO users (email, password_hash, name)
      VALUES ('admin@example.com', '${defaultPasswordHash}', 'System Admin')
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
      RETURNING id;
    `);

    const adminUserId = userRes.rows[0].id;

    // 5. Assign admin role
    await client.query(`
      INSERT INTO user_roles (user_id, role_id)
      SELECT $1, id FROM roles WHERE name = 'admin'
      ON CONFLICT DO NOTHING;
    `, [adminUserId]);

    await client.query('COMMIT');
    console.log('✅ PostgreSQL Database Seed completed successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Database seed error:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runSeed();
