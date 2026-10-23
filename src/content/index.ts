import * as Sentry from "@sentry/nextjs"
import { unstable_cache } from "next/cache"
import { archive, areas, experience, projects, siteCopy } from "./data"
import { fetchDirectusContent } from "./directus"
import type { ArchiveItem, Content, SortableItem } from "./types"

export type * from "./types"

// Tag on every cached Directus read; /api/revalidate invalidates it when a
// Directus Flow reports a content change.
export const CONTENT_TAG = "content"

function bySort<T extends SortableItem>(items: T[]): T[] {
  return [...items].sort((a, b) => a.sort - b.sort)
}

// Archive dates are ISO (YYYY-MM-DD), so string order is date order
function newestFirst(items: ArchiveItem[]): ArchiveItem[] {
  return [...items].sort(
    (a, b) => b.date.localeCompare(a.date) || a.sort - b.sort,
  )
}

function sorted({ site, ...lists }: Content): Content {
  return {
    site: {
      ...site,
      nav: bySort(site.nav),
      hero: { ...site.hero, facts: bySort(site.hero.facts) },
      contact: { ...site.contact, links: bySort(site.contact.links) },
    },
    areas: bySort(lists.areas),
    experience: bySort(lists.experience),
    projects: bySort(lists.projects),
    archive: newestFirst(lists.archive),
  }
}

// Bundled copy of the content, used when Directus is not configured (tests,
// CI, local dev) or cannot be reached.
export const staticContent: Content = {
  site: siteCopy,
  areas,
  experience,
  projects,
  archive,
}

// Errors are thrown, not cached, so a failed read is retried on the next
// revalidation instead of pinning the fallback. The token is read inside rather
// than passed in, so it never becomes part of the cache key.
const getCachedDirectusContent = unstable_cache(
  () =>
    fetchDirectusContent(
      process.env.DIRECTUS_URL ?? "",
      process.env.DIRECTUS_TOKEN ?? "",
    ),
  ["directus-content"],
  // Matches the page's revalidate, so a missed webhook heals within the hour
  { tags: [CONTENT_TAG], revalidate: 3600 },
)

// The single entry point for page content.
export async function getContent(): Promise<Content> {
  if (!process.env.DIRECTUS_URL || !process.env.DIRECTUS_TOKEN) {
    return sorted(staticContent)
  }

  try {
    return sorted(await getCachedDirectusContent())
  } catch (error) {
    console.error("Error fetching content from Directus:", error)
    Sentry.captureException(error)
    return sorted(staticContent)
  }
}
