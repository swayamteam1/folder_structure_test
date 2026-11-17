# System Architecture: PERN Monorepo

## 1. Overview
This monorepo utilizes the **PERN stack** (PostgreSQL, Express, React+Vite+Tailwind, Node.js), orchestrated using PNPM workspaces. It isolates concerns into client applications (`apps/web`), server APIs (`apps/api`), edge workers (`apps/worker`), and cross-package libraries (`packages/*`).

```
                    ┌─────────────────────────┐
                    │      Client Browser     │
                    └───────────┬─────────────┘
                                │ HTTP / HTTPS
                                ▼
                    ┌─────────────────────────┐
                    │   Nginx Reverse Proxy   │
                    └─────┬─────────────┬─────┘
                          │             │
        Static Assets     │             │ API Requests (/api/*)
        ▼                 ▼             ▼
┌───────────────┐               ┌───────────────┐
│   apps/web    │               │   apps/api    │
│  (React/Vite) │               │   (Express)   │
└───────┬───────┘               └───────┬───────┘
        │                               │
        │ Uses                          │ Uses
        ▼                               ▼
┌───────────────────────────────────────────────┐
│          Shared Packages (ESM/CJS)            │
│  @packages/shared  &  @packages/validation   │
└───────────────────────────────────────────────┘
                                        │
                                        │ pg Connection Pool
                                        ▼
                                ┌───────────────┐
                                │  PostgreSQL   │
                                │   Database    │
                                └───────────────┘
```

## 2. Layered Backend Design
The Express API follows the modular controller-service-repository pattern:
- **Routes**: Expose endpoints and attach validation middleware.
- **Controllers**: Handle HTTP request extraction, validation result checks, and standard formatting of response.
- **Services**: Pure business logic, authorization rules, orchestration.
- **Repositories**: Raw PostgreSQL SQL queries using the connection pool from `src/config/database.js`.
