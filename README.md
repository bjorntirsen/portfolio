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

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

Deployed to a Coolify VPS from the `Dockerfile` (Next.js `standalone` output). Coolify settings that matter:

- `SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be available at build time: the home page is prerendered from Supabase during the build. Since it is static, changes to project data need a redeploy.
- `SENTRY_AUTH_TOKEN` should be a Docker build secret, not a build variable, so it stays out of the deploy log and `docker history`.
- **Include Source Commit in Build** must be on so Sentry source maps are uploaded under the deployed commit.
- A daily scheduled task hits `/api/keep-alive` so the free-tier Supabase project is not paused:

```sh
node -e "fetch('http://localhost:3000/api/keep-alive').then(r=>process.exit(r.ok?0:1))"
```

Build and run the image locally with:

```sh
docker build -t portfolio --build-arg SUPABASE_URL=... --build-arg NEXT_PUBLIC_SUPABASE_URL=... --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=... .
docker run -p 3000:3000 -e SUPABASE_URL=... -e NEXT_PUBLIC_SUPABASE_URL=... -e NEXT_PUBLIC_SUPABASE_ANON_KEY=... portfolio
```
