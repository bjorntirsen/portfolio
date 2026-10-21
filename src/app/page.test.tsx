import { render, screen, within } from "@testing-library/react"
import { expect, test, vi } from "vitest"
import Page from "./page"

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={src} alt={alt} />
  ),
}))

test("Page renders every section from the content data", async () => {
  const Component = await Page()
  render(Component)

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "BjörnTirsén.",
  )
  for (const heading of [
    "What I work on",
    "Experience",
    "Projects",
    "Say hej.",
  ]) {
    expect(
      screen.getByRole("heading", { level: 2, name: heading }),
    ).toBeDefined()
  }

  const nav = screen.getByRole("navigation", { name: "Main" })
  expect(within(nav).getByRole("link", { name: "03 About" })).toHaveAttribute(
    "href",
    "#about",
  )
  for (const id of ["top", "work", "experience", "about", "projects"]) {
    expect(document.getElementById(id)).not.toBeNull()
  }

  expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/bjorntirsen",
  )
  expect(screen.getByText("Current")).toBeDefined()
  expect(screen.getAllByRole("article")).toHaveLength(4)
  expect(screen.getByRole("table")).toBeDefined()
  expect(screen.getByRole("contentinfo")).toHaveTextContent(
    `© ${new Date().getFullYear()} Björn Tirsén · Stockholm`,
  )
})
