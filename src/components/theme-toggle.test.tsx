import { fireEvent, render, screen } from "@testing-library/react"
import { Theme } from "@radix-ui/themes"
import { beforeEach, expect, test, vi } from "vitest"
import ThemeToggle from "./theme-toggle"

const setTheme = vi.fn()
const useTheme = vi.fn()

vi.mock("next-themes", () => ({
  useTheme: () => useTheme(),
}))

beforeEach(() => {
  setTheme.mockReset()
})

test.each([
  { theme: "system", next: "light" },
  { theme: "light", next: "dark" },
  { theme: "dark", next: "system" },
])("ThemeToggle switches from $theme to $next", ({ theme, next }) => {
  useTheme.mockReturnValue({ theme, systemTheme: "dark", setTheme })
  render(
    <Theme>
      <ThemeToggle />
    </Theme>,
  )

  fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }))

  expect(setTheme).toHaveBeenCalledWith(next)
})

test("ThemeToggle forwards props to the button", () => {
  useTheme.mockReturnValue({ theme: "light", systemTheme: "light", setTheme })
  render(
    <Theme>
      <ThemeToggle data-testid="toggle" />
    </Theme>,
  )

  expect(screen.getByTestId("toggle")).toHaveAttribute(
    "aria-label",
    "Toggle theme",
  )
})
