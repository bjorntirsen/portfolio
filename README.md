# portfolio

Björn Tirsén's portfolio deployed at [www.bjorntirsen.se](https://www.bjorntirsen.se)

This is the fourth version. The previous one (Next.js + Supabase) is tagged [`v3.0`](https://github.com/bjorntirsen/portfolio/tree/v3.0).

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=bugs)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=bjorntirsen_portfolio&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=bjorntirsen_portfolio)

Built with [Next.js](https://nextjs.org) and Tailwind CSS. The homepage is statically built from typed content data in [`src/content/`](src/content/): `getContent()` is the single entry point, so a CMS can replace the data without touching the section components in `src/blocks/`. The design source and handoff notes live in [`docs/design/`](docs/design/).

## Run locally

1. Clone repository.
2. Make sure you have both [node](https://nodejs.org/en) and [pnpm](https://pnpm.io) installed on your machine.
3. Install dependencies

```bash
pnpm i
```

4. Optional: the homepage doesn't use the database, but the legacy project code in `src/utils/` does. To work on that, copy `.env.local-template` to `.env.local` and start the local database (needs Docker):

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

Deployed to a Coolify VPS from the `Dockerfile` (Next.js `standalone` output). Coolify settings that matter:

- The homepage is static, so content changes need a redeploy. `DATABASE_URL` is a runtime variable pointing at the Coolify Postgres resource's internal URL, using the read-only `portfolio_app` role; only the legacy project code in `src/utils/` uses it.
- `SENTRY_AUTH_TOKEN` should be a Docker build secret, not a build variable, so it stays out of the deploy log and `docker history`.
- **Include Source Commit in Build** must be on so Sentry source maps are uploaded under the deployed commit.

Build and run the image locally with:

```sh
docker build -t portfolio .
docker run -p 3000:3000 -e DATABASE_URL=... portfolio
```

## Database

PostgreSQL 18 on the same Coolify server, backed up daily to S3. The schema lives in [`db/schema.sql`](db/schema.sql). The app connects as `portfolio_app`, which may only read; edit data as the `portfolio` owner role, e.g. with `psql` inside the container. To set up a fresh database, run [`db/dev/roles.sql`](db/dev/roles.sql) with a strong `PASSWORD` added, then apply `db/schema.sql` and restore the latest backup's data.
