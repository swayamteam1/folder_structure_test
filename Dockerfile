# Multi-stage Dockerfile for the entire Monorepo
FROM node:20-alpine AS base

# Install PNPM
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

WORKDIR /app

# Copy root workspace configuration & package definitions
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/ ./packages/
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY apps/worker/package.json ./apps/worker/

# Install all workspace dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# Copy all source files
COPY . .

# Build packages and web application
RUN pnpm run build

# Expose API and Web ports
EXPOSE 5000 5173

# Default startup command (can be overridden)
CMD ["pnpm", "run", "dev"]
