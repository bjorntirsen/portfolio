import { expect, test } from "vitest"
import { archive, areas, experience, projects, siteCopy } from "./data"
import { fromContent, toContent } from "./directus"

test("toContent restores the content that fromContent seeds Directus with", () => {
  const content = { site: siteCopy, areas, experience, projects, archive }
  const { site, lists } = fromContent(content)

  expect(toContent(site, lists)).toEqual(content)
})

test("toContent treats empty Directus fields as empty lists", () => {
  const { site, lists } = fromContent({
    site: siteCopy,
    areas,
    experience,
    projects,
    archive,
  })

  const content = toContent(
    { ...site, stack: null, about_paragraphs: null, about_off_the_clock: null },
    {
      ...lists,
      projects: [{ ...lists.projects[0], tags: null }],
      archive: [{ ...lists.archive[0], lessons: [] }],
    },
  )

  expect(content.site.stack).toEqual([])
  expect(content.site.about.paragraphs).toEqual([])
  expect(content.site.about.off_the_clock).toEqual([])
  expect(content.projects[0].tags).toEqual([])
  expect(content.archive[0]).not.toHaveProperty("lessons")
})
