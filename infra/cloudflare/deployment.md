# Cloudflare Deployment Guide

### Cloudflare Pages (Frontend)
Build output directory: `apps/web/dist`
Build command: `pnpm --filter @apps/web build`

### Cloudflare Workers
Deploy the edge proxy or scheduled worker:
```bash
cd apps/worker
wrangler deploy
```
