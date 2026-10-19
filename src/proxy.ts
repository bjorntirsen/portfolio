import { type NextRequest, NextResponse } from "next/server"

// Scanners POST to random paths with an `RSC: 1` header. Next.js then renders
// the static not-found page, which has no RSC payload, and throws
// "InvariantError: Expected RSC response" (500). The site has no server
// actions, so any non-GET RSC request can be answered with a plain 404.
export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new NextResponse(null, { status: 404 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: [{ source: "/:path*", has: [{ type: "header", key: "rsc" }] }],
}
