import { afterEach, expect, test, vi } from "vitest"
import { GET } from "./route"

vi.mock("next/server", () => ({ connection: vi.fn() }))

afterEach(() => {
  vi.unstubAllEnvs()
})

test("GET returns the commit the image was built from, uncached", async () => {
  vi.stubEnv("COMMIT_SHA", "abc123")

  const response = await GET()

  expect(response.status).toBe(200)
  expect(response.headers.get("cache-control")).toBe("no-store")
  expect(await response.json()).toEqual({ commit: "abc123" })
})

test("GET reports unknown for a local build without a commit", async () => {
  vi.stubEnv("COMMIT_SHA", "")

  const response = await GET()

  expect(await response.json()).toEqual({ commit: "unknown" })
})
