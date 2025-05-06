export const runtime = "edge"
export const dynamic = "force-dynamic"
export const revalidate = 0

import { fetchProjectsWithCoverImage } from "@/utils/fetch-projects"

export async function GET() {
  const projects = await fetchProjectsWithCoverImage()

  return new Response(`OK: ${JSON.stringify(projects)}`, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  })
}
