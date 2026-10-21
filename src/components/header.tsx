import type { SiteCopy } from "@/content"
import ThemeToggle from "./theme-toggle"

interface HeaderProps {
  site: SiteCopy
}

// Below 640px: site name and an icon-only toggle on one row, the nav as a
// single horizontally scrolling row under it, and no status line.
export default function Header({ site }: HeaderProps) {
  return (
    <header className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-5 font-mono text-[13px] tracking-[0.02em] max-sm:gap-y-1 max-sm:py-2 sm:px-10">
      <a href="#top" className="font-medium no-underline">
        {site.site_name}
      </a>
      <div className="hidden items-center gap-2.5 text-muted sm:flex">
        <span
          aria-hidden="true"
          className="inline-block size-2 rounded-full bg-accent"
        />
        <span>{site.status}</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-7 gap-y-1 max-sm:contents">
        <nav
          aria-label="Main"
          className="flex flex-wrap gap-x-6 gap-y-1 max-sm:order-last max-sm:-mx-5 max-sm:w-[calc(100%+2.5rem)] max-sm:[scrollbar-width:none] max-sm:flex-nowrap max-sm:overflow-x-auto max-sm:px-5 max-sm:[&::-webkit-scrollbar]:hidden"
        >
          {site.nav.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="py-3 no-underline max-sm:inline-flex max-sm:min-h-11 max-sm:shrink-0 max-sm:items-center max-sm:whitespace-nowrap"
            >
              {link.number} {link.label}
            </a>
          ))}
        </nav>
        <ThemeToggle
          toLightLabel={site.theme_toggle.to_light_label}
          toDarkLabel={site.theme_toggle.to_dark_label}
        />
      </div>
    </header>
  )
}
