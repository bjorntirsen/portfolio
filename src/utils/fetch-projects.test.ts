import { beforeEach, expect, test, vi } from "vitest"
import { fetchProjectsWithCoverImage } from "./fetch-projects"

const sql = vi.fn()

vi.mock("./db", () => ({
  getSql: () => sql,
}))

const createdAt = new Date("2024-01-02T03:04:05Z")

beforeEach(() => {
  sql.mockReset()
})

test("fetchProjectsWithCoverImage splits out the cover image", async () => {
  const cover = { id: "c", image_url: "cover.jpg", type: "cover" }
  const regular = { id: "r", image_url: "regular.jpg", type: "regular" }
  sql.mockResolvedValue([
    {
      id: "1",
      title: "Project",
      created_at: createdAt,
      images: [regular, cover],
    },
  ])

  const projects = await fetchProjectsWithCoverImage()

  expect(sql.mock.calls[0][0].join("")).toContain("order by p.created_at desc")
  expect(projects).toEqual([
    {
      id: "1",
      title: "Project",
      created_at: "2024-01-02T03:04:05.000Z",
      images: [regular],
      coverImage: cover,
    },
  ])
})

test("fetchProjectsWithCoverImage handles projects without images", async () => {
  sql.mockResolvedValue([{ id: "1", created_at: createdAt, images: [] }])

  const projects = await fetchProjectsWithCoverImage()

  expect(projects).toEqual([
    {
      id: "1",
      created_at: "2024-01-02T03:04:05.000Z",
      images: [],
      coverImage: undefined,
    },
  ])
})

test("fetchProjectsWithCoverImage returns an empty list on error", async () => {
  const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
  const error = new Error("boom")
  sql.mockRejectedValue(error)

  const projects = await fetchProjectsWithCoverImage()

  expect(projects).toEqual([])
  expect(consoleError).toHaveBeenCalledWith(
    "Error fetching projects with images:",
    error,
  )
  consoleError.mockRestore()
})
