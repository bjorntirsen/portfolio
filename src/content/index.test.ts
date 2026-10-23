import { afterEach, beforeEach, expect, test, vi } from "vitest"
import { getContent, staticContent } from "."
import { fetchDirectusContent } from "./directus"

vi.mock("next/cache", () => ({
  unstable_cache: (fn: () => unknown) => fn,
}))
vi.mock("@sentry/nextjs", () => ({ captureException: vi.fn() }))
vi.mock("./directus", () => ({ fetchDirectusContent: vi.fn() }))

beforeEach(() => {
  vi.mocked(fetchDirectusContent).mockReset()
})

afterEach(() => {
  vi.unstubAllEnvs()
})

test("getContent returns every list sorted with unique ids", async () => {
  const content = await getContent()
  const lists = [
    content.site.nav,
    content.site.hero.facts,
    content.site.contact.links,
    content.areas,
    content.experience,
    content.projects,
  ]

  for (const list of lists) {
    expect(list.length).toBeGreaterThan(0)
    expect(list.map((item) => item.sort)).toEqual(
      [...list.map((item) => item.sort)].sort((a, b) => a - b),
    )
    expect(new Set(list.map((item) => item.id)).size).toBe(list.length)
  }
})

test("getContent lists the archive newest first", async () => {
  const { archive } = await getContent()
  const dates = archive.map((item) => item.date)

  expect(dates).toEqual([...dates].sort().reverse())
  expect(new Set(archive.map((item) => item.id)).size).toBe(archive.length)
})

test("getContent uses the bundled content when Directus is not configured", async () => {
  vi.stubEnv("DIRECTUS_URL", "")

  const content = await getContent()

  expect(fetchDirectusContent).not.toHaveBeenCalled()
  expect(content.site).toMatchObject({
    site_name: staticContent.site.site_name,
  })
})

test("getContent reads from Directus and sorts the result", async () => {
  vi.stubEnv("DIRECTUS_URL", "https://cms.example.com")
  vi.stubEnv("DIRECTUS_TOKEN", "token")
  vi.mocked(fetchDirectusContent).mockResolvedValue({
    ...staticContent,
    site: { ...staticContent.site, status: "From Directus" },
    areas: [...staticContent.areas].reverse(),
  })

  const content = await getContent()

  expect(fetchDirectusContent).toHaveBeenCalledWith(
    "https://cms.example.com",
    "token",
  )
  expect(content.site.status).toBe("From Directus")
  expect(content.areas.map((area) => area.sort)).toEqual([1, 2, 3, 4])
})

test("getContent falls back to the bundled content when Directus fails", async () => {
  vi.stubEnv("DIRECTUS_URL", "https://cms.example.com")
  vi.stubEnv("DIRECTUS_TOKEN", "token")
  const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
  vi.mocked(fetchDirectusContent).mockRejectedValue(new Error("down"))

  const content = await getContent()

  expect(content.site.status).toBe(staticContent.site.status)
  expect(consoleError).toHaveBeenCalled()
  consoleError.mockRestore()
})
