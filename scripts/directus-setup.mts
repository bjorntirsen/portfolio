// Creates the portfolio collections in Directus, seeds them from
// src/content/data.ts, sets up read access and the revalidate webhook, and
// brands the Directus app to match the site. Safe to re-run: existing
// collections, fields, items, the reader user and the Flow are left alone,
// while the branding settings are always reapplied.
//
//   DIRECTUS_URL=https://cms.bjorntirsen.se \
//   DIRECTUS_ADMIN_TOKEN=... \
//   SITE_URL=https://www.bjorntirsen.se \
//   REVALIDATE_SECRET=... \
//   pnpm directus:setup
//
// DIRECTUS_ADMIN_TOKEN is the static token of an admin user. Prints the reader
// token to set as DIRECTUS_TOKEN in the app.

import { randomBytes } from "node:crypto"
import { readFile } from "node:fs/promises"
import {
  createCollection,
  createDirectus,
  createField,
  createFlow,
  createItems,
  createOperation,
  createPermissions,
  createPolicy,
  createUser,
  readCollections,
  readFieldsByCollection,
  readFiles,
  readFlows,
  readItems,
  readPolicies,
  readSingleton,
  readUsers,
  rest,
  staticToken,
  uploadFiles,
  updateFlow,
  updateSettings,
  updateSingleton,
} from "@directus/sdk"
import {
  archive,
  areas,
  experience,
  projects,
  siteCopy,
} from "../src/content/data.ts"
import {
  type DirectusLists,
  fromContent,
  listCollections,
} from "../src/content/directus.ts"

