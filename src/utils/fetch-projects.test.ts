import { beforeEach, expect, test, vi } from "vitest"
import { fetchProjectsWithCoverImage } from "./fetch-projects"

const order = vi.fn()

vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    from: () => ({ select: () => ({ order }) }),
  }),
}))

beforeEach(() => {
  order.mockReset()
})

test("fetchProjectsWithCoverImage splits out the cover image", async () => {
  const cover = { id: "c", image_url: "cover.jpg", type: "cover" }
  const regular = { id: "r", image_url: "regular.jpg", type: "regular" }
  order.mockResolvedValue({
    data: [{ id: "1", title: "Project", images: [regular, cover] }],
    error: null,
  })

  const projects = await fetchProjectsWithCoverImage()

  expect(order).toHaveBeenCalledWith("created_at", { ascending: false })
  expect(projects).toEqual([
    { id: "1", title: "Project", images: [regular], coverImage: cover },
  ])
})

test("fetchProjectsWithCoverImage handles projects without images", async () => {
  order.mockResolvedValue({ data: [{ id: "1" }], error: null })

  const projects = await fetchProjectsWithCoverImage()

  expect(projects).toEqual([
    { id: "1", images: undefined, coverImage: undefined },
  ])
})

test("fetchProjectsWithCoverImage returns an empty list on error", async () => {
  const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
  const error = { message: "boom" }
  order.mockResolvedValue({ data: null, error })

  const projects = await fetchProjectsWithCoverImage()

  expect(projects).toEqual([])
  expect(consoleError).toHaveBeenCalledWith(
    "Error fetching projects with images:",
    error,
  )
  consoleError.mockRestore()
})
