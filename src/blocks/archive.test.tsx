import { render, screen, within } from "@testing-library/react"
import { expect, test } from "vitest"
import type { ArchiveItem } from "@/content"
import { siteCopy } from "@/content/data"
import Archive from "./archive"

const item = (overrides: Partial<ArchiveItem>): ArchiveItem => ({
  id: "item",
  sort: 1,
  date: "2021-01-01",
  title: "Item",
  description: "Description",
  kind: "Solo",
  repo_url: null,
  live_url: null,
  ...overrides,
})

test("Archive shows lessons learned in a details element when present", () => {
  render(
    <Archive
      copy={siteCopy.archive_section}
      items={[
        item({
          id: "with",
          title: "With lessons",
          repo_url: "https://github.com/example/with",
          lessons: ["First lesson.", "Second lesson."],
        }),
        item({ id: "without", title: "Without lessons" }),
      ]}
    />,
  )

  const [, withRow, withoutRow] = screen.getAllByRole("row")
  const summary = within(withRow).getByText("Lessons learned")
  expect(summary.tagName).toBe("SUMMARY")
  expect(summary.closest("details")).not.toHaveAttribute("open")
  expect(within(withRow).getByText("Second lesson.")).toBeInTheDocument()
  expect(within(withRow).getByRole("link", { name: "repo" })).toHaveAttribute(
    "href",
    "https://github.com/example/with",
  )

  expect(within(withoutRow).queryByText("Lessons learned")).toBeNull()
  expect(within(withoutRow).queryByRole("link")).toBeNull()
})
