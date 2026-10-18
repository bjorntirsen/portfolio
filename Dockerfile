# Keep the major in sync with .nvmrc and package.json's engines.node.
FROM node:24-slim AS base

FROM base AS deps
WORKDIR /app
# pnpm reads the `packageManager` field itself and switches to the pinned
# version, so the major installed here only has to be recent enough.
RUN npm install -g pnpm@12
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
# sentry-cli does its own TLS verification and node:*-slim ships no CA store, so
# without this the source map upload fails with "unable to get local issuer
# certificate". It only warns, so the build still passes.
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*
# No TTY in a build: stop pnpm from prompting before it runs a script.
ENV CI=true
RUN npm install -g pnpm@12
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# The home page is statically generated from Supabase at build time, and
# NEXT_PUBLIC_* values are inlined into the client bundle, so these must be
# present during the build, not only at runtime.
ARG SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
# Sentry source map upload during build; stays in this stage, not the final image
ARG SENTRY_AUTH_TOKEN
# .dockerignore excludes .git, so the Sentry plugin has no commit to derive a
# release name from. Coolify exposes the deployed commit as SOURCE_COMMIT;
# SENTRY_RELEASE wins when both are given.
ARG SENTRY_RELEASE
ARG SOURCE_COMMIT
# Resolved inside the RUN rather than with ENV, so that a value passed as a
# BuildKit secret instead of a build arg still wins.
RUN SENTRY_RELEASE="${SENTRY_RELEASE:-$SOURCE_COMMIT}" pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
