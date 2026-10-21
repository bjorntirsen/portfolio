// Field names are snake_case so they map 1:1 to Directus fields in phase 2.
// List items carry `id` and `sort` like Directus collection items do.

export interface SortableItem {
  id: string
  sort: number
}

export interface NavLink extends SortableItem {
  number: string
  label: string
  href: string
}

export interface HeroFact extends SortableItem {
  term: string
  value: string
  highlight: boolean
}

export interface ContactLink extends SortableItem {
  label: string
  href: string
  // Decorative arrow: "→" for mail, "↗" for external sites
  arrow: string
}

export interface SectionHeading {
  heading: string
  caption: string
}

export interface SiteCopy {
  site_name: string
  status: string
  nav: NavLink[]
  theme_toggle: {
    to_light_label: string
    to_dark_label: string
  }
  hero: {
    eyebrow: string
    // Rendered one word per line, followed by an accent dot
    name: string
    intro: string
    photo: {
      src: string
      alt: string
    }
    facts: HeroFact[]
  }
  stack: string[]
  areas_section: SectionHeading
  experience_section: SectionHeading & {
    current_label: string
  }
  about: {
    caption: string
    lead: string
    paragraphs: string[]
    off_the_clock_heading: string
    off_the_clock: string[]
  }
  projects_section: SectionHeading & {
    repo_label: string
    live_label: string
  }
  archive_section: SectionHeading & {
    columns: {
      date: string
      project: string
      notes: string
      kind: string
      links: string
    }
    repo_label: string
    live_label: string
    lessons_label: string
  }
  contact: {
    caption: string
    heading: string
    text: string
    links: ContactLink[]
  }
  footer: {
    // Rendered after "© <year> "
    copyright: string
    colophon: string
  }
}

export interface Area extends SortableItem {
  title: string
  description: string
  tools: string
}

export interface ExperienceEntry extends SortableItem {
  period: string
  is_current: boolean
  title: string
  org: string
  description: string
}

export type ProjectKind = "Solo" | "Group" | "Course"

export interface Project extends SortableItem {
  label: string
  date: string
  kind: ProjectKind
  title: string
  description: string
  tags: string[]
  repo_url: string | null
  live_url: string | null
}

export interface ArchiveItem extends SortableItem {
  date: string
  title: string
  description: string
  kind: ProjectKind
  repo_url: string | null
  live_url: string | null
  // Paragraphs shown under "Lessons learned"
  lessons?: string[]
}

export interface Content {
  site: SiteCopy
  areas: Area[]
  experience: ExperienceEntry[]
  projects: Project[]
  archive: ArchiveItem[]
}
