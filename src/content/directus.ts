import {
  createDirectus,
  readItems,
  readSingleton,
  rest,
  staticToken,
} from "@directus/sdk"
import type {
  ArchiveItem,
  Area,
  ContactLink,
  Content,
  ExperienceEntry,
  HeroFact,
  NavLink,
  Project,
} from "./types"

// Collections live under a `portfolio_` prefix so they can share a Directus
// instance with other projects. scripts/directus-setup.mts creates them.

// Directus stores the "list" (repeater) interface as an array of objects
export interface TextRow {
  text: string
}

export interface DirectusSite {
  site_name: string
  status: string
  theme_to_light_label: string
  theme_to_dark_label: string
  hero_eyebrow: string
  hero_name: string
  hero_intro: string
  hero_photo_src: string
  hero_photo_alt: string
  stack: string[] | null
  areas_heading: string
  areas_caption: string
  experience_heading: string
  experience_caption: string
  experience_current_label: string
  about_caption: string
  about_lead: string
  about_paragraphs: TextRow[] | null
  about_off_the_clock_heading: string
  about_off_the_clock: string[] | null
  projects_heading: string
  projects_caption: string
  projects_repo_label: string
  projects_live_label: string
  archive_heading: string
  archive_caption: string
  archive_column_date: string
  archive_column_project: string
  archive_column_notes: string
  archive_column_kind: string
  archive_column_links: string
  archive_repo_label: string
  archive_live_label: string
  archive_lessons_label: string
  contact_caption: string
  contact_heading: string
  contact_text: string
  footer_copyright: string
  footer_colophon: string
}

export type DirectusProject = Omit<Project, "tags"> & { tags: string[] | null }

export type DirectusArchiveItem = Omit<ArchiveItem, "lessons"> & {
  lessons: TextRow[] | null
}

export interface DirectusSchema {
  portfolio_site: DirectusSite
  portfolio_nav_links: NavLink[]
  portfolio_hero_facts: HeroFact[]
  portfolio_contact_links: ContactLink[]
  portfolio_areas: Area[]
  portfolio_experience: ExperienceEntry[]
  portfolio_projects: DirectusProject[]
  portfolio_archive_items: DirectusArchiveItem[]
}

const texts = (rows: TextRow[] | null) => (rows ?? []).map((row) => row.text)

export interface DirectusLists {
  nav: NavLink[]
  facts: HeroFact[]
  contactLinks: ContactLink[]
  areas: Area[]
  experience: ExperienceEntry[]
  projects: DirectusProject[]
  archive: DirectusArchiveItem[]
}

// The collection each list is stored in
export const listCollections = {
  nav: "portfolio_nav_links",
  facts: "portfolio_hero_facts",
  contactLinks: "portfolio_contact_links",
  areas: "portfolio_areas",
  experience: "portfolio_experience",
  projects: "portfolio_projects",
  archive: "portfolio_archive_items",
} as const satisfies Record<keyof DirectusLists, keyof DirectusSchema>

const toRows = (texts: string[] | undefined) =>
  texts?.length ? texts.map((text) => ({ text })) : null

// The inverse of toContent, used to seed Directus from src/content/data.ts
export function fromContent({ site, ...content }: Content): {
  site: DirectusSite
  lists: DirectusLists
} {
  return {
    site: {
      site_name: site.site_name,
      status: site.status,
      theme_to_light_label: site.theme_toggle.to_light_label,
      theme_to_dark_label: site.theme_toggle.to_dark_label,
      hero_eyebrow: site.hero.eyebrow,
      hero_name: site.hero.name,
      hero_intro: site.hero.intro,
      hero_photo_src: site.hero.photo.src,
      hero_photo_alt: site.hero.photo.alt,
      stack: site.stack,
      areas_heading: site.areas_section.heading,
      areas_caption: site.areas_section.caption,
      experience_heading: site.experience_section.heading,
      experience_caption: site.experience_section.caption,
      experience_current_label: site.experience_section.current_label,
      about_caption: site.about.caption,
      about_lead: site.about.lead,
      about_paragraphs: toRows(site.about.paragraphs),
      about_off_the_clock_heading: site.about.off_the_clock_heading,
      about_off_the_clock: site.about.off_the_clock,
      projects_heading: site.projects_section.heading,
      projects_caption: site.projects_section.caption,
      projects_repo_label: site.projects_section.repo_label,
      projects_live_label: site.projects_section.live_label,
      archive_heading: site.archive_section.heading,
      archive_caption: site.archive_section.caption,
      archive_column_date: site.archive_section.columns.date,
      archive_column_project: site.archive_section.columns.project,
      archive_column_notes: site.archive_section.columns.notes,
      archive_column_kind: site.archive_section.columns.kind,
      archive_column_links: site.archive_section.columns.links,
      archive_repo_label: site.archive_section.repo_label,
      archive_live_label: site.archive_section.live_label,
      archive_lessons_label: site.archive_section.lessons_label,
      contact_caption: site.contact.caption,
      contact_heading: site.contact.heading,
      contact_text: site.contact.text,
      footer_copyright: site.footer.copyright,
      footer_colophon: site.footer.colophon,
    },
    lists: {
      nav: site.nav,
      facts: site.hero.facts,
      contactLinks: site.contact.links,
      areas: content.areas,
      experience: content.experience,
      projects: content.projects,
      archive: content.archive.map((item) => ({
        ...item,
        lessons: toRows(item.lessons),
      })),
    },
  }
}

