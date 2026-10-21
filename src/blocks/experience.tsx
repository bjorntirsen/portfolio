import type { ExperienceEntry, SiteCopy } from "@/content"
import SectionHeading from "./section-heading"

interface ExperienceProps {
  copy: SiteCopy["experience_section"]
  entries: ExperienceEntry[]
}

export default function Experience({
  copy,
  entries,
}: Readonly<ExperienceProps>) {
  return (
    <section
      id="experience"
      className="mx-auto max-w-[1360px] px-5 pt-30 sm:px-10"
    >
      <SectionHeading heading={copy.heading} caption={copy.caption} />
      <ol className="border-t border-fg">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-10 gap-y-3 border-b border-line py-8"
          >
            <div className="flex flex-col gap-2.5 font-mono text-[13px]">
              <span className="text-muted">{entry.period}</span>
              {entry.is_current && (
                <span className="self-start rounded-full bg-accent px-2 py-[3px] text-[11px] font-medium tracking-[0.08em] text-on-accent uppercase">
                  {copy.current_label}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[28px] leading-[1.1] font-extrabold tracking-[-0.02em]">
                {entry.title}
              </h3>
              <span className="font-mono text-[13px] text-accent-ink">
                {entry.org}
              </span>
            </div>
            <p className="col-span-full min-w-0 text-lg leading-[1.55] text-body sm:col-span-2">
              {entry.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
