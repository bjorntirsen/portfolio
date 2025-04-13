import { render, screen } from "@testing-library/react"
import { expect, test, vi } from "vitest"
import Header from "./header"

vi.mock("./theme-toggle", () => ({
  default: () => <div data-testid="theme-toggle" />,
}))

test("Header renders navigation links and theme toggle", () => {
  render(<Header />)

  expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
    "href",
    "#about",
  )
  expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
    "href",
    "#projects",
  )
  expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
    "href",
    "#contact",
  )
  expect(screen.getByTestId("theme-toggle")).toBeDefined()
})