function env(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not set`)
  return value
}

const DIRECTUS_URL = env("DIRECTUS_URL")
const SITE_URL = env("SITE_URL")
const REVALIDATE_SECRET = env("REVALIDATE_SECRET")

// Untyped on purpose: the schema is what this script creates
const client = createDirectus(DIRECTUS_URL)
  .with(staticToken(env("DIRECTUS_ADMIN_TOKEN")))
  .with(rest())

const FOLDER = "portfolio"
const READER_POLICY = "Portfolio reader"
const READER_NAME = "Portfolio site"
const FLOW_NAME = "Portfolio: revalidate site"
const LOGO_TITLE = "bjorntirsen.se mark"
const FAVICON_TITLE = "bjorntirsen.se favicon"

interface FieldSpec {
  field: string
  type: string
  interface?: string
  options?: Record<string, unknown>
  special?: string[]
  note?: string
  required?: boolean
  width?: "half" | "full"
  group?: string
}

const str = (field: string, extra: Partial<FieldSpec> = {}): FieldSpec => ({
  field,
  type: "string",
  interface: "input",
  required: true,
  width: "half",
  ...extra,
})
const text = (field: string, extra: Partial<FieldSpec> = {}): FieldSpec => ({
  field,
  type: "text",
  interface: "input-multiline",
  required: true,
  width: "full",
  ...extra,
})
const url = (field: string): FieldSpec => ({
  field,
  type: "string",
  interface: "input",
  options: { placeholder: "https://…" },
  width: "half",
})
const tags = (field: string, extra: Partial<FieldSpec> = {}): FieldSpec => ({
  field,
  type: "json",
  interface: "tags",
  special: ["cast-json"],
  width: "full",
  ...extra,
})
// Repeater of { text } rows, for paragraphs too long for the tags interface
const paragraphs = (
  field: string,
  extra: Partial<FieldSpec> = {},
): FieldSpec => ({
  field,
  type: "json",
  interface: "list",
  special: ["cast-json"],
  options: {
    template: "{{text}}",
    fields: [
      {
        field: "text",
        name: "Text",
        type: "text",
        meta: { interface: "input-multiline", width: "full" },
      },
    ],
  },
  width: "full",
  ...extra,
})
const bool = (field: string, note?: string): FieldSpec => ({
  field,
  type: "boolean",
  interface: "boolean",
  width: "half",
  note,
})
const kind = (): FieldSpec => ({
  field: "kind",
  type: "string",
  interface: "select-dropdown",
  required: true,
  width: "half",
  options: {
    choices: ["Solo", "Group", "Course"].map((value) => ({
      text: value,
      value,
    })),
  },
})
const group = (field: string): FieldSpec => ({
  field,
  type: "alias",
  interface: "group-detail",
  special: ["alias", "no-data", "group"],
  width: "full",
})

// What createField and createCollection's `fields` accept
interface FieldInput {
  field: string
  type: string
  meta: Record<string, unknown>
  schema?: Record<string, unknown>
}

function toField(spec: FieldSpec, sort: number): FieldInput {
  const isAlias = spec.type === "alias"
  return {
    field: spec.field,
    type: spec.type,
    meta: {
      interface: spec.interface,
      options: spec.options ?? null,
      special: spec.special ?? null,
      note: spec.note ?? null,
      required: spec.required ?? false,
      width: spec.width ?? "full",
      group: spec.group ?? null,
      sort,
    },
    schema: isAlias
      ? undefined
      : { is_nullable: !spec.required || spec.type === "json" },
  }
}

// Every list collection gets a hand-picked string id (a slug) and a sort
const listFields = (fields: FieldSpec[]): FieldInput[] => [
  {
    field: "id",
    type: "string",
    meta: {
      interface: "input",
      note: "Unique slug, e.g. full-stack",
      required: true,
      width: "half",
      sort: 1,
    },
    schema: { is_primary_key: true, length: 255 },
  },
  {
    field: "sort",
    type: "integer",
    meta: { interface: "input", hidden: true, sort: 2 },
    schema: {},
  },
  ...fields.map((spec, index) => toField(spec, index + 3)),
]

function inGroup(name: string, specs: FieldSpec[]): FieldSpec[] {
  return [group(name), ...specs.map((spec) => ({ ...spec, group: name }))]
}

const siteFields: FieldSpec[] = [
  ...inGroup("general", [
    str("site_name"),
    str("status", { note: "Shown in the header" }),
    str("theme_to_light_label"),
    str("theme_to_dark_label"),
  ]),
  ...inGroup("hero", [
    str("hero_eyebrow"),
    str("hero_name", { note: "One word per line, followed by an accent dot" }),
    text("hero_intro"),
    str("hero_photo_src", {
      note: "Path under /public, e.g. /bjorn-tirsen.jpg",
    }),
    str("hero_photo_alt"),
    tags("stack", { note: "The band under the hero" }),
  ]),
  ...inGroup("areas_and_experience", [
    str("areas_heading"),
    str("areas_caption"),
    str("experience_heading"),
    str("experience_caption"),
    str("experience_current_label"),
  ]),
  ...inGroup("about", [
    str("about_caption"),
    text("about_lead"),
    paragraphs("about_paragraphs"),
    str("about_off_the_clock_heading"),
    tags("about_off_the_clock"),
  ]),
  ...inGroup("projects_and_archive", [
    str("projects_heading"),
    str("projects_caption"),
    str("projects_repo_label"),
    str("projects_live_label"),
    str("archive_heading"),
    str("archive_caption"),
    str("archive_column_date"),
    str("archive_column_project"),
    str("archive_column_notes"),
    str("archive_column_kind"),
    str("archive_column_links"),
    str("archive_repo_label"),
    str("archive_live_label"),
    str("archive_lessons_label"),
  ]),
  ...inGroup("contact_and_footer", [
    str("contact_caption"),
    str("contact_heading"),
    text("contact_text"),
    str("footer_copyright", { note: 'Rendered after "© <year> "' }),
    str("footer_colophon"),
  ]),
]

const seed = fromContent({
  site: siteCopy,
  areas,
  experience,
  projects,
  archive,
})

interface ListCollection {
  key: keyof DirectusLists
  icon: string
  template: string
  fields: FieldSpec[]
}

const lists: ListCollection[] = [
  {
    key: "nav",
    icon: "menu",
    template: "{{number}} {{label}}",
    fields: [str("number"), str("label"), str("href")],
  },
  {
    key: "facts",
    icon: "list",
    template: "{{term}}: {{value}}",
    fields: [
      str("term"),
      str("value"),
      bool("highlight", "Shown in the accent color"),
    ],
  },
  {
    key: "contactLinks",
    icon: "alternate_email",
    template: "{{label}}",
    fields: [
      str("label"),
      str("href"),
      str("arrow", { note: "→ for mail, ↗ for external sites" }),
    ],
  },
  {
    key: "areas",
    icon: "category",
    template: "{{title}}",
    fields: [str("title"), text("description"), str("tools")],
  },
  {
    key: "experience",
    icon: "work_history",
    template: "{{period}} · {{title}}",
    fields: [
      str("period"),
      bool("is_current"),
      str("title"),
      str("org"),
      text("description"),
    ],
  },
  {
    key: "projects",
    icon: "rocket_launch",
    template: "{{title}}",
    fields: [
      str("label"),
      str("date", { note: "YYYY-MM" }),
      kind(),
      str("title"),
      text("description"),
      tags("tags"),
      url("repo_url"),
      url("live_url"),
    ],
  },
  {
    key: "archive",
    icon: "inventory_2",
    template: "{{date}} {{title}}",
    fields: [
      {
        field: "date",
        type: "date",
        interface: "datetime",
        required: true,
        width: "half",
      },
      kind(),
      str("title"),
      text("description"),
      url("repo_url"),
      url("live_url"),
      paragraphs("lessons", { note: "Shown under “Lessons learned”" }),
    ],
  },
]

const SITE = "portfolio_site"
const siteFieldInputs = siteFields.map((spec, index) =>
  toField(spec, index + 2),
)
const collections = [SITE, ...Object.values(listCollections)]

async function ensureCollections(existing: Set<string>) {
  if (!existing.has(FOLDER)) {
    await client.request(
      createCollection({
        collection: FOLDER,
        meta: { icon: "folder", note: "Content for bjorntirsen.se" },
        schema: null,
      }),
    )
    console.log(`Created folder ${FOLDER}`)
  }

  if (!existing.has(SITE)) {
    await client.request(
      createCollection({
        collection: SITE,
        meta: {
          singleton: true,
          icon: "home",
          group: FOLDER,
          sort: 1,
          note: "Site-wide copy",
        },
        schema: {},
        fields: [
          {
            field: "id",
            type: "integer",
            meta: { hidden: true },
            schema: { is_primary_key: true, has_auto_increment: true },
          },
          ...siteFieldInputs,
        ],
      }),
    )
    console.log(`Created ${SITE}`)
  } else {
    await addMissingFields(SITE, siteFieldInputs)
  }

  for (const [index, list] of lists.entries()) {
    const collection = listCollections[list.key]
    const fields = listFields(list.fields)
    if (existing.has(collection)) {
      await addMissingFields(collection, fields)
      continue
    }
    await client.request(
      createCollection({
        collection,
        meta: {
          icon: list.icon,
          group: FOLDER,
          sort: index + 2,
          sort_field: "sort",
          display_template: list.template,
        },
        schema: {},
        fields,
      }),
    )
    console.log(`Created ${collection}`)
  }
}

async function addMissingFields(collection: string, fields: FieldInput[]) {
  const existing = new Set(
    (await client.request(readFieldsByCollection(collection))).map(
      (field) => field.field,
    ),
  )
  for (const field of fields) {
    if (existing.has(field.field)) continue
    await client.request(createField(collection, field))
    console.log(`Added ${collection}.${field.field}`)
  }
}

async function seedContent() {
  const current = await client.request(readSingleton(SITE)).catch(() => null)
  if (!current?.site_name) {
    await client.request(updateSingleton(SITE, seed.site))
    console.log(`Seeded ${SITE}`)
  }

  for (const [key, collection] of Object.entries(listCollections)) {
    const rows = await client.request(
      readItems(collection, { fields: ["id"], limit: 1 }),
    )
    if (rows.length > 0) continue
    const items = seed.lists[key as keyof DirectusLists]
    await client.request(createItems(collection, items))
    console.log(`Seeded ${collection} (${items.length} items)`)
  }
}

// A policy with read access to the portfolio collections only, and a user
// without password or app access whose static token the site uses.
async function ensureReader(): Promise<string | null> {
  const [policy] = await client.request(
    readPolicies({ filter: { name: { _eq: READER_POLICY } }, limit: 1 }),
  )
  let policyId = policy?.id
  if (!policyId) {
    const created = await client.request(
      createPolicy({
        name: READER_POLICY,
        icon: "visibility",
        description: "Read-only access for bjorntirsen.se",
        app_access: false,
        admin_access: false,
      }),
    )
    policyId = created.id
    await client.request(
      createPermissions(
        collections.map((collection) => ({
          policy: policyId,
          collection,
          action: "read",
          fields: ["*"],
        })),
      ),
    )
    console.log(`Created policy ${READER_POLICY}`)
  }

  const [user] = await client.request(
    readUsers({ filter: { first_name: { _eq: READER_NAME } }, limit: 1 }),
  )
  if (user) return null

  const token = randomBytes(32).toString("base64url")
  await client.request(
    createUser({
      first_name: READER_NAME,
      status: "active",
      token,
      policies: [{ policy: policyId }],
    }),
  )
  console.log(`Created user ${READER_NAME}`)
  return token
}

async function ensureFlow() {
  const [flow] = await client.request(
    readFlows({ filter: { name: { _eq: FLOW_NAME } }, limit: 1 }),
  )
  if (flow) return

  const created = await client.request(
    createFlow({
      name: FLOW_NAME,
      icon: "sync",
      status: "active",
      trigger: "event",
      accountability: "all",
      options: {
        type: "action",
        scope: ["items.create", "items.update", "items.delete"],
        collections,
      },
    }),
  )
  const operation = await client.request(
    createOperation({
      flow: created.id,
      name: "Revalidate",
      key: "revalidate",
      type: "request",
      position_x: 19,
      position_y: 1,
      options: {
        method: "POST",
        url: new URL("/api/revalidate", SITE_URL).toString(),
        headers: [
          { header: "Authorization", value: `Bearer ${REVALIDATE_SECRET}` },
        ],
      },
    }),
  )
  await client.request(updateFlow(created.id, { operation: operation.id }))
  console.log(`Created flow ${FLOW_NAME}`)
}

// Uploads an image to the file library, or reuses the one with the same title
async function ensureFile(title: string, path: string): Promise<string> {
  const [file] = await client.request(
    readFiles({ filter: { title: { _eq: title } }, fields: ["id"], limit: 1 }),
  )
  if (file) return file.id

  const form = new FormData()
  form.append("title", title)
  const svg = await readFile(new URL(path, import.meta.url))
  form.append(
    "file",
    new Blob([svg], { type: "image/svg+xml" }),
    path.split("/").at(-1),
  )
  const uploaded = await client.request(uploadFiles(form))
  console.log(`Uploaded ${title}`)
  return uploaded.id
}

const fonts = {
  display: {
    fontFamily: '"Bricolage Grotesque", system-ui',
    fontWeight: "800",
  },
  title: { fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: "600" },
  sans: { fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: "400" },
  monospace: { fontFamily: '"JetBrains Mono", monospace', fontWeight: "500" },
}

type Tokens = Record<string, string>

// The site's theme tokens are the source of truth: read the custom properties
// from the :root (dark) and [data-theme="light"] blocks of globals.css.
async function readTokens(): Promise<{ dark: Tokens; light: Tokens }> {
  const css = await readFile(
    new URL("../src/app/globals.css", import.meta.url),
    "utf8",
  )
  const block = (selector: string): Tokens => {
    const start = css.indexOf(`${selector} {`)
    if (start === -1) throw new Error(`${selector} not found in globals.css`)
    const body = css.slice(start, css.indexOf("}", start))
    return Object.fromEntries(
      [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [
        name,
        value.trim(),
      ]),
    )
  }
  const dark = block(":root")
  // The light block only overrides some tokens, like the CSS cascade does
  return { dark, light: { ...dark, ...block('[data-theme="light"]') } }
}

const mix = (a: string, b: string) => `color-mix(in srgb, ${a}, ${b} 50%)`

// Directus' background levels, from page to hover. In dark mode cards are
// lighter than the page, in light mode darker, so the two ends swap.
function toDirectusTheme(t: Tokens, page: string, panel: string) {
  return {
    borderRadius: "4px",
    background: page,
    backgroundSubdued: panel,
    backgroundNormal: mix(t.card, t.line),
    backgroundAccent: t.line,
    foreground: t.body,
    foregroundAccent: t.fg,
    foregroundSubdued: t.muted,
    borderColor: t.line,
    borderColorAccent: t["line-strong"],
    borderColorSubdued: mix(page, t.line),
    // --accent-ink is the accent in dark mode and a darker shade in light
    // mode, for contrast on light backgrounds
    primary: t["accent-ink"],
    fonts,
  }
}

async function applyBranding() {
  const { dark, light } = await readTokens()
  const logo = await ensureFile(LOGO_TITLE, "../docs/design/icon/mark-dark.svg")
  const favicon = await ensureFile(
    FAVICON_TITLE,
    "../docs/design/icon/icon-small.svg",
  )
  await client.request(
    updateSettings({
      project_name: "bjorntirsen.se",
      project_descriptor: "Portfolio CMS",
      // The logo sits on this color, so it matches the favicon tile
      project_color: dark.bg,
      project_logo: logo,
      public_foreground: logo,
      public_favicon: favicon,
      public_note: "Content for bjorntirsen.se",
      theme_dark_overrides: toDirectusTheme(dark, dark.bg, dark.card),
      theme_light_overrides: toDirectusTheme(light, light.card, light.bg),
    }),
  )
  console.log("Applied branding")
}

const existing = new Set(
  (await client.request(readCollections())).map((c) => c.collection),
)
await ensureCollections(existing)
await seedContent()
const token = await ensureReader()
await ensureFlow()
await applyBranding()

if (token) {
  console.log(`\nSet DIRECTUS_TOKEN in the app to:\n${token}`)
} else {
  console.log(
    `\n${READER_NAME} already exists; reuse its token or generate a new one in the Directus user page.`,
  )
}
