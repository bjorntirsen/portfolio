import { archive, areas, experience, projects, siteCopy } from "./data"
import type { ArchiveItem, Content, SortableItem } from "./types"

export type * from "./types"

function bySort<T extends SortableItem>(items: T[]): T[] {
  return [...items].sort((a, b) => a.sort - b.sort)
}

// Archive dates are ISO (YYYY-MM-DD), so string order is date order
function newestFirst(items: ArchiveItem[]): ArchiveItem[] {
  return [...items].sort(
    (a, b) => b.date.localeCompare(a.date) || a.sort - b.sort,
  )
}

// The single entry point for page content. Phase 2 swaps the static data for
// Directus; callers keep using this function unchanged.
export async function getContent(): Promise<Content> {
  return {
    site: {
      ...siteCopy,
      nav: bySort(siteCopy.nav),
      hero: { ...siteCopy.hero, facts: bySort(siteCopy.hero.facts) },
      contact: { ...siteCopy.contact, links: bySort(siteCopy.contact.links) },
    },
    areas: bySort(areas),
    experience: bySort(experience),
    projects: bySort(projects),
    archive: newestFirst(archive),
  }
}
