# Cloudflare Deployment Guide

### Cloudflare Pages (Frontend Client)
Build output directory: `apps/client/dist`
Build command: `pnpm --filter @apps/client build`

### Cloudflare Workers
Deploy the edge proxy or scheduled worker:
```bash
cd apps/worker
wrangler deploy
```
