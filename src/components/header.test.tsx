import { render, screen } from "@testing-library/react"
import { expect, test, vi } from "vitest"
import { siteCopy } from "@/content/data"
import Header from "./header"

vi.mock("./theme-toggle", () => ({
  default: () => <div data-testid="theme-toggle" />,
}))

test("Header renders navigation links and theme toggle", () => {
  render(<Header site={siteCopy} />)

  expect(screen.getByRole("link", { name: "01 Work" })).toHaveAttribute(
    "href",
    "#work",
  )
  expect(screen.getByRole("link", { name: "04 Projects" })).toHaveAttribute(
    "href",
    "#projects",
  )
  expect(screen.getByRole("link", { name: "05 Contact" })).toHaveAttribute(
    "href",
    "#contact",
  )
  expect(screen.getByText(siteCopy.status)).toBeDefined()
  expect(screen.getByTestId("theme-toggle")).toBeDefined()
})
