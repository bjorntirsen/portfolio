import { afterEach, beforeEach, expect, test, vi } from "vitest"
import { revalidateTag } from "next/cache"
import { POST } from "./route"

vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
  unstable_cache: (fn: () => unknown) => fn,
}))

const request = (authorization?: string) =>
  new Request("https://example.com/api/revalidate", {
    method: "POST",
    headers: authorization ? { authorization } : {},
  })

beforeEach(() => {
  vi.mocked(revalidateTag).mockReset()
  vi.stubEnv("REVALIDATE_SECRET", "secret")
})

afterEach(() => {
  vi.unstubAllEnvs()
})

test("POST revalidates the content with the right secret", async () => {
  const response = await POST(request("Bearer secret"))

  expect(response.status).toBe(200)
  expect(revalidateTag).toHaveBeenCalledWith("content", "max")
})

test.each([undefined, "Bearer wrong", "secret"])(
  "POST rejects the authorization header %s",
  async (authorization) => {
    const response = await POST(request(authorization))

    expect(response.status).toBe(401)
    expect(revalidateTag).not.toHaveBeenCalled()
  },
)

test("POST rejects every request when no secret is configured", async () => {
  vi.stubEnv("REVALIDATE_SECRET", "")

  const response = await POST(request("Bearer "))

  expect(response.status).toBe(401)
})
