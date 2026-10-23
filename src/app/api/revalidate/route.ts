import { createHash, timingSafeEqual } from "node:crypto"
import { revalidateTag } from "next/cache"
import { CONTENT_TAG } from "@/content"

const digest = (value: string) => createHash("sha256").update(value).digest()

// Called by the Directus Flow that scripts/directus-setup.mts creates, whenever
// a portfolio item is created, updated or deleted.
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  const auth = request.headers.get("authorization") ?? ""
  if (!secret || !timingSafeEqual(digest(auth), digest(`Bearer ${secret}`))) {
    return Response.json({ revalidated: false }, { status: 401 })
  }

  revalidateTag(CONTENT_TAG, "max")
  return Response.json({ revalidated: true })
}
