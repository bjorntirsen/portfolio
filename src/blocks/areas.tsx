import type { Area, SectionHeading as SectionHeadingCopy } from "@/content"
import SectionHeading from "./section-heading"

interface AreasProps {
  copy: SectionHeadingCopy
  areas: Area[]
}

export default function Areas({ copy, areas }: AreasProps) {
  return (
    <section id="work" className="mx-auto max-w-[1360px] px-5 pt-30 sm:px-10">
      <SectionHeading
        heading={copy.heading}
        caption={copy.caption}
        className="border-b border-line"
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))]">
        {areas.map((area, i) => (
          <div
            key={area.id}
            className="flex flex-col gap-4 border-b border-line pt-8 pr-7 pb-10"
          >
            <span className="font-mono text-[13px] text-accent-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[34px] leading-[1.05] font-extrabold tracking-[-0.025em]">
              {area.title}
            </h3>
            <p className="text-[17px] leading-[1.55] text-body">
              {area.description}
            </p>
            <p className="font-mono text-xs leading-[1.7] text-muted">
              {area.tools}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
