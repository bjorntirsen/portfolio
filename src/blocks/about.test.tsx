import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import About from "./about"

test("About section renders correctly", () => {
  render(<About />)

  expect(
    screen.getByRole("heading", { name: "The Portfolio of Björn Tirsén" }),
  ).toBeDefined()

  expect(screen.getByText(/Full stack developer with a passion/i)).toBeDefined()

  expect(
    screen.getByText(/I'm a passionate full stack developer/i),
  ).toBeDefined()

  expect(
    screen.getByText(/When I'm not coding, I like to spend time/i),
  ).toBeDefined()
})
