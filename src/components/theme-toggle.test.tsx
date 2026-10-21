import { fireEvent, render, screen } from "@testing-library/react"
import { afterEach, expect, test } from "vitest"
import ThemeToggle from "./theme-toggle"

afterEach(() => {
  delete document.documentElement.dataset.theme
  localStorage.clear()
})

test("ThemeToggle switches the theme and saves the choice", () => {
  document.documentElement.dataset.theme = "dark"
  render(
    <ThemeToggle
      toLightLabel="Switch to light mode"
      toDarkLabel="Switch to dark mode"
    />,
  )

  const button = screen.getByRole("button")
  expect(button).not.toHaveAttribute("aria-pressed")

  fireEvent.click(button)

  expect(document.documentElement.dataset.theme).toBe("light")
  expect(localStorage.getItem("theme")).toBe("light")

  fireEvent.click(button)

  expect(document.documentElement.dataset.theme).toBe("dark")
  expect(localStorage.getItem("theme")).toBe("dark")
})

test("ThemeToggle labels describe the action, one per theme", () => {
  render(
    <ThemeToggle
      toLightLabel="Switch to light mode"
      toDarkLabel="Switch to dark mode"
    />,
  )

  expect(screen.getByText("Switch to light mode")).toBeDefined()
  expect(screen.getByText("Switch to dark mode")).toBeDefined()
})
