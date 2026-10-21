# Portfolio v4 — handoff for the coding agent

You are working in my Next.js portfolio repo (Portfolio v3). It recently moved from Supabase to a self-hosted Postgres on my VPS. Never commit, stage or push anything. I make all commits myself. When you're done, give me a summary of changed files and open TODOs.

Files in this folder:
- `portfolio-design.dc.html` — the design source (see "How to read the design file").
- `icon/` — the finished favicon set (see step 9).

## Goal (phase 1 of 2)

Rebuild the homepage to match the new design in `docs/design/portfolio-design.dc.html` as faithfully as you can: layout, typography, spacing, colors, both themes and responsive behavior. All visible text must come from typed content data, not be hard-coded in components, because phase 2 will move that content into a Directus CMS (cms.bjorntirsen.se, Postgres-backed) via `@directus/sdk`. Do not add Directus yet, and do not change the database schema, migrations or DB code in this phase.

## How to read the design file

It is the source file of a design tool, not a page to copy as-is. The markup inside `<x-dc>` is the design, and every element's inline style is the exact spec. Ignore `support.js`, `<helmet>` and the x-dc runtime. `{{name}}` holes are values from the `renderVals()` method in the `<script type="text/x-dc">` block at the bottom; `<sc-for list="{{items}}" as="item">` is a loop over that array and `<sc-if value="{{cond}}">` is a conditional. The arrays in `renderVals()` (services, experience, featured, archive) are the content, so move them into the content data, not into components. The theme tokens are the `t` object in `renderVals()` and are applied as CSS custom properties (`--bg`, `--fg`, `--body`, `--muted`, `--line`, `--line-strong`, `--card`, `--accent`, `--accent-ink`) on the root element. The `darken` helper only gives `--accent-ink` in light mode: with the default accent `#FF6A2B` that is `#803516`, so hard-code it rather than porting the function. The theme toggle is the button in the header. Light and dark are the two branches of the `t` object.

## Implementation

1. First inspect the repo: router (App or Pages), styling approach, existing components, where the current homepage content and profile photo live, lint/typecheck/test scripts. Follow existing conventions. If there's no clear styling approach, use CSS Modules plus one global stylesheet for the tokens. Do not add Tailwind or a UI library.
2. Theme: define the tokens on `:root` (dark is default) and override them under `[data-theme="light"]`. On first visit, follow `prefers-color-scheme`. The toggle sets `data-theme` on `<html>` and saves the choice in localStorage (wrap in try/catch). Add a small inline script in `<head>` that sets `data-theme` before first paint, so the page never flashes the wrong theme. The toggle is a real `<button>` with `aria-pressed` and a visible label, as in the design.
3. Fonts via `next/font/google`: Bricolage Grotesque (weights 400, 600, 800, include the opsz axis) for display and body, JetBrains Mono (400, 500) for metadata. Map them to CSS variables.
4. Content layer: create `src/content/` (or the repo's equivalent) with TypeScript types and data for `SiteCopy` (hero, about paragraphs, off-the-clock list, contact text, links), `Area` (the four "What I work on" items), `ExperienceEntry`, `Project` (featured) and `ArchiveItem`. Give each list item an `id` and a `sort`, and use field names that map cleanly to snake_case Directus fields. Expose one async `getContent()` function that the page calls server-side. In phase 2 only its implementation changes.
5. Components: one per section (Header, Hero, StackBand, Areas, Experience, About, Projects, Archive, Contact, Footer), all server components except the theme toggle. Use semantic HTML as in the design (`header`, `nav`, `section` with ids for anchor links, `ol` for experience, `dl` in the hero, `article` for project cards). The archive table must scroll horizontally inside its own box on narrow screens, never the whole page.
6. Responsive: the design is fluid (`clamp()` type, auto-fit grids, flex-wrap). Check it at 375, 768, 1280 and 1440 px wide with no horizontal page scroll. Add visible `:focus-visible` styles and respect `prefers-reduced-motion` for the theme transition.
7. Placeholders: use the existing profile photo from the repo in the hero slot (4:5, object-fit cover, `next/image`). Fill email, GitHub and LinkedIn from existing config if they exist. NOTE: on the live site they currently point to placeholder "johndoe" profiles, so leave a clear TODO instead of keeping those. The SBAB experience dates `[START]` and `[END]` stay as TODOs in the content data.
8. Replace the old homepage sections. Don't delete old components that may be used elsewhere. List ones that look unused at the end instead.
9. Icons (App Router file conventions; adapt if the repo uses the Pages Router): copy `icon/favicon.ico` to `app/favicon.ico`, `icon/icon-small.svg` to `app/icon.svg` (the small-size variant is deliberately the tab icon), and `icon/apple-touch-icon.png` to `app/apple-icon.png`. Put `icon-192.png`, `icon-512.png` and `icon-maskable-512.png` in `public/` and add `app/manifest.ts` (name "Björn Tirsén", short_name "bt.", background_color and theme_color `#0F100D`, display "standalone", the maskable icon with `purpose: "maskable"`). Remove the old favicon/icon files those replace. `icon/mark-dark.svg` and `icon/mark-light.svg` are the logo mark without the tile — not needed now, leave them in docs.

## Before you finish

Run the repo's lint, typecheck and build, and fix what you introduced. Then report: files created/changed, any differences from the design and why, and the TODO list (photo, links, dates, unused components). Remember: no commits.
