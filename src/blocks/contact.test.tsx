import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import Contact from "./contact"

test("Contact section renders heading, text and links", () => {
  render(
    <Contact
      contact={{
        caption: "05 — Contact",
        heading: "Say hej",
        text: "Always happy to talk.",
        links: [
          {
            id: "github",
            sort: 1,
            label: "GitHub",
            href: "https://github.com/example",
            arrow: "↗",
          },
        ],
      }}
    />,
  )

  expect(screen.getByRole("heading", { name: "Say hej." })).toBeDefined()
  expect(screen.getByText("Always happy to talk.")).toBeDefined()
  expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/example",
  )
})
