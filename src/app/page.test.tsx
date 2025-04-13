import { render, screen, within } from "@testing-library/react"
import { expect, test, vi } from "vitest"
import Page from "./page"

vi.mock("@/blocks/about", () => ({ default: () => <div>About Section</div> }))
vi.mock("@/blocks/projects", () => ({
  default: () => <div>Projects Section</div>,
}))
vi.mock("@/blocks/contact", () => ({
  default: () => <div>Contact Section</div>,
}))
vi.mock("@/components/header", () => ({
  default: () => <header>Header</header>,
}))

test("Page renders all main sections", async () => {
  const Component = await Page()
  render(Component)

  expect(screen.getByText("About Section")).toBeDefined()
  expect(screen.getByText("Projects Section")).toBeDefined()
  expect(screen.getByText("Contact Section")).toBeDefined()
  expect(screen.getByText("Header")).toBeDefined()
  expect(screen.getByText(/All rights reserved/i)).toBeDefined()
})
