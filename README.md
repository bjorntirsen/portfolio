# portfolio

Björn Tirsén's portfolio deployed at [www.bjorntirsen.se](https://www.bjorntirsen.se)

This is the third version.

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=bugs)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Run locally

1. Clone repository.
2. Make sure you have both [node](https://nodejs.org/en) and [pnpm](https://pnpm.io) installed on your machine.
3. Install dependencies

```bash
pnpm i
```

4. Copy `.env.local-template` to `.env.local` and start the local database (needs Docker):

```bash
cp .env.local-template .env.local
pnpm db:up
```

It applies `db/schema.sql` and some mock projects from `db/dev/seed.sql` on first start. `pnpm db:reset` wipes it and starts over, `pnpm db:down` stops it.

To work against the production data instead, open an SSH tunnel to the Coolify database container, which only listens on Coolify's internal network:

```bash
ssh -N -L 5433:$(ssh <vps> docker inspect -f '{{.NetworkSettings.Networks.coolify.IPAddress}}' <db-container>):5432 <vps>
```

and set `DATABASE_URL=postgres://portfolio_app:<password>@localhost:5433/portfolio`.

5. Run the development server:

```bash
pnpm dev
```

## Deployment

The `deploy` job in [CI](.github/workflows/ci.yml) runs on pushes to `master` once every other job has passed: it builds the `Dockerfile` (Next.js `standalone` output), pushes it to `ghcr.io/bjorntirsen/portfolio`, and asks Coolify to deploy it. The VPS only pulls and runs the image; building there ran it out of memory.

- Coolify runs the app as a **Docker Image** resource on `ghcr.io/bjorntirsen/portfolio:latest`, with Auto Deploy off. Every image is also tagged with its commit, so rolling back means pointing Coolify at an older tag.
- `DATABASE_URL` is a runtime variable pointing at the Coolify Postgres resource's internal URL, using the read-only `portfolio_app` role. The home page is rendered per request, so the build needs no database and data changes show up without a redeploy.
- Repository secrets: `SENTRY_AUTH_TOKEN` (source map upload, passed as a build secret), `COOLIFY_WEBHOOK` (the resource's deploy webhook URL) and `COOLIFY_TOKEN` (a Coolify API token allowed to deploy). Without the Coolify ones the workflow still publishes the image but deploys nothing.

Build and run the image locally with:

```sh
docker build -t portfolio .
docker run -p 3000:3000 -e DATABASE_URL=... portfolio
```

## Database

PostgreSQL 18 on the same Coolify server, backed up daily to S3. The schema lives in [`db/schema.sql`](db/schema.sql). The app connects as `portfolio_app`, which may only read; edit data as the `portfolio` owner role, e.g. with `psql` inside the container. To set up a fresh database, run [`db/dev/roles.sql`](db/dev/roles.sql) with a strong `PASSWORD` added, then apply `db/schema.sql` and restore the latest backup's data.
