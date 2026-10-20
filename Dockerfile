# Keep the major in sync with .nvmrc and package.json's engines.node.
FROM node:24-slim AS base

FROM base AS deps
WORKDIR /app
# pnpm reads the `packageManager` field itself and switches to the version
# pinned there, so this one only bootstraps it and need not track upgrades.
RUN npm install -g --ignore-scripts pnpm@12.11.1
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
# Makes the Sentry plugin print its upload log, so a failed source map upload
# shows up in the Coolify deploy log instead of passing silently.
ENV CI=true
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# SENTRY_AUTH_TOKEN is deliberately not an ARG: Coolify passes it as a BuildKit
# secret mounted into the RUN below, which keeps it out of the image history.
# Without it the build still passes, only the source map upload is skipped.
# .dockerignore excludes .git, so the Sentry plugin has no commit to derive a
# release name from. Coolify exposes the deployed commit as SOURCE_COMMIT;
# SENTRY_RELEASE wins when both are given.
ARG SENTRY_RELEASE
ARG SOURCE_COMMIT
# Resolved inside the RUN rather than with ENV, so that a value passed as a
# BuildKit secret instead of a build arg still wins.
# Runs next directly, so this stage needs no pnpm of its own.
RUN SENTRY_RELEASE="${SENTRY_RELEASE:-$SOURCE_COMMIT}" node_modules/.bin/next build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
