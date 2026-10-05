import { expect, test } from "@playwright/test"

// Verifies the browser SDK captures and sends errors through the tunnel route
// (`tunnelRoute` in next.config.ts). All Sentry traffic is stubbed, so nothing
// reaches the real Sentry project.
test("client errors are sent to Sentry via the tunnel route", async ({
  page,
}) => {
  const envelopes: string[] = []

  await page.route(/\.sentry\.io\//, (route) => route.abort())
  await page.route("**/monitoring?**", async (route) => {
    envelopes.push(route.request().postDataBuffer()?.toString("utf8") ?? "")
    await route.fulfill({ status: 200, body: "{}" })
  })
  // Stub the example API so the server-side SDK never reports to Sentry
  await page.route("**/api/sentry-example-api", (route) =>
    route.fulfill({ status: 500, body: "stubbed" }),
  )

  await page.goto("/sentry-example-page")
  await page.getByRole("button", { name: "Throw Sample Error" }).click()

  await expect(page.getByText("Error sent to Sentry.")).toBeVisible()
  await expect
    .poll(() => envelopes.some((e) => e.includes("SentryExampleFrontendError")))
    .toBe(true)
})
