# Deployment Guide

## 1. Local Development via Docker Compose
Run the entire stack (PostgreSQL, Express API, Vite React frontend, Nginx):
```bash
docker compose -f infra/docker/docker-compose.yml up --build
```

## 2. Production Docker
```bash
docker compose -f infra/docker/docker-compose.prod.yml up -d
```

## 3. Edge Worker (Cloudflare)
Navigate to `apps/worker` and deploy with Wrangler:
```bash
cd apps/worker
pnpm run deploy
```
