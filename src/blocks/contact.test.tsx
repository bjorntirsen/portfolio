import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import Contact from "./contact"

test("Contact section renders with links and heading", () => {
  render(<Contact />)

  expect(screen.getByRole("heading", { name: "Let's Connect" })).toBeDefined()

  expect(
    screen.getByText(/Feel free to reach out for collaborations/i),
  ).toBeDefined()

  expect(screen.getByRole("link", { name: /GitHub/i })).toHaveAttribute(
    "href",
    "https://github.com/johndoe",
  )

  expect(screen.getByRole("link", { name: /LinkedIn/i })).toHaveAttribute(
    "href",
    "https://linkedin.com/in/johndoe",
  )
})
