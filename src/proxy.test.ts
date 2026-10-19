import { NextRequest } from "next/server"
import { expect, test } from "vitest"
import { proxy } from "./proxy"

const rscRequest = (method: string) =>
  new NextRequest("https://www.bjorntirsen.se/api", {
    method,
    headers: { RSC: "1" },
  })

test("rejects non-GET RSC requests with 404", () => {
  expect(proxy(rscRequest("POST")).status).toBe(404)
})

test("lets GET RSC requests through", () => {
  const response = proxy(rscRequest("GET"))
  expect(response.headers.get("x-middleware-next")).toBe("1")
})
