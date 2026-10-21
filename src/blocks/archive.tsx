import type { ArchiveItem, SiteCopy } from "@/content"

interface ArchiveProps {
  copy: SiteCopy["archive_section"]
  items: ArchiveItem[]
}

const row =
  "grid grid-cols-[120px_minmax(0,1.3fr)_minmax(0,2fr)_120px_140px] gap-6"

export default function Archive({ copy, items }: Readonly<ArchiveProps>) {
  return (
    <>
      <div className="mt-24 flex flex-wrap items-baseline justify-between gap-4 pb-6">
        <h3 className="text-[40px] leading-none font-extrabold tracking-[-0.03em]">
          {copy.heading}
        </h3>
        <p className="font-mono text-sm text-muted">{copy.caption}</p>
      </div>
      {/* Scrolls inside its own box on narrow screens, never the page. Every
          row has a focusable summary or link, so keyboard users can reach the
          hidden columns without making the box itself focusable. */}
      <section
        aria-label={copy.heading}
        className="overflow-x-auto border-t border-fg"
      >
        <table className="block min-w-[820px] font-mono text-sm">
          <thead className="block">
            <tr
              className={`${row} border-b border-line py-3.5 text-xs tracking-[0.08em] text-muted uppercase`}
            >
              <th scope="col" className="text-left font-normal">
                {copy.columns.date}
              </th>
              <th scope="col" className="text-left font-normal">
                {copy.columns.project}
              </th>
              <th scope="col" className="text-left font-normal">
                {copy.columns.notes}
              </th>
              <th scope="col" className="text-left font-normal">
                {copy.columns.kind}
              </th>
              <th scope="col" className="text-left font-normal">
                {copy.columns.links}
              </th>
            </tr>
          </thead>
          <tbody className="block">
            {items.map((item) => (
              <tr
                key={item.id}
                className={`${row} items-baseline border-b border-line py-[18px]`}
              >
                <td className="text-muted">{item.date}</td>
                <th
                  scope="row"
                  className="text-left font-sans text-xl font-semibold text-fg"
                >
                  {item.title}
                </th>
                <td className="leading-normal text-body">
                  {item.description}
                  {item.lessons && (
                    <details className="mt-3">
                      <summary className="w-fit cursor-pointer text-[13px] text-muted marker:text-muted hover:text-fg">
                        {copy.lessons_label}
                      </summary>
                      {/* overflow-wrap keeps long URLs inside the cell, so an
                          open row never widens the scrolling table */}
                      <div className="mt-2 flex flex-col gap-2 [overflow-wrap:anywhere]">
                        {item.lessons.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </details>
                  )}
                </td>
                <td className="text-muted">{item.kind}</td>
                <td className="flex gap-3.5">
                  {item.repo_url && (
                    <a href={item.repo_url}>{copy.repo_label}</a>
                  )}
                  {item.live_url && (
                    <a href={item.live_url}>{copy.live_label}</a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}
