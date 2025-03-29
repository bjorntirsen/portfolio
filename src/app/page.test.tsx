import { expect, test, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import Page from "./page"

vi.mock("@/utils/fetch-projects", () => ({
  fetchProjectsWithCoverImage: vi.fn(() => Promise.resolve([])),
}))

test("Page renders content sections", async () => {
  const PageComponent = await Page()
  render(<TooltipProvider>{PageComponent}</TooltipProvider>)

  const main = within(await screen.findByRole("main"))

  expect(
    main.getByRole("heading", { name: "The Portfolio of Björn Tirsén" }),
  ).toBeDefined()
  expect(main.getByRole("heading", { name: "All Projects" })).toBeDefined()
  expect(main.getByRole("heading", { name: "Let's Connect" })).toBeDefined()

  expect(screen.getByRole("link", { name: "About" })).toBeDefined()
  expect(screen.getByRole("link", { name: "Projects" })).toBeDefined()
  expect(screen.getByRole("link", { name: "Contact" })).toBeDefined()

  expect(screen.getByRole("link", { name: /GitHub/i })).toBeDefined()
  expect(screen.getByRole("link", { name: /LinkedIn/i })).toBeDefined()

  expect(
    screen.getByText(/All rights reserved/, { exact: false }),
  ).toBeDefined()
})
