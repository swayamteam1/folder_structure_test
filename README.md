# PERN Monorepo Starter (PostgreSQL, Express, React + Vite + Tailwind, Node.js)

A production-grade full-stack monorepo architecture built with clean modular separation, PostgreSQL connection pooling with `pg`, Express REST APIs, React 18+ with Vite & Tailwind CSS, shared monorepo packages, Docker infrastructure, and Cloudflare Worker support.

## 🚀 Tech Stack

- **Frontend**: [apps/web](file:///apps/web/) - React 18+, Vite, Tailwind CSS, React Router DOM, Context API.
- **Backend API**: [apps/api](file:///apps/api/) - Express, Node.js, PostgreSQL (`pg` Connection Pool), JWT Auth, RBAC.
- **Worker**: [apps/worker](file:///apps/worker/) - Cloudflare Worker edge function template.
- **Shared Packages**:
  - `@packages/shared`: Shared constants, utility helpers, types, and DTOs.
  - `@packages/validation`: Unified validation schemas (Zod/custom) for auth & users.
  - `@packages/eslint-config`: Shared linting rules.
  - `@packages/prettier-config`: Shared formatting configuration.
- **Infrastructure**: [infra/docker](file:///infra/docker/) - Multi-service Docker Compose (PostgreSQL 16, Express API, Vite Web, Nginx reverse proxy).

---

## 📁 Repository Structure

```text
├── .github/workflows/          # CI/CD pipelines (ci, test, deploy)
├── apps/
│   ├── web/                    # React + Vite + Tailwind CSS frontend
│   │   ├── public/             # Static public assets
│   │   └── src/
│   │       ├── app/            # Store, router, and context providers
│   │       ├── assets/         # Images, icons, fonts
│   │       ├── components/     # UI, common, forms, and layout components
│   │       ├── features/       # Modular features (auth, users, dashboard, settings)
│   │       ├── hooks/          # Custom reusable React hooks
│   │       ├── layouts/        # Layout wrappers (MainLayout, AuthLayout)
│   │       ├── pages/          # Top-level route pages
│   │       ├── routes/         # Route definitions and route guards
│   │       ├── services/       # Axios/Fetch API client
│   │       ├── styles/         # Tailwind and global CSS
│   │       └── utils/          # Frontend helper utilities
│   ├── api/                    # Express + Node.js backend
│   │   ├── src/
│   │   │   ├── config/         # PostgreSQL (pg pool), CORS, env configuration
│   │   │   ├── constants/      # HTTP status codes and error definitions
│   │   │   ├── middleware/     # Auth, error handling, validation, request logger
│   │   │   ├── modules/        # Domain modules (auth, users, roles, permissions, dashboard)
│   │   │   │   └── [module]/   # Controller, service, repository (SQL), and routes
│   │   │   ├── routes/         # Central API route registration
│   │   │   ├── services/       # Cross-cutting services (DB, token, email)
│   │   │   └── utils/          # Logger and standard response helpers
│   │   └── tests/              # Backend integration & unit tests
│   └── worker/                 # Cloudflare Worker edge service
├── packages/
│   ├── shared/                 # Shared constants, types, schemas, utils
│   ├── validation/             # Shared validation schemas
│   ├── eslint-config/          # Shared ESLint configuration
│   └── prettier-config/        # Shared Prettier configuration
├── infra/
│   ├── docker/                 # Docker Compose with PostgreSQL 16 & Nginx
│   └── cloudflare/             # Cloudflare edge deployment notes & config
├── scripts/                    # Automation scripts (database seed, cleanup, generator)
└── docs/                       # Architecture, API, Database, and Deployment guides
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **pnpm**: v9+ (or npm/yarn)
- **PostgreSQL**: Local instance running on port 5432 or Docker

### 2. Quick Setup
```bash
# 1. Install workspace dependencies
pnpm install

# 2. Copy environment files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# 3. Start PostgreSQL with Docker
docker compose -f infra/docker/docker-compose.yml up -d postgres

# 4. Run database seed (creates tables & initial data)
pnpm run db:seed

# 5. Start development servers in parallel
pnpm run dev
```

The web app will run at `http://localhost:5173` and the API at `http://localhost:5000`.
