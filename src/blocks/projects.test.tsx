import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import type { Project } from "@/content"
import { siteCopy } from "@/content/data"
import Projects from "./projects"

const project: Project = {
  id: "test",
  sort: 1,
  label: "#01",
  date: "2024-01",
  kind: "Solo",
  title: "Test Project",
  description: "Description",
  tags: ["React", "Node.js"],
  repo_url: "https://github.com/example/test",
  live_url: null,
}

test("Projects section renders project cards", () => {
  render(<Projects copy={siteCopy.projects_section} projects={[project]} />)

  expect(screen.getByRole("heading", { name: "Projects" })).toBeDefined()
  expect(screen.getByRole("article")).toHaveTextContent("Test Project")
  expect(screen.getByText("2024-01 · Solo")).toBeDefined()
  expect(screen.getByRole("link", { name: "Repo ↗" })).toHaveAttribute(
    "href",
    project.repo_url,
  )
  expect(screen.queryByRole("link", { name: "Live site ↗" })).toBeNull()
})
