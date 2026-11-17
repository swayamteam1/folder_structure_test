# System Architecture: PERN Monorepo (TypeScript)

## 1. Overview
This monorepo utilizes the **PERN stack** (PostgreSQL, Express, React+Vite+Tailwind, Node.js) fully typed with **TypeScript**, orchestrated using PNPM workspaces. It separates concerns into client applications (`apps/client`), server APIs (`apps/server`), edge workers (`apps/worker`), and cross-package libraries (`packages/*`).

```
                    ┌─────────────────────────┐
                    │      Client Browser     │
                    └───────────┬─────────────┘
                                │
        ┌───────────────────────┴───────────────────────┐
        │                                               │
        │ HTTP (Port 5173)                              │ HTTP API Requests (Port 5000)
        ▼                                               ▼
┌───────────────┐                               ┌───────────────┐
│  apps/client  │                               │  apps/server  │
│ (React/TSX)   │                               │ (Express/TS)  │
└───────┬───────┘                               └───────┬───────┘
        │                                               │
        │ Uses                                          │ Uses
        ▼                                               ▼
┌───────────────────────────────────────────────────────────────┐
│                  Shared Packages (TypeScript)                 │
│          @packages/shared  &  @packages/validation           │
└───────────────────────────────────────────────────────────────┘
                                                        │
                                                        │ pg Connection Pool
                                                        ▼
                                                ┌───────────────┐
                                                │  PostgreSQL   │
                                                │   Database    │
                                                └───────────────┘
```

## 2. Layered Backend Design
The Express Server follows the modular controller-service-repository pattern:
- **Routes**: Expose endpoints and attach validation middleware.
- **Controllers**: Handle HTTP request extraction, validation result checks, and standard formatting of response.
- **Services**: Pure business logic, authorization rules, orchestration.
- **Repositories**: Raw PostgreSQL SQL queries using the connection pool from `src/config/database.ts`.
