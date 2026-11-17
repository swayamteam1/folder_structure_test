# REST API Documentation

Base URL: `http://localhost:5000/api`

## Health & Status
- `GET /health`: Server status and PostgreSQL connection health.

## Authentication (`/api/auth`)
- `POST /api/auth/register`: Register new user account.
  - Body: `{ email, password, name }`
- `POST /api/auth/login`: Authenticate and issue JWT.
  - Body: `{ email, password }`
- `GET /api/auth/me`: Retrieve current logged in user (Requires Bearer token).

## Users (`/api/users`)
- `GET /api/users`: List users with pagination and search.
- `GET /api/users/:id`: Get user details.
- `PUT /api/users/:id`: Update user info.
- `DELETE /api/users/:id`: Delete or deactivate user.

## Roles & Permissions (`/api/roles`, `/api/permissions`)
- `GET /api/roles`: List all system roles (e.g., admin, user, manager).
- `GET /api/permissions`: List granular action permissions.

## Dashboard (`/api/dashboard`)
- `GET /api/dashboard/stats`: Aggregated summary statistics for overview cards.
