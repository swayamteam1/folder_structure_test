# PERN Monorepo Starter (PostgreSQL, Express, React + Vite + Tailwind, Node.js) in Full TypeScript

A production-grade full-stack monorepo architecture built with clean modular separation, PostgreSQL connection pooling with `pg`, Express REST APIs, React 18+ with Vite & Tailwind CSS, shared monorepo packages, Docker infrastructure, and Cloudflare Worker support — all written in **TypeScript (`.ts` and `.tsx`)**.

## 🚀 Tech Stack

- **Frontend Client**: [apps/client](file:///apps/client/) - React 18+ (`.tsx`), Vite, Tailwind CSS, React Router DOM, Context API.
- **Backend Server**: [apps/server](file:///apps/server/) - Express (`.ts`), Node.js, PostgreSQL (`pg` Connection Pool), JWT Auth, RBAC.
- **Worker**: [apps/worker](file:///apps/worker/) - Cloudflare Worker edge function template.
- **Shared Packages**:
  - `@packages/shared`: Shared constants, utility helpers, types, and DTOs in TypeScript.
  - `@packages/validation`: Unified validation schemas (auth & users) in TypeScript.
  - `@packages/eslint-config`: Shared linting rules.
  - `@packages/prettier-config`: Shared formatting configuration.
- **Infrastructure**: [infra/docker](file:///infra/docker/) - Multi-service Docker Compose (PostgreSQL 16, Express Server, React Client).

---

## 📁 Repository Structure

```text
├── .github/workflows/          # CI/CD pipelines (ci, test, deploy)
├── apps/
│   ├── client/                 # React + Vite + Tailwind CSS frontend (TSX)
│   │   ├── public/             # Static public assets
│   │   └── src/
│   │       ├── app/            # Store (TS), router (TSX), and context providers (TSX)
│   │       ├── assets/         # Images, icons, fonts
│   │       ├── components/     # UI, common, forms, and layout components (TSX)
│   │       ├── features/       # Modular features (auth, users, dashboard, settings) (TSX)
│   │       ├── hooks/          # Custom reusable React hooks (TS)
│   │       ├── layouts/        # Layout wrappers (MainLayout, AuthLayout) (TSX)
│   │       ├── pages/          # Top-level route pages (TSX)
│   │       ├── routes/         # Route definitions and route guards (TSX)
│   │       ├── services/       # Fetch API client (TS)
│   │       ├── styles/         # Tailwind and global CSS
│   │       ├── types/          # Client-side TypeScript interfaces
│   │       └── utils/          # Frontend helper utilities (TS)
│   ├── server/                 # Express + Node.js + PostgreSQL backend (TS)
│   │   ├── src/
│   │   │   ├── config/         # PostgreSQL (pg pool), CORS, env configuration (TS)
│   │   │   ├── constants/      # HTTP status codes and error definitions (TS)
│   │   │   ├── middleware/     # Auth, error handling, validation, request logger (TS)
│   │   │   ├── modules/        # Domain modules (auth, users, roles, permissions, dashboard)
│   │   │   │   └── [module]/   # Controller, service, repository (SQL), and routes (TS)
│   │   │   ├── routes/         # Central API route registration (TS)
│   │   │   ├── services/       # Cross-cutting services (DB transaction, token) (TS)
│   │   │   ├── types/          # Express and database TypeScript types
│   │   │   └── utils/          # Logger and standard response helpers (TS)
│   │   └── tests/              # Server automated tests
│   └── worker/                 # Cloudflare Worker edge service
├── packages/
│   ├── shared/                 # Shared constants, types, schemas, utils (TS)
│   ├── validation/             # Shared validation schemas (TS)
│   ├── eslint-config/          # Shared ESLint configuration
│   └── prettier-config/        # Shared Prettier configuration
├── infra/
│   ├── docker/                 # Docker Compose with PostgreSQL 16
│   └── cloudflare/             # Cloudflare edge deployment notes & config
├── scripts/                    # Automation scripts (database seed, cleanup, generator)
└── docs/                       # Architecture, API, Database, and Deployment guides
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **pnpm**: v9+ (or npm/yarn)
- **PostgreSQL**: Local instance running or Docker

### 2. Quick Setup
```bash
# 1. Install workspace dependencies
pnpm install

# 2. Copy environment files
cp apps/server/.env.example apps/server/.env
cp apps/client/.env.example apps/client/.env

# 3. Start PostgreSQL with Docker
docker compose -f infra/docker/docker-compose.yml up -d postgres

# 4. Run database seed (creates tables & initial data)
pnpm run db:seed

# 5. Start development servers in parallel
pnpm run dev
```

The client app runs directly at `http://localhost:5173` and the server at `http://localhost:5000`.
To run individually:
- Client: `pnpm run dev:client`
- Server: `pnpm run dev:server`