export function toContent(site: DirectusSite, lists: DirectusLists): Content {
  return {
    site: {
      site_name: site.site_name,
      status: site.status,
      nav: lists.nav,
      theme_toggle: {
        to_light_label: site.theme_to_light_label,
        to_dark_label: site.theme_to_dark_label,
      },
      hero: {
        eyebrow: site.hero_eyebrow,
        name: site.hero_name,
        intro: site.hero_intro,
        photo: { src: site.hero_photo_src, alt: site.hero_photo_alt },
        facts: lists.facts,
      },
      stack: site.stack ?? [],
      areas_section: {
        heading: site.areas_heading,
        caption: site.areas_caption,
      },
      experience_section: {
        heading: site.experience_heading,
        caption: site.experience_caption,
        current_label: site.experience_current_label,
      },
      about: {
        caption: site.about_caption,
        lead: site.about_lead,
        paragraphs: texts(site.about_paragraphs),
        off_the_clock_heading: site.about_off_the_clock_heading,
        off_the_clock: site.about_off_the_clock ?? [],
      },
      projects_section: {
        heading: site.projects_heading,
        caption: site.projects_caption,
        repo_label: site.projects_repo_label,
        live_label: site.projects_live_label,
      },
      archive_section: {
        heading: site.archive_heading,
        caption: site.archive_caption,
        columns: {
          date: site.archive_column_date,
          project: site.archive_column_project,
          notes: site.archive_column_notes,
          kind: site.archive_column_kind,
          links: site.archive_column_links,
        },
        repo_label: site.archive_repo_label,
        live_label: site.archive_live_label,
        lessons_label: site.archive_lessons_label,
      },
      contact: {
        caption: site.contact_caption,
        heading: site.contact_heading,
        text: site.contact_text,
        links: lists.contactLinks,
      },
      footer: {
        copyright: site.footer_copyright,
        colophon: site.footer_colophon,
      },
    },
    areas: lists.areas,
    experience: lists.experience,
    projects: lists.projects.map((project) => ({
      ...project,
      tags: project.tags ?? [],
    })),
    archive: lists.archive.map(({ lessons, ...item }) => {
      const paragraphs = texts(lessons)
      return paragraphs.length > 0 ? { ...item, lessons: paragraphs } : item
    }),
  }
}

export async function fetchDirectusContent(
  url: string,
  token: string,
): Promise<Content> {
  const client = createDirectus<DirectusSchema>(url)
    .with(staticToken(token))
    .with(rest())
  const query = { sort: "sort", limit: -1 } as const

  const [site, nav, facts, contactLinks, areas, experience, projects, archive] =
    await Promise.all([
      client.request(readSingleton("portfolio_site")),
      client.request(readItems(listCollections.nav, query)),
      client.request(readItems(listCollections.facts, query)),
      client.request(readItems(listCollections.contactLinks, query)),
      client.request(readItems(listCollections.areas, query)),
      client.request(readItems(listCollections.experience, query)),
      client.request(readItems(listCollections.projects, query)),
      client.request(readItems(listCollections.archive, query)),
    ])

  return toContent(site, {
    nav,
    facts,
    contactLinks,
    areas,
    experience,
    projects,
    archive,
  })
}
