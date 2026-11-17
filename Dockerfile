# Multi-stage Dockerfile for the entire Monorepo (TypeScript)
FROM node:20-alpine AS base

# Install PNPM
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

WORKDIR /app

# Copy root workspace configuration & package definitions
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/ ./packages/
COPY apps/server/package.json ./apps/server/
COPY apps/client/package.json ./apps/client/
COPY apps/worker/package.json ./apps/worker/

# Install all workspace dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# Copy all source files
COPY . .

# Build packages and applications
RUN pnpm run build

# Expose Server and Client ports
EXPOSE 5000 5173

# Default startup command
CMD ["pnpm", "run", "dev"]
