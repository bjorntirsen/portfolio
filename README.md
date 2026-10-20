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

4. Copy `.env.local-template` to `.env.local` and set `DATABASE_URL`. The database only listens on Coolify's internal network, so reach it through an SSH tunnel to the container:

```bash
ssh -N -L 5433:$(ssh <vps> docker inspect -f '{{.NetworkSettings.Networks.coolify.IPAddress}}' <db-container>):5432 <vps>
```

and use `postgres://portfolio_app:<password>@localhost:5433/portfolio`. Without it the page renders, only with no projects.

5. Run the development server:

```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

Deployed to a Coolify VPS from the `Dockerfile` (Next.js `standalone` output). Coolify settings that matter:

- `DATABASE_URL` is a runtime variable pointing at the Coolify Postgres resource's internal URL, using the read-only `portfolio_app` role. The home page is rendered per request, so the build needs no database and data changes show up without a redeploy.
- `SENTRY_AUTH_TOKEN` should be a Docker build secret, not a build variable, so it stays out of the deploy log and `docker history`.
- **Include Source Commit in Build** must be on so Sentry source maps are uploaded under the deployed commit.

Build and run the image locally with:

```sh
docker build -t portfolio .
docker run -p 3000:3000 -e DATABASE_URL=... portfolio
```

## Database

PostgreSQL 18 on the same Coolify server, backed up daily to S3. The schema lives in [`db/schema.sql`](db/schema.sql). The app connects as `portfolio_app`, which may only read; edit data as the `portfolio` owner role, e.g. with `psql` inside the container. To set up a fresh database, create the app role first:

```sql
CREATE ROLE portfolio_app LOGIN PASSWORD '...';
REVOKE ALL ON DATABASE portfolio FROM PUBLIC;
GRANT CONNECT ON DATABASE portfolio TO portfolio_app;
GRANT USAGE ON SCHEMA public TO portfolio_app;
```

then apply `db/schema.sql` and restore the latest backup's data.
