# PostgreSQL Database Documentation

## 1. Connection Architecture
PostgreSQL is accessed using the standard `pg` (`node-postgres`) driver with connection pooling (`pg.Pool`). Connection parameters are loaded from environment variables or `DATABASE_URL`.

## 2. Entity Relationship Overview
The schema implements a Normalized Role-Based Access Control (RBAC) model:

- `users`: ID, email, password_hash, name, is_active, created_at, updated_at
- `roles`: ID, name, description, created_at
- `permissions`: ID, slug, description, created_at
- `user_roles`: user_id, role_id
- `role_permissions`: role_id, permission_id

## 3. Migrations & Seeding
- Seed script: `scripts/seed.js` sets up tables with idempotency (`CREATE TABLE IF NOT EXISTS`) and seeds initial roles (Admin, Member) and an admin user.
