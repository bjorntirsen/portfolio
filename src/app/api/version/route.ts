import { connection } from "next/server"

// Reports which build is serving. Answered live by the running container, never
// prerendered or cached, unlike the homepage. Also the image's healthcheck.
export async function GET() {
  await connection()
  return Response.json(
    { commit: process.env.COMMIT_SHA || "unknown" },
    { headers: { "cache-control": "no-store" } },
  )
}
