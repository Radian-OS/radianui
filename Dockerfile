FROM node:20-alpine AS base

RUN apk update && apk add --no-cache libc6-compat

# Stage 1: Prune the workspace
FROM base AS builder
WORKDIR /app
RUN npm install -g pnpm turbo
COPY . .

RUN turbo prune website --docker

# Stage 2: Install dependencies
FROM base AS installer
WORKDIR /app
RUN npm isntall -g npm
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# Stage 3: Build the project
COPY --from=builder /app/out/full/ .
RUN npm install -g turbo
RUN turbo run build --filter=website...

# Stage 4: Run the app
FROM base AS runner
WORKDIR /app

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/website/next.config.js .
COPY --from=installer /app/apps/website/package.json .

# Copy the standalone output and static assets
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/.next/static ./apps/website/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/public ./apps/website/public

ENV PORT=300
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["node", "apps/website/server.js"]