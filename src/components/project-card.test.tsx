import { render, screen } from "@testing-library/react"
import { expect, test, vi } from "vitest"
import { ProjectCard } from "./project-card"

vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} data-testid="project-image" />,
}))

test("ProjectCard renders project content and links", () => {
  const project = {
    id: "1",
    title: "My Project",
    subtitle: "An awesome project",
    description: "This project does amazing things.",
    slug: "my-project",
    created_at: "2024-01-01T12:00:00Z",
    images: [],
    coverImage: {
      id: "img1",
      image_url: "https://example.com/image.jpg",
      alt: "Project cover",
      type: "cover" as const,
    },
    repo: "https://github.com/user/project",
    live_url: "https://project.live",
    lessons_learned: "I learned a lot.",
  }

  render(<ProjectCard index={0} project={project} />)

  expect(screen.getByRole("heading", { name: /My Project/i })).toBeDefined()
  expect(screen.getByText(/An awesome project/i)).toBeDefined()
  expect(screen.getByText(/This project does amazing things/i)).toBeDefined()
  expect(screen.getByText(/Created: 2024-01-01/i)).toBeDefined()

  expect(screen.getByRole("link", { name: /View Repo/i })).toHaveAttribute(
    "href",
    project.repo,
  )
  expect(screen.getByRole("link", { name: /Live Site/i })).toHaveAttribute(
    "href",
    project.live_url,
  )

  expect(screen.getByRole("button", { name: /Lessons Learned/i })).toBeDefined()
  expect(screen.getByTestId("project-image")).toHaveAttribute(
    "src",
    project.coverImage.image_url,
  )
})
