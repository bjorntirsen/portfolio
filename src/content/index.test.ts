import { expect, test } from "vitest"
import { getContent } from "."

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
