import { render, screen } from "@testing-library/react"
import { expect, test, vi } from "vitest"
import Projects from "./projects"
import { ProjectWithCoverImage } from "@/utils/fetch-projects"

vi.mock("@/utils/fetch-projects", () => ({
  fetchProjectsWithCoverImage: vi.fn(() =>
    Promise.resolve([
      { id: "1", name: "Test Project", description: "Description", url: "#" },
    ]),
  ),
}))

vi.mock("@/components/project-card", () => ({
  ProjectCard: ({ project }: { project: ProjectWithCoverImage }) => (
    <div data-testid="project-card">{project.title}</div>
  ),
}))

test("Projects section renders with heading and project cards", async () => {
  const Component = await Projects()
  render(Component)

  expect(screen.getByRole("heading", { name: "All Projects" })).toBeDefined()
  expect(screen.getByTestId("project-card")).toHaveTextContent("Test Project")
})
