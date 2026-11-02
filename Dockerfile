# syntax=docker/dockerfile:1
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
# shows up in the build log instead of passing silently.
ENV CI=true
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# SENTRY_AUTH_TOKEN is a BuildKit secret rather than an ARG, which keeps it out
# of the image history. Without it the build still passes, only the source map
# upload is skipped.
# .dockerignore excludes .git, so the Sentry plugin has no commit to derive a
# release name from; the deploy workflow passes it as SENTRY_RELEASE.
ARG SENTRY_RELEASE
# The homepage is statically generated from Directus. Without these the build
# still passes and serves the bundled copy until the first revalidation. The
# token is a secret for the same reason as SENTRY_AUTH_TOKEN.
ARG DIRECTUS_URL
# Runs next directly, so this stage needs no pnpm of its own.
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN,env=SENTRY_AUTH_TOKEN \
  --mount=type=secret,id=DIRECTUS_TOKEN,env=DIRECTUS_TOKEN \
  node_modules/.bin/next build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# The commit this image was built from, served by /api/version. The deploy job
# passes it as SENTRY_RELEASE; a local build reports "unknown".
ARG SENTRY_RELEASE
ENV COMMIT_SHA=${SENTRY_RELEASE}

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# The slim base has no curl or wget, so check with node itself. Coolify shows
# the container's health from this.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/api/version').then(r => process.exit(r.ok ? 0 : 1), () => process.exit(1))"]

CMD ["node", "server.js"]
