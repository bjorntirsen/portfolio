import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { siteCopy } from "@/content/data"
import About from "./about"

test("About section renders the lead, paragraphs and off-the-clock list", () => {
  render(<About about={siteCopy.about} />)

  expect(screen.getByText(/In the summer of 2019/)).toBeDefined()
  expect(
    screen.getByText(/I came to software the long way round/),
  ).toBeDefined()
  expect(screen.getByRole("heading", { name: "Off the clock" })).toBeDefined()
  expect(screen.getAllByRole("listitem")).toHaveLength(
    siteCopy.about.off_the_clock.length,
  )
})
